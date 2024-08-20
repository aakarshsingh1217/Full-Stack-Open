/*const x = 1
let y = 5

console.log(x, y)   // 1, 5 are printed
y += 10
console.log(x, y)   // 1, 15 are printed
y = 'sometext'
console.log(x, y)   // 1, sometext are printed
x = 4               // causes an error*/

/*const t = [1, -1, 3]

t.push(5)

console.log(t.length)
console.log(t[1])

t.forEach(value => {
    console.log(value)
})

const t2= t.concat(5)

const m1 = t.map(value => value * 2)

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)*/

const object1 = {
    name: 'Artos Hellas',
    age: 35,
    education: 'PhD',
}

const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
}
  
const object3 = {
    name: {
      first: 'Dan',
      last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
}

/*const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log(result)*/

const square = p => {
    console.log(p)
    return p * p
}