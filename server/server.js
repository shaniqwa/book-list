var express = require('express'),
	app = express();
	app.use('/', express.static('./public')).listen(8080);
	console.log("server is listening to port 8080");

var data = require('./data.json');

	//task1
    app.get('/getAllBooks', function (req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        app.set('json spaces', 4);
        res.set("Content-Type", "application/json");
        res.status(200);
        res.json(data);
           
    });
