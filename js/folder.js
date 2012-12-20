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
    this.chat = 0;

    Tabs.prototype.init = function()
    {

    }

    Tabs.prototype.InitChat = function(nb_max_onglet)
    {
	this.chat = new Chat(nb_max_onglet);
	$("#tabs").append(this.chat.init());
    }

    Tabs.prototype.addTabsSpecial = function(tabs_to_add)
    {
	if (tabs_to_add instanceof One_tabs) {
	    this.tabsSpecial.push(tabs_to_add);
	    this.action[tabs_to_add.onglet.name] = tabs_to_add.onglet;
	    tabs_to_add.html.data('id', this.tabsSpecial.length - 1);
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

    Tabs.prototype.removeAllTabs = function () {
	for (var i = 0; this.tabs.length > i; i++) {
	    this.removeTabs(i);
	}
	$(".ui-tabs-panel").remove();
	$(".onglet").remove();
	$("#dropdown a").trigger("click");
	this.displayAll();
    }

    Tabs.prototype.add_tabs = function(tabs_to_add)
    {
	if (tabs_to_add instanceof One_tabs) {
	    this.tabs.push(tabs_to_add);
	    tabs_to_add.html.data('id', this.tabs.length - 1);
	    this.setId(1);
	    tabs_to_add.html.data('parent', this.html);
	    this.onglet_active = this.tabs.length - 1;
	    if (this.page_active + 1 < this.tabs.length / this.nb_max_onglet)
		this.page_active++;
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
    }

    Tabs.prototype.displayAll = function () {
	this.displaySpecial(this.tabsSpecial, 1);
	this.display(this.tabs);
	this.displaySpecial(this.tabsSpecial, 2);
	$('#tabs').tabs("destroy");
	$('#tabs').tabs();
    }

    Tabs.prototype.display = function (tab) {
	var i = this.page_active;
	var j = 0;

	for (var k = 0; k < tab.length ; k++)
	{
	    if (tab[k].init == -1)
	    {
		$('#tabs_selected').append(tab[k].onglet.display());
		if (tab[k].tab instanceof Content/* && k == this.onglet_active*/) {
		    $('#tabs').append(tab[k].tab.display());
		}
		if (typeof tab[k].onglet.icon == 'undefined') {
		    tab[k].onglet.link.html(i);
		} else {
		    tab[k].onglet.link.html(tab[i].onglet.icon);
		}
		tab[k].onglet.html.addClass('ui-state-default');
		tab[k].onglet.html.addClass('onglet');
		$('.onglet').css('height', 100 / (this.nb_max_onglet) + '%');
		tab[k].init = 0;
	    }
	    tab[k].onglet.html.hide();
	}
	var tmp_i = i + this.nb_max_onglet;
	for (; i < tmp_i && i < tab.length; i++)
	{
	    tab[i].onglet.html.show();
	}
    }

    Tabs.prototype.displaySpecial = function (tab, opt){
	if (opt == 1 && tab[0].init == -1)
	{
	    tab[0].init = 0;
	    $('#tabs_selected').append(tab[0].onglet.display());
	    if (tab[0].tab instanceof Content) {
		$('#tabs').append(tab[0].tab.display());
		if (typeof tab[0].tab.Content != 'undefined')
		    tab[0].tab.html.html(tab[0].tab.Content);
	    }
	    if (typeof tab[0].onglet.icon == 'undefined')
		tab[0].onglet.link.html(0);
	    else
		tab[0].onglet.link.html(tab[0].onglet.icon);
	    if (tab[0].onglet instanceof OngletPlus || tab[0].onglet instanceof OngletMoin || tab[0].onglet instanceof OngletPlusDown || tab[0].onglet instanceof OngletPlusUp) {
		tab[0].onglet.html.addClass('ui-state-default');
		tab[0].onglet.html.addClass('onglet-special');
	    }
	    tab[0].onglet.html.attr('id', 'up');
	}
	else
	{
	    for (var i = 1; i < tab.length; i++)
	    {
		if (tab[i].init == -1)
		{
		    $('#tabs_selected').append(tab[i].onglet.display());
		    if (tab[i].tab instanceof Content) {
			$('#tabs').append(tab[i].tab.display());
			if (typeof tab[i].tab.Content != 'undefined')
			    tab[i].tab.html.html(tab[i].tab.Content);
		    }
		    if (typeof tab[i].onglet.icon == 'undefined')
			tab[i].onglet.link.html(i);
		    else
			tab[i].onglet.link.html(tab[i].onglet.icon);
		    if (tab[i].onglet instanceof OngletPlus || tab[i].onglet instanceof OngletMoin || tab[i].onglet instanceof OngletPlusDown || tab[i].onglet instanceof OngletPlusUp) {
			tab[i].onglet.html.addClass('ui-state-default');
			tab[i].onglet.html.addClass('onglet-special');
		    }
		    if (i == 1)
			tab[i].onglet.html.attr('id', 'down');
		    else
			tab[i].onglet.html.attr('id', 'dropdown')
		}
	    }
	}
	$('.onglet-special').css('height', 100 / (this.nb_max_onglet + this.tabsSpecial.length + 10) + '%');
    }
    this.init();
}

function Chat(nb_max_onglet)
{
    this.html = $('<div id="chat"/>');
    this.tabsChat = new Array;
    this.onglet_active;
    this.html.data('me', this);
    this.nb_max_onglet = nb_max_onglet;
    this.action = {};
    this.onglet_active = 0;
    this.page_active = 0;

    Chat.prototype.init = function()
    {
	return (this.html);
    }

    Chat.prototype.setId = function () {
	for (i in this.tabsChat) {
	    if (this.tabsChat[i].tab instanceof Content)
	    {
		this.tabsChat[i].tab.html.attr('id', 'tabsChat-' + i)
		this.tabsChat[i].setHref();
		this.tabsChat[i].onglet.num = i;
	    }
	}
    }

    Chat.prototype.add_tabs = function(tabs_to_add)
    {
	if (tabs_to_add instanceof One_tabs) {
	    this.tabsChat.push(tabs_to_add);
	    tabs_to_add.html.data('id', this.tabsChat.length - 1);
	    this.setId();
	    tabs_to_add.html.data('parent', this.html);
	    return (this.tabsChat.length - 1);
	}
	else {
	    return (false);
	}
    }

    Chat.prototype.display = function (tab) {
	var i = 0;
	var j = 0;

	for (var k = 0; k < tab.length ; k++)
	{
	    if (tab[k].init == -1)
	    {
		$('#chat').append(tab[k].onglet.display());
		if (tab[k].tab instanceof Content/* && k == this.onglet_active*/) {
		    $('#chat').append(tab[k].tab.display());
		}
		if (typeof tab[k].onglet.icon == 'undefined') {
		    tab[k].onglet.link.html(i);
		} else {
		    tab[k].onglet.link.html(tab[i].onglet.icon);
		}
		tab[k].onglet.html.addClass('ui-state-default');
		tab[k].onglet.html.addClass('onglet');
		$('.onglet').css('height', 100 / (this.nb_max_onglet) + '%');
		tab[k].init = 0;
	    }
	    tab[k].onglet.html.hide();
	}
	var tmp_i = i + this.nb_max_onglet;
	for (; i < tmp_i && i < tab.length; i++)
	{
	    tab[i].onglet.html.show();
	}
    }
}

function One_tabs(max_move, tab, onglet)
{
    this.onglet;
    this.tab;
    this.init = -1;
    if (typeof max_move == 'undefined')
	this.max_move = 90;
    else
	this.max_move = max_move;
    this.Class;
    this.Color;
    this.html = $('<div />');

    One_tabs.prototype.initTabs = function(tab, onglet)
    {
	if (onglet instanceof Onglet || onglet instanceof OngletPlus || onglet instanceof OngletMoin || onglet instanceof OngletPlusDown || onglet instanceof OngletPlusUp) {
	    this.onglet = onglet;
	} else {
	    this.onglet = new Onglet();
	}
	this.onglet.html.data('parent', this.html);
	if (tab instanceof Content || onglet instanceof OngletPlus || onglet instanceof OngletMoin || onglet instanceof OngletPlusUp || onglet instanceof OngletPlusDown) {
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

    One_tabs.prototype.setHref = function () { /*Test en passant en parametre l'id avant de continuer.*/
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
	    var parent = $(this).data('parent').data('parent').data('parent').data('me');
	    var tmp = parent.onglet_active;
	    parent.onglet_active = $(this).data('parent').data('me').num;
	    for (i in parent.tabs)
	    {
		if (i != parent.onglet_active)
		    $('#tabs-' + i).css('left', -1000 + '%');
		else
		    $('#tabs-' + i).css('left', 0 + '%');
	    }
	    if (tmp != parent.onglet_active)
		parent.displayAll();
	}});
}

function OngletPlus(icon, name, color)
{
    this.name = name;
    Onglet.call(this, '<img src="img/down.png" id=""/>', '<img src="img/down.png" />', color);
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

function OngletPlusDown(icon, name, color)
{
    this.name = name;
    Onglet.call(this, '<img src="img/down.png" id=""/>', '<img src="img/down.png" />', color);
    if (typeof OngletPlusDown.initialized == 'undefined') {
	for (var element in Onglet.prototype ) {
	    OngletPlusDown.prototype[element] = Onglet.prototype[element];
	}
    }
    OngletPlusDown.initialized = true;
    this.add_onglet();
    this.html.children('a').off();
    this.html.children('a').on({
	click : function () {
	    var parent = $(this).data('parent').data('parent').data('parent').data('me');
	    if (parent.page_active + 1 < parent.tabs.length / parent.nb_max_onglet)
	    {
		parent.page_active++;
	    }
	    parent.displayAll();
	}});
}

function OngletPlusUp(icon, name, color)
{
    this.name = name;
    Onglet.call(this, '<img src="img/up.png" id=""/>', '<img src="img/up.png" />', color);
    if (typeof OngletPlusUp.initialized == 'undefined') {
	for (var element in Onglet.prototype ) {
	    OngletPlusUp.prototype[element] = Onglet.prototype[element];
	}
    }
    OngletPlusUp.initialized = true;
    this.add_onglet();
    this.html.children('a').off();
    this.html.children('a').on({
	click : function () {
	    var parent = $(this).data('parent').data('parent').data('parent').data('me');
	    if (parent.page_active - 1 >= 0){
		parent.page_active--;
	    }
	    parent.displayAll();
	}});
}

function OngletMoin(icon, name, color)
{
    this.name = name;
    this.active = 0;
    Onglet.call(this,'<img src="img/right.png" id="rightOnglet" />', '<img src="img/right.png" />', color);
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
		$("#rightOnglet").attr("src", "img/right.png");
	    }
	    else if (parent.tabs.length != 0){
		/*for (i in parent.tabs) {
		  parent.tabs[i].tab.html.hide();
		  }*/
		$('#tabs').css('left', 0 + '%');
		this.active = -1;
		$("#rightOnglet").attr("src", "img/left.png");
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
