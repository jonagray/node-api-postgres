'use strict';

// Index file is the entry point for the server
const dotenv = require('dotenv')
dotenv.config()
const express = require('express') // Module
const bodyParser = require('body-parser') // Middleware
const app = express() // Variable
const port = 3000 // Variable
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Tell a route to look for a GET request on the root (/) URL, and then return some JSON
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// HTTP routes
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// Set the app to listen on the set port
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

