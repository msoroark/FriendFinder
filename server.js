var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


//set up code for express
var app = express();
var PORT = process.env.PORT || 8080;
 

//Set up code for body-parser
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require('./app/routing/apiRoutes.js')(app);

require('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function(){
	console.log("App listening on PORT: " + PORT);
});