const express = require('express')
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios')

const util = require('./utils')

const CALCULATOR_API_ADDR = process.env.CALCULATOR_API_ADDR

const BACKEND_URI = `http://${CALCULATOR_API_ADDR}/calculations`

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

const router = express.Router()
app.use(router)

app.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: false }))

// Application will fail if environment variables are not set
if(!process.env.PORT) {
  const errMsg = "PORT environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

if(!process.env.CALCULATOR_API_ADDR) {
    const errMsg = "CALCULATOR_API_ADDR environment variable is not defined"
    console.error(errMsg)
    throw new Error(errMsg)
  }
  
  // Starts an http server on the $PORT environment variable
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });

  // Handles GET request to /
router.get("/", (req, res) => {
    // retrieve list of calculations from the backend, and use them to render the HTML template
    axios.get(BACKEND_URI)
      .then(response => {
        console.log(`response from ${BACKEND_URI}: ` + response.status)
        const result = util.formatCalculations(response.data)
        res.render("home", {calculations: result})
      }).catch(error => {
        console.error('error: ' + error)
    })
});
  

// Handles POST request to /post
router.post('/post', (req, res) => {
    console.log(`received request: ${req.method} ${req.url}`)

// validate request
const { num1, num2, operation } = req.body;
if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send("num1 and num2 must be numbers");
    return;
  }
  
  const allowedOperations = ["add", "subtract", "mult", "div"];
  if (!allowedOperations.includes(operation)) {
    res.status(400).send("operation must be add, subtract, mult, or div");
    return;
  }

   // send the new calculation to the backend and redirect to the homepage
   console.log(`posting to ${BACKEND_URI}- num1: ${num1} num2: ${num2} operation: ${operation}`)
   axios.post(BACKEND_URI, {
    num1: num1,
    num2: num2,
    operation: operation,
   }).then(response => {
       console.log(`response from ${BACKEND_URI}` + response.status)
       res.redirect('/')
   }).catch(error => {
       console.error('error: ' + error)
   })
 });