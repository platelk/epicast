<?php
session_start();
header("Content-Type: application/json");
if(isset($_SESSION['id']) &&
   isset($_POST['name']) && !empty($_POST['name']) &&
   isset($_POST['description']) && !empty($_POST['description']) &&
   isset($_POST['image']) && !empty($_POST['image']) &&
   isset($_POST['video']) && !empty($_POST['video']) &&
   isset($_POST['live']) && !empty($_POST['live']))
  {
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL add_video(:name, :description, :image, :video, :live, :user_id)');
    $prepared->execute(array('name' => $_POST['name'],
			     'description' => $_POST['description'],
			     'image' => $_POST['image'],
			     'video' => $_POST['video'],
			     'live' => $_POST['live'],
			     'user_id' => $_SESSION['id']));
    $user_id = $_SESSION['id'];
    $db = null;
    require("get_buffer_zone.php");
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>
