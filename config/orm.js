var connection = require('./connection.js')

exports.displayHTML = function (res){
  connection.sqlData.query('SELECT * FROM burgers', function (error, results, fields) {

    var uneaten = [];
    var eaten = []

    for (var i = 0; i < results.length; i++){
      if (results[i].devoured == 0){
        uneaten.push(results[i])
      } else {
        eaten.push(results[i])
      }
    }

    res.render("index", {myKey1:uneaten, myKey2:eaten});

  });
}


exports.add2sql = function (userInput){
	connection.sqlData.query('INSERT INTO burgers (burger_name, devoured, date) VALUES (?, 0, NOW())', userInput , function (error, results, fields) {
  });
}


exports.update2sql = function (userInput){
  connection.sqlData.query('UPDATE burgers SET devoured=1 WHERE id=?', userInput, function(error, results){
    console.log("somehow refresh the page to display the updates")
  })
}