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
	Container.call(this); // Cf Héritage par le constructeur de la classe mère
	if ( typeof Folder.initialized == 'undefined' ) {
		// Recopie des éléments au moyen d'une simple boucle
		for (var element in Container.prototype ) {
			Folder.prototype[element] = Container.prototype[element];
		}
		// Ajout d'une nouvelle méthode
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

