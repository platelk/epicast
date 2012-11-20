<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['id']) && isset($_POST['id']))
  {
    echo "{\n";
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_folder_content(:id)');
    $prepared->execute(array('id' => $_POST['id']));
    $section = array("folders", "channels", "videos");
    $j = 0;
    foreach($section as $i)
      {
	if ($j != 0)
	  echo ",";
	echo "\"" . $i . "\":\n[\n";
	$i = 0;
	while($ligne = $prepared->fetch(PDO::FETCH_ASSOC))
	  {
	    if ($i != 0)
	      echo ",\n";
	    echo json_encode($ligne);
	    $i++;
	  }
	$prepared->nextRowset();
	echo "\n]\n";
	$j++;
      }
    echo "}";
  }
else
  echo "{Error: Bad request}";
?>
