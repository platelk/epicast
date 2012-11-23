<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['elm_type']) && !empty($_POST['elm_type']) &&
    isset($_POST['container_id']) && !empty($_POST['container_id']) &&
    isset($_POST['elm_id']) && !empty($_POST['elm_id']) &&
    isset($_POST['n_pos_x']) && !empty($_POST['n_pos_x']) &&
    isset($_POST['n_pos_y']) && !empty($_POST['n_pos_y']))
  {
    if ($_POST['container_type'] == "folder")
      {
	$prepared = $db->prepare('CALL move(:type, :x, :y, :elm_id, :cont_id)');
	$prepared->execute(array('type' => $_POST['elm_type'],
				 'x' => $_POST['n_pos_x'],
				 'y' => $_POST['n_pos_y'],
				 'elm_id' => $_POST['elm_id'],
				 'container_id' => $_POST['container_id']));
      }
    else
      echo "{\"Error\": \'Bad request\"}";
  }

?>