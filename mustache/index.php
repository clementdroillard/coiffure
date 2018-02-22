 <?php
 	require '../vendor/autoload.php';
 	Mustache_Autoloader::register();
 	session_start();
 	include("connexion.php");

 	if(isset($_SESSION['prenom']))
 	{
 		header('Location: client.php');
 	}

	$m = new Mustache_Engine(array(
    	'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/views'),
	));
	//affichage de notre vue 
 	echo $m->render('index' ,array('api'=>$api));

 ?>
