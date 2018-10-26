var express = require('express')
var app = express()

var server = app.listen(9000, function(){
    console.log("Server Started!")
});

app.get("/", function(req, res){
    res.send("Hello World!");
});