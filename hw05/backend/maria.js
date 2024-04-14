import { createConnection } from 'mysql';

const conn = createConnection({
  host:"localhost",
  port:3306,
  user:'root',
  password:'advwebdb',
  database:"HW05"
})

export default conn;