// calculator.js

const express = require('express');
const bodyParser = require('body-parser'); 
const validator = require('validator');
const app = express();
const port = 3000;
app.use(express.static('static'));


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/bmi', (req, res) => {
    res.sendFile(__dirname + '/views/bmi.html');
});

app.post('/bmi', (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const age = parseInt(req.body.age);
    const gender = req.body.gender;
    const unit = req.body.unit;

    if (!validator.isFloat(String(height)) || !validator.isFloat(String(weight)) || !validator.isInt(String(age))) {
        return res.status(400).send('Invalid input. Please enter numeric values for height, weight, and age.');
    }

    const heightInMeters = (unit === 'metric') ? height : height * 0.0254;
    const weightInKg = (unit === 'metric') ? weight : weight * 0.453592;


    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);


    let interpretation = '';
    if (bmi < 18.5) {
        interpretation = 'Underweight';
    } else if (bmi < 25) {
        interpretation = 'Normal weight';
    } else if (bmi < 30) {
        interpretation = 'Overweight';
    } else {
        interpretation = 'Obese';
    }


    res.send(`<h2>BMI Result: ${bmi}</h2><p>Interpretation: ${interpretation}</p>`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
