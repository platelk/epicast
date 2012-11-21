/*
** Module d'inscription
*/

$("#inscriptionButton").click(function (e) {
    $("#inscriptionPage").slideToggle("fold")
})

function inscription() {
    $("#inscriptionPage").load("html/inscription.html");
}
