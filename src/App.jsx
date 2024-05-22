/* eslint-disable no-extra-semi */
import { useState } from "react";
import Search from "./components/Search";
import PersonList from "./components/Personlist";
import PersonForm from "./components/Personform";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showFiltered, setFiltered] = useState('');




  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    const matchedName = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());

    if (matchedName.length !== 0) {
      alert(`${newName} is already added to phonebook!`);
    } else {
      setPersons(persons.concat(personObject));
    };

    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) => {
    setFiltered(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm submit = {addPerson} name = {newName} number = {newNumber} handleName={handleNameChange} handleNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Search v = {showFiltered} s = {handleSearch} />
      <PersonList persons = {persons} showFiltered = {showFiltered} />
    </div>
  )

};



export default App