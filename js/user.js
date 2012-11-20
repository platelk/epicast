function User() {

	/*
	** Attribut
	*/

	var pseudo = undefined;
	var dir;
	var mosaique;
	var current_dir;
	var current_mosaique;
	var connected = false;

	/*
	** Methode
	*/

	// Init attribute of user object
	User.prototype.init = function () {
		this.connected = true;
		/* TESTING		*/
		/**/

	}

	// try to connect user and get his information
	User.prototype.connection = function () {
		// Call php connection page with information of connection form and init object
	}

	// call this methode when user change directory
	User.prototype.changeDirectory = function () {
		// need to get information and update mosaique
	}

}