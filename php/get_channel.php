<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['id']) && isset($_POST['id']))
  {
    echo "{\n\"videos\":\n[\n";
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_channel_content(:id)');
    $prepared->execute(array('id' => $_POST['id']));
    $m = 0;
    while ($data = $prepared->fetch(PDO::FETCH_ASSOC))
      {
	if ($m != 0)
	  echo ",";
	echo json_encode($data);
	$m++;
      }
    echo "\n]\n}\n";
    $db = null;
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>
