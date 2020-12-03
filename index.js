const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const bodyParser = require('body-parser')
const port = 3000;
const url = 'mongodb://localhost:27017/Alien';

// app.use(bodyParser.json());
app.use(express.json());

mongoose.set('useCreateIndex', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const con = mongoose.connection;

con.on('open', () => {
  console.log('Connected with DB');
});

//	i18n 

/* Code to create database in Mongo server */
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/Alien";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

const alienRouter = require('./routes/alien');
app.use('/alien', alienRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));