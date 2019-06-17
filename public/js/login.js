$(document).ready(function () {

    var emailInput = $("#email-input");
    var passwordInput = $("#password-input");

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
        logInUser(userData.email, userData.password);
        passwordInput.val("");

    });

    function logInUser(email, password) {
        console.log('Before post');
        $.post("/api/login", {
            email: email,
            password: password
        })
        .then(function (data) {
            window.location.replace(data);
            console.log('After post ' + data);
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});