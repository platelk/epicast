<html>
	<body>
		<form action="connect.php" method="POST">
			Username: <input type="text" name="username"/><br />
			Password: <input type="password" name="password" /><br />
			<input type="submit" /><br />
		</form>
		<form action="signup.php" method="POST">
			Username: <input type="text" name="username"/><br />
			Email: <input type="text" name="email"/><br />
			Password: <input type="password" name="password"/><br />
			RePassword: <input type="password" name="repassword"/><br />
			<input type="submit" /><br />
		</form>
<?php
   session_start();
if (isset($_SESSION['username']))
  {
    echo "username: " . $_SESSION['username'];
    ?>

		<form action="move_sth.php" method="POST">
			move_sth.php<br />elm_type: <input type="text" name="elm_type"/><br />
			container_id: <input type="text" name="container_id"/><br />
			elm_id: <input type="text" name="elm_id"/><br />
			x: <input type="text" name="n_pos_x"/><br />
			y: <input type="text" name="n_pos_y"/><br />
			<input type="submit" /><br />
		</form>
		<form action="create_channel.php" method="POST">
			create_channel.php<br />name: <input type="text" name="name"/><br />
			description: <input type="text" name="description"/><br />
			image: <input type="text" name="image"/><br />
			folder_id: <input type="text" name="folder_id"/><br />
			<input type="submit" /><br />
		</form>
		<form action="message.php" method="POST">
			message add</br>action: <input type="text" name="action"/><br />
			message: <input type="text" name="message"/><br />
			id_message_channel: <input type="text" name="id_message_channel"/><br />
			id_parent: <input type="text" name="id_parent"/><br />
			<input type="submit" /><br />
		</form>
		<form action="message.php" method="POST">
			message get</br>action: <input type="text" name="action"/><br />
			id_message_channel: <input type="text" name="id_message_channel"/><br />
			nbr: <input type="text" name="nbr"/><br />
			begin: <input type="text" name="begin"/><br />
			<input type="submit" /><br />
		</form>
		<form action="message.php" method="POST">
			messsage delete</br>action: <input type="text" name="action"/><br />
			id: <input type="text" name="id"/><br />
		   <input type="submit" /><br />
		</form>
		<form action="message.php" method="POST">
		   message create</br>action: <input type="text" name="action"/><br />
		   name: <input type="text" name="name"/><br />
			description: <input type="text" name="description"/><br />
		   <input type="submit" /><br />
		</form>
		<form action="get_video.php" method="POST">
		        get_video.php: <input type="text" name="id"/><br />
			<input type="submit" /><br />
		</form>
		<form action="get_channel.php" method="POST">
		        get_channel.php: <input type="text" name="id"/><br />
			<input type="submit" /><br />
		</form>
		<form action="get_folder_from_user.php" method="POST">
		        get_folder_from_user.php: <input type="text" name="id"/><br />
			<input type="submit" /><br />
		</form>
		<form action="get_folder.php" method="POST">
		        get_folder.php: <input type="text" name="id"/><br />
			<input type="submit" /><br />
		</form>
		<form action="get_user_info_name.php" method="POST">
		        get_user_info_name.php: <input type="text" name="username"/><br />
			<input type="submit" /><br />
		</form>
		<form action="add_video.php" method="POST" enctype="multipart/form-data">
		        add_video.php:<br />
		   name<input type="text" name="name"/><br />
		   description<input type="text" name="description"/><br />
		   image<input type="text" name="image"/><br />
		   <input type="checkbox" name="live" value="live">live<br>
		   <input type="hidden" name="MAX_FILE_SIZE" value="100000" />
		   video : <input type="text" name="video" />
		    <input type="submit" /><br />
		   </form>
		<form action="create_folder.php" method="POST">
		        Create_folder:<br />
		   name<input type="text" name="name"/><br />
		   description<input type="text" name="description"/><br />
		   image<input type="text" name="image"/><br />
		   parent_folder<input type="text" name="folder_id" /><br />
		   <input type="submit" /><br />
		   </form>
		<form action="get_buffer_zone.php" method="POST">
			get_buffer_zone.php: <input type="text" name="id"/><br />
			<input type="submit" /><br />
		</form>
		<form action="delete.php" method="POST">
			delete.php: <input type="text" name="id"/><br />
			type:<input type="text" name="type"/><br />
			<input type="submit" /><br />
		</form>
		<form action="add_video_in.php" method="POST">
		   folder:add_video_in.php:<br />
                        type<input type="text" name="type"/><br />
		   folder<br />
		   video_id:<input type="text" name="video_id"/><br />
		   container_id:<input type="text" name="container_id"/><br />
		   <input type="submit" /><br />
		</form>
		<form action="add_video_in.php" method="POST">
		   channel:add_video_in.php:<br />
		   type<input type="text" name="type"/><br />
		   video_id:<input type="text" name="video_id"/><br />
		   container_id:<input type="text" name="container_id"/><br />
		   date_begin:<input type="text" name="date_begin"/><br />
		   date_end:<input type="text" name="date_end"/><br />
		   offset:<input type="text" name="offset"/><br />
		   <input type="submit" /><br />
		</form>
		<a href="disconnect.php">disconnect</a>
<?php
     }
?>
	</body>
</html>
