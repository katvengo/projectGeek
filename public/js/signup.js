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

function signUpUser(name, username, email, password, age, profile, favehero, favemovie, faveworld, interests, fandom) {
    $.post("/api/signup", {
            name: name,
            username: username,
            email: email,
            password: password,
            age: age,
            profile: profile,
            favehero: favehero,
            favemovie: favemovie,
            faveworld: faveworld,
            interests: interests,
            fandom: fandom
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



$(document).ready(function () {
    $('.geekModal').hide()

    $('#nextSubmit').on('click', function () {
        $('.geekModal').show()
    })
    
    $('#submit').on("click", function () {
    $('.geekModal').hide()
    createUser()
    window.location.href = "members";

    })
})

function createUser() {
    event.preventDefault()
    var harryPotterChecked = $("#harryP").prop("checked");
    var marvelChecked = $("#marvel").prop("checked");
    var dcChecked = $("#dc").prop("checked");
    var doctorWhoChecked = $("#doctorWho").prop("checked");
    var gameOfThronesChecked = $("#gOt").prop("checked");
    var supernaturalChecked = $("#supernatural").prop("checked");
    var disneyChecked = $("#disney").prop("checked");
    var starWChecked = $("#starW").prop("checked");
    var animeChecked = $("#anime").prop("checked");


    var comicBooksChecked = $("#comicBooks").prop("checked");
    var intMoviesChecked = $("#intMovies").prop("checked");
    var musicChecked = $("#music").prop("checked");
    var artChecked = $("#art").prop("checked");
    var videoGamesChecked = $("#videogames").prop("checked");

    var harryPotter = $("#harryP").attr("value");
    var marvel = $("#marvel").attr("value");
    var dc = $("#dc").attr("value");
    var doctorWho = $("#doctorWho").attr("value");
    var gameOfThrones = $("#gOt").attr("value");
    var supernatural = $("#supernatural").attr("value");
    var disney = $("#disney").attr("value");
    var starW = $("#starW").attr("value");
    var anime = $("#anime").attr("value");

    var fandom = []

    var comicBooksValue = $("#comicBooks").prop("value");
    var intMoviesValue = $("#intMovies").prop("value");
    var musicValue = $("#music").prop("value");
    var artValue = $("#art").prop("value");
    var videoGamesValue = $("#videogames").prop("value");

    var interests = []

    if (comicBooksChecked) {
        interests.push(comicBooksValue)
    }
    if (intMoviesChecked) {
        interests.push(intMoviesValue)
    }
    if (musicChecked) {
        interests.push(musicValue)
    }
    if (artChecked) {
        interests.push(artValue)
    }
    if (videoGamesChecked) {
        interests.push(videoGamesValue)
    }

    if (harryPotterChecked) {
        fandom.push(harryPotter)
    }
    if (marvelChecked) {
        fandom.push(marvel)
    }
    if (dcChecked) {
        fandom.push(dc)
    }
    if (doctorWhoChecked) {
        fandom.push(doctorWho)
    }
    if (gameOfThronesChecked) {
        fandom.push(gameOfThrones)
    }
    if (supernaturalChecked) {
        fandom.push(supernatural)
    }
    if (disneyChecked) {
        fandom.push(disney)
    }
    if (starWChecked) {
        fandom.push(starW)
    }
    if (animeChecked) {
        fandom.push(anime)
    }
    faveInterests = interests.toString()
    faveFandoms = fandom.toString()

    console.log(faveInterests)
    console.log(faveFandoms)
    

    var nameInput = $("input#name-input");
    var userNameInput = $("input#username-input");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var ageInput = $("input#age-input");
    var profileInput = $("input#profile-input");
    var heroInput = $("input#hero-input");
    var movieInput = $("input#movie-input");
    var worldInput = $("input#world-input");



    var userData = {
        name: nameInput.val().trim(),
        userName: userNameInput.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        age: ageInput.val().trim(),
        profile: profileInput.val().trim(),
        favehero: heroInput.val().trim(),
        favemovie: movieInput.val().trim(),
        faveworld: worldInput.val().trim(),
        fandom: faveFandoms,
        interests: faveInterests
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
    signUpUser(userData.name, userData.userName, userData.email, userData.password, userData.age, userData.profile, userData.favehero, userData.favemovie, userData.faveworld, userData.fandom, userData.interests);
    nameInput.val("");
    userNameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    ageInput.val("");
    profileInput.val("");
    heroInput.val("");
    movieInput.val("");
    worldInput.val("");
    faveFandoms;
    faveInterests;

    console.log(userData)
}