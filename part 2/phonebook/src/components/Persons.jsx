const Persons = ({filter, persons}) => {
    const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

    return (
        <>
            {personsToShow.map(person =>
                <div key={person.id}>{person.name} {person.number}</div>
            )}
        </>
    )
}

export default Persons