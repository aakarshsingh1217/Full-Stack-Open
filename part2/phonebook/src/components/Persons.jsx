const Persons = ({filter, persons, onDelete}) => {
    const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

    return (
        <>
            {personsToShow.map(person =>
                <div key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => onDelete(person.id)}>delete</button>
                </div>
            )}
        </>
    )
}

export default Persons