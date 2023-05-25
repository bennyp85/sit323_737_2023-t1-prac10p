const express = require('express');
const bodyParser = require('body-parser');
const Calculation = require('./calculations');

const router = express.Router();
router.use(bodyParser.json());

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

// Handles POST requests to /messages
router.post('/calculations', (req, res) => {
    try {
        Calculation.create(({num1: req.body.num1, num2: req.body.num2, operation: req.body.operation }))
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

module.exports = router;

