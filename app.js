var express = require('express')
var bodyParser = require("body-parser")
var ps = require('python-shell');
var app = express()

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
        res.send(data);
    }, req.body.id, req.body.passwd);
});

console.log("end if server code...");
    