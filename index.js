'use strict';

// Index file is the entry point for the server
const dotenv = require('dotenv').config()
const express = require('express') // Module
const bodyParser = require('body-parser') // Middleware
const app = express() // Variable
const port = 3001 // Variable
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// Tell a route to look for a GET request on the root (/) URL, and then return some JSON
// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })

// HTTP routes
// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.get('/', (req, res) => {
  db.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/users/:id', (req, res) => {
  db.getUserById(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/users', (req, res) => {
  db.createUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// app.delete('/users/:id', db.deleteUser)


app.delete('/users/:id', (req, res) => {
  db.deleteUser(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Set the app to listen on the set port
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

