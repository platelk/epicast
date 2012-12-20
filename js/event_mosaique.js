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
    $('.videoClass, .streamClass').on({
	click : function (event, ui) {
	    var t = new One_tabs();
	    var tchat = new Tchat(user, new Connect(), $(this).data("me").tchat_id, $(this).data("me").id);

	    var i = tab.add_tabs(t);
	    t.tab.add_content($(this).data('me').displayContent());
	    t.tab.add_content(tchat.getHtml())
	    t.onglet.icon = $(this).data("me").name;
	    tab.displayAll();
	    tab.action['moins'].html.children('a').trigger('click');
	    tchat.setPos("70%", "10%");
	    tchat.setSize("80%", "28%");
	}
    });
    $('.folderClass').click(function () {
	goInFolder($(this).data("me").id);
    });
}
