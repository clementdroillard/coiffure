 <?php
 	require '../vendor/autoload.php';
 	Mustache_Autoloader::register();
 	session_start();
 	//connexion a notre api
 	include("connexion.php");

 	//la variable saisies prend les valeurs de la table saisie 
 	if(!isset($_POST['salon']))
 	{
 		if(!isset($_SESSION['libelle']))
 		{
 			 header('Location: ../index.php');
 		}
 	}
 	else
 	{
 		$salon = json_decode($_POST['salon']);
 		$_SESSION['libelle'] = $salon->libelle;
 		$_SESSION['CP'] = $salon->CP;
 		$_SESSION['ville'] = $salon->ville;
 		$_SESSION['adresse'] = $salon->adresse;
 		$_SESSION['adresseMail'] = $salon->adresseMail;
 		$_SESSION['telephone'] = $salon->telephone;
 		$_SESSION['id'] = $salon->id;
 	}

	$m = new Mustache_Engine(array(
    	'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/views'),
	));
	//affichage de notre vue 
 	echo $m->render('salon' ,array('libelleSalon'=>$_SESSION['libelle'],'idSalon'=>$_SESSION['id'],'api'=>$api));

 ?>

