const Pool = require('pg').Pool
const pool = new Pool({
  user: 'keyin',
  host: 'localhost',
  database: 'Zoo',
  password: '5341',
  port: 5432,
});
module.exports = pool;