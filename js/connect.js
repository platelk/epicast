function Connect()
{
    this.data = null;
    Connect.prototype.connection = function(user, mdp)
    {
	var data;
	$.ajax({
	    url : "php/connect.php",
	    type : "POST",
	    data : {username : user, password : mdp},
	    dataType : "text",
	    async : false,
	    success: function (data) {
	    	if (data.match(/error/gi)) {
	    	    $(document).data("json", null);
		    $(document).data("connError", $.parseJSON(data));
	    	    return (false);
	    	} else {
	    	    $(document).data("json", $.parseJSON(data));
	    	    return (true);
	    	}
	    },
	    false: function(data) {
	    	$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }


    Connect.prototype.refresh = function()
    {
	var data;
	$.ajax({
	    url : "php/refresh.php",
	    type : "POST",
	    data : {},
	    dataType : "text",
	    async : false,
	    success: function (data) {
	    	if (data.match(/error/gi)) {
	    	    $(document).data("json", null);
		    $(document).data("connError", $.parseJSON(data));
	    	    return (false);
	    	} else {
	    	    $(document).data("json", $.parseJSON(data));
	    	    return (true);
	    	}
	    },
	    false: function(data) {
	    	$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    /*
    ** recupere le data de getJson et verifie la validite des donnes (si ozouf renvoie une erreur ou pas)
    ** renvoie False si il y a une erreur sinon True
    */

    Connect.prototype.disconnect = function()
    {
	var data;
	$.ajax({
	    url : "php/disconnect.php",
	    async : false
	});
	return (true);
    }

    Connect.prototype.addMsg = function(message, id_message_channel, id_parent)
    {
	var data;
	$.ajax({
	    url : "php/message.php",
	    type : "POST",
	    data : {action : "add", message : message, id_message_channel : id_message_channel, id_parent : id_parent},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.getMsg = function(id_message_channel, nbr, begin)
    {
	var data;
	$.ajax({
	    url : "php/message.php",
	    type : "POST",
	    data : {action : "get", id_message_channel : id_message_channel, nbr : nbr, begin : begin},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.delMsg = function(id)
    {
	var data;
	$.ajax({
	    url : "php/message.php",
	    type : "POST",
	    data : {action : "delete", id : id},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.createMsg = function(id_message_channel, nbr, begin)
    {
	var data;
	$.ajax({
	    url : "php/message.php",
	    type : "POST",
	    data : {action : "create", id_message_channel : id_message_channel, nbr : nbr, begin : begin},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.add_video = function (name, description, image, live, video) {
	var data;

	$.ajax({
	    url : "php/add_video.php",
	    type : "POST",
	    data : {name : name, description : description, image : image, live : live, video : video},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }

	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.addVideoIn = function (type_req, video_id, container_id, date_begin, date_end, offset) {
	var data;

	$.ajax({
	    url : "php/add_video_in.php",
	    type : "POST",
	    data : {type : type_req, video_id : video_id, container_id : container_id, date_begin : date_begin, date_end : date_end, offset : offset},
	    dataType : "text",
	    async : false
	    /*	    success: function (data) {
		    if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		    } else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		    }
		    },
		    false: function(data) {
		    $(document).data("json", null);
		    }*/

	})
	//data = $(document).data("json");
	return (data);
    }

    Connect.prototype.get_user_info_name = function (username) {
    	var data;

    	$.ajax({
    	    url : "php/get_user_info_name.php",
    	    type : "POST",
    	    data : {username : username},
    	    dataType : "text",
    	    async : false,
    	    success: function (data) {
    		if (data.match(/error/gi)) {
    		    $(document).data("json", null);
    		    return (false);
    		} else {
    		    $(document).data("json", $.parseJSON(data));
    		    return (true);
    		}
    	    },
    	    false: function(data) {
    		$(document).data("json", null);
    	    }
    	})
    	data = $(document).data("json");
    	return (data);
    }

    Connect.prototype.dynamicSearch = function (inpt) {
	var data;

	$.ajax({
	    url : "php/search.php",
	    type : "POST",
	    data : {req : inpt},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.getUsrInfoByName = function (name) {
	var data;

	$.ajax({
	    url : "php/get_user_info_name.php",
	    type : "POST",
	    data : {username : name},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.create_channel = function (name, description, image, folder_id) {
	var data;

	$.ajax({
	    url : "php/create_channel.php",
	    type : "POST",
	    data : {name : name, description : description, image : image, folder_id : folder_id},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.create_folder = function (name, description, image, folder_id) {
	var data;

	$.ajax({
	    url : "php/create_folder.php",
	    type : "POST",
	    data : {name : name, description : description, image : image, folder_id : folder_id},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }


    Connect.prototype.delete = function (type, id) {
	var data;

	$.ajax({
	    url : "php/create_delete.php",
	    type : "POST",
	    data : {id : id, type : type, },
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.addUser = function (username, email, password, repassword) {
	var data;

	$.ajax({
	    url : "php/signup.php",
	    type : "POST",
	    data : {username : username, email : email, password : password, repassword : repassword},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }
    Connect.prototype.get_buffer_zone = function (id) {
	var data;

	$.ajax({
	    url : "php/get_buffer_zone.php",
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.get_channel = function (id) {
	var data;

	$.ajax({
	    url : "php/get_channel.php",
	    type : "POST",
	    data : {id : id},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.get_folder = function (id) {
	var data;

	$.ajax({
	    url : "php/get_folder.php",
	    type : "POST",
	    data : {id : id},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("json");
	return (data);
    }

    Connect.prototype.get_folder_from_user = function (id) {
	var data;

	$.ajax({
	    url : "php/get_folder_from_user.php",
	    type : "POST",
	    data : {id : id},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("e");
	return (data);
    }

    Connect.prototype.get_user_info = function(id)
    {
	var data;
	$.ajax({
	    url : "php/get_user_info.php",
	    async : false
	});
    }

    Connect.prototype.get_video = function (id) {
	var data;

	$.ajax({
	    url : "php/get_video.php",
	    type : "POST",
	    data : {id : id},
	    dataType : "text",
	    async : false,
	    success: function (data) {
		if (data.match(/error/gi)) {
		    $(document).data("json", null);
		    return (false);
		} else {
		    $(document).data("json", $.parseJSON(data));
		    return (true);
		}
	    },
	    false: function(data) {
		$(document).data("json", null);
	    }
	})
	data = $(document).data("e");
	return (data);
    }

    Connect.prototype.move_sth = function (elm_type, container_id, elm_id, n_pos_x, n_pos_y) {
    	var data;

    	$.ajax({
    	    url : "php/move_sth.php",
    	    type : "POST",
    	    data : {id : id},
    	    dataType : "text",
    	    async : false,
    	    success: function (data) {
    		if (data.match(/error/gi)) {
    		    $(document).data("json", null);
    		    return (false);
    		} else {
    		    $(document).data("json", $.parseJSON(data));
    		    return (true);
    		}
    	    },
    	    false: function(data) {
    		$(document).data("json", null);
    	    }
    	})
    	data = $(document).data("e");
    	return (data);
    }
};

/*$(document).ready(function () {

  var co = new Connect();
  tab = co.connection("plop42", "plop42");
  /*	var lol = co.disconnect(tab.user.id);
  var video = co.add_video("video", "belle video", "toto.jpg", "toto.avi", "plop42", "plop42");
  })*/;
