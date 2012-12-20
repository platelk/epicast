/*
** Message Class
** Made by platel_k
*/

function message_getMsg() {
    return (this.htmlWrapper);
}

function Message(usr, msg, date) {
    /*
    **-----------------------------
    ** Attribut of Message Class
    */

    this.classWrapper;
    this.htmlWrapper;
    this.msg;
    this.user;
    this.date;

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

    this.init(usr, msg, date);
}


/*
**-----------------------------
** Methode declaration of Message Class
*/

function message_init(usr, msg, date) {
    if (typeof usr == "undefined") {
	return (false);
    }
    if (typeof msg == "undefined") {
	return (false);
    }

    this.classWrapper = "message";
    this.date = date;

    this.htmlWrapper = $("<div />");
    this.htmlWrapper.append("<span class='usrMsg'>" + usr + "</span> : " + msg + "");
    return (true);
}
