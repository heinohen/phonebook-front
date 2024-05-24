const PersonForm = ( {submit, name, number, handleName, handleNumber }) => {
    return (
        <div className="personform-container">
        <form onSubmit={submit}>
        <div className="personform-container">
        name: 
        <input 
            value = {name}
            onChange={handleName}
        />
        </div>
        <div>
        number:
        <input
            value = {number}
            onChange={handleNumber}
        />
        </div>
            <div>
            <button type = "submit" className="add" onClick={console.log('asd')}>add</button>
            </div>
        </form>
        </div>
    );
};

export default PersonForm;
