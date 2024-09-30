/*var triple = function triple(x) {
    return x * 3
}

var waffle = triple

waffle(30)*/

/*var dogs = animals.filter(function(animal) {
    return animals.species === 'dog'
})

var dogs = []
for (var i = 0; i < animals.length; i++) {
    if (animals[i].species === 'dog')
        dogs.push(animals[i])
}*/

/*var names = animals.map(function(animal) {
    return animals.name + ' is a ' + animal.species
})

//var names = animals.map((animal) => animal.name)

var animals = [
    {name: 'Fluffkins', species: 'rabbit'},
    {name: 'Caro', species: 'dog'},
    {name: 'Hamilton', species: 'dog'},
    {name: 'Harold', species: 'fish'},
    {name: 'Ursula', species: 'cat'},
    {name: 'Jimmy', species: 'fish'},
]*/

var orders = [
    {amount: 250},
    {amount: 400},
    {amount: 100},
    {amount: 325},
]

var totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)