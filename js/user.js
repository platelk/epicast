function User(username, password, connection) {
    /*
    ** Attrbutes
    */
    this.username = undefined;
    this.firstname = undefined;
    this.lastname = undefined;
    this.id = undefined;
    this.age = undefined;
    this.email = undefined;
    this.password = undefined;
    this.online = undefined;
    this.folders_id = undefined;
    this.connection = undefined;
    this.data = false;

    /*
    ** Methods
    */

    User.prototype.init = function(username, password, connection) {
	if (typeof username != 'undefined')
	    this.username = username;
	if (typeof password != 'undefined')
	    this.password = password;
	if (typeof connection != 'undefined')
	    this.connection = connection;
	else
	    this.connection = new Connect();
	this.online = false;
	return true;
    }
    User.prototype.connect = function(username, password) {
	if (typeof username != 'undefined')
	    var login = username;
	else
	    var login = this.username;
	if (typeof login == 'undefined')
	    return false;
	if (typeof password != 'undefined')
	    var pass = password;
	else
	    var pass = this.password;
	if (typeof pass == 'undefined')
	    return false;
	var array = this.connection.connection(username, password);

	if (array == null || typeof array.user == 'undefined')
	    return false;
	this.online = true;
	this.username = array.user.username;
	this.password = array.user.password;
	this.firstname = array.user.firstname;
	this.lastname = array.user.lastname;
	this.age = array.user.age;
	this.email = array.user.email;
	this.folders_id = array.user.folders_id;
	this.data = array;
	return true;
    }

    User.prototype.disconnect = function() {
	if (this.online == false || typeof this.online == 'undefined')
	    return false;
	var ret = this.connection.disconnect();
	if (ret == false)
	    return false;
	this.online = false;
	this.password = undefined;
	this.firstname = undefined;
	this.lastname = undefined;
	this.age = undefined;
	this.email = undefined;
	this.folders_id = undefined;
	return true;
    }

    User.prototype.addVideo = function(name, description, image, live, video) {
	if (this.online == false)
	    return false;
	if (typeof name == 'undefined' || typeof description == 'undefined' || typeof image == 'undefined' || typeof folders_id == 'undefined')
	    return false;
	var array = this.connection.add_video(name, description, image, live, video);
	/* CHECKER LE RETOUR DE L'ARRAY */
	return true;
    }
    User.prototype.createFolder = function(name, description, image, folders_id) {
	if (this.online == false)
	    return false;
	if (typeof name == 'undefined' || typeof description == 'undefined' || typeof image == 'undefined' || typeof folders_id == 'undefined')
	    return false;
	var array = this.connection.create_folder(name, description, image, folders_id);
	/* CHECKER LE RETOUR DE L'ARRAY */
	return true;
    }
    User.prototype.getBufferZone = function() {
	if (this.online == false)
	    return false;
	var array = this.connection.get_buffer_zone();
	/* CHECKER LE RETOUR DE L'ARRAY */
	return true;
    }

    User.prototype.getChannel = function(channel_id) {
	if (this.online == false)
	    return false;
	if (typeof channel_id == 'undefined')
	    return false;
	var array = this.connection.get_channel(channel_id);
	/* CHECKER LE RETOUR DE L'ARRAY */
	return true;
    }

    User.prototype.getFolder = function(folders_id) {
	if (this.online == false)
	    return false;
	if (typeof folders_id == 'undefined')
	    return false;
	var array = this.connection.get_folder(folders_id);
	/* CHECKER LE RETOUR DE L'ARRAY */
	return true;
    }

    User.prototype.getFolderFromUser = function(user_id) {
	if (this.online == false)
	    return false;
	if (typeof user_id == 'undefined')
	    return false;
	var array = this.connection.get_folder_from_user(user_id);
	/* CHECKER LE RETOUR DE L'ARRAY */
	return true;
    }
    this.init(username, password, connection);
};
