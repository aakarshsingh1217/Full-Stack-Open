import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find(p => p.name === newName);

    if (person) {
      // Check if the number is the same
      if (person.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
      } else {
        // Ask for confirmation to update the number
        if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
          const updatedPerson = { ...person, number: newNumber };

          personService
            .updateNewNumber(person.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson));
              setNewName('');
              setNewNumber('');
              setNotification(`Added ${updatedPerson.name}`)
              setTimeout(() => {
                setNotification(null)
              }, 3000)
            })
            .catch(error => {
              console.error(error.response.data.error);
            });
        }
      }
    } else {
      // If the person does not exist, create a new person
      const personObject = { name: newName, number: newNumber };

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          console.error(error.response.data.error);
        });
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          console.error(error.response.data.error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
        <Persons filter={filter} persons={persons} onDelete={handleDelete} />
      </>
    </div>
  );
};

export default App;
