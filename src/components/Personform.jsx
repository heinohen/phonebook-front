const PersonForm = ( {submit, name, number, handleName, handleNumber }) => {
    return (
        <div>
        <form onSubmit={submit}>
        <div>
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
            <button type = "submit" className="add">add</button>
            </div>
        </form>
        </div>
    );
};

export default PersonForm;
