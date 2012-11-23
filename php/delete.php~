<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['id']) && !empty($_POST['id']) &&
    isset($_POST['type']) && !empty($_POST['type']))
  {
    if ($_POST['type'] == "video" || $_POST['type'] == "folder" ||
	$_POST['type'] == "channel" || $_POST['type'] == "user")
      delete_folder($_POST['type'], $_POST['id']);
    else
      echo "{\"Error\": \"Bad request\"}";
  }
else
  echo "{\"Error\": \"Bad request\"}";


function delete_folder($type, $id)
{
  $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
  if ($type == "folders")
    {
      $prepared = $db->prepare('CALL get_folder_content(:id)');
      $prepared->execute(array('id' => $id));
      $section = array("folder", "channel");
      foreach($section as $i)
	{
	  while($line = $prepared->fetch(PDO::FETCH_ASSOC))
	    delete_folder($i, $line['id']);
	  $prepared->nextRowset();
	}
      $prepared = $db->prepare('CALL delete_folder(:id)'); */
      $prepared->execute(array('id' => $id)); */
   }
  else if ($type == "channel")
    {
      $prepared = $db->prepare('CALL delete_channel(:id)');
      $prepared->execute(array('id' => $id));
    }
  else if ($type == "video")
    {
      $prepared = $db->prepare('CALL delete_video(:id)');
      $prepared->execute(array('id' => $id));
    }
  else if ($type == "user")
    {
      $prepared = $db->prepare('CALL get_user_informations(:id);');
      $prepared->execute(array('id' => $id));
      $data = $prepared->fetch(PDO::FETCH_ASSOC);
      delete_folder("folder", $data['folders_id']);
      $prepared = $db->prepare('CALL delete_user(:id);');
      $prepared->execute(array('id' => $id));
    }
  else
    echo "{\"Error\": \"Bad request\"}";
  $db = null;
}
?>