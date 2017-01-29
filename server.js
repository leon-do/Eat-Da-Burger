var express = require('express')
var exphbs  = require('express-handlebars');

var app = express()
app.listen(3000)

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
  connection.query('SELECT * FROM burgers', function (error, results, fields) {
    
    var devouredZero = [];
    var devouredOne = [];

    for (var i = 0; i < results.length; i++){
      if (results[i].devoured == 0){
        devouredZero.push(results[i].burger_name)
      } else {
        devouredOne.push(results[i].burger_name)
      }
    }

    res.render("index", {unEaten:devouredZero, eaten:devouredOne});

  });
})

app.post('/showBurger', function (req, res) {
  add2sql(req.body.userInput)
})

app.post('/moveBurger', function (req, res) {
  update2sql(req.body.userInput)
})
 

function add2sql(userInput){
	connection.query('INSERT INTO burgers (burger_name, devoured, date) VALUES (?, 0, NOW())', userInput , function (error, results, fields) {});
}


function update2sql(userInput){
  connection.query('UPDATE burgers SET devoured=1 WHERE id=?', userInput, function(error, results){})
}

