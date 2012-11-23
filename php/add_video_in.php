
<?php
session_start();
header("Content-Type: application/json");

if (isset($_POST['type']) && !empty($_POST['type']))
  {
    if ($_POST['type'] == "folder")
      {
	if (isset($_POST['video_id']) && !empty($_POST['video_id']) &&
	    isset($_POST['container_id']) && !empty($_POST['container_id']))
	  {
	    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
	    $prepared = $db->prepare('CALL move_from_buffer_to_folder(:video_id, :container_id);');
	    $prepared->execute(array('video_id' => $_POST['video_id'],
				     'container_id' => $_POST['container_id']));
	    $db = null;
     	  }
	else
	  echo "{\"Error\": \"Bad request\"}";
      }
    else if ($_POST['type'] == "channel")
      {
	if (isset($_POST['video_id']) && !empty($_POST['video_id']) &&
	    isset($_POST['container_id']) && !empty($_POST['container_id']) &&
	    isset($_POST['date_begin']) && !empty($_POST['date_begin']) &&
	    isset($_POST['date_end']) && !empty($_POST['date_end']) &&
	    isset($_POST['offset']) && !empty($_POST['offset']))
	  {
	    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
	    $prepared = $db->prepare('CALL move_from_buffer_to_channel(:video_id, :container_id,
 :date_begin, :date_end, :offset);');
	    $prepared->execute(array('video_id' => $_POST['video_id'],
				     'container_id' => $_POST['container_id'],
				     'date_begin' => $_POST['date_begin'],
				     'date_end' => $_POST['date_end'],
				     'offset' => $_POST['offset']));
	    $db = null;
	  }
	else
	  echo "{\"Error\": \"Bad request\"}";
      }
    else
      echo "{\"Error\": \"Bad request\"}";
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>