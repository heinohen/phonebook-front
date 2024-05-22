const Search = ( { v, s }) => {
    return (
        <div>
            filter: 
            <input
            value = {v}
            onChange={s}
            />
        </div>
    )
}

export default Search