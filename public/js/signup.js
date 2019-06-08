$(document).ready(function () {
    // Getting references to our form and input
    var nameInput = $("input#name-input");
    var userNameInput = $("input#username-input");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var ageInput = $("input#age-input");
    var profileInput = $("input#profile-input");
    // var signUpForm = $("#submit");

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
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.name, userData.userName, userData.email, userData.password, userData.age, userData.profile);
        nameInput.val("");
        userNameInput.val("");
        emailInput.val("");
        passwordInput.val("");
        ageInput.val("");
        profileInput.val("");

    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(name, username, email, password, age, profile) {
        $.post("/api/signup", {
            name: name,
            username: username,
            email: email,
            password: password,
            age: age,
            profile: profile
        })
        .then(function (data) {
            window.location.replace(data);
            console.log(data)
            // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});