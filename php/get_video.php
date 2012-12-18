<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['id']) && !empty($_POST['id']))
  {
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_video(:id)');
    $prepared->execute(array('id' => $_POST['id']));
    $data = $prepared->fetch(PDO::FETCH_ASSOC);
    if ($data == false)
      echo "{\"Error\": \"Video doesn't exist\"}";
    else
      echo json_encode($data);
    $db = null;
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>
