//Importing the required dependencies
const express = require('express');
const app = express();
const mysql = require ('mysql2');
const dotenv = require('dotenv')

app.use(express.json());
dotenv.config();

//create connection
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
})
//Check connection
db.connect((err) => {
    if(err){
        return console.log('Error connecting to db!' , err.message)
    }
    console.log('Connected to db successfully as id:', db.threadId)
})
//Question 1
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.get('/patients', (req, res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if(err){
            console.error(err);
           return res.status(500).send('Error retrieving data')
        }
        else{
            res.render('patients', {results: results});
        }
    });
});
app.get('/providers', (req, res) => {
    db.query('SELECT * FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            return res.status(500).send('Error retrieving data')
        }
        else{
            res.render('providers', {results: results});
        }
    });
});
app.get('/patientsFname', (req, res) => {
    db.query('SELECT first_name FROM patients', (err,results) => {
        if (err){
            console.error(err);
            return res.status(500).send('Error retrieving data')
        }
        else{
            res.render('firstname', {results: results});
        }

    });
});
app.get('/specialty', (req, res) => {
    db.query('SELECT provider_specialty FROM providers', (err,results) => {
        if (err){
            console.error(err);
            return res.status(500).send('Error retrieving data')
        }
        else{
            res.render('specialty', {results: results});
        }

    });
});


//Initialize server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}`);
    console.log('Sending message to browser');
    app.get('/', (req, res) => {
        res.send('server is running')
    });
});


