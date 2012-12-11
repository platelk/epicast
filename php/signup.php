<?php
session_start();
header("Content-Type: application/json");
if (isset($_SESSION['id']) && isset($_POST['username']) && !empty($_POST['username']) &&
    isset($_POST['password']) && !empty($_POST['password']) &&
    isset($_POST['repassword']) && !empty($_POST['repassword']) &&
    isset($_POST['email']) &&!empty($_POST['email']))
  {
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL check_signup(:username, :email, :type)');
    $prepared->execute(array('username' => $_POST['username'],
			     'email' => $_POST['email'],
			     'type' => "all"));
    $info = $prepared->fetch();
    if ($info['occurency'] == 0)
      {
	if ($_POST['password'] == $_POST['repassword'])
	  {
	    $prepared = $db->prepare('CALL add_user(:username, :firstname, :lastname, :email, :password)');
	    $prepared->execute(array('username' => $_POST['username'], 
				     'firstname' => "",
				     'lastname' => "",
				     'email' => $_POST['email'],
				     'password' => $_POST['password']));
	    $prepared = $db->prepare('SELECT * FROM users WHERE username = :username');
	    $prepared->execute(array('username' => $_POST['username']));
	    $info = $prepared->fetch();
	    $_SESSION['username'] = $info['username'];
	    $_SESSION['id'] = $info['id'];
	    $user_id = $info['id'];
	    echo "{\n\"user\":\n";
	    require("get_user_info.php");
	    echo "\n";
	    echo ",\"folder\":\n";
	    require("get_folder_from_user.php");
	    echo "\n}";
	    $db = null;
	  }
	else
	  echo "{\"Error\": \"Bad password\"}";
      }
    else
      echo "{\"Error\": \"Bad email or username\"}";
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>