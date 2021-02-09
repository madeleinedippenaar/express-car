const express = require('express');
const cars = express.Router();

const carArray = [ 
    {id: 1, make:'Ford', model: 'Fusion', year: 2018},
    {id: 2, make:'Ford', model: 'Focus', year: 2018},
    {id: 3, make:'Tesla', model: 'Model 3', year: 2020}
];

cars.get('/', (req, res) => {
    if (req.query.model) {
        const selectedCars = carArray.filter(c => c.model.toUpperCase().startsWith(req.query.model.toUpperCase()));
        res.status(200).send(selectedCars);
    }
    res.status(200).send(carArray);
});

cars.get('/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const car = carArray.find(c => c.id === carId);
    res.status(200).send(car);
});
cars.post('/', (req, res) => {
    const year = req.body.year;
    const make = req.body.make;
    const model = req.body.model;
    const id = carArray[carArray.length -1].id + 1;
    const newCar = {id, make, model, year};
    carArray.push(newCar);
    res.status(201).send(newCar);
});

cars.put(':id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexOfCar = carArray.find(c => c.id === id);
    carArray[indexOfCar].make = req.make;
    carArray[indexOfCar].model = req.model;
    carArray[indexOfCar].year = req.year;
    res.status(200).send(carArray[indexOfCar]);
});

cars.delete(':id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexOfCar = carArray.find( c => c.id === id);
    carArray.splice(indexOfCar, 1);
    res.sendStatus(204);
})

module.exports = cars;