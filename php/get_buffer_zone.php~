<?php
header("Content-Type: application/json");
if (isset($_SESSION['id']))
  {
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_buffer_zone(:id)');
    $prepared->execute(array('id' => $_SESSION['id']));
    echo "{\n\"buffer_zone\":\n[\n";
    $n = 0;
    while ($data = $prepared->fetch(PDO::FETCH_ASSOC))
      {
	if ($n != 0)
	  echo ",";
	echo json_encode($data);
	$n++;
      }
    echo "\n]\n}";
    $db = null;
  }
else
  echo "{\"Error\": \"Bad request\" }";
