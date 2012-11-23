/*
** Module d'inscription
*/

$("#inscriptionButton").click(function (e) {
    $("#inscriptionPage").slideToggle("fold")
})

function inscription() {
    $("#inscriptionPage").load("html/inscription.html", function () {
	$("#inscriptionSubmitButton").click(function () {
	    var conn = new Connect();

	    conn.addUser('a', 'b', 'c', 'd', $("#inscriptionUserName").val(), $("#inscriptionEmail").val(), $("#inscriptionPassword").val());
	});
    });
}
