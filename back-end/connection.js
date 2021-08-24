const mysql = require('mysql');

// for mySQL server
let connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'fash',
    password: 'Shfa98* ',
    database: 'PWC1'
})


module.exports={connection};