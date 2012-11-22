<?php
// how to use this: posibiliter de POST ou de $username pour un require.
header("Content-Type: application/json");
if (isset($_POST['username']) && !empty($_POST['username']))
  $username = $_POST['username'];
if (isset($username) && !empty($username))
  {
    $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
    $prepared = $db->prepare('CALL get_information_by_name(:username)');
    $prepared->execute(array('username' => $username));
    $data = $prepared->fetch(PDO::FETCH_ASSOC);
    echo json_encode($data);
    $db = null;
  }
else
  echo "{ \"Error\": \"Bad request\" }";