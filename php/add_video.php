<?php
session_start();
header("Content-Type: application/json");
if(isset($_SESSION['id']) &&
   isset($_POST['name']) && !empty($_POST['name']) &&
   isset($_POST['description']) && !empty($_POST['description']) &&
   isset($_POST['image']) && !empty($_POST['image']) &&
   isset($_POST['video']) && !empty($_POST['video']))
  {
    if (isset($_POST['live']) && !empty($_POST['live']))
      $live = $_POST['live'];
    else
      $live = 0;
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL add_video(:name, :description, :image, :video, :live, :user_id)');
    $prepared->execute(array('name' => $_POST['name'],
			     'description' => $_POST['description'],
			     'image' => $_POST['image'],
			     'video' => $_POST['video'],
			     'live' => $live,
			     'user_id' => $_SESSION['id']));
    $db = null;
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>
