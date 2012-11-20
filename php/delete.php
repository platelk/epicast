<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['id']) && !empty($_POST['id']) &&
    isset($_POST['type']) && !empty($_POST['type']))
  {
    if ($_POST['type'] == "videos" || $_POST['type'] == "folders" ||
	$_POST['type'] == "channels")
      {
	echo "CONNECT...\n";
	$db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
	echo "LET'S RECUSIVE...\n";
	delete_folder($_POST['type'], $_POST['id'], $db);
      }
    else
      echo "{Error: Bad request}";
  }
else
  echo "{Error: Bad request}";



function delete_folder($type, $id, $db)
{
  echo "=====> TYPE: " . $type . " ID: " . $id . "\n";
  if ($type == "folders")
    {
      echo $id . " |DELETE: FOLDERS\n";
      $prepared = $db->prepare('CALL get_folder_content(:id)');
      $prepared->execute(array('id' => $id));
      $section = array("folders", "channels", "videos");
      foreach($section as $i)
	{
	  $i = 0;
	  while($line = $prepared->fetch(PDO::FETCH_ASSOC))
	    {
	      echo $id . " |" . $i . " |line: " . $line['id'] . " " . $line['name'] . "\n";
	      delete_folder($i, $line['id'], $db);
	      $i++;
	    }
	  $prepared->nextRowset();
	}
      $prepared = $db->prepare('CALL delete_folder(:id)');
      $prepared->execute(array('id' => $id));
    }
  else if ($type == "channels")
    {
      echo $id . " |DELETE: CHANNELS\n";
      $prepared = $db->prepare('CALL delete_channel(:id)');
      $prepared->execute(array('id' => $id));
    }
}
?>