import { useState, useEffect } from "react";
import "./index.css";

import addPersonService from "./Services/addPersons";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import SucessMessage from "./Components/SucessMessage";
import ErrorMessage from "./Components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sucessMessage, setSucessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    addPersonService.getAll().then((data) => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Do you want to replace the old number with the new one?`
        )
      ) {
        addPersonService
          .update(existingPerson.id, {
            name: existingPerson.name,
            number: newNumber,
          })
          .then(() => {
            addPersonService.getAll().then((data) => setPersons(data));
            setSucessMessage(
              `Number for ${existingPerson.name} has been updated successfully!`
            );
            setTimeout(() => {
              setSucessMessage(null);
            }, 3500);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${existingPerson.name} has already been removed from the server!`
            );
            setTimeout(() => {
              setErrorMessage(null);
              setPersons(
                persons.filter((person) => person.name !== existingPerson.name)
              );
            }, 3500);
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      addPersonService
        .create({ name: newName, number: newNumber })
        .then(() => {
          addPersonService.getAll().then((data) => setPersons(data));
          setSucessMessage(`${newName} was added to your Phonebook`);
          setTimeout(() => {
            setSucessMessage(null);
          }, 3500);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3500);
        });
    }
  };

  const deletePerson = (id) => {
    addPersonService.deletePerson(id).then(() => {
      addPersonService.getAll().then((data) => setPersons(data));
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((person) => {
    const nameMatch = person.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const numberMatch = person.number
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || numberMatch;
  });

  return (
    <div>
      <h3 className="header">Phonebook</h3>

      <Filter
        className="input"
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <PersonForm
        className="input"
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Contacts</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />

      <SucessMessage message={sucessMessage} />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default App;
