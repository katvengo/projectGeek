$(document).on('click', '#forget-submit', function(e) {
    e.preventDefault();

    const email = $('#forget-email-input').val();

    $.post("/api/forgot", {email}).then(function(response) {
        console.log(response)
    })
})