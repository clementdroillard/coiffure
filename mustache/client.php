 <?php

 	require '../vendor/autoload.php';
 	Mustache_Autoloader::register();

 	//la variable saisies prend les valeurs de la table saisie 
 	$client = json_decode($_POST['client']);

	$m = new Mustache_Engine(array(
    	'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/views'),
	));
	//affichage de notre vue 
 	echo $m->render('client' ,array('client'=>$client));

 ?>

