'use strict';

// Set up configuration of PostgreSQL connection

// In production, these configuration details should go into a separate file with restrictive permissions not accessible from version control
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})

// Create route endpoints

// GET all users
// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

// GET a single user by id

const getUserById = (id) => {
  return new Promise(function(resolve, reject) {
  pool.query(`SELECT * FROM users WHERE id = $1`, [id], (error, results) => {
    if (error) {
      reject(error)
    }
    resolve(`Here is the user: ${JSON.stringify(results.rows[0])}`)
  })
 })
}

// POST a new user
const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new user has been added added: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

// // PUT updated data into an existing user
// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id)
//   const { name, email } = request.body
//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User modified with ID: ${id}`)
//     }
//   )
// }


const deleteUser = (id) => {
    return new Promise(function(resolve, reject) {
    pool.query(`DELETE FROM users WHERE id = $1`, [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`User deleted with ID: ${id}`)
    })
   })
}


// Export functions so they can be used in the index.js file

module.exports = {
  getUsers,
  getUserById,
  createUser,
  // updateUser,
  deleteUser,
}