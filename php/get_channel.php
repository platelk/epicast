<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['id']) && isset($_POST['id']))
  {
    echo "{\nvideos:\n[\n";
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_channel_content(:id)');
    $prepared->execute(array('id' => $_POST['id']));
    while ($data = $prepared->fetch(PDO::FETCH_ASSOC))
      echo json_encode($data);
    echo "\n]\n}\n";
  }
else
  echo "{Error: Bad request}";
?>
