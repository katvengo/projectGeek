var db = require("../models");
var passport = require("../config/passport");


module.exports = function (app) {
    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            profile: req.body.profile
        }).then(function () {
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });

    app.post("/api/login", function (req, res) {
        let userEmail = req.body.email;
        let userPassword = req.body.password;
        console.log(userEmail);
        console.log(userPassword);
        if (userEmail && userPassword) {
            db.User.findOne({
                where: {
                    email: userEmail
                }
            }).then(function (dbUser) {
                console.log('After find one ' + dbUser);
                if (dbUser.validPassword(userPassword)) {
                    res.json(dbUser);
                } else {
                    res.send('Invalid username or password');
                }
            }).catch(function (err) {
                console.log('On find one error ' + err);
                res.send('Not correct username or password');
            })
        } else {
            res.send('Please enter username and password');
        }
    });


}