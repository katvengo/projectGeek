$(document).ready(function () {

    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    // When the signup button is clicked, we validate the email and password are not blank
    $('#submit').on("click", function (event) {
        event.preventDefault();
        console.log('On click event');
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        logInUser(userData.email, userData.password);
        passwordInput.val("");

    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function logInUser(email, password) {
        console.log('Before post');
        $.post("/api/login", {
            email: email,
            password: password
        })
        .then(function (data) {
            // window.location.replace(data);
            console.log('After post ' + data);
            // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});