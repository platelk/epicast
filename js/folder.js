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
}