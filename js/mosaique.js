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
//	this.displayName('Group');
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
//	    $(this).data('me').displayName('Group');
	}
    });

    /*-----*/
    // init()

    this.initMosaique();
}

////////////////
// Test ////////
////////////////

function CreateMosaique(mosa, data) {
    mosa.init();
    var c;

    video  = data.folder.videos;
    for (i in video) {
	alert(video[i]);
	c = new Video(video[i].id, video[i].name, video[i].description, video[i].video, video[i].x, video[i].y, video[i].image);
	mosa.addContainer(c);
    }
    setEvent();
    $(window).trigger('resize');
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
