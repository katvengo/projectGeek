var db = require("../models");
var passport = require("../config/passport");
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

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


    // app.get("/api/members", function (req, res) {
    //     db.User.findOne({
    //         username: req.query.username,
    //         email: req.body.email
    //     }, function (err, user) {
    //         var message;
    //         if (err) {
    //             console.log(err);
    //         } else if (user) {
    //             console.log(user)
    //             message = "user exists";
    //             console.log(message)
    //         } else {
    //             message = "success!"
    //             console.log(message)
    //             res.json({
    //                 message: message
    //             });
    //         }

    //     })
    // })

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

    // app.post("/profile", function (req, res) {
    //     console.log(req.body);
    //     db.User.findOne({
    //         where: {
    //             username: req.params.username
    //         }
    //     }).then(function (dbUser) {
    //         return res.json(dbUser)
    //     })
    // })


    app.get("/api/members", function (req, res) {
        db.User.findAll().then(function (dbUsers) {
            return res.json(dbUsers)
        })
    })

    app.get("/members/:username", function (req, res) {
        var username = req.params.username

        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function (user) {
            return res.json(user)
        })
    })

    app.get("/logout", function (req, res) {
        req.logout();
        res.render("index");
    });


    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json('/members')
    });

    // ------------------------------
    // Post route for forget password 
    // ------------------------------

    app.post('/forgot', function (req, res, next) {
        // Here we are using async module to avoid nesting callbacks within callbacks within callbacks.
        async.waterfall([
            // Generates a unique token for password reset
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                db.User.findOne({ email: req.body.email }, function (err, user) {
                    if (!user) {
                        alert('No account with that email address exists.');
                        return res.redirect('/forgot');
                    }
                    // If email exists in db, we assign the token to the user
                    user.resetPasswordToken = token;
                    // Password reset link expires in an hour
                    user.resetPasswordExpires = Date.now() + 3600000;

                    user.save(function (err) {
                        done(err, token, user);
                    });
                });
            },
            function (token, user, done) {
                const smtpTransport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'mikenodemailer@gmail.com',
                        pass: 'n0dep@ssword18'
                    }
                });
                let mailOptions = {
                    to: user.email,
                    from: 'mikenodemailer@gmail.com',
                    subject: 'Congregeek Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    alert('An e-mail has been sent to ' + user.email + ' with further instructions.');
                    done(err, 'done');
                });
            }
        ], function (err) {
            if (err) return next(err);
            res.redirect('/forgot');
        });
    });

    app.post('/reset/:token', function (req, res) {
        async.waterfall([
            function (done) {
                User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                    if (!user) {
                        alert('Password reset token is invalid or has expired.');
                        return res.redirect('back');
                    }

                    user.password = req.body.password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function (err) {
                        req.logIn(user, function (err) {
                            done(err, user);
                        });
                    });
                });
            },
            function (user, done) {
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'gmail',
                    auth: {
                        user: 'mikenodemailer@gmail.com',
                        pass: 'n0dep@ssword18'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'mikenodemailer@gmail.com',
                    subject: 'Your Congregeek password has been changed',
                    text: 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    alert('Success! Your password has been changed.');
                    done(err);
                });
            }
        ], function (err) {
            res.redirect('/');
        });
    });


    app.delete("/", function (req, res) {
        db.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function () {
                console.log("username has been succesfully deleted")
                res.redirect('/')
            });
    })
}