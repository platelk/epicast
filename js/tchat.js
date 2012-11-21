/*
** Tchat Class
** made by platel_k
*/

function Tchat (usr, connect) {
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

    this.htmlBox.append(this.htmlReceiveMessage);
    this.htmlBox.append(this.htmlSendMessage);
    this.htmlSendMessage.load("html/tchat/send.html");

    // Return
    return (true);
}

function tchat_getHtml() {
    // Return
    return (this.htmlBox);
}

function tchat_addMsg(msg) {
    if (typeof msg == "undefind") {
	// Return
	return (false);
    }
    this.allMsg.push(msg);

    // Return
    return (true);
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
