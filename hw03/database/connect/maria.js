const maria = require('mysql');

const conn = maria.createConnection({
  host:"localhost",
  port:3306,
  user:'root',
  password:'advwebdb',
  database:"HW03"
})

module.exports = conn;