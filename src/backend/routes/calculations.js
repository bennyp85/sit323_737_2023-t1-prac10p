/* eslint-disable no-useless-catch */
const mongoose = require('mongoose')

const CALCULATOR_DB_ADDR = process.env.CALCULATOR_DB_ADDR; 
const mongoURI = "mongodb://" + CALCULATOR_DB_ADDR + "/calculations"

const db = mongoose.connection;
db.on('disconnected', () => {
    console.error(`Disconnected: unable to reconnect to ${mongoURI}`)
})
db.on('error', (err) => {
    console.error(`Unable to connect to ${mongoURI}: ${err}`);
});
db.once('open', () => {
  console.log(`Connected to ${mongoURI}`);
});

const connectToMongoDB = async () => {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        connectTimeoutMS: 2000,
        useUnifiedTopology: true
    })
};

const calculationSchema = mongoose.Schema({
    num1: { type: Number, required: [true, 'Number 1 is required'] },
    num2: { type: Number, required: [true, 'Number 2 is required'] },
    operation: { type: String, required: [true, 'Operation is required'] },
    result: { type: Number, required: [true, 'Result is required'] },
    timestamps: {}
});


const calculationModel = mongoose.model('Calculation', calculationSchema);

const construct = (params) => {
    let num1 = Number(params.num1);
    let num2 = Number(params.num2);
    const operation = params.operation;
    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'mult':
            result = num1 * num2;
            break;
        case 'div':
            result = num1 / num2;
            break;
        default:
            throw new Error('Invalid operation');
    }
    const calculation = new calculationModel({ num1: num1, num2: num2, operation: operation, result: result });
    return calculation;
};

// Deletes calculation
const deleteCalculation = (id) => {
    console.log("deleting calculation...")
    calculationModel.deleteOne({ _id: id }, (err) => {
        if (err) { throw err }
    })
};

// Updates calculation
const updateCalculation = (id, params) => {
    console.log("updating calculation...")
    let num1 = Number(params.num1);
    let num2 = Number(params.num2);
    const operation = params.operation;
    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'mult':
            result = num1 * num2;
            break;
        case 'div':
            result = num1 / num2;
            break;
        default:
            throw new Error('Invalid operation');
    }
    calculationModel.updateOne({ _id: id }, { num1: num1, num2: num2, operation: operation, result: result }, (err) => {
        if (err) { throw err }
    })
};

  
// Constructs and saves calculation
const createCalculation = (params) => {
    console.log("creating calculation...")
    const calculation = construct(params);
    calculation.save((err) => {
        if (err) { throw err }
    })
};


module.exports = {
    calculationModel: calculationModel,
    connectToMongoDB: connectToMongoDB,
    createCalculation: createCalculation,
    deleteCalculation: deleteCalculation,
    updateCalculation: updateCalculation
}
