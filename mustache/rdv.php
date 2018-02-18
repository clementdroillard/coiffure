 <?php
 	require '../vendor/autoload.php';
 	Mustache_Autoloader::register();
 	session_start();

 	if(!isset($_SESSION['prenom']))
 	{
 		header('Location: ../index.html');
 	}

	$m = new Mustache_Engine(array(
    	'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/views'),
	));
	//affichage de notre vue 
 	echo $m->render('rdv' ,array('prenomClient'=>$_SESSION['prenom'],'nomClient'=>$_SESSION['nom'],'mailClient'=>$_SESSION['mail'],'idClient'=>$_SESSION['id']));

 ?>

