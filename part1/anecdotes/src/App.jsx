import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const handleSelected = () => setSelected(getRandomNumber)

  const handleVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <br />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleSelected}>next anecdote</button>
      <br />
      <h1>Anecdote with most votes</h1>
      <br />
      <DisplayLargest arrayOfVotes={votes} anecdoteArray={anecdotes} />
    </div>
  )
}

const DisplayLargest = ({arrayOfVotes, anecdoteArray}) => {
  const maxValue = Math.max(...arrayOfVotes)
  const maxIndex = arrayOfVotes.indexOf(maxValue)

  if (maxValue === 0) {
    return <div></div>
  }

  return (
    <>
    <div>{anecdoteArray[maxIndex]}</div>
    <div>has {maxValue} votes</div>
    </>
  )
}

export default App