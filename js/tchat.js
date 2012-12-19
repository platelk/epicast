/*
** Tchat Class
** made by platel_k
*/

function Tchat(usr, connect, id, parent_id) {
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
    this.id;
    this.login;
    this.parent_id;

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
    if (this.init(usr, connect, id, parent_id) == true) {
	return (true);
    } else {
	return (false);
    }
}

/*
**-----------------------------
** Methode declaration of Tchat Class
*/

function tchat_init(usr, connect, id, parent_id) {

    if (typeof usr != "undefined") {
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
    }

    this.id = id;
    this.parent_id = parent_id;

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

    alert(this.recvMsg());

    this.htmlSendMessage.load("html/tchat/send.html", function () {
	$(".sendMessage .submit").click(function () {
	    var tchat = $(".sendMessage .msgInput").parent().parent().parent().data("parent");
	    var msg = $(".sendMessage .msgInput").val();
	    $(".sendMessage .msgInput").val('');
	    tchat.addMsg(msg, user.username);
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
    if (typeof msg == "undefined") {
	// Return
	return (false);
    }
    this.sendMsg(msg);
    this.displayMsg(10);
    // Return
    return (true);
}

function tchat_displayMsg(nb) {
    this.htmlReceiveMessage.html('');
    this.recvMsg();
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

function tchat_sendMsg(msg) {
    alert("add ->" + msg + ' ' + this.id + ' ' + this.parent_id);
    var ret = this.connect.addMsg(msg, this.id, this.parent_id);
    alert(ret);
}

function tchat_recvMsg() {
    var ret = this.connect.getMsg(this.id, 2000, 0);
    this.allMsg = new Array();
    alert(ret);
    return (ret);
}


/*
** -------------------------
** Event linked to tchat module
*/
