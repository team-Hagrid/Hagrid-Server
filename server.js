var express = require('express')
var mysql = require('mysql')

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

app.get("/", function(req, res){
    res.send("Hello World!");
});

app.get("/battery", function(req, res){
    res.send("Battery Checked");
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