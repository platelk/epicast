///////////////////////
//// Principal Event //
///////////////////////

$("#connectionLog").hide();
mosaique = new Array();

function resizeHeader() {
	var h = $('header').height();

	$('#logo').css('font-size', 0.9 * parseInt(h));
	$('#connectionButton').css('font-size', 0.6 * parseInt(h));
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
	$('#connectionButton').hide(200, function () {
		$('#connection').show(200);
	});
});

$('header').mouseleave(function () {
	$('#connection').hide(200, function () {
		$("#connectionLog").hide();
		$('#connectionButton').show(200);
	});
});

$('#send').click(function () {
	var pseudo = $("#pseudo").val();
	var password = $("#password").val();
});

$(document).ready(function () {
	resizeHeader();
	resizeInfoText();

	mosaique.push(new Mosaique(undefined, 15, 10));
	// mosaique.push(new Mosaique());
	tab = new Tabs(2, 50);

	$('#video').append(mosaique[0].html);
	//$('#video').append(mosaique[1].html);
	//tab.add_tabs(new One_tabs());
	tab.addTabsSpecial(new One_tabs(undefined, undefined, new OngletPlus('+', 'plus')));
	tab.addTabsSpecial(new One_tabs(undefined, undefined, new OngletMoin('-', 'moins')));
	tab.displayAll();
	$('#tabs').tabs();
	CreateMosaique(mosaique[0], 30);
	//CreateMosaique(mosaique[1], 12);
	placeMosaique(mosaique);
	setEvent();
	$(window).trigger('resize');
});
