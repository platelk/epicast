function clone(srcInstance)
{
    /*Si l'instance source n'est pas un objet ou qu'elle ne vaut rien c'est une feuille donc on la retourne*/
    if(typeof(srcInstance) != 'object' || srcInstance == null)
	{
	    return srcInstance;
	    }
    /*On appel le constructeur de l'instance source pour cr?e une nouvelle instance de la m?me classe*/
    var newInstance = new srcInstance.constructor();
    /*On parcourt les propri?t?s de l'objet et on les recopies dans la nouvelle instance*/
    for(var i in srcInstance)
	{
	    newInstance[i] = clone(srcInstance[i]);
	    }
    /*On retourne la nouvelle instance*/
    return newInstance;
}

function Container(id, name, description, link, x, y) {
    // Attribut definissant les class/id css
    this.containerClass;

    // Attribut definissant le container
    this.html;
    this.info;
    this.id;
    this.important;
    this.x;
    this.y;

	/* ---------- */
    // Methode du container
    Container.initialized = true;

    Container.prototype.setSize = function () {
	this.html.trigger('containerResize');
    }

    Container.prototype.initContainer = function (id, name, description, link, x, y) {
	// Attribut definissant les class/id css
	this.containerClass = 'MosContainer';

	// Attribut definissant le container
	this.html = $('<div />');
	this.info = $('<div />');
	this.info.append(description);
	this.info.addClass('videoInfo');
	this.html.append(this.info);
	this.id = id;
	this.important = 2;
	this.html.data('important', 2);
	if (typeof x == "undefined") {
	    this.x = parseInt(x);
	} else {
	    this.x = 0;
	}
	if (typeof y == "undefined") {
	    this.y = parseInt(y);
	} else {
	    this.y = 0;
	}
	this.html.data('me', this);

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


function Stream(id, name, description, link, x, y, image) {

    // Attribut definissant les class/id
    this.streamClass = 'streamClass';

    // Attribut definissant les class/id
    this.link = link;
    this.infoContent = info;
    this.name = name;
    this.miniatureLink = image;

    // Heritage
    Container.call(this); // Cf Heritage par le constructeur de la classe mere
    if ( typeof Stream.initialized == 'undefined' ) {
	// Recopie des elements au moyen d'une simple boucle
	for (var element in Container.prototype ) {
	    Stream.prototype[element] = Container.prototype[element];
	}
	// Ajout d'une nouvelle methode
	// code
    }
    Stream.initialized = true;

    /* ------------- */
    // Methode du stream

    Stream.prototype.displayContent = function () {
	content = $('<div />');
	// A MODIFIER
	return (content);
    }

    this.init = function (id, name, description, link, x, y, image) {
	this.initContainer(id, name, description, link, x, y);
	this.html.addClass(this.streamClass);
	this.html.data('link', this.link);
	this.html.data('name', this.name);
	this.html.data('miniatureLink', this.miniatureLink);
	this.setInfoContent(this.infoContent);
	this.html.append('<img class="miniature" src="http://img.youtube.com/vi/' + this.link + '/0.jpg" />');
    }

    /* ----- */
    // Run init()
    this.init(id, name, description, link, x, y, image);
}

function Video(id, name, description, link, x, y, image, tchat_id) {

    // Attribut definissant les class/id
    this.streamClass = 'videoClass';

    // Attribut definissant la class Video
    this.link = link;
    this.name = name;
    this.info = description;
    this.image = image;
    this.tchat_id = tchat_id;

    // Heritage
    Container.call(this);
    if ( typeof Video.initialized == 'undefined' ) {
	for (var element in Container.prototype ) {
	    Video.prototype[element] = Container.prototype[element];
	}
	// code
    }
    Video.initialized = true;

    /* ------------- */
    // Methode du strean

    Video.prototype.initLinkAndImg = function () {
	link = clone(this.link);
	if (link.match(/youtu/gi)) {
	    var ar = clone(link).split('/');
	    link = ar[ar.length - 1];
	    if (link.match(/watch/)) {
		ar = link.split('=', 2);
		link = ar[1];
	    }
	    this.image = "http://img.youtube.com/vi/" + link + "/default.jpg"
	    link = "http://www.youtube.com/embed/" + link;
	}
	this.link = clone(link);
    }

    Video.prototype.displayContent = function () {
	var content = $('<div />');
	content.addClass("video");

	content.append('<iframe class="videoPlayer" src="' + this.link + '" frameborder="0" allowfullscreen></iframe>')
	return (content);
    }

    this.init = function (id, name, description, link, x, y, image) {
	this.initContainer(id, name, description, link, x, y);
	this.initLinkAndImg();
	this.html.addClass(this.streamClass);
	this.html.data('link', this.link);
	this.html.data('name', this.name);
	this.html.data('miniatureLink', this.image);
	this.setInfoContent(this.infoContent);
	this.html.append('<img class="miniature" src="' + this.image + '" />');
    }

    /* ----- */
    // Run init()
    this.init(id, name, description, link, x, y, image);
}

function Folder(id, name, description, link, x, y, image) {

    // Attribut definissant les class/id
    this.streamClass = 'folderClass';
    // Attribut definissant les class/id
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
    this.init = function (id, name, description, link, x, y, image) {
	this.initContainer(id, name, description, undefined, x, y);
	this.html.addClass(this.streamClass);
	this.html.data('link', this.link);
	this.html.data('name', this.name);
	this.setInfoContent(this.infoContent);
    }

    /* ----- */
    // Run init()
    this.init(id, name, description, link, x, y, image);
}

/* -------------------------------------
** Evenement lier au container
*/

function submitVideo() {
    var conn = new Connect();
    var ret = conn.add_video($("#addVideoName").val(), $("#addVideoDes").val(), $("#addVideoImg").val(), $("#addVideoLive").val(),$("#addVideoFil").val());
    ret = conn.get_buffer_zone();
    if (ret != false) {
	$("#addContainer").hide("clip", 200)
	if (parseInt(ret.buffer_zone[ret.buffer_zone.length - 1].user_id) == parseInt(user.id)) {
	    conn.addVideoIn("folder", ret.buffer_zone[ret.buffer_zone.length - 1].id, user.current_folders_id, 0, 0, 0)
	}
	$("#homeButton").trigger('click');
    }
}

function submitFolder() {
    var conn = new Connect();
    var ret = conn.create_folder($("#addFolderName").val(), $("#addFolderDes").val(), $("#addFolderImg").val(), user.current_folders_id);
    ret = conn.get_buffer_zone();
    if (ret != false) {
	$("#addContainer").hide("clip", 200);
	$("#homeButton").trigger('click');
    }
}

function addContainerPage() {
    $("#addFolder").hide();
    $("#addVideo").show();
    $("#addVideoButton").click(function () {
	$("#addFolder").hide();
	$("#addVideo").show();
    });
    $("#addFolderButton").click(function () {
	$("#addVideo").hide();
	$("#addFolder").show();
    });

}

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
	$("#addSubmitVideo").click(function () {
	    submitVideo();
	});
	$("#addSubmitFolder").click(function () {
	    submitFolder();
	});
	addContainerPage();
    });
}
