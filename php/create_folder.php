<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['name']) && !empty($_POST['name']) &&
    isset($_POST['description']) && !empty($_POST['description']) &&
    isset($_POST['image']) && !empty($_POST['image']) &&
    isset($_POST['folder_id']) &&!empty($_POST['folder_id']))
  {
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL add_user(:username, :firstname, :lastname, :email, :password)');
    $prepared->execute(array('username' => $_POST['username'], 
			     'firstname' => "",
			     'lastname' => "",
			     'email' => $_POST['email'],
			     'password' => $_POST['password']));
    $prepared->execute(array('username' => $_POST['username']));
    $info = $prepared->fetch();
    $db = null;
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>