 <?php
 	require '../vendor/autoload.php';
 	Mustache_Autoloader::register();
 	session_start();
 	//connexion a notre api
 	include("connexion.php");

 	if(!isset($_SESSION['nomDeCompte']))
 	{
 		header('Location: ../index.php');
 	}

	$m = new Mustache_Engine(array(
    	'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/views'),
	));
	
	//affichage de notre vue 
 	echo $m->render('coiffeur' ,array('libelleSalon'=>$_SESSION['libelle'],'idSalon'=>$_SESSION['id'],'api'=>$api));

 ?>

