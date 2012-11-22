<?php
header("Content-Type: application/json");
if (isset($user_id) && !empty($user_id))
  {
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_user_informations(:id)');
    $prepared->execute(array('id' => $user_id));
    $data = $prepared->fetch(PDO::FETCH_ASSOC);
    echo json_encode($data);
    $db = null;
  }
else
  echo "{ \"Error\": \"Bad request\" }";