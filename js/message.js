/*
** Message Class
** Made by platel_k
*/

function message_getMsg() {
    return (this.htmlWrapper);
}

function Message(usr, msg) {
    /*
    **-----------------------------
    ** Attribut of Message Class
    */

    this.classWrapper;
    this.htmlWrapper;
    this.msg;
    this.user;

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

    this.init(usr, msg);
}


/*
**-----------------------------
** Methode declaration of Message Class
*/

function message_init(usr, msg) {
    if (typeof usr == "undefined") {
	return (false);
    }
    if (typeof msg == "undefined") {
	return (false);
    }

    this.classWrapper = "message";

    this.htmlWrapper = $("<div />");
    this.htmlWrapper.append("" + usr + " : " + msg + "");
    return (true);
}
