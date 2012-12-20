<?php
header("Content-Type: application/json");
if (isset($_POST['req']) && !empty($_POST['req']))
  {
    $ar = array(
		'SELECT username AS users FROM users WHERE username LIKE "'.$_POST['req'].'%"',
		'SELECT name AS videos FROM videos WHERE name LIKE "'.$_POST['req'].'%"',
		);
    $bdd = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    echo '[';
    for ($p = 0; $p != 1; $p++)
      {
	$answer = $bdd->prepare($ar[$p]);
	$answer->execute(array('req' => $_POST['req']));
	$i = 0;
	while ($data = $answer->fetch(PDO::FETCH_ASSOC))
	  {
	    if ($i != 0)
	      echo ",";
	    echo json_encode($data);
	    $i++;
	  }
      }
    echo ']';
    $bdd = null;
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>
