<?php
session_start();
header("Content-Type: application/json");
if(isset($_SESSION['id']) &&
   isset($_FILES['video']) && 
   isset($_POST['name']) && !empty($_POST['name']) &&
   isset($_POST['description']) && !empty($_POST['description']) &&
   isset($_POST['image']) && !empty($_POST['image']) &&
   isset($_POST['live']) && !empty($_POST['live']))
  {
    $exts = array('.avi', '.mpg', '.mpeg', '.mp4');
    $ext = strrchr($_FILES['video']['name'], '.');
    if(in_array($ext, $exts))
      {
	$folder_name = 'upload/video/';
	$file_name = time() . "." . $_SESSION['id'];
	if(move_uploaded_file($_FILES['video']['tmp_name'], $folder_name . $file_name))
	  {
	    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
	    $prepared = $db->prepare('CALL add_video(:name, :description, :image, :video, :live, :user_id)');
	    $prepared->execute(array('name' => $_POST['name'],
				     'description' => $_POST['description'],
				     'image' => $_POST['image'],
				     'video' => $file_name,
				     'live' => $_POST['live'],
				     'user_id' => $_SESSION['id']));
	    $user_id = $_SESSION['id'];
	    require("get_buffer_zone.php");
	  }
	else
	  echo "{Error: Upload fail)";
      }
    else "{Error: Bad file type}";
  }
else
  echo "{Error: Bad request}";
?>
