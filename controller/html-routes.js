var path = require('path');

var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {

app.get('/', function(req, res) {
    if (req.user) {
        res.redirect("/members");
      }
  
res.sendFile(path.join(__dirname, '../public/index.html'));
 });
 
app.get('/signup', function(req, res) {

res.sendFile(path.join(__dirname, '../public/signup.html'));
 });
 

 app.get('/css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/css/main.css'));
});

app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });


};