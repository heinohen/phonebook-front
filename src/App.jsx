/* eslint-disable no-extra-semi */
import { useState, useEffect } from "react";
import './App.css';
import Search from "./components/Search";
import PersonList from "./components/Personlist";
import PersonForm from "./components/Personform";
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showFiltered, setFiltered] = useState('');

  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);
  //jos toinen parametri on tyhjä taulukko, suoritetaan efekti ainoastaan komponentin ensimmäisen renderöinnin jälkeen!




  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    if (personObject.name.length < 3) {
      alert(`Name field must be at least 3 characters`);
      return;
    }

    const matchedName = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());

    if (matchedName.length !== 0) {
      alert(`${newName} is already added to phonebook!`);
    } else {
      setPersons(persons.concat(personObject));
      personService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
        })
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