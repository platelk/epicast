<?php
session_start();
header("Content-Type: application/json");
if (isset($_SESSION['id']))
  {
    if (isset($_POST['elm_type']) && !empty($_POST['elm_type']) &&
	isset($_POST['container_id']) &&
	isset($_POST['elm_id']) &&
	isset($_POST['n_pos_x']) &&
	isset($_POST['n_pos_y']))
      {
	$db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
	$prepared = $db->prepare('CALL get_folder(:id)');
	$prepared->execute(array('id' => $_POST['container_id']));    
	$info = $prepared->fetch();
	if ($info['owner'] == $_SESSION['id'] && 
	    $_POST['elm_type'] == "video" || 
	    $_POST['elm_type'] == "folder" || 
	    $_POST['elm_type'] == "channel")
	  {
	    $prepared = $db->prepare('CALL move(:type, :x, :y, :elm_id, :cont_id)');
	    $prepared->execute(array('type' => $_POST['elm_type'],
				     'x' => $_POST['n_pos_x'],
				     'y' => $_POST['n_pos_y'],
				     'elm_id' => $_POST['elm_id'],
				     'cont_id' => $_POST['container_id']));
	  }
	else
	  echo "{\"Error\": \"This is not your folder\"}";
      }
    else
      echo "{\"Error\": \"Bad request\"}";
  }
else
  echo "{\"Error\": \"You aren't connected\"}";
?>