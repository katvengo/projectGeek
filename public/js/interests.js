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
        if (animeChecked) {
            fandom.push(anime)
        }

        var faveFandoms = fandom.toString()
        console.log(faveFandoms)

        $.ajax({
            type: "PUT",
            data: {
                faveFandoms
            },
            url: "/api/interests",

        }).done(function (res) {
            console.log(res)
        })

    
    })


});