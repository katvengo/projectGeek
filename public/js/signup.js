$(document).ready(function () {
    // Getting references to our form and input
    var nameInput = $("input#name-input");
    var userNameInput = $("input#username-input");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var ageInput = $("input#age-input");
    var profileInput = $("input#profile-input");
    var heroInput = $("input#hero-input");
    var movieInput = $("input#movie-input");
    var worldInput = $("input#world-input");

    function validateUserData() {
        var name = document.getElementById("name-input").value
        var username = document.getElementById("username-input").value
        var email = document.getElementById("email-input").value
        var password = document.getElementById("password-input").value
        var age = document.getElementById("age-input").value
        var favehero = document.getElementById("hero-input").value
        var favemovie = document.getElementById("movie-input").value
        var faveworld = document.getElementById("world-input").value

        let emptyFields = {
            name,
            username,
            email,
            password,
            age,
            favehero,
            favemovie,
            faveworld
        }
        if (emptyFields === "") {
            alert("Please fill out all fields")
        }
    }

    function signUpUser(name, username, email, password, age, profile, favehero, favemovie, faveworld) {
        $.post("/api/signup", {
                name: name,
                username: username,
                email: email,
                password: password,
                age: age,
                profile: profile,
                favehero: favehero,
                favemovie: favemovie,
                faveworld: faveworld
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
            profile: profileInput.val().trim(),
            favehero: heroInput.val().trim(),
            favemovie: movieInput.val().trim(),
            faveworld: worldInput.val().trim()
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
                    // signUpUser()
                    signUser()

                }
            })
        }

        doesUserExist()
        signUpUser(userData.name, userData.userName, userData.email, userData.password, userData.age, userData.profile, userData.favehero, userData.favemovie, userData.faveworld);
        nameInput.val("");
        userNameInput.val("");
        emailInput.val("");
        passwordInput.val("");
        ageInput.val("");
        profileInput.val("");
        heroInput.val("");
        movieInput.val("");
        worldInput.val("");

        console.log(userData)
        alert('Success!')
        return res.redirect('profile')
    });


})