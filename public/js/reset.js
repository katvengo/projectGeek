$(document).on('click', '#reset-submit', function(e) {
    e.preventDefault();

    const newPassword = $('#reset-password-input').val();

    $.post("/api/reset/:token", {newPassword}).then(function(response) {
        console.log(response)
    })
})