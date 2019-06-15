var path = require('path');
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// import Sequelize from 'sequelize';
// import hierarchy from 'sequelize-hierarchy';


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index')
    });

    app.get('/signup', function (req, res) {
        res.render('signup')
    });

    app.get('/logout', function (req, res) {
        res.render('logout')
    });

    app.get('/css', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/css/main.css'));
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("members");
        } else {
            res.render('login');
        }
    });

    app.get("/members", isAuthenticated, function (req, res) {
        db.User.findAll().then(function (users) {
            console.log('users', users)

    app.get('/forgot', function (req, res) {
        res.render("password-forget");
    });

    app.get('/reset/:token', function (req, res) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
            if (!user) {
                alert('Password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            res.render('password-reset', {
                user: req.user
            });
        });
    });
            res.render('members', {
                users
            })
        })
    })
    app.get("/members/:username", isAuthenticated, function (req, res) {
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function (user) {
            return res.render('profile', {user})
        })
    })

    app.get('/interests', function (req, res) {
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
}


