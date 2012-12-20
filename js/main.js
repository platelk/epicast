///////////////////////
//// Principal Event //
///////////////////////

//$("#homeButton").hide();
//$("#disconnectButton").hide();
$("#userButton").hide();
$("#connectionLog").hide();
mosaique = new Array();
var connection = false;
var user = new User();
var idTime = 0;


function resizeHeader() {
	var h = $('header').height();
	var w = $('header').width()

	$('#logo').css('font-size', 0.9 * parseInt(h));
	$('#connectionButton').css('font-size', 0.6 * parseInt(h));
	$('#inscriptionButton').css('font-size', 0.6 * parseInt(h));
	$('.Mosaique').css('font-size', 0.3 * parseInt(h));
}

function resizeInfoText() {
	$('.videoInfo').each(function () {
		var h = this.height();

		var t = this.children('p');

		t.css('font-size', 0.3 * parseInt(h));
	})
}

function resizeIframe() {
}

$(window).resize(function () {
    resizeHeader();
    $('.Mosaique').trigger('mosaiqueResize');
    placeMosaique(mosaique);
    setGrillEvent();
});

$('#connectionButton').click(function () {
    if (connection == false) {
	connection = true;
	$('#connection').show(200);
    }
    else {
	hideConnection();
    }
});

$('#connectionBar').keypress(function (e) {
    if (e.which == 13)
	$("#send").trigger('click');
});

function headerEvent() {
    $('header').mouseleave(function () {
	if (connection == true) {
	    idTime = setTimeout(hideConnection, 4000);
	}
    });
    $('header').mouseenter(function () {
	clearTimeout(idTime);
    });
}
function hideConnection() {
    $('#connection').hide(200, function () {
	connection = false;
	$("#connectionLog").hide();
	$('#connectionButton').show(200);
    });
}

$("#disconnectButton").click(function () {
    var conn = new Connect();
    conn.disconnect();
    user.disconnect();
    tab.removeAllTabs();
    $("#connectionButton").show();
    $("#connection").show();
    $("#connectionLog").show();
    $("#inscriptionButton").show();
    $("#userInfo").html('');
    $("#disconnectButton").hide();
    $("#homeButton").hide();
    $(".Mosaique").remove();
    mosaique = new Array();
    mosaique.push(new Mosaique(undefined, 15, 10));
    $('#video').append(mosaique[0].html);
    hideConnection();
    headerEvent();
});

function search_result(ret, i) {
    var newdiv = $('<div class="resultSearch" >'+ret+'</div>');
    $('#SearchBar').append(newdiv);
    $('.resultSearch').css('background-color','#B0B0B0');
    $('.resultSearch').css('width',$('#SearchBarInput').width()+3+'px');
    $('.resultSearch').css('border','solid 1px');
};

/*$('#SearchBar').keyup(function() {
    var conn = new Connect();
    var inpt = $("#SearchBarInput").val();
    if (inpt != '')
    {
	var ret = new Array();
	ret = conn.dynamicSearch(inpt);
	{
	    $('.resultSearch').remove();
	    var i = 0;
	    while (ret[i]) {
		search_result(ret[i]['users'], i);
		i++;
	    }
	}
    }
    else
	$('.resultSearch').remove();
});*/
function connect_to_user(name) {
    var conn = new Connect();

    var ret = conn.getUsrInfoByName(name);

    if (ret) {
	var conn = new Connect();
	$(".Mosaique").remove();
	mosaique = new Array();
	var data = conn.get_folder(ret.folders_id);
	mosaique.push(new Mosaique(undefined, 15, 10));
	CreateMosaique(mosaique[0], data);
        $("#video").append(mosaique[0].html);
	mosaique[0].displayName($("#SearchBarInput").val());
        placeMosaique(mosaique);
        setEvent();
	resizeHeader();
        $(window).trigger('resize');
    }
    else {
        $("#searchBarLog").show();
        $("#searchBarLog").html("No result matches.");
	setTimeout(function () {$("#searchBarLog").hide();}, 3000);
    }
}

$('#SearchBarButton').click(function () {
    connect_to_user($("#SearchBarInput").val());
});


function goInFolder(folders_id) {
    if (typeof folders_id == "undefined")
	return (false);
    user.prev_folders_id.push(user.current_folders_id);
    user.current_folders_id = folders_id;
    var conn = new Connect();
    $(".Mosaique").remove();
    mosaique = new Array();
    var data = conn.get_folder(user.current_folders_id);

    mosaique.push(new Mosaique(undefined, 15, 10));
    CreateMosaique(mosaique[0], data);
    $("#video").append(mosaique[0].html);
    mosaique[0].displayName($("#SearchBarInput").val());
    placeMosaique(mosaique);
    setEvent();
    resizeHeader();
    //	resizeInfoText();
    $(window).trigger('resize');
}

$("#prevButton").click(function () {
    goInFolder(user.prev_folders_id.pop());
    user.prev_folders_id.pop();
});

$('#SearchBarButton').click(function () {
    var conn = new Connect();

    var ret = conn.getUsrInfoByName($("#SearchBarInput").val());

    if (ret) {
	goInFolder(ret.folders_id);
   } else {
	$("#searchBarLog").show();
	$("#searchBarLog").html("No result matches.");
	setTimeout(function () {$("#searchBarLog").hide();}, 3000);
    }
});

/*
** Gestion de la connection utilisateur
*/

function connectionUser(ret) {
    if (ret) {
	$("#connectionLog").css("background-color", "#048590");
	$("#connectionLog").show(50);
	$("#connectionLog").html("Connection Success");
    } else {
	$("#connectionLog").css("background-color", "#a55134");
	$("#connectionLog").show(50);
	$("#connectionLog").html("Connection Error : " + $(document).data("connError").Error);
    }
    setTimeout(function () {$("#connectionLog").hide(500);}, 3000);
    if (user.online) {
	$("#connectionButton").hide();
	$("#connection").hide();
	$("#connectionLog").hide();
	$("#inscriptionButton").hide();
	$("#inscriptionPage").hide();
	$("#userInfo").html("Bienvenue " + user.username + ".");
	CreateMosaique(mosaique[0], user.data.folder);
	$("#disconnectButton").show();
	$("#homeButton").show();
	$('header').off();
    }
}

$('#send').click(function () {
    var conn = new Connect();
    conn.disconnect();
    user.disconnect();
    var ret = user.connect($("#pseudo").val(), $("#password").val());

    connectionUser(ret);
});

/*
** Reviens au Home
*/

$("#homeButton").click(function () {
    var conn = new Connect();
    var ret = conn.getUsrInfoByName(user.username);
    $(".Mosaique").remove();
    mosaique = new Array();
    var data = conn.get_folder(ret.folders_id);
    mosaique.push(new Mosaique(undefined, 15, 10));
    CreateMosaique(mosaique[0], data);
    $("#video").append(mosaique[0].html);
    //mosaique[0].displayName($("#SearchBarInput").val());
    placeMosaique(mosaique);
    setEvent();
    resizeHeader();
    //	resizeInfoText();
    $(window).trigger('resize');
});

$(document).ready(function () {
    var conn = new Connect();
    resizeHeader();
    resizeInfoText();

    // mosaique.push(new Mosaique());
    tab = new Tabs(2, 50);
    mosaique.push(new Mosaique(undefined, 15, 10));
    $('#video').append(mosaique[0].html);
    //$('#video').append(mosaique[1].html);
    //tab.add_tabs(new One_tabs());
//    tab.addTabsSpecial(new One_tabs(undefined, undefined, new OngletPlus('+', 'plus')));
    tab.addTabsSpecial(new One_tabs(undefined, undefined, new OngletPlusUp('+', 'plus')));
    tab.addTabsSpecial(new One_tabs(undefined, undefined, new OngletPlusDown('+', 'plus')));
    tab.addTabsSpecial(new One_tabs(undefined, undefined, new OngletMoin('-', 'moins')));
    tab.displayAll();
    $('#tabs').tabs();
    //CreateMosaique(mosaique[1], 12);
    placeMosaique(mosaique);
    setEvent();
    $(window).trigger('resize');
    inscription();
    ret = conn.refresh();
    if (ret) {
	user.initValue(ret);
	connectionUser(ret);
    }
    $("addContainerTab").tabs();
});
