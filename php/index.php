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
		<form action="message.php" method="POST">
			add</br>action: <input type="text" name="action"/><br />
			message: <input type="text" name="message"/><br />
			aim_id: <input type="text" name="aim_id"/><br />
			id_parent: <input type="text" name="id_parent"/><br />
			<input type="submit" /><br />
		</form>
		<form action="message.php" method="POST">
			get</br>action: <input type="text" name="action"/><br />
			type <input type="text" name="type"/><br />
			aim_id: <input type="text" name="aim_id"/><br />
			nbr: <input type="text" name="nbr"/><br />
			begin: <input type="text" name="begin"/><br />
			<input type="submit" /><br />
		</form>
		<form action="message.php" method="POST">
			delete</br>action: <input type="text" name="action"/><br />
			id: <input type="text" name="id"/><br />
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
		<form action="get_user_info_name.php" method="POST">
		        get_user_info.php: <input type="text" name="username"/><br />
			<input type="submit" /><br />
		</form>
		<form action="add_video.php" method="POST" enctype="multipart/form-data">
		        add_video.php:<br />
		   name<input type="text" name="name"/><br />
		   description<input type="text" name="description"/><br />
		   image<input type="text" name="image"/><br />
		   <input type="checkbox" name="live" value="live">live<br>
		   <input type="hidden" name="MAX_FILE_SIZE" value="100000" />
		   video : <input type="file" name="video" />
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
		<a href="disconnect.php">disconnect</a>
<?php
     }
?>
	</body>
</html>

