$(document).on('click', '#reset-submit', function(e) {
    e.preventDefault();

    const newPassword = $('#reset-password-input').val();
    const token = $('#token').val();
    const email = $('#email').val();

    $.post("/api/reset", {newPassword, token, email}).then(function(response) {
        console.log(response)
        alert('Your password has been changed!');
        window.open('/members');
    });
});