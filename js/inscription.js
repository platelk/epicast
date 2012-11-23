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

	    var ret = conn.addUser($("#inscriptionUserName").val(), $("#inscriptionEmail").val(), $("#inscriptionPassword").val(), $("#inscriptionRePassword").val());
	    $("#inscriptionLog").show();
	    if (ret) {
		$("#inscriptionLog").html("Inscription Success !");
		$("#inscriptionLog").css("background-color", "#048590");
		setTimeout(function () { $("#inscriptionPage").slideToggle("fold"); }, 3000);
	    } else {
		$("#inscriptionLog").css("background-color", "#a55134");
		$("#inscriptionLog").html("Inscription Fail.");
	    }
	    setTimeout(function () {$("#inscriptionLog").hide(200);}, 5000);
	});
    });
}
