<?php
session_start();
header("Content-Type: application/json");

if (isset($_SESSION['id']))
  {
    if (isset($_POST['type']) && !empty($_POST['type']))
      {
	if ($_POST['type'] == "folder")
	  {
	    
	    if (isset($_POST['video_id']) && !empty($_POST['video_id']) &&
		isset($_POST['container_id']) && !empty($_POST['container_id']))
	      {
		$db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
		
		$prepared = $db->prepare('CALL video_exist(:video_id)');
		$prepared->execute(array('video_id' => $_POST['video_id']));
		$info = $prepared->fetch();
		if ($info['occurency'] >= 1)
		  {
		    $prepared = $db->prepare('CALL get_folder(:container_id)');
		    $prepared->execute(array('container_id' => $_POST['container_id']));
		    $info = $prepared->fetch();
		    if ($info['owner'] == $_SESSION['id'])
		      {
			$prepared = $db->prepare('CALL move_from_buffer_to_folder(:video_id, :container_id);');
			$prepared->execute(array('video_id' => $_POST['video_id'],
						 'container_id' => $_POST['container_id']));
			$db = null;
		      }
		    else
		      echo "{\"Error\": \"This is not your folder\"}";
		  }
		else
		  echo "{\"Error\": \"This video doesn't exist\"}";
	      }
	    else
	      echo "{\"Error\": \"Bad request, missing parameters\"}";
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
		$prepared = $db->prepare('CALL video_exist(:video_id)');
		$prepared->execute(array('video_id' => $_POST['video_id']));
		$info = $prepared->fetch();
		if ($info['occurency'] >= 1)
		  {
		    $prepared = $db->prepare('CALL can_add_in_channel(:container_id, :date_begin)');
		    $prepared->execute(array('container_id' => $_POST['container_id'],
					     'date_begin' => $_POST['date_begin']));
		    $info = $prepared->fetch();
		    if ($info['occurency'] == 0 && $_POST['date_end'] > $_POST['date_begin'])
		      {
			$prepared = $db->prepare('CALL get_channel(:container_id)');
			$prepared->execute(array('container_id' => $_POST['container_id']));
			$info = $prepared->fetch();
			if ($info['owner'] == $_SESSION['id'])
			  {
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
			  echo "{\"Error\": \"This is not your channel\"}";
		      }
		    else
		      echo "{\"Error\": \"Video already to this date\"}";
		  }
		else
		  echo "{\"Error\": \"This video doesn't exist\"}";
	      }
	    else
	      echo "{\"Error\": \"Bad request, missing parameters\"}";
	  }
	else
	  echo "{\"Error\": \"Bad request, unknow type\"}";
      }
    else
      echo "{\"Error\": \"You are not connected\"}";
  }
else
  echo "{\"Error\": \"You aren't connected\"}";
?>