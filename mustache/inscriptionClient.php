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
	if(isset($_SESSION['nomDeCompte']))
	{
		echo $m->render('inscriptionClient' ,array('libelleSalon'=>$_SESSION['libelle'],'nomDeCompteSalon'=>$_SESSION['nomDeCompte'],'idSalon'=>$_SESSION['id'],'api'=>$api));
	}
	else
	{
		echo $m->render('inscriptionClient' ,array("api"=>$api));
	}
 	
 ?>
