///////////////////////
//// Principal Event //
///////////////////////

$("#connectionLog").hide();
mosaique = new Array();
var connection = false;
var user = new User();

function resizeHeader() {
	var h = $('header').height();
	var w = $('header').width()

	$('#logo').css('font-size', 0.9 * parseInt(h));
	$('#connectionButton').css('font-size', 0.6 * parseInt(h));
	$('#inscriptionButton').css('font-size', 0.6 * parseInt(h));
	$('.Mosaique').css('font-size', 0.5 * parseInt(h));
}

function resizeInfoText() {
	$('.videoInfo').each(function () {
		var h = this.height();

		var t = this.children('p');

		t.css('font-size', 0.5 * parseInt(h));
	})
}

function resizeIframe() {
	$('iframe')
}

$(window).resize(function () {
	resizeHeader();
	$('.Mosaique').trigger('mosaiqueResize');
	placeMosaique(mosaique);

});

$('#connectionButton').click(function () {
    if (connection == false) {
	$('#connectionButton').hide(200, function () {
	    connection = true;
	    $('#connection').show(200);
	});
    }
});

$('header').mouseleave(function () {
    if (connection == true) {
	$('#connection').hide(200, function () {
	    connection = false;
	    $("#connectionLog").hide();
	    $('#connectionButton').show(200);
	});
    }
});

$('#send').click(function () {
    var ret = user.connect($("#pseudo").val(), $("#password").val());
    if (ret) {
	$("#connectionLog").css("background-color", "#048590");
	$("#connectionLog").show(50);
	$("#connectionLog").html("Connection Success");
    } else {
	$("#connectionLog").css("background-color", "#a55134");
	$("#connectionLog").show(50);
	$("#connectionLog").html("Connection Error");
    }
    setTimeout(function () {
	$("#connectionLog").hide(250);
	if (user.online) {
	    $("#connectionButton").hide(250);
	    // $("#connectionButton").off();
	    $("#connection").hide(250);
	    // $("#connection").off();
	    $("#inscriptionButton").hide(250);
	    $("#userInfo").html(user.firstname + " " + user.lastname);
	    alert(user.data.folder.videos);
	    CreateMosaique(mosaique[0], user.data);
	}
    }, 2300);
});

$(document).ready(function () {
    var tchat = new Tchat();
    var o = new One_tabs();
    resizeHeader();
    resizeInfoText();

    /* Test tchat */
    tchat.setPos("10%", "10%");
    tchat.setSize("60%", "60%");

    /* -------------------- */

    mosaique.push(new Mosaique(undefined, 15, 10));
    // mosaique.push(new Mosaique());
    tab = new Tabs(2, 50);

    $('#video').append(mosaique[0].html);
    //$('#video').append(mosaique[1].html);
    //tab.add_tabs(new One_tabs());
    tab.addTabsSpecial(new One_tabs(undefined, undefined, new OngletPlus('+', 'plus')));
    tab.addTabsSpecial(new One_tabs(undefined, undefined, new OngletMoin('-', 'moins')));
    o.onglet.icon = "tchat";
    o.tab.add_content(tchat.getHtml());
    tab.add_tabs(o);
    tab.displayAll();
    $('#tabs').tabs();
    //CreateMosaique(mosaique[1], 12);
    placeMosaique(mosaique);
    setEvent();
    $(window).trigger('resize');
    inscription();
});
