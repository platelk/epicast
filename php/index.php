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
		<form action="get_folder.php" method="POST">
			get_folder.php: <input type="text" name="id"/><br />
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

