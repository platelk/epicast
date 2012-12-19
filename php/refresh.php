<?php
session_start();
header("Content-Type: application/json");
if (isset($_SESSION['id']))
  {
    $user_id = $_SESSION['id'];
    echo "{\n\"user\":\n";
    require("get_user_info.php");
    echo "\n";
    echo ",\"folder\":\n";
    require("get_folder_from_user.php");
    echo "\n}";
  }
else
  echo "{\"Error\": \"Bad request\"}";
?>