const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header head = {course.name} />
      <Content partsArray = {course.parts}/>
      <Total partsArray = {course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <>
    <h1>{props.head}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part = {props.partsArray[0]}/>
      <Part part = {props.partsArray[1]}/>
      <Part part = {props.partsArray[2]}/>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.partsArray[0].exercises + props.partsArray[1].exercises + props.partsArray[2].exercises}</p>
    </>
  )
}

export default App