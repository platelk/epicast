<?php
session_start();
if (isset($_SESSION['id']))
  session_destroy();
else
  echo "{\"Error\": \"Bad request\"}";
?>