const express = require('express');
const bodyParser = require('body-parser');
const Calculation = require('./calculations');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Handles GET requests to /calculations
router.get('/calculations', (req, res) => {
    console.log(`received request: ${req.method} ${req.url}`)

     // Query for calculations in descending order
     try {
        Calculation.calculationModel.find({}, null, { sort: { '_id': -1 } }, (err, calculations) => {
            let list = []
            if (calculations.length > 0) {
                calculations.forEach((calculation) => {
                    if (calculation.num1 && calculation.num2 && calculation.operation) {
                        list.push({ 'id': calculation._id, 'num1': calculation.num1, 'num2': calculation.num2, 'operation': calculation.operation, 'result': calculation.result,  'timestamp': calculation._id.getTimestamp() })
                    }
                });
            }
            res.status(200).json(list)
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

// Handles POST requests to /calculations
router.post('/calculations', (req, res) => {
    try {
        Calculation.createCalculation(({num1: req.body.num1, num2: req.body.num2, operation: req.body.operation }))
        res.status(200).send()
    } catch (err) {
        if (err.name == "ValidationError") {
            console.error('validation error: ' + err)
            res.status(400).json(err)
        } else {
            console.error('could not save: ' + err)
            res.status(500).json(err)
        }
    }
});

// Handles DELETE requests to /calculations
router.delete('/calculations', (req, res) => {
    try {
        Calculation.deleteCalculation({ _id: req.body.id }, (err) => {
            if (err) {
                console.error('could not delete: ' + err)
                res.status(500).json(err)
            } else {
                res.status(200).send()
            }
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

// Handles PUT requests to /calculations
router.put('/calculations', (req, res) => {
    try {
        Calculation.updateCalculation({ _id: req.body.id }, { num1: req.body.num1, num2: req.body.num2, operation: req.body.operation }, (err) => {
            if (err) {
                console.error('could not update: ' + err)
                res.status(500).json(err)
            } else {
                res.status(200).send()
            }
        });
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router;

