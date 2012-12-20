function Container() {

// Attribut definissant les class/id css
	this.containerClass = 'MosContainer';

// Attribut definissant le container
	this.html = $('<div />');
	this.info = $('<div />');
	this.info.addClass('videoInfo');
	this.html.append(this.info);
	this.important = 2;
	this.html.data('important', 2);
	this.x = 0;
	this.y  = 0;
	this.html.data('me', this);
	this.Content =
/* ---------- */
// Methode du container
	Container.initialized = true;

	Container.prototype.setSize = function () {
		this.html.trigger('containerResize');
	}

	Container.prototype.initContainer = function () {
		this.html.addClass(this.containerClass);
		this.html.addClass('ui-widget-content');
		this.html.resizable();
	}

	Container.prototype.setImportant = function (important) {
		this.important = important;
		this.html.data('important', important);
	}

	Container.prototype.setInfoContent = function (content) {
		this.info.html(content);
	}

	Container.prototype.resetInfo = function () {
		this.info.html('');
	}

// Evenement de l'objet

/* ----- */
// Run init()
	if (this.initialized == true) {
		this.initContainer();
	}
}


function Stream(link, name, info, miniatureLink) {

// Attribut definissant les class/id
	this.streamClass = 'streamClass';

// Attribut definissant les class/id
	this.link = link;
	this.infoContent = info;
	this.name = name;
	this.miniatureLink = miniatureLink;


// Heritage
	Container.call(this); // Cf Héritage par le constructeur de la classe mère
	if ( typeof Stream.initialized == 'undefined' ) {
		// Recopie des éléments au moyen d'une simple boucle
		for (var element in Container.prototype ) {
			Stream.prototype[element] = Container.prototype[element];
		}
		// Ajout d'une nouvelle méthode
			// code
		}
		Stream.initialized = true;

/* ------------- */
// Methode du stream

	Stream.prototype.displayContent = function () {
		content = $('<div />');
		// A MODIFIER
		content.html('<object id="#flashContent" type="application/x-shockwave-flash" data="http://10.99.19.242/epicast/index.swf" width="60%" height="70%" allowFullScreen="true"><param name="movie" value="http://10.99.19.242/epicast/index.swf" /><param name="wmode" value="transparent" /><p>Image ou texte alternatif</p></object>');
		return (content);
	}

	this.init = function () {
		this.initContainer();
		this.html.addClass(this.streamClass);
		this.html.data('link', this.link);
		this.html.data('name', this.name);
		this.html.data('miniatureLink', this.miniatureLink);
		this.setInfoContent(this.infoContent);
		this.html.append('<img class="miniature" src="http://img.youtube.com/vi/' + this.link + '/0.jpg" />');

	}

/* ----- */
// Run init()
	this.init();
}

function Video(link, name, info, miniatureLink) {

// Attribut definissant les class/id
	this.streamClass = 'videoClass';

// Attribut definissant la class Video
	this.link = link;
	this.name = name;
	this.info = info;
	this.miniatureLink = miniatureLink;

// Heritage
	Container.call(this); // Cf Héritage par le constructeur de la classe mère
	if ( typeof Video.initialized == 'undefined' ) {
		// Recopie des éléments au moyen d'une simple boucle
		for (var element in Container.prototype ) {
			Video.prototype[element] = Container.prototype[element];
		}
		// Ajout d'une nouvelle méthode
			// code
	}
	Video.initialized = true;

/* ------------- */
// Methode du strean

	Video.prototype.displayContent = function () {
		content = $('<div />');

		// A MODIFIER
		content.html('<iframe width="1280" height="720" src="http://www.youtube.com/embed/' + this.link + '?rel=0" frameborder="0" allowfullscreen></iframe>')
		return (content);
	}

	this.init = function () {
		this.initContainer();
		this.html.addClass(this.streamClass);
		this.html.data('link', this.link);
		this.html.data('name', this.name);
		this.html.data('miniatureLink', this.miniatureLink);
		this.setInfoContent(this.infoContent);
		this.html.append('<img class="miniature" src="http://img.youtube.com/vi/' + this.link + '/0.jpg" />');
	}

/* ----- */
// Run init()
	this.init();
}

function Folder(link) {

// Attribut definissant les class/id
	this.streamClass = 'folderClass';
// Attribut definissant les class/id
	this.link = link;

// HeritageVideo
	Container.call(this); // Cf Heritage par le constructeur de la classe mere
	if ( typeof Folder.initialized == 'undefined' ) {
		// Recopie des elements au moyen d'une simple boucle
		for (var element in Container.prototype ) {
			Folder.prototype[element] = Container.prototype[element];
		}
		// Ajout d'une nouvelle mthode
			// code
	}
	Folder.initialized = true;

/* ------------- */
// Methode du strean

	this.init = function () {
		this.initContainer();
		this.html.addClass(this.streamClass);
	}

/* ----- */
// Run init()
	this.init();
}

/* -------------------------------------
** Evenement lier au container
*/

function setGrillEvent() {
    $(".grill").hover(function () {
	var x = $(this).data('x');
	var y = $(this).data('y');

	var ret = $(this).data("parent").checkPlace(1, x, y);
	if (ret == true) {
	    $(this).html('<img src="img/add.png" class="imgAdd" />');
	    $(".imgAdd").click(function () {
		$("#addContainer").show("clip", 200);
	    });
	}
    });

    $(".grill").mouseleave(function () {
	$(this).html('');
    });
    $("#addContainer").load("html/addContainer.html", function () {
	    $("#addContainerMask").click(function () {
		$("#addContainer").hide("clip", 200);
	    });
    });
}
///////////////////////////////////////////
/// Gestion des event lier a la mosaique //
///////////////////////////////////////////

function setEvent() {
    $('.MosContainer').draggable({revert : 'invalid', zIndex : '2700',  refreshPositions: true, cursor: "crosshair"});
    $('.MosContainer').draggable({
	start : function () {
	    idDrag = $(this).data('id');
	    $(this).css('z-index', '100');
	},
	end : function () {
	    $(this).css('z-index', '1');
	},
    });

    $('.grill').droppable({
	'over' : function (event, ui) {
	    var buffer = 'grill-can-drop';
	    var x = $(this).data('x') - 1;
	    var y = 0;

	    if (!$(this).data('parent').checkPlace(ui.draggable.data('important'), $(this).data('x'), $(this).data('y'), ui.draggable.data('id'))) {
		buffer = 'grill-cant-drop';
	    }
	    for (id in $(this).data('parent').fence) {
		if ($(this).data('parent').fence[id].data('x') >= $(this).data('x') && $(this).data('parent').fence[id].data('x') < (ui.draggable.data('important') + $(this).data('x'))) {
		    if ($(this).data('parent').fence[id].data('y') >= $(this).data('y') && $(this).data('parent').fence[id].data('y') < (ui.draggable.data('important') + $(this).data('y'))) {
			$(this).data('parent').fence[id].addClass(buffer);
		    }
		}
	    }
	},
	'out' : function () {
	    $('.grill').removeClass('grill-can-drop');
	    $('.grill').removeClass('grill-cant-drop');
	},
	drop : function (event, ui) {
	    if ($(this).data('parent').checkPlace(ui.draggable.data('important'), $(this).data('x'), $(this).data('y'), ui.draggable.data('id'))) {
		//ui.draggable.data('parent').container.splice(ui.draggable.data('id'), 1);
		ui.draggable.data('parent').removeContainer(ui.draggable.data('id'));
		//ui.draggable.css('top', $(this).css('top'));
		//ui.draggable.css('left', $(this).css('left'));
		ui.draggable.data('x', $(this).data('x'));
		ui.draggable.data('y', $(this).data('y'));
		$(this).data('parent').addContainer(ui.draggable.data('me'));

	    } else {
		$('.Mosaique').trigger('mosaiqueResize');
	    }
	    $('.grill').removeClass('grill-can-drop');
	    $('.grill').removeClass('grill-cant-drop');
	    $('.Mosaique').trigger('mosaiqueResize');
	}
    });
    $('.MosContainer').droppable({
	drop : function (event, ui) {
	    if (ui.draggable.data('parent').checkPlace(ui.draggable.data('important'), $(this).data('x'), $(this).data('y'), ui.draggable.data('id'))) {
		var x = $(this).data('x');
		var y = $(this).data('y');
		var id = parseInt($(this).data('id'));
		var container = ui.draggable.data('parent').container[id];

		ui.draggable.data('x', x);
		ui.draggable.data('y', y);

		ui.draggable.data('parent').removeContainer(id);
		/*if (ui.draggable.data('id') > $(this).data('id')) {
		//ui.draggable.data('parent').container[id] = ui.draggable.data('parent').container[ui.draggable.data('id')];
		//ui.draggable.data('parent').container[ui.draggable.data('id')] = container;

		//$(this).data('id', ui.draggable.data('id'));
		//ui.draggable.data('id', id);
		}*/
		$('.Mosaique').trigger('mosaiqueResize');
	    }
	}
    });
    $('.MosContainer').on({
	click : function (event, ui) {
	    var t = new One_tabs();
	    var i = tab.add_tabs(t);
	    t.onglet.icon = "Video";
	    t.tab.add_content($(this).data('me').displayContent());
	    tab.displayAll();
	    tab.action['moins'].html.children('a').trigger('click');
	}
    });
}
function Tabs(nb_max_onglet)
{
	this.nb_max_onglet = nb_max_onglet;
	this.tabs = new Array();
	this.tabsSpecial = [];
	this.action = {};
	this.onglet_active = 0;
	this.page_active = 0;
	this.html = $('<div />');
	this.Class;
	this.len_onglet = 2;
	this.top = 10;
	this.height = 80;
	this.width = 95;
	this.left = 0;
	this.html.data('me', this);


	Tabs.prototype.init = function()
	{

	}

	Tabs.prototype.addTabsSpecial = function(tabs_to_add)
	{
		if (tabs_to_add instanceof One_tabs) {
			this.tabsSpecial.push(tabs_to_add);
			this.action[tabs_to_add.onglet.name] = tabs_to_add.onglet;
			tabs_to_add.html.data('id', this.tabsSpecial.length - 1);
			this.setId(2);
			tabs_to_add.html.data('parent', this.html);
			return (true);
		}
		else {
			return (false);
		}
	}

	Tabs.prototype.removeTabs = function (idTabs) {
		this.tabs[idTabs].onglet.html.remove();
		this.tabs[idTabs].tab.html.remove();
		this.tabs.splice(idTabs, 1);
		for (i in this.tabs) {
			this.tabs[i].html.data('id', i);
		}
	}

	Tabs.prototype.add_tabs = function(tabs_to_add)
	{
		if (tabs_to_add instanceof One_tabs) {
			this.tabs.push(tabs_to_add);
			tabs_to_add.html.data('id', this.tabs.length - 1);
			this.setId(1);
			tabs_to_add.html.data('parent', this.html);
			return (this.tabs.length - 1);
		}
		else {
			return (false);
		}
	}

	Tabs.prototype.move = function(max_move)
	{
		if (this.onglet_active != -1)
		{
			this.tabs[this.onglet_active].move(max_move, this.onglet_active);
		}
		this.displayAll();
	}

	Tabs.prototype.gets_tabs = function(id)
	{
		if (typeof id == 'int' && id <= this.tabs.nbLine)
			return (this.tabs[id]);
		else
			return (false);
	}

	Tabs.prototype.setId = function (flag) {
		if (flag == 1)
		{
			for (i in this.tabs) {
				if (this.tabs[i].tab instanceof Content)
				{
					this.tabs[i].tab.html.attr('id', 'tabs-' + i);
					this.tabs[i].setHref();
					this.tabs[i].onglet.num = i;
				}
			}
		}
		else
		{
			for (i in this.tabsSpecial) {
				if (this.tabsSpecial[i].tab instanceof Content)
				{
					this.tabsSpecial[i].tab.html.attr('id', 'tabs-' + i);
					this.tabsSpecial[i].setHref();
					this.tabsSpecial[i].onglet.num = i;
				}
			}

		}
	}

	Tabs.prototype.displayAll = function () {
		this.display(this.tabs);
		this.displaySpecial(this.tabsSpecial);
		$('#tabs').tabs("destroy");
		$('#tabs').tabs();
	} 

	Tabs.prototype.display = function (tab) {
		var i = this.nb_max_onglet * this.page_active;
		var k = 0;
		var j = 0;

		for (; k < tab.length; k++) {
			tab[k].onglet.html.hide();
			//tab[k].tab.html.hide();
		}
		for (; i < tab.length; i++)
		{
			if (j >= this.nb_max_onglet)
				return (true);
			$('#tabs_selected').append(tab[i].onglet.display());
			if (tab[i].tab instanceof Content && i == this.onglet_active) {
				$('#tabs').append(tab[i].tab.display());
				//tab[i].tab.html.show();
			}
			if (typeof tab[i].onglet.icon == 'undefined') {
				tab[i].onglet.link.html(i);
			} else {
				tab[i].onglet.link.html(tab[i].onglet.icon);
			}
			tab[i].onglet.html.addClass('ui-state-default');
			$('#tabs ul li').css('height', 100 / (this.nb_max_onglet + this.tabsSpecial.length) + '%');
			tab[i].onglet.html.show();
			j++;
		}
	}

	Tabs.prototype.displaySpecial = function (tab){
		for (i in tab)
		{
			$('#tabs_selected').append(tab[i].onglet.display());
			if (tab[i].tab instanceof Content) {
				$('#tabs').append(tab[i].tab.display());

				if (typeof tab[i].tab.Content != 'undefined')
					tab[i].tab.html.html(tab[i].tab.Content);
				else
					tab[i].tab.html.html('salut ' + i);
			}
			if (typeof tab[i].onglet.icon == 'undefined')
				tab[i].onglet.link.html(i);
			else
				tab[i].onglet.link.html(tab[i].onglet.icon);
			if (tab[i].onglet instanceof OngletPlus || tab[i].onglet instanceof OngletMoin) {
				tab[i].onglet.html.addClass('ui-state-default');
			}
			$('#tabs ul li').css('height', 100 / (this.nb_max_onglet + this.tabsSpecial.length) + '%');
		}

	}
	this.init();
}

function One_tabs(max_move, tab, onglet)
{
	this.onglet;
	this.tab;
	if (typeof max_move == 'undefined')
		this.max_move = 90;
	else
		this.max_move = max_move;
	this.Class;
	this.Color;
	this.html = $('<div />');

	One_tabs.prototype.initTabs = function(tab, onglet)
	{
		if (onglet instanceof Onglet || onglet instanceof OngletPlus || onglet instanceof OngletMoin) {
			this.onglet = onglet;
		} else {
			this.onglet = new Onglet();
		}
		this.onglet.html.data('parent', this.html);
		if (tab instanceof Content || onglet instanceof OngletPlus || onglet instanceof OngletMoin) {
			this.tab = tab;
		} else {
			this.tab = new Content();
			this.tab.html.data('parent', this.html);
		}

	}

	One_tabs.prototype.move = function(new_max_move, id)
	{
		this.max_move = new_max_move;
	}

	One_tabs.prototype.resize_tabs = function()
	{

	}

	One_tabs.prototype.set_icon = function(icon)
	{

	}

	One_tabs.prototype.set_color = function()
	{

	}

	One_tabs.prototype.display = function () {
		this.html.append(this.onglet.display());
		this.html.append(this.tab.display());
		return (this.html);
	}

	One_tabs.prototype.setHref = function () {
		var id = this.tab.html.attr('id');
		this.onglet.link.attr('href', '#' + id);
	}
	this.initTabs(tab, onglet);
}

function Onglet(icon, color)
{
	this.icon = icon;
	if (typeof color == 'undefined')
		this.Color = '#222299';
	else
		this.Color = color;
	this.html = $('<li />');
	this.Class;
	this.size_x;
	this.size_y;
	this.num = 0;
	this.link = $('<a />');
	this.html.data('me', this);

	this.add_onglet = function()
	{
		this.link.data('parent', this.html);
		this.html.append(this.link);
		this.link.append(this.icon);
	}

	this.display = function()
	{
		return (this.html);
	}
/*
	Onglet.prototype.add_onglet = function()
	{
		this.html.append(this.link);
	}

	Onglet.prototype.resize = function()
	{

	}

	Onglet.prototype.display = function() {

		return (this.html);
	}
*/
	this.add_onglet();
	this.html.children('a').off();
	this.html.children('a').on({
		click : function () {
			$(this).data('parent').data('parent').data('parent').data('me').onglet_active = $(this).data('parent').data('me').num;
			$(this).data('parent').data('parent').data('parent').data('me').displayAll();
		}});
}

function OngletPlus(icon, name, color)
{
	this.name = name;
	Onglet.call(this, '+', icon, color);
	if (typeof OngletPlus.initialized == 'undefined') {
		for (var element in Onglet.prototype ) {
			OngletPlus.prototype[element] = Onglet.prototype[element];
		}
	}
	OngletPlus.initialized = true;

	this.add_onglet();
	this.html.children('a').off();
	this.html.children('a').on({
		click  : function () {
			var parent = $(this).data('parent').data('parent').data('parent').data('me');
			if (parent.page_active + 1 >= parent.tabs.length / parent.nb_max_onglet)
				parent.page_active = 0;
			else
				parent.page_active++;
			parent.displayAll();
	}});
}

function OngletMoin(icon, name, color)
{
	this.name = name;
	this.active = 0;
	Onglet.call(this, '-', icon, color);
	if (typeof OngletMoin.initialized == 'undefined') {
		for (var element in Onglet.prototype ) {
			OngletMoin.prototype[element] = Onglet.prototype[element];
		}
	}
	OngletMoin.initialized = true;
	this.html.children('a').off();
	this.html.children('a').on({
		click  : function () {
			var parent = $(this).data('parent').data('parent').data('parent').data('me');
			if (this.active == -1){
				//parent.tabs[parent.onglet_active].tab.html.show();
				$('#tabs').css('left', -($('#tabs').width() - $('#tabs_selected').width()));
				this.active = 0;
			}
			else if (parent.tabs.length != 0){
				/*for (i in parent.tabs) {
					parent.tabs[i].tab.html.hide();
				}*/
				$('#tabs').css('left', 0 + '%');				
				this.active = -1;
			}
	}});

}

function Content(icon, color)
{
	this.size_x;
	this.size_y;
	this.Color;
	this.Content = icon;
	this.Class;
	this.html = $('<div />');

	Content.prototype.add_content = function(content)
	{
		this.html.append(content);
	}

	Content.prototype.display = function() {
		return (this.html);
	}
	this.add_content(this.Content);
}/*
** Module d'inscription
*/

$("#inscriptionButton").click(function (e) {
    $("#inscriptionPage").slideToggle("fold")
})

function inscription() {
    $("#inscriptionPage").load("html/inscription.html");
}
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
/*
** Message Class
** Made by platel_k
*/

function message_getMsg() {
    return (this.htmlWrapper);
}

function Message(usr, msg) {
    /*
    **-----------------------------
    ** Attribut of Message Class
    */

    this.classWrapper;
    this.htmlWrapper;
    this.msg;
    this.user;

    /*
    **-----------------------------
    ** Methode of Message Class
    */

    Message.prototype.init = message_init;
    Message.prototype.getMsg = message_getMsg;

    /*
    **-----------------------------
    ** Execute part of Message Class
    */

    this.init(usr, msg);
}


/*
**-----------------------------
** Methode declaration of Message Class
*/

function message_init(usr, msg) {
    if (typeof usr == "undefined") {
	return (false);
    }
    if (typeof msg == "undefined") {
	return (false);
    }

    this.classWrapper = "message";

    this.htmlWrapper = $("<div />");
    this.htmlWrapper.append("<span class='usrMsg'>" + usr + "</span> : " + msg + "");
    return (true);
}
function Mosaique(mosaiqueClass, nbCellByLine, nbLine) {

// Attribut difinissant les class/id

    this.mosaiqueClass = 'Mosaique';

    // Attribut de Mosaique

    this.html = $('<div />');
    this.html.data('me', this);
    this.container = new Array();
    this.nbCellByLine = nbCellByLine;
    this.nbLine = nbLine;
    this.map = [];
    this.spaceY = 0.90;
    this.spaceX = 0.90;
    this.gridspaceY = 3;
    this.gridspaceX = 3;
    this.ecartY = 0;
    this.ecartX = 0;
    this.maxImportant = 0;
    this.fence = [];
    this.initialize = false;
    this.name = $('<div />');
    this.name.addClass('title');
    this.html.append(this.name);

    /* ------- */
    // Methode de mosaique
    Mosaique.prototype.addContainer = function (container) {
	if (container instanceof Container || container instanceof Stream || container instanceof Video || container instanceof Folder) {
	    this.container.push(container);
	    this.html.append(container.html);
	    container.html.hide(0);
	    container.html.data('id', this.container.length - 1);
	    container.html.data('parent', this);
	    container.setSize();
	    container.html.resizable();
	    //this.containerPosition();
	    if (container.important > this.maxImportant) {
		this.maxImportant = container.important;
	    }
	    container.html.hover(function () {
		var img = $('<img class="containerdelete" src="img/delete.png" />');
		img.data("this", img);
		img.data("parent", $(this));
		$(this).append(img);
		$(".containerdelete").click(function () {
		    $(this).data("parent").data("parent").removeHtmlContainer($(this).data("parent").data("id"));
		});
	    });
	    container.html.mouseleave(function () {
		$('.containerdelete').remove();
	    });
	    return true;
	} else {
	    return false;
	}
    }

    Mosaique.prototype.removeContainer = function (id_container) {
	//alert(this.container[id_container].html.html());
	//this.container[id_container].html.remove();
	for (var i = 0; i < this.nbLine; i++) {
	    for (var j = 0; j < this.nbCellByLine; j++) {
		if (this.map[i][j] == id_container) {
		    this.map[i][j] = -1;
		}
	    }
	}
	this.container.splice(id_container, 1);
	for (id in this.container) {
	    this.container[id].html.data('id', id);
	}
    }

    Mosaique.prototype.removeHtmlContainer = function (id_container) {
	//alert(this.container[id_container].html.html());
	//this.container[id_container].html.remove();
	for (var i = 0; i < this.nbLine; i++) {
	    for (var j = 0; j < this.nbCellByLine; j++) {
		if (this.map[i][j] == id_container) {
		    this.map[i][j] = -1;
		}
	    }
	}
//	alert(this.container[id_container].html.html());
	this.container[id_container].html.remove();
	this.container.splice(id_container, 1);
	for (id in this.container) {
	    this.container[id].html.data('id', id);
	}
	$(".Mosaique").trigger("mosaiqueResize");
    }

    Mosaique.prototype.printMap = function () {
	var str = '';

	for (var i = 0; i < this.nbLine; i++) {
	    for (var j = 0; j < this.nbCellByLine; j++) {
		str += this.map[i][j] + ' ';
	    }
	    str += '\n';
	}
	alert(str);
    }

    Mosaique.prototype.resetMap = function () {
	for (var i = 0; i < this.nbLine; i++) {
	    for (var j = 0; j < this.nbCellByLine; j++) {
		this.map[i][j] = -1;
	    }
	}
    }

    Mosaique.prototype.initMap = function () {
	for (var i = 0; i < this.nbLine; i++) {
	    this.map.push([]);
	    for (var j = 0; j < this.nbCellByLine; j++) {
		this.map[i].push(-1);
	    }
	}
    }

    Mosaique.prototype.mosaiquePosition = function () {
	var border_width = parseInt($(".MosContainer").css('border-width'));
	border_width = 2
	for (i in this.container) {
	    this.container[i].html.css('height', (((this.cellHeight * this.container[i].important)) + (this.gridspaceY * (this.container[i].important - 1))) - (border_width * 2));
	    this.container[i].html.css('width', (((this.cellWidth * this.container[i].important)) + (this.gridspaceX * (this.container[i].important - 1))) - (border_width * 2));
	    this.container[i].html.css('top', this.container[i].html.data('y') * (this.cellHeight + this.gridspaceY));
	    this.container[i].html.css('left', this.container[i].html.data('x') * (this.cellWidth + this.gridspaceX));
	}
    }

    Mosaique.prototype.grillCreation = function () {
	for (var i = 0; i < this.nbLine; i++) {
	    for (var j = 0; j < this.nbCellByLine; j++) {
		var fence = $('<div />');
		fence.data('y', i);
		fence.data('x', j);
		fence.data('parent', this);
		fence.data('this', fence);

		this.html.append(fence);
		fence.addClass('grill');
		this.fence.push(fence);
	    }
	}
	setGrillEvent();
    }

    Mosaique.prototype.grillResize = function () {
	for (i in this.fence) {
	    this.fence[i].css('height', this.cellHeight);
	    this.fence[i].css('width', this.cellWidth);
	    this.fence[i].css('top', (this.fence[i].data('y') * (this.cellHeight + this.gridspaceY)));
	    this.fence[i].css('left', (this.fence[i].data('x') * (this.cellWidth + this.gridspaceX)));
	}
    }

    Mosaique.prototype.findPlace = function (id, x, y) {
	var place = true;

	if (typeof y == 'undefined') {
	    y = 0;
	}
	if (typeof x == 'undefined') {
	    x = 0;
	}
	for (var i = y; i < this.nbLine && place; i++) {
	    for (var j = x; j < this.nbCellByLine && place; j++) {
		if (this.checkPlace(this.container[id].important, j, i, id)) {
		    this.takePlace(this.container[id].important, j, i, id);
		    place = false;
		    return (true);
		}
	    }
	}
	return (false);
    }

    Mosaique.prototype.containerPosition = function () {

	var imp = this.maxImportant;

	while (imp > 0) {
	    for (id in this.container) {
		if (this.container[id].important == imp) {
		    if (!this.findPlace(id, this.container[id].html.data('x'), this.container[id].html.data('y'))) {
			this.container[id].html.hide();
		    }
		}
	    }
	    imp--;
	}
    }

    Mosaique.prototype.checkPlace = function (important, idMap_x, idMap_y, idContainer) {
	var x = 0;
	var y = 0;

	for (var i = idMap_y; i < (idMap_y + important) && i < this.nbLine; i++) {
	    for (var j = idMap_x; j < (idMap_x + important) && j < this.nbCellByLine; j++) {
		if ((parseInt(this.map[i][j]) != (-1) && this.map[i][j] != idContainer)) {
		    return (false);
		}
		x = j;
	    }
	    y = i;
	}
	if ((idMap_x + important) > this.nbCellByLine || (idMap_y + important) > this.nbLine ||  typeof (this.map[y][x]) == 'undefined') {
	    return (false);
	}
	return (true);
    }

    Mosaique.prototype.checkBord = function (important, idMap_x, idMap_y, idContainer) {
	if ((idMap_x + important) > this.nbCellByLine || (idMap_y + important) > this.nbLine) {
	    return (false);
	}
	return (true);
    }

    Mosaique.prototype.takePlace = function (important, idMap_x, idMap_y, idContainer) {
	for (var i = idMap_y; i < (idMap_y + important) && i < this.nbLine; i++) {
	    for (var j = idMap_x; j < (idMap_x + important) && j < this.nbCellByLine; j++) {
		this.map[i][j] = idContainer;
		this.container[idContainer].html.data('x', idMap_x);
		this.container[idContainer].html.data('y', idMap_y);
	    }
	}
    }

    Mosaique.prototype.takePosition = function () {
	for (id in this.container) {
	    /*if (!(this.checkPlace(this.container[id].important, this.container[id].html.data('x'), this.container[id].html.data('y'), id))) {

	      } else {*/
	    this.container[id].html.fadeIn(5 * (id + 1));
	    if (!this.findPlace(id, this.container[id].html.data('x'), this.container[id].html.data('y'))) {
		if (!this.findPlace(id, 0, 0)) {
		    this.container[id].html.hide();
		}
	    }
	    /*}*/
	}
    }

    Mosaique.prototype.initSize = function () {
	this.cellHeight = (this.html.height() / this.nbLine);
	this.cellWidth = (this.html.width() / this.nbCellByLine);
    }

    Mosaique.prototype.initMosaique = function () {
	this.html.addClass(this.mosaiqueClass);
	this.initMap();
	this.initialize = true;
    }

    Mosaique.prototype.displayName = function (name) {
	var t = this.html.position();
	this.name.html(name);

	this.name.css('top', (t.top - this.name.outerHeight() - ((t.top / 100) * 120)) + 'px');
    }

    Mosaique.prototype.draggableCursor = function () {
	for (i in this.container) {
	    var x = this.container[i].html;
	    x.draggable("option", "cursorAt", {top : parseInt(x.height()) / 2, left : parseInt(x.width()) / 2});
	    //x.draggable("option", "cursorAt", {top : this.cellHeight / 2, left : this.cellWidth / 2});
	    //x.draggable("option", "cursorAt", {top : -20, left : -20});
	}
    }

    Mosaique.prototype.init = function () {
	this.initSize();
	this.grillCreation();
	this.grillResize();
	this.containerPosition();
	this.mosaiquePosition();
	this.draggableCursor();
	this.displayName('Group');
    }

    Mosaique.prototype.resetContent = function () {
	for (i in this.container) {
	    this.container.shift();
	}
	this.html.html('');
	//this.grillCreation();
	this.grillResize();
	this.html.trigger('mosaiqueResize');
    }
    /*-----*/
    // Event

    this.html.on({
	'mosaiqueResize' : function (event, ui) {
	    $(this).data('me').resetMap();
	    $(this).data('me').initSize();
	    $(this).data('me').grillResize();
	    $(this).data('me').takePosition();
	    $(this).data('me').mosaiquePosition();
	    $(this).data('me').draggableCursor();
	    $(this).data('me').displayName('Group');
	}
    });

    /*-----*/
    // init()

    this.initMosaique();
}

////////////////
// Test ////////
////////////////

function CreateMosaique(mosa, nb) {
    mosa.init();

    while (nb > 0) {
	var video = new Video();
	mosa.addContainer(video);
	nb--;
    }
}

function placeMosaique(mosa) {
    var l = 0;
    var width = (100 / mosa.length) - (2 * mosa.length);
    var tot_width = $('#video').width();

    $('.Mosaique').css('width', (tot_width / 100) * width);
    for (i in mosa) {
	mosa[i].html.css('left', l);
	l += mosa[i].html.outerWidth(true);
    }
}
var tabsVisible = false;
var connectVisible = false;


function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

         switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                              first.screenX, first.screenY,
                              first.clientX, first.clientY, false,
                              false, false, false, 0/*left*/, null);

	 first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

$(function init()
{
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);    
});

 $(document).ready(function () {

	$(window).resize(function () {
		$('.Mosaique').trigger('mosaiqueResize');
	});
});
/*
** Tchat Class
** made by platel_k
*/

function Tchat(usr, connect) {
    /*
    **-----------------------------
    ** Attribut of Tchat Class
    */

    this.htmlBox;
    this.classBox;
    this.htmlSendMessage;
    this.classSendMessage;
    this.htmlReceiveMessage;
    this.classReceiveMessage;
    this.allMsg;
    this.connect;
    this.usr;
    /* -------- TEST ---------*/
    this.login = "platel_k";
    /* -------- TEST -------- */

    /*
    **-----------------------------
    ** Methode of Tchat Class
    */

    Tchat.prototype.init = tchat_init;
    Tchat.prototype.sendMsg = tchat_sendMsg;
    Tchat.prototype.recvMsg = tchat_recvMsg;
    Tchat.prototype.getHtml = tchat_getHtml;
    Tchat.prototype.addMsg = tchat_addMsg;
    Tchat.prototype.setPos = tchat_setPosition;
    Tchat.prototype.setSize = tchat_setSize;
    Tchat.prototype.displayMsg = tchat_displayMsg;

    /*
    **-----------------------------
    ** Execute part of Tchat Class
    */
    if (this.init(usr, connect) == true) {
	return (true);
    } else {
	return (false);
    }
}

/*
**-----------------------------
** Methode declaration of Tchat Class
*/

function tchat_init(usr, connect) {

    /*if (typeof usr != "undefined") {
	this.usr = usr
    } else {
	// Return
	return (false);
    }
    if (typeof connect != "undefined") {
	this.connect = connect;
    } else {
	// Return
	return (false);
    }*/

    this.classBox = "tchat"
    this.classSendMessage = "sendMessage"
    this.classReceiveMessage = "recvMessage"

    this.htmlBox = $("<div />");
    this.htmlSendMessage = $("<div />");
    this.htmlReceiveMessage = $("<div />");
    this.allMsg = new Array();

    this.htmlBox.addClass(this.classBox);
    this.htmlReceiveMessage.addClass(this.classReceiveMessage);
    this.htmlSendMessage.addClass(this.classSendMessage);

    this.htmlSendMessage.data("parent", this);

    this.htmlBox.append(this.htmlReceiveMessage);
    this.htmlBox.append(this.htmlSendMessage);
    this.htmlSendMessage.load("html/tchat/send.html", function () {
	$(".sendMessage .submit").click(function () {
	    var tchat = $(".sendMessage .msgInput").parent().parent().parent().data("parent");
	    var msg = $(".sendMessage .msgInput").val();
	    $(".sendMessage .msgInput").val('');
	    tchat.addMsg(msg, tchat.login)
	});
    });
    // Return
    return (true);
}

function tchat_getHtml() {
    // Return
    return (this.htmlBox);
}

function tchat_addMsg(msg, login) {
    if (typeof msg == "undefind") {
	// Return
	return (false);
    }
    var mess = new Message(login, msg);
    this.allMsg.push(mess);

    this.displayMsg(10);
    // Return
    return (true);
}

function tchat_displayMsg(nb) {
    this.htmlReceiveMessage.html('');
    i = this.allMsg.length - 1 - nb;
    if (i < 0) {
	i = 0;
    }
    j = 0;
    for (; i >= 0 && j < nb && i < this.allMsg.length ; i++) {
	this.htmlReceiveMessage.append(this.allMsg[i].getMsg());
	j++;
    }
}

function tchat_setPosition(x, y) {
    this.htmlBox.css("left", x);
    this.htmlBox.css("top", y);
}

function tchat_setSize(height, width) {
    this.htmlBox.css("height", height);
    this.htmlBox.css("width", width);
}

function tchat_sendMsg() {
}

function tchat_recvMsg() {
}


/*
** -------------------------
** Event linked to tchat module
*/
function User() {

	/*
	** Attribut
	*/

	var pseudo = undefined;
	var dir;
	var mosaique;
	var current_dir;
	var current_mosaique;
	var connected = false;

	/*
	** Methode
	*/

	// Init attribute of user object
	User.prototype.init = function () {
		this.connected = true;
		/* TESTING		*/
		/**/

	}

	// try to connect user and get his information
	User.prototype.connection = function () {
		// Call php connection page with information of connection form and init object
	}

	// call this methode when user change directory
	User.prototype.changeDirectory = function () {
		// need to get information and update mosaique
	}

}
