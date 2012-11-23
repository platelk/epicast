<?php
session_start();
// pour utiliser cette page passez en POST une  variable action qui contiendra l'action a effectuer: add, get, delete. la gestion des droit n'est pas encore en place.
// pour add un message il faut passe en POST le message, l'id de la video ou se trouve le tchat, et l'id du message parent(si il s'agit d'une reponse a un message) si il n'a pas de parent passez null a la place.

header("Content-Type: application/json");
if (isset($_POST['action']) && !empty($_POST['action']))
  {
    if ($_POST['action'] == "add" && isset($_SESSION['id']) && 
	isset($_POST['message']) && !empty($_POST['message']) &&
	isset($_POST['aim_id']) && !empty($_POST['aim_id']) && isset($_POST['id_parent']))
      add_message($_POST['message'], $_POST['aim_id'], $_POST['id_parent']);
    else if ($_POST['action'] == 'delete' && isset($_SESSION['id']) &&
	     isset($_POST['id']) && !empty($_POST['id']))
      delete_message($_POST['id']);
    else if ($_POST['action'] == "get" &&
	     isset($_POST['type']) && !empty($_POST['type']) &&
	     isset($_POST['aim_id']) && !empty($_POST['aim_id']) &&
	     isset($_POST['nbr']) && !empty($_POST['nbr']) &&
	     isset($_POST['begin']) && !empty($_POST['begin']))
      get_message($_POST['type'], $_POST['aim_id'], $_POST['nbr'], $_POST['begin']);
    else
      echo "{\"Error\": \"Bad request\"}";
  }
else
  echo "{\"Error\": \"Bad request\"}";


function add_message($message, $aim_id, $id_parent)
{
  $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
  $prepared = $db->prepare("CALL add_message(:user_id, :content, :id_parent, :aim_id);");
  $prepared->execute(array('user_id' => $_SESSION['id'], 
			   'content' => $message,
			   'id_parent' => $id_parent,
			   'aim_id' => $aim_id));
  $db = null;
}

function delete_message($id)
{
  $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
  $prepared = $db->prepare("CALL delete_message(:id);");
  $prepared->execute(array('id' => $id));
  $db = null;
}

function get_message($type, $aim_id, $nbr, $begin)
{
  $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
  $prepared = $db->prepare("CALL get_message(:type, :aim_id, :nbr, :begin);");
  $prepared->execute(array('type' => $type, 
			   'aim_id' => $aim_id,
			   'nbr' => $nbr,
			   'begin' => $begin));
  echo "{\n";
  echo "\"messages\":\n[\n";
  $i = 0;
  while($ligne = $prepared->fetch(PDO::FETCH_ASSOC))
    {
      if ($i != 0)
	echo ",\n";
      echo json_encode($ligne);
      $i++;
    }
  echo "\n]\n";
  echo "}";
  $db = null;
}