$(document).ready(function () {
    // Getting references to our form and input
    var nameInput = $("input#name-input");
    var userNameInput = $("input#username-input");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var ageInput = $("input#age-input");
    var profileInput = $("input#profile-input");

    function validateUserData() {
        var name = document.getElementById("name-input").value
        var username = document.getElementById("username-input").value
        var email = document.getElementById("email-input").value
        var password = document.getElementById("password-input").value
        var age = document.getElementById("age-input").value

        let emptyFields = {
            name,
            username,
            email,
            password,
            age
        }
        if (emptyFields === "") {
            alert("Please fill out all fields")
        }
    }

    function signUpUser(name, username, email, password, age, profile) {
        $.post("/api/signup", {
                name: name,
                username: username,
                email: email,
                password: password,
                age: age,
                profile: profile
            })
            .then(function () {
                window.location.replace(data);
                if (error) {
                    res.send(error)
                }
                // If there's an error, handle it by throwing up a bootstrap alert
            }).catch(handleLoginErr)
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }


    function doesUserExist() {
        $.get('api/signup/?username='+$('#username-input').val().toLowerCase(), function(response){
            $('#usernameResponseHidden').text(response.message)
            if ($('#usernameResponseHidden').html() === "user exists"){
                $('#usernameResponse').text('That username is taken. Please pick another')
            }
            })
}
// When the signup button is clicked, we validate the email and password are not blank
$('#submit').on("click", function (event) {
    event.preventDefault();
    var userData = {
        name: nameInput.val().trim(),
        userName: userNameInput.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        age: ageInput.val().trim(),
        profile: profileInput.val().trim()
    };
    console.log(userData)
    if (!userData.email || !userData.password) {
        alert("Please fill in all the required forms")
        return
    }
    validateUserData()
    doesUserExist()

    if(!doesUserExist()){
        signUpUser(userData.name, userData.userName, userData.email, userData.password, userData.age, userData.profile);
        nameInput.val("");
        userNameInput.val("");
        emailInput.val("");
        passwordInput.val("");
        ageInput.val("");
        profileInput.val("");
    }

    // console.log(`Name ${userData.name} username ${userData.userName} email ${userData.email}`)


});


// function doesUserExist(dbUser) {
//     $.get('api/signup', {dbUser})
//         .done(function(response){
//             alert("Success");
//             console.log(response)
//         })

// }
// if (data.email === userData.email) {
//     alert("user already exists")
// } else {
//     addUser()
// }

// .then(function (dbUser) {
//         if(dbUser.email === userData.email){
//             alert("user already exists")
//         }
//         console.log('hitting then' + dbUser)
//         // return done(err, data)
//         // res.json(dbUser)
//     });
//     // console.log("We are here now" + userData)
// if (user === userData.username) {
//     alert("user already exists")
// } else {
//     console.log("does userexist didnt work")
// }
// });
// return $.post('/signup', function (req, res) {
//     // db.User.findOne({
//     //     where: {
//     //         email: req.params.email
//     //     }
//     // }).then(function () {
//     //     console.log('hitting then')
//     //     // return done(err, data)
//     //     // res.json(dbUser)
//     // });
// })


// function addUser(name, username, email, password, age, profile) {
//     $.post("/api/signup", {
//             name: name,
//             username: username,
//             email: email,
//             password: password,
//             age: age,
//             profile: profile
//         })
//         .then(function () {
//             window.location.replace(data);
//             if (error) {
//                 res.send(error)
//             }
//             // If there's an error, handle it by throwing up a bootstrap alert
//         }).catch(handleLoginErr)
// }

// function signUpUser() {
//     doesUserExist()
//         .then(function () {
//             console.log("is this thing on")
//             if (!userExists) {
//                 signup(userData.name, userData.userName, userData.email, userData.password, userData.age, userData.profile)
//                 nameInput.val("");
//                 userNameInput.val("");
//                 emailInput.val("");
//                 passwordInput.val("");
//                 ageInput.val("");
//                 profileInput.val("");
//                 addUser()
//             } else if (userExists) {
//                 alert("User already exists please log-in")
//             }
//         });



// }

// function handleLoginErr(err) {
//     $("#alert .msg").text(err.responseJSON);
//     $("#alert").fadeIn(500);
// }
//If we have an email and password, run the signUpUser function
// signUpUser(userData.name, userData.userName, userData.email, userData.password, userData.age, userData.profile);
// nameInput.val("");
// userNameInput.val("");
// emailInput.val("");
// passwordInput.val("");
// ageInput.val("");
// profileInput.val("");
// signUpUser()


// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors


//do get and request whether user exists


// function signUpUser(name, username, email, password, age, profile) {
//     doesUserExist()
//         .then(function (userExists) {
//             if (!userExists) {
//                 addUser()
//             } else if(userExists){
//                 alert("User already exists please log-in")
//             }
//         });

//     $.post("/api/signup", {
//             name: name,
//             username: username,
//             email: email,
//             password: password,
//             age: age,
//             profile: profile
//         })
//         .then(function (data) {
//             window.location.replace(data);
//             // If there's an error, handle it by throwing up a bootstrap alert
//         }).catch(handleLoginErr)


// }

})