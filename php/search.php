<?php
header("Content-Type: application/json");
if (isset($_POST['req']) && !empty($_POST['req']))
  {
    $bdd = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $answer = $bdd->prepare('CALL dynamic_search(:req)');
    $answer->execute(array('req' => $_POST['req']));
    $i = 0;
    echo '[';
    while ($data = $answer->fetch(PDO::FETCH_ASSOC))
      {
      	if ($i != 0)
      	  echo ",";
	echo json_encode($data);
      	$i++;
      }
    echo ']';
    $bdd = null;
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>
