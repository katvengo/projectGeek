$(document).ready(function () {
    // Getting references to our form and input
    $("#submit").on("click", function (event) {
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

        // var checkbox = [
        //     harryPotterChecked,
        //     marvelChecked,
        //     dcChecked, 
        //     doctorWhoChecked, 
        //     gameOfThronesChecked, 
        //     supernaturalChecked,
        //     disneyChecked, 
        //     starWChecked, 
        //     animeChecked, 

        // ]
        // var values = [
        //     harryPotter = $("#harryP").attr("value"),
        //     marvel = $("#marvel").attr("value"),
        //     dc = $("#dc").attr("value"),
        //     doctorWho = $("#doctorWho").attr("value"),
        //     gameOfThrones = $("#gOt").attr("value"),
        //     supernatural = $("#supernatural").attr("value"),
        //     disney = $("#disney").attr("value"),
        //     starW = $("#starW").attr("value"),
        //     anime = $("#anime").attr("value"),
        // ]
        
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
       
        // for (let i = 0; i < checkbox.length; i++) {
        //     if(checkbox[i]){
        //         fandom.push()
        //     }
            
        // }

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
        if (anime) {
            fandom.push(anime)
        }
    
        var faveFandoms = fandom.toString()
        console.log(faveFandoms)
    
        $.ajax({
            type: "PUT",
            data: {faveFandoms},
            url: "/api/interests",
            
        }).done(function (res) {
            console.log(res)
        })
    })



    // var nameInput = $("input#name-input");
    // var userNameInput = $("input#username-input");
    // var emailInput = $("input#email-input");
    // var passwordInput = $("input#password-input");
    // var ageInput = $("input#age-input");
    // var profileInput = $("input#profile-input");

    // function validateUserData() {
    //     var name = document.getElementById("name-input").value
    //     var username = document.getElementById("username-input").value
    //     var email = document.getElementById("email-input").value
    //     var password = document.getElementById("password-input").value
    //     var age = document.getElementById("age-input").value

    //     let emptyFields = {
    //         name,
    //         username,
    //         email,
    //         password,
    //         age
    //     }
    //     if (emptyFields === "") {
    //         alert("Please fill out all fields")
    //     }
    // }

    // function signUpUser(name, username, email, password, age, profile) {
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

    // function handleLoginErr(err) {
    //     $("#alert .msg").text(err.responseJSON);
    //     $("#alert").fadeIn(500);
    // }

    // // When the signup button is clicked, we validate the email and password are not blank
    // $('#submit').on("click", function (event) {
    //     event.preventDefault();
    //     var userData = {
    //         name: nameInput.val().trim(),
    //         userName: userNameInput.val().trim(),
    //         email: emailInput.val().trim(),
    //         password: passwordInput.val().trim(),
    //         age: ageInput.val().trim(),
    //         profile: profileInput.val().trim()
    //     };
    //     if (!userData.email || !userData.password) {
    //         alert("Please fill in all the required forms")
    //         return
    //     }
    //     validateUserData()

    //     function doesUserExist() {
    //         $.get('/members/' + $('#username-input').val().toLowerCase(), function (response) {
    //             console.log(response)
    //         }).then(function (response) {
    //             if (response.username === userData.username || response.email === userData.email) {
    //                 alert('User already exists in system please log in')

    //             } else {
    //                 // signUpUser()
    //                 signUser()

    //             }
    //         })
    //     }

    //     doesUserExist()
    //     signUpUser(userData.name, userData.userName, userData.email, userData.password, userData.age, userData.profile);
    //     nameInput.val("");
    //     userNameInput.val("");
    //     emailInput.val("");
    //     passwordInput.val("");
    //     ageInput.val("");
    //     profileInput.val("");

    //     console.log(userData)
    //     alert('Success!')
    //     return res.redirect('profile')
});


// })