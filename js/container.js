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
    this.init();
}

function Video(id, name, description, link, x, y, image) {

    // Attribut definissant les class/id
    this.streamClass = 'videoClass';

    // Attribut definissant la class Video
    this.link = link;
    this.name = name;
    this.info = description;
    this.miniatureLink = link;

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
	$("#addContainerSubmit").click(function () {
	    alert("Start wait...")
	    var ret = user.addVideo($("addContainerName").val(), $("#addContainerDes").val(), $("#addContainerImg").val(), $("#addContainerFil").val());
	    alert(ret);
	});
    });
}
