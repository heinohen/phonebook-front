/* eslint-disable no-extra-semi */
import { useState, useEffect } from "react";
import './App.css';
import Search from "./components/Search";
import PersonList from "./components/Personlist";
import PersonForm from "./components/Personform";
import personService from './services/persons';
import Notification from "./components/Notification";
import Generator from "./components/Generator";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showFiltered, setFiltered] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);



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
      console.log(`found entry: \n ${matchedName[0]} \n asking to replace...`);
      if (window.confirm(`${newName} is already added to phonebook! Replace (yes) ?`)) {
        console.log('yes --->');

        const replacingPerson =  {
          ...matchedName[0],
          number: newNumber
        };

        personService
          .update(replacingPerson.id, replacingPerson)
          .then(returnedPerson => {
            setPersons(p => p.id !== replacingPerson.id ? p : returnedPerson)
          });
      };
    } else {
      setPersons(persons.concat(personObject));
      personService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
          setErrorStatus(false);
          setNotificationMessage(`Added ${person.name}`);
          console.log('success <----');
          setTimeout(() => {
            setNotificationMessage(null);
            setErrorStatus(false);
          }, 5000)
        })
    };

    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setFiltered(event.target.value)
  };

  const handleDeletePerson = (id) => {
    const pers = persons.filter(p => p.id === id); // array with single element
    
    console.log(`lets delete ${pers[0].name}? <----`);
    if (window.confirm(`delete ${pers[0].name}? `)) {
      console.log('yes --->');
      personService
        .eliminate(pers[0].id)
        .then(() => {
          setErrorStatus(false);
          setNotificationMessage(`Succesfully deleted ${pers[0].name} from server!`);
          setPersons(persons.filter(p => p.id !== pers[0].id));
          console.log('success <----');
          setTimeout(() => {
            setNotificationMessage(null);
            setErrorStatus(false);
          }, 5000)
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_e => {
            setNotificationMessage(`Could not delete ${pers[0].name} from the server! \n
          Maybe it was already deleted?`);
            setPersons(persons.filter(p => p.id !== pers[0].id));
            setTimeout(() => {
              setNotificationMessage(null);
              setErrorStatus(null);
            }, 5000);
          });
    };
  };

  return (
    <div>
      <Generator slot = {'h'}/>
      <Notification message = {notificationMessage} error = {errorStatus}/>
      <PersonForm submit = {addPerson} name = {newName} number = {newNumber} handleName={handleNameChange} handleNumber={handleNumberChange}/>
      <Generator slot = {'n'}/>
      <Search v = {showFiltered} s = {handleSearch} />
      <PersonList persons = {persons} showFiltered = {showFiltered} deleteThisPerson={handleDeletePerson}/>
    </div>
  )

};



export default App