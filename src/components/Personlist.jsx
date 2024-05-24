const Person = ( { person, deleteThisPerson }) => {
    return (
        <tr>
            <td>#{person.id}</td>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick = {() => deleteThisPerson(person.id)}>delete</button></td>
        </tr>
    );
};

const PersonList = ({ persons, showFiltered, deleteThisPerson }) => {
    const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase()
        .includes(showFiltered.toLowerCase())
    );

    return(
        <div className="personlist-container">
            <table className="personlist-container">
                <tbody>
                    {filteredPersons.map(person => 
                        <Person key={person.name} person={person} deleteThisPerson={deleteThisPerson} />
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default PersonList;