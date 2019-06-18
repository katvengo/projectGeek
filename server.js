let express = require('express')
let path = require('path')
let session = require("express-session");

let passport = require("./config/passport")

LocalStrategy = require('passport-local').Strategy;

let flash = require('connect-flash');

let db = require('./models');

let PORT = process.env.PORT || 8080

let app = express();

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



require('./controller/html-routes.js')(app);
require('./controller/api-routes.js')(app);


db.sequelize.sync({force: false}).then(function() {
app.listen(PORT, function () {
console.log(`'Server listening at http://localhost' ${PORT}`)
})
});



