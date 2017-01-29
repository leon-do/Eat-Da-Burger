var express = require('express')
var exphbs  = require('express-handlebars');

var app = express()
var bodyParser = require('body-parser')
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'burgers_db'
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req,res){
  connection.query('SELECT burger_name FROM burgers', function (error, results, fields) {
    res.render("index", {myKey:results});
  });
})

app.post('/showBurger', function (req, res) {
  add2sql(req.body.userInput)
})
 

function add2sql(userInput){
	connection.query('INSERT INTO burgers (burger_name, devoured, date) VALUES (?, 0, NOW())', userInput , function (error, results, fields) {});
}
app.listen(3000)