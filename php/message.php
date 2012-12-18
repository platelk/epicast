<?php
session_start();

header("Content-Type: application/json");
if (isset($_POST['action']) && !empty($_POST['action']))
  {
    if ($_POST['action'] == "add" && isset($_SESSION['id']) &&
	isset($_POST['message']) && !empty($_POST['message']) &&
	isset($_POST['id_message_channel']) && !empty($_POST['id_message_channel']))
      {
	if (isset($_POST['id_parent']) && !empty($_POST['id_parent']))
	  $id_parent = $_POST['id_parent'];
	else
	  $id_parent = -1;
	add_message($_POST['message'], $_POST['id_message_channel'], $id_parent);
      }
    else if ($_POST['action'] == 'delete' && isset($_SESSION['id']) &&
	     isset($_POST['id']))
      delete_message($_POST['id']);
    else if ($_POST['action'] == "get" && 
	     isset($_POST['id_message_channel']) &&
	     isset($_POST['nbr']) && 
	     isset($_POST['begin']))
      get_message($_POST['id_message_channel'], $_POST['nbr'], $_POST['begin']);
    /* else if ($_POST['action'] == "create" &&
	     isset($_POST['name']) && !empty($_POST['name']) &&
	     isset($_POST['description']) && !empty($_POST['description']))
      create_message_channel($_POST['name'], $_POST['description']);
    */
    else
      echo "{\"Error\": \"Bad request\"}";
  }
else
  echo "{\"Error\": \"Bad action\"}";


function add_message($message, $id_message_channel, $id_parent)
{
  if (isset($_SESSION['id']))
    {
      $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
      $prepared = $db->prepare('CALL check_message(:id_channel, :id_parent)');
      $prepared->execute(array('id_channel' => $id_message_channel,
			       'id_parent' => $id_parent));
      $info = $prepared->fetch();
      if ($info['occurency'] > 0)
	{
	  $prepared = $db->prepare("CALL add_message(:user_id, :content, :id_parent, :id_message_channel);");
	  $prepared->execute(array('user_id' => $_SESSION['id'],
				   'content' => $message,
				   'id_parent' => $id_parent,
				   'id_message_channel' => $id_message_channel));
	  $db = null;
	}
      else
	echo "{\"Error\": \"channel id or parent id unknow\"}";
    }
  else
      echo "{\"Error\": \"You are not connected\"}";
}

function delete_message($id)
{
  if (isset($_SESSION['id']))
    {
      $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
      $prepared = $db->prepare('CALL get_message_by_id(:id)');
      $prepared->execute(array('id' => $id));
      $info = $prepared->fetch();
      if ($info['user_id'] == $_SESSION['id'])
	{
	  $prepared = $db->prepare("CALL delete_message(:id);");
	  $prepared->execute(array('id' => $id));
	  $db = null;
	}
      else
	echo "{\"Error\": \"This is not your message\"}";
    }
  else
    echo "{\"Error\": \"You are not connected\"}";
}

function get_message($id_message_channel, $nbr, $begin)
{
  $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
  $prepared = $db->prepare("CALL get_message(:id_message_channel, :nbr, :begin);");
  $prepared->execute(array('id_message_channel' => $id_message_channel,
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
/*
function create_message_channel($name, $description)
{
 
  //secu a faire la dessus ---> groupe admin ou droits attribue a chaque pocesseur de video,channel,folder
  $db = new PDO('mysql:host=localhost;dbname=test', 'root', '');
  $prepared = $db->prepare("CALL create_message_channel(:name, :description);");
  $prepared->execute(array('name' => $name,
			   'description' => $description));
  $ligne = $prepared->fetch(PDO::FETCH_ASSOC);
  echo json_encode($ligne);
  $db = null;
  }*/