var db = require("../models");
var passport = require("../config/passport");
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app) {
    // app.put("/api/signup", function (req, res) {
    //     console.log(req.body)
    //     var user = req.body.username
    //     var fandom = req.body.faveFandoms
    //     console.log("User Info" + " " + user)
    //     console.log("Favorite fandoms" + " " + fandom)
    //     db.User.update({
    //         fandom: fandom
    //     }, {
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function (data) {
    //         res.json(data)
    //     }).catch(function (err) {
    //         console.log(err)
    //         res.json(err)
    //     })
    // })
    // loop over each array, db.User.interests:creating inside of a loop for fandom and interests 

    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            profile: req.body.profile,
            fandom: req.body.fandom,
            interests: req.body.interests,
            favehero: req.body.favehero,
            favemovie: req.body.favemovie,
            faveworld: req.body.faveworld,
            favetv: req.body.favetv,
            superpower: req.body.superpower
        }).then(function () {
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            console.log(err);
            res.json(err)
            // res.status(409).json(err.errors[0].message);
        });
    });

    app.get("/api/members", function (req, res) {
        db.User.findAll().then(function (dbUsers) {
            return res.json(dbUsers)
        })
    })

    app.get("/api/members/:username", function (req, res, next) {
        // var user = req.user
        db.User.findOne({
            where: {
                username: req.user.username
            }
        }).then(function (users) {
            return res.json(users)
        }).catch(next)
    })

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json('/members');
    });

    // ------------------------------
    // Post route for forget password 
    // ------------------------------

    app.post('/api/forgot', function (req, res, next) {
        // Here we are using async module to avoid nesting callbacks within callbacks within callbacks.
        async.waterfall([
            // Generates a unique token for password reset
            function (done) {
                console.log('generating hash');

                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                console.log('getting user from db');
                db.User.update({
                    // If email exists in db, we assign the token to the user
                    resetPasswordToken: token,
                    // Password reset link expires in an hour
                    resetPasswordExpires: Date.now() + 3600000
                }, {
                    where: {
                        email: req.body.email
                    }
                }).then(function (rowsChanged) {
                    // if no rows were changed, return an error, redirect
                    if (!rowsChanged[0]) {
                        // create an error and return to done
                        const err = new Error('unable to locate user in db')
                        done(err)
                        // alert('No account with that email address exists.');
                        return res.redirect('/forgot');
                    }

                    console.log('update user')
                    done(null, token, {
                        email: req.body.email
                    })
                });
            },
            function (token, user, done) {
                console.log('sending email');

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
                    done(err, 'done');
                });
            }
        ], function (err) {
            console.error('error object', err)
            if (err) return next(err);
            res.redirect('/forgot');
        });
    });

    app.post('/api/reset', function (req, res) {
        async.waterfall([
            function (done) {
                // db.User.findOne({
                //     // const Op = Sequelize.Op;
                //     where: {
                //         resetPasswordToken: req.params.token, 
                //         // resetPasswordExpires: { [Op.gte]: Date.now() }
                //     }
                // }).then(function (user) {
                //             console.log('found user')
                //             if (!user) {
                //                 console.log('Password reset token is invalid or has expired.');
                //                 return res.redirect('back');
                //             }
                console.log('getting user from db')
                console.log(req.body)
                
                let encryptedPassword = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10), null);
                console.log(encryptedPassword);

                db.User.update({

                        password: encryptedPassword,
                        resetPasswordToken: undefined,
                        resetPasswordExpires: undefined

                    }, {
                        where: {
                            resetPasswordToken: req.body.token
                        }
                    })
                    .then(function (rowsChanged) {
                        // if no rows were changed, return an error, redirect
                        if (!rowsChanged[0]) {
                            // create an error and return to done
                            const err = new Error('unable to update user in db, contact website admin')
                            done(err)
                            return res.redirect('/forgot');
                        }
                        console.log('updated user')
                        done(null, req.body.email)
                    });
                // })
            },
            function (email, done) {
                var smtpTransport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'mikenodemailer@gmail.com',
                        pass: 'n0dep@ssword18'
                    }
                });
                var mailOptions = {
                    to: email,
                    from: 'mikenodemailer@gmail.com',
                    subject: 'Your Congregeek password has been changed',
                    text: 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    done(err) 
                });
            }
        ], function (err) {
            console.error('error object', err)
            if (err) return next(err);
            res.redirect('/index');
        });
    });


    // app.delete("/", function (req, res) {
    //     db.User.destroy({
    //             where: {
    //                 id: req.params.id
    //             }
    //         })
    //         .then(function () {
    //             console.log("username has been succesfully deleted")
    //             res.redirect('/')
    //         });
    // })

    // db.User.update("/", {
    //     where:{
    //         id: req.params.id
    //     }
    // })
    // .then(function(db){
    // console.log(db);});
}