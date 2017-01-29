var express = require('express')
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
var app = express()
var orm = require('./config/orm.js')
app.listen(3000)


app.engine('handlebars', exphbs({defaultLayout: 'main'}));


app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req,res){
  orm.displayHTML(res)
})


app.post('/showBurger', function (req, res) {
  orm.add2sql(req.body.userInput)
})


app.post('/moveBurger', function (req, res) {
  orm.update2sql(req.body.userInput)
})
 

