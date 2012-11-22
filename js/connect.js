function Connect()
{
	this.data;
	Connect.prototype.connection = function(user, mdp)
	{	
		var data;
		$.ajax({
			url : "php/connect.php",
			type : "POST",
			data : {username : user, password : mdp},
			dataType : "JSON",
			async : false
		})
		.done(function (data) {
			$(document).data("e", data);
		})
		.fail(function (data, status){
			$(document).data("e", null);
		});
		data = $(document).data("e");
		alert(data);
		return (data);
	}

	/*
	** recupere le data de getJson et verifie la validite des donnes (si ozouf renvoie une erreur ou pas)
	** renvoie False si il y a une erreur sinon True
	*/

	Connect.prototype.disconnect = function(id)
	{
		alert("start disconnect")
		var data;
		$.ajax({
			url : "php/disconnect.php",
			async : false
		})
/*		.done(function (data) {
			$(document).data("a", data);
		})
		.fail(function (data, fail) {
			$(document).data("a", null);
		})
		data = $(document).data("a");
		alert("plop : " + data);
*/	}

	Connect.prototype.add_video = function (name, description, image, live, email, password) {
		var data;

		$.ajax({
			url : "php/add_video.php",
			type : "POST",
			data : {name : name, description : description, image : image, live : live, email : email, password : password},
			dataType : "json",
			async : false
		})
		.done(function (data) {
			alert('good for add_video ' + data.name);
			$(document).data("e", data);
		})
		.fail(function (data, error) {
			alert("error to add_video : " + error);
			alert(data.error);
			$(document).data("e", null);
		})
		data = $(document).data("e");
		alert(data);
		return (data);
	}

	Connect.prototype.create_folder = function (name, description, image, folder_id) {
		var data;
		$.ajax({
			url : "php/create_folder.php",
			type : "POST",
			data : {name : name, description : description, image : image, folder_id : folder_id},
			dataType : "JSON",
			async : false
		})
		.done(function (data) {
			$(document).data("e", data);
		})
		.fail(function (data, error) {
			alert(error);
			$(document).data("e", null);
		})
		data = $(document).data("e");
		alert(data);
		return (data);
	}

	Connect.prototype.get_buffer_zone = function (id) {
		var data;
		
		$.ajax({
			url : "php/get_buffer_zone.php",
			type : "POST",
			data : {id : id},
			dataType : "JSON",
			async : false
		})
		.done(function (data) {
			$(document).data("e", data);
		})
		.fail(function (data, error) {
			alert(error);
			$(document).data("e", null);
		})
		data = $(document).data("e");
		alert(data);
		return (data);
	}
 
 	Connect.prototype.get_channel = function (id) {
		var data;
		
		$.ajax({
			url : "php/get_channel.php",
			type : "POST",
			data : {id : id},
			dataType : "JSON",
			async : false
		})
		.done(function (data) {
			$(document).data("e", data);
		})
		.fail(function (data, error) {
			alert(error);
			$(document).data("e", null);
		})
		data = $(document).data("e");
		alert(data);
		return (data);
	}

 	Connect.prototype.get_folder = function (id) {
		var data;
		
		$.ajax({
			url : "php/get_folder.php",
			type : "POST",
			data : {id : id},
			dataType : "JSON",
			async : false
		})
		.done(function (data) {
			$(document).data("e", data);
		})
		.fail(function (data, error) {
			alert(error);
			$(document).data("e", null);
		})
		data = $(document).data("e");
		alert(data);
		return (data);
	}

 	Connect.prototype.get_folder_from_user = function (id) {
		var data;
		
		$.ajax({
			url : "php/get_folder_from_user.php",
			type : "POST",
			data : {id : id},
			dataType : "JSON",
			async : false
		})
		.done(function (data) {
			$(document).data("e", data);
		})
		.fail(function (data, error) {
			alert(error);
			$(document).data("e", null);
		})
		data = $(document).data("e");
		alert(data);
		return (data);
	}

	Connect.prototype.get_user_info = function(id)
	{
		var data;
		$.ajax({
			url : "php/get_user_info.php",
			async : false
		})
/*		.done(function (data) {
			$(document).data("a", data);
		})
		.fail(function (data, fail) {
			$(document).data("a", null);
		})
		data = $(document).data("a");
		alert("plop : " + data);
*/	}

 	Connect.prototype.get_video = function (id) {
		var data;
		
		$.ajax({
			url : "php/get_video.php",
			type : "POST",
			data : {id : id},
			dataType : "JSON",
			async : false
		})
		.done(function (data) {
			$(document).data("e", data);
		})
		.fail(function (data, error) {
			alert(error);
			$(document).data("e", null);
		})
		data = $(document).data("e");
		alert(data);
		return (data);
	}

 	Connect.prototype.is_valid = function(data)
	{
		alert(data);
		if (data == null)
			return (false);
		else
			return (true);

	}
}

/*$(document).ready(function () {
	var co = new Connect();
	tab = co.connection("plop42", "plop42");
	alert("lol " + tab.user.id);
	var lol = co.disconnect(tab.user.id);
	var video = co.add_video("video", "belle video", "toto.jpg", "toto.avi", "plop42", "plop42");
	alert(video);
})*/;