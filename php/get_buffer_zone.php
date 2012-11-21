<?php
header("Content-Type: application/json");
if (isset($_POST['id']) && !empty($_POST['id']))
  $a_id = $_POST['id'];
else if (isset($user_id) && !empty($user_id))
  $a_id = $user_id;
if (isset($a_id))
  {
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_buffer_zone(:id)');
    $prepared->execute(array('id' => $a_id));
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