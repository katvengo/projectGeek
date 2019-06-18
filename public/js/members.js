$(document).ready(function () {
    console.log('in members.js')
    $.ajax({
        type: "GET",
        url: "/api/members"
    }).done(function (res) {
        console.log(res)
    })

    $.ajax({
        type: "GET",
        url: "/api/members/:username"
    }).done(function (res) {

    })

    // $.ajax({
    //     type: "GET",
    //     url: "/members/:username"
    // }).done(function (res) {
    //     res.json(res)
    // })


})
var photo = '#{users.profile}'
var url = '#{users.username}'


var userURL = '#{user.username}'

image = (src = `${photo}`.width = '200', height = '200')