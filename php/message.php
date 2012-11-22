<?php
session_start();
header("Content-Type: application/json");
if (isset($_POST['action']) && !empty($_POST['action']))
  {
    if ($_POST['action'] == "add" && isset($_SESSION['id']) && 
	isset($_POST['type']) && !empty($_POST['type']) &&
	isset($_POST['message']) && !empty($_POST['message']) &&
	isset($_POST['aim_src']) && !empty($_POST['aim_id']) && isset($_POST['id_parent']))
      add_message($_POST['type'], $_POST['message'], $_POST['aim_src'], $_POST['id_parent']);
    else if ($_POST['action'] == 'delete' && isset($_SESSION['id']) &&
	     isset($_POST['type']) && !empty($_POST['type']) &&
	     isset($_POST['id']) && !empty($_POST['id']))
      delete_message($_POST['type'], $_POST['id']);
    else if ($_POST['action'] == "get" &&
	     isset($_POST['type']) && !empty($_POST['type']) &&
	     isset($_POST['type']) && !empty($_POST['type']))
      get_messsage($_POST['type'] && $_POST['aim_id'], $_POST['nbr'], $_POST['begin']);
    else
      echo "{\"Error\": \"Bad request\"}";
  }
else
  echo "{\"Error\": \"Bad request\"}";


function add_message($type, $message, $aim_id, $id_parent)
{
  $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
  $prepared = $db->prepare("CALL add_message(:user_id, :content, :id_parent, :aim_id);");
  $prepared->execute(array('user_id' => $_SESSION['id'], 
			   'content' => $message,
			   'id_parent' => $id_parent,
			   'aim_id' => $aim_id));
  $db = null;
}

function delete_message($type, $id)
{
  $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
  $prepared = $db->prepare("CALL delete_message(:id);");
  $prepared->execute(array('id' => $_POST['id']));
  $db = null;
}

function get_message($type, $aim_id, $nbr, $begin)
{
  $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
  $prepared = $db->prepare("CALL get_message(:type, :aim_id, :nbr, :begin);");
  $prepared->execute(array('type' => $_POST['type'], 
			   'aim_id' => $_POST['aim_id'],
			   'nbr' => $_POST['nbr'],
			   'begin' => $_POST['begin']));
  $db = null;
}