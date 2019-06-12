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
         alert("Please fill in all the required forms")  
             return false;
        } 

    
        //Validate Age
        var x, text;
        //Validate name
        var a, alertName
        // Get the value of the input field with id="numb"
        x = document.getElementById("age-input").value;

        console.log('This is x ------->', x);

        // If x is Not a Number or less than one or greater than 10
        if (isNaN(x) || x < 12) {
            text = "Members must be 13 years of age or older";
            alert(text)
        }

        var a = document.getElementById("name-input").value; 
        if (a === "") {
            alert = "Name must be filled out";
            alert(alertName)
        }

        var b = document.getElementById("username-input").value; 
        if (b === "") {
            alert("User name must be filled out");
            return false;
        }
        var c = document.getElementById("email-input").value; 
        if (c === "") {
            alert("Email must be filled out");
            return false;
        }
        var d = document.getElementById("password-input").value; 
        if (d === "") {
            alert("Password must be filled out");
            return false;
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

    function doesUserExist() {
        app.get('/', function(req, res) {
            if(req.user){
                console.log(dbUser.username)
            }
        });
        //do get and request whether user exists
        return $.post();
    }

    function addUser() {
        // do other post
    }

    function signUpUser(name, username, email, password, age, profile) {

        doesUserExist()
        .then(function(userExists){
            if(!userExists) {
                addUser()
            }
        });

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
                console.log("name" + name + "password"+ password)
                // If there's an error, handle it by throwing up a bootstrap alert
            }).catch(handleLoginErr)

            
    }

    function handleLoginErr(err) {
        console.log('Username already exists' + err.sqlMessage)
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

});