// var faveFandoms;
// var faveInterests;

function validateUserData() {
    var name = $("#name-input").value
    var username = $("#username-input").value
    var email = $("#email-input").value
    var password = $("#password-input").value
    var age = $("#age-input").value
    var favehero = $("#hero-input").value
    var favemovie = $("#movie-input").value
    var faveworld = $("#world-input").value

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

function signUpUser(name, username, email, password, age, profile, interests, fandom, favehero, favemovie, faveworld, favetv, superpower) {
    $.post("/api/signup", {
            name: name,
            username: username,
            email: email,
            password: password,
            age: age,
            profile: profile,
            interests: interests,
            fandom: fandom,
            favehero: favehero,
            favemovie: favemovie,
            faveworld: faveworld,
            favetv: favetv,
            superpower: superpower

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

function createUser() {
    var nameInput = $("#name-input");
    var userNameInput = $("#username-input");
    var emailInput = $("#email-input");
    var passwordInput = $("#password-input");
    var ageInput = $("#age-input");
    var profileInput = $("#profile-input");
    var heroInput = $("#hero-input");
    var movieInput = $("#movie-input");
    var worldInput = $("#world-input");
    var interestInput = $("#interest-input")
    var fandomInput = $('#fandom-input')
    var tvInput = $('#tv-input')
    var superInput = $('#superpower-input')


    var userData = {
        name: nameInput.val().trim(),
        userName: userNameInput.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        age: ageInput.val().trim(),
        profile: profileInput.val().trim(),
        fandom: fandomInput.val().trim(),
        interests: interestInput.val().trim(),
        favehero: heroInput.val().trim(),
        favemovie: movieInput.val().trim(),
        faveworld: worldInput.val().trim(),
        favetv: tvInput.val().trim(),
        superpower: superInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
        alert("Please fill in all the required forms")
        return
    }

    validateUserData()

    function doesUserExist() {
        $.get('/members/' + $('#username-input').val().toLowerCase(), function (response) {

            console.log("HTML" + response)
        }).then(function (response) {
            if (response.username === userData.username || response.email === userData.email) {
                alert('User already exists in system please log in')
            }
        })
    }

    doesUserExist()
    signUpUser(userData.name, userData.userName, userData.email, userData.password, userData.age, userData.profile, userData.fandom, userData.interests, userData.favehero, userData.favemovie, userData.faveworld, userData.favetv, userData.superpower);
    nameInput.val("");
    userNameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    ageInput.val("");
    profileInput.val("");
    fandomInput.val("")
    interestInput.val("")
    heroInput.val("");
    movieInput.val("");
    worldInput.val("");
    tvInput.val("");
    superInput.val("");

    console.log(userData)
    alert('User created successfully! Please log in')
}

$(document).ready(function () {
    $('.geekModal').hide()

    $('#nextSubmit').on('click', function () {
        $('.geekModal').show()
    })

    $('#submit').on("click", function (event) {
        event.preventDefault()
        createUser()
        $('.geekModal').hide()
        var url = "members";    
        $(location).attr('href',url);
    })
})