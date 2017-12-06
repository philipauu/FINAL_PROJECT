var express = require('express');
var backend_app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./app/routes/main_routes');
var port = 4000;

backend_app.set('view engine', 'ejs');
backend_app.use(express.static('public'));
backend_app.use(bodyParser.urlencoded({extended: true}));
backend_app.use(bodyParser.json());
backend_app.use(passport.initialize());
backend_app.use(passport.session());
backend_app.use(routes);

backend_app.listen(port, listening);
function listening() {
    console.log('broadcasting on localhost:' + port);
}