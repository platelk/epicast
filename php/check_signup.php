<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['type']) && !empty($_POST['type']))
  {
    $no = 0;
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');	
    if ($_POST['type'] == "username")
      {
	$a_username = $_POST['username'];
	$a_email = NULL;
	$a_type = "username";
      }
    else if ($_POST['type'] == "email")
      {
	$a_username = NULL;
	$a_email =$_POST['email'];
	$a_type = "email";
      }
    else if ($_POST['type'] == "all")
      {
	$a_username = $_POST['username'];
	$a_email = $_POST['email'];
	$a_type = "all";
      }
    else
      $no = 1;
    if ($no == 0)
      {
	$prepared = $db->prepare('CALL check_signup(:username, :email, :type)');
	$prepared->execute(array('username' => $a_username,
				 'email' => $a_email,
				 'type' => $a_type));
	$info = $prepared->fetch();
	if ($info['occurency'] > 0)
	  echo "{\"Error\": \"Already exist\"}";
	else
	  echo "{\"Statut\": \"OK\"}";
      }
    else
      echo "{\"Error\": \"Bad request\"}";
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>