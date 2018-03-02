 <?php
 	require '../vendor/autoload.php';
 	Mustache_Autoloader::register();
 	session_start();
 	include("connexion.php");

 	if(isset($_SESSION['nomDeCompte']))
 	{
 		header('Location: salon.php');
 	}

	$m = new Mustache_Engine(array(
    	'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/views'),
	));
	//affichage de notre vue 
 	echo $m->render('inscriptionSalon' ,array("api"=>$api));

 ?>
