<?php
session_start();
if (isset($_SESSION['id']))
  {
    session_destroy();
    require("index.php");
  }
?>