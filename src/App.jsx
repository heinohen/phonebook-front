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
    event.preventDefault()


    let matchedName = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());

    if (matchedName.length !== 0) {
      
      console.log("found match: " + '\n', matchedName[0], '\n', "asking to replace...")
      if (window.confirm(`Found number with name: ${matchedName[0].name}, replace the name with a new one ? `)) {
        console.log('----> yes')
        const toBeAdded = {
          ...matchedName[0],
          number: newNumber }

          console.log('replacing <----')
        personService
          .update(toBeAdded.id, toBeAdded)
          .then(returnedPerson => {
            console.log(`success <---- ${returnedPerson.name} updated number from ${matchedName[0].number} to ${returnedPerson.number}`)
            setPersons(persons.map(person => person.id !== toBeAdded.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(
              `Person '${returnedPerson.name}' was successfully updated on server`
              )
              setErrorStatus(false)
              setTimeout(() => {
                setNotificationMessage(null)
                setErrorStatus(false)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage(
              `Error ${error.response.data.error}`
              )
              setErrorStatus(true)
              setTimeout(() => {
                setNotificationMessage(null)
                setErrorStatus(false)
            }, 5000)
          })
      }

      else {console.log('----> no')}

    }

    else {
          const personObject = {
            name: newName,
            number: newNumber
          }
            personService
              .create(personObject)
              .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')

                setNotificationMessage(
                  `Person '${returnedPerson.name}' was successfully added to server`
                  )
                  setErrorStatus(false)
                  setTimeout(() => {
                    setNotificationMessage(null)
                    setErrorStatus(false)
                }, 5000)
            })
            .catch(error => {
              setNotificationMessage(
                `Error ${error.response.data.error}`
                )
                setErrorStatus(true)
                setTimeout(() => {
                  setNotificationMessage(null)
                  setErrorStatus(null)
              }, 5000)
            })
      }
  }

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
          setErrorStatus(true)
            setNotificationMessage(`Could not delete ${pers[0].name} from the server! \n
          Maybe it was already deleted?`);
            setPersons(persons.filter(p => p.id !== pers[0].id));
            console.log('<--- failure');
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

      <div className="notification-container">
      <Notification message = {notificationMessage} error = {errorStatus}/>
      </div>
      
      <PersonForm submit = {addPerson} name = {newName} number = {newNumber} handleName={handleNameChange} handleNumber={handleNumberChange}/>
      <Generator slot = {'n'}/>
      <Search v = {showFiltered} s = {handleSearch} />
      <PersonList persons = {persons} showFiltered = {showFiltered} deleteThisPerson={handleDeletePerson}/>
    </div>
  )

};



export default App