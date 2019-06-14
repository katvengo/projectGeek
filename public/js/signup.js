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
        if (!userData.email || !userData.password) {
            alert("Please fill in all the required forms")
            return
        }
        validateUserData()

        function doesUserExist() {
            $.get('/members/' + $('#username-input').val().toLowerCase(), function (response) {
                console.log(response)
            }).then(function (response) {
                if (response.username === userData.username || response.email === userData.email) {
                    alert('User already exists in system please log in')
                    
                } else {
                    signUpUser()
                }
            })
        }
        doesUserExist()

        signUpUser(userData.name, userData.userName, userData.email, userData.password, userData.age, userData.profile);
        nameInput.val("");
        userNameInput.val("");
        emailInput.val("");
        passwordInput.val("");
        ageInput.val("");
        profileInput.val("");

        alert('Success!')


    });


})