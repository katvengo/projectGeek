$(document).on('click', '#forget-submit', function(e) {
    e.preventDefault();

    const email = $('#forget-email-input').val();

    $.post("/api/forgot", {email}).then(function(response) {
        console.log(response)
        alert('An e-mail has been sent to ' + email + ' with further instructions.');
    })
})