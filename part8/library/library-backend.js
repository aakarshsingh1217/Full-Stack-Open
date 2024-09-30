const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User               # New query to get the current user
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(               # Mutation to create a user
      username: String!
      favoriteGenre: String!
    ): User
    login(                    # Mutation to login and get a token
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments,
    allBooks: async (root, args) => {
      const query = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          query.author = author._id
        }
      }

      if (args.genre) {
        query.genres = args.genre;   // Match books that include the genre
      }

      return Book.find(query).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (author) => {
      return Book.countDocuments({ author: author._id })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {  // <-- Highlighted: Token validation for addBook
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Creating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              errorMessage: error.message,  // Add detailed error message
            }
          })
        }
      }

      const newBook = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })

      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Creating book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            errorMessage: error.message,  // Add detailed error message
          }
        })
      }

      return newBook.populate('author');
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {  // <-- Highlighted: Token validation for editAuthor
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const author = await Author.findOne({ name: args.name })
      if(!author) {
        return null
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            errorMessage: error.message,  // Add detailed error message
          }
        });
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            errorMessage: error.message,
          },
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      console.log("Signing JWT with SECRET:", SECRET);
      return { value: jwt.sign(userForToken, SECRET) };
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      console.log("Verifying JWT with SECRET:", SECRET);  // Debugging line
      const decodedToken = jwt.verify(auth.substring(7), SECRET);  // <-- Highlighted: Verify JWT
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});