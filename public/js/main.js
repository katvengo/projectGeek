$(document).ready(function () {

    function setUsername(username) {
        return username;
    }

    var user = !JSON.stringify(user);
    document.getElementById("welcome-user").innerHTML = setUsername(user.name);
})
setUsername()