// Args:
// person: object
// deleteThisPerson: action
// Returns:
// yksi table row elementti jossa tiedot ja delete-nappi toiminnallisuudella
const Person = ( { person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>
    );
};
//             <td>#{person.id}</td>
//            <td><button onClick={() => deleteThisPerson(person.id)}>delete</button></td>


const PersonList = ({ persons, showFiltered }) => {
    const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase()
        .includes(showFiltered.toLowerCase())
    );

    return(
        <div>
            <table>
                <tbody>
                    {filteredPersons.map(person => 
                        <Person key={person.name} person={person} />
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default PersonList;