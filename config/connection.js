var mysql      = require('mysql');


exports.sqlData = 

mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'burgers_db'
});
