var db = require("../models");
var passport = require("../config/passport");


module.exports = function (app) {
    app.get("/members/:username", function (req, res) {
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function (dbUser) {
            return res.json(dbUser)
        })
    })


    app.get("/api/members", function (req, res) {
        db.User.findOne({
            username: req.query.username,
            email: req.body.email
        }, function (err, user) {
            var message;
            if (err) {
                console.log(err);
            } else if (user) {
                console.log(user)
                message = "user exists";
                console.log(message)
            } else {
                message = "success!"
                console.log(message)
                res.json({
                    message: message
                });
            }

        })
    })

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
            res.json(err)
            // res.status(409).json(err.errors[0].message);
        });
    });
    app.post("/profile", function (req, res) {
        console.log(req.body);
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function (dbUser) {
            return res.json(dbUser)
        })
    })


    app.get("/members", function (req, res) {
        db.User.findAll({})
            .then(function (dbUser) {
                return res.send(dbUser)
            })
    })

    app.get("/members/:username", function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id,
                username: req.body.username
            }
        }).then(function (dbUser) {
            return res.json(dbUser)
        })
    })

    app.get("/logout", function (req, res) {
        req.logout();
        res.render("index");
    });


    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json('/members')
    });

}