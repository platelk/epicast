<?php
session_start();
header("Content-Type: application/json");
if (!isset($_SESSION['id']))
  {
    if (isset($_POST['username']) && isset($_POST['password']))
      {
	$db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
	$prepared = $db->prepare('SELECT * FROM users WHERE username = :username');
	$prepared->execute(array('username' => $_POST['username']));
	$info = $prepared->fetch();
	if ($info['password'] == md5($_POST['password']))
	  {
	    $_SESSION['username'] = $info['username'];
	    $_SESSION['id'] = $info['id'];
	    $user_id = $info['id'];
	    echo "{\n\"user\":\n";
	    require("get_user_info.php");
	    echo "\n";
	    echo ",\"folder\":\n";
	    require("get_folder_from_user.php");
	    echo "\n}";
	  }
	else
	  echo "{\"Error\": \"Bad Password\"}";
	$db = null;
      }
    else
      echo "{\"Error\": \"Bad request\"}";
  }
  else
    echo "{\"Error\": \"Bad request\"}";
?>