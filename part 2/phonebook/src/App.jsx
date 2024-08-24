import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName);
    
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = { name: newName, number: newNumber, id: (persons.length + 1) };
      setPersons(persons.concat(personObject));
    }
    
    setNewName(''); // Clear the input field
    setNewNumber('');
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson} nameValue={newName} nameHandler={handlePersonChange}
        numberValue={newNumber} numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <>
        <Persons filter={filter} persons={persons} />
      </>
    </div>
  )
}

export default App