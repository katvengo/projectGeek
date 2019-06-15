var path = require('path');

var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index')
        // res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/signup', function (req, res) {
        res.render('signup')
        // res.sendFile(path.join(__dirname, '../public/signup.html'));
    });

    app.get('/logout', function (req, res) {
        res.render('logout')
        // res.sendFile(path.join(__dirname, '../public/logout.html'));
    });


    app.get('/css', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/css/main.css'));
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        } else {
            return res.render('login')
        }
    });

    app.get("/members", isAuthenticated, function (req, res, dbUser) {
        res.render('members', { user: dbUser})
    });

    app.get("/profile", function (req, res) {
        res.render('profile', {
            username: dbUser.username
        })
        // res.sendFile(path.join(__dirname, "../public/profile.html"));
    })
    app.get('/interests', function (req, res){
        res.render('interests')
    })
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

};