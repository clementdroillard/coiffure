 <?php
 	require '../vendor/autoload.php';
 	Mustache_Autoloader::register();
 	session_start();

 	//la variable saisies prend les valeurs de la table saisie 
 	if(!isset($_POST['client']))
 	{
 		if(!isset($_SESSION['prenom']))
 		{
 			 header('Location: ../index.php');
 		}
 	}
 	else
 	{
 		$client = json_decode($_POST['client']);
 		$_SESSION['prenom'] = $client->prenom;
 		$_SESSION['nom'] = $client->nom;
 		$_SESSION['mail'] = $client->adresseMail;
 		$_SESSION['id'] = $client->id;
 	}

	$m = new Mustache_Engine(array(
    	'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/views'),
	));
	//affichage de notre vue 
 	echo $m->render('client' ,array('prenomClient'=>$_SESSION['prenom'],'nomClient'=>$_SESSION['nom'],'mailClient'=>$_SESSION['mail'],'idClient'=>$_SESSION['id']));

 ?>

