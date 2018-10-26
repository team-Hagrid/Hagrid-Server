var express = require('express')
var bodyParser = require("body-parser")
var ps = require('python-shell');
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

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.listen(9000, function() {
    console.log("start@ on port 9000");
});

app.get('/', function(req,res){
    res.sendFile(__dirname + "/public/main.html")
});

app.post("/user", function(req, res){
    console.log(req.body.id);
    console.log(req.body.passwd);
    function getInfo(callback, user_id, user_passwd){
        var options = {
            mode: 'text',
            pythonPath: '',  
            pythonOptions: [],
            scriptPath: '',
            args: [user_id, user_passwd]
        };
        ps.PythonShell.run("./get_info.py", options, function(err, results){
            // console.log(options);
            if (err) callback(err);
            callback(err, results);
        });
    };
    getInfo(function(err, data){
        if (err) res.send('{"result": False}');
        res.send(JSON.parse(data));
    }, req.body.id, req.body.passwd);
});

app.get("/goods", function(req, res){
    connection.query('SELECT * from product', function(err, rows, fields) {
        if (!err){
            console.log('The solution is: ', rows);
            res.send(rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
})

app.get("/onloan", function(req, res){
    connection.query('SELECT * from onloan', function(err, rows, fields){
        if (!err){
            console.log('The solution is: ', rows);
            res.send(rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
})

app.get('/rent', function(req,res){
    res.sendFile(__dirname + "/public/rent.html")
});

app.post("/rent", function(req, res){
    var body = req.body;//pid,mid 입력받아야 함
    connection.query('UPDATE product SET p_isb = 0 ,on_m_id = ?,on_start=NOW(),on_end = date_add(now(), interval +2 day) WHERE ? = p_id',[body.m_id, body.p_id], function(err, rows, fields) {
        if (!err){
            console.log('The solution is: ', rows);
            res.send(rows);
        }
        else
            console.log('Error while performing Query.', err);
    });

})

app.get('/return', function(req,res){
    res.sendFile(__dirname + "/public/return.html")
});

app.post("/return", function(req, res){
    var body = req.body;//pid 입력받아야 함
    connection.query('UPDATE product SET p_isb = 1 ,on_m_id = NULL ,on_start=NULL ,on_end = NULL WHERE ? = p_id', body.p_id, function(err, rows, fields) {
        if (!err){
            console.log('The solution is: ', rows);
            res.send(rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
})

console.log("end if server code...");
    