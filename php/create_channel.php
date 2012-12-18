<?php
session_start();
header("Content-Type: application/json");
if(isset($_SESSION['id']) &&
   isset($_POST['name']) && !empty($_POST['name']) &&
   isset($_POST['description']) && !empty($_POST['description']) &&
   isset($_POST['image']) && !empty($_POST['image']) && 
   isset($_POST['folder_id']))
  {
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_folder(:id)');
    $prepared->execute(array('id' => $_POST['folder_id']));
    $info = $prepared->fetch();
    if ($info['owner'] == $_SESSION['id'])
      {
	$prepared = $db->prepare('CALL create_channel(:name, :description, :image, :owner, :folder_id)');
	$prepared->execute(array('name' => $_POST['name'],
				 'description' => $_POST['description'],
				 'image' => $_POST['image'],
				 'owner' => $_SESSION['id'],
				 'folder_id' => $_POST['folder_id']));
	$db = null;
      }
    else
      echo "{\"Error\": \"This is not your folder\"}";
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>
