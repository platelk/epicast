///////////////////////
//// Principal Event //
///////////////////////

$("#connectionLog").hide();
mosaique = new Array();
var connection = false;

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
	var pseudo = $("#pseudo").val();
	var password = $("#password").val();
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
    CreateMosaique(mosaique[0], 30);
    //CreateMosaique(mosaique[1], 12);
    placeMosaique(mosaique);
    setEvent();
    $(window).trigger('resize');
    inscription();
});
