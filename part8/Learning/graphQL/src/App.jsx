import { useQuery, useApolloClient } from '@apollo/client'
import { useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import { ALL_PERSONS } from './queries'
import PhoneForm from './components/PhoneForm'

const App = () => {
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  if (result.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }
  
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons = {result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App