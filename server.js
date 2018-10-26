var express = require('express')
var mysql = require('mysql')
var ps = require('python-shell');

var app = express()

var connection = mysql.createConnection({
    host     : '35.221.74.145',
    user     : 'root',
    password : 'qwe123',
    port     : 3306,
    database : 'durithon'
});

connection.connect();

var server = app.listen(9000, function(){
    console.log("Server Started!")
});

function getInfo(callback, user_id, user_passwd){
    var options = {
        mode: 'text',
        pythonPath: '',  
        pythonOptions: [],
        scriptPath: '',
        args: [user_id, user_passwd]
    };
    ps.PythonShell.run("./get_info.py", options, function(err, results){
        if (err) callback(err);
        callback(err, results);
    });
};

app.get("/", function(req, res){
    res.send("Hello World!");
});

app.post("/user", function(req, res){
    getInfo(function(err, data){
        if (err) res.send("{'result': False");
        res.json(data);
    }, req.user, req.passwd);
});

app.get("/battery", function(req, res){  
    connection.query('SELECT * from product', function(err, rows, fields) {
        if (!err){
          console.log('The solution is: ', rows);
          res.send(rows);
        }
        else
          console.log('Error while performing Query.', err);
      });
    // res.send("Battery Checked");
});

app.get("/glue", function(req, res){
    res.send("Glue Checked");
});

app.get("/charger", function(req, res){
    res.send("Charger Checked");
});

app.get("/tape", function(req, res){
    res.send("Tape Checked");
});

app.get("/punch", function(req, res){
    res.send("Punch Checked");
});

app.get("/scissors", function(req, res){
    res.send("Scissors Checked");
});