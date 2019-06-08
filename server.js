var express = require('express')

var db = require('./models');

var PORT = process.env.PORT || 8080

var app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

require('./controller/html-routes.js')(app);
// require('./controller/api-routes.js')(app);



db.sequelize.sync().then(function() {
app.listen(PORT, function () {
console.log(`'Server listening at http://localhost' ${PORT}`)
})
});



