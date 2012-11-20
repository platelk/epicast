<?php
header("Content-Type: application/json");
if (isset($_POST['id']) && !empty($_POST['id']))
  $a_id = $_POST['id'];
else if (isset($user_id) && !empty($user_id))
  $a_id = $user_id;
if (isset($a_id))
  {
    echo "{\n";
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_folder_from_user(:id)');
    $prepared->execute(array('id' => $a_id));
    $section = array("folders", "channels", "videos");
    foreach($section as $i)
      {
	echo $i . ":\n[\n";
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
      }
    echo "}";
  }
else
  echo "{ Error: Bad request }";