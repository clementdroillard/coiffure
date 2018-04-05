 <?php
 	//connexion a notre api
 	$api = 'http://127.0.0.1:8000/api/';


 	//actualisation des informations du compte client
 	if(isset($_SESSION['prenom']))
 	{
 		$client = json_decode(file_get_contents($api."client/".$_SESSION['id']));
 		$_SESSION['prenom'] = $client->prenom;
 		$_SESSION['nom'] = $client->nom;
 		$_SESSION['mail'] = $client->adresseMail;
 		$_SESSION['telephone'] = $client->telephone;
 	}

 	//actualisation des informations du compte salon
 	if(isset($_SESSION['libelle']))
	{
		$salon = json_decode(file_get_contents($api."salon/".$_SESSION['id']));
 		$_SESSION['libelle'] = $salon->libelle;
 		$_SESSION['CP'] = $salon->CP;
 		$_SESSION['ville'] = $salon->ville;
 		$_SESSION['adresse'] = $salon->adresse;
 		$_SESSION['adresseMail'] = $salon->adresseMail;
 		$_SESSION['telephone'] = $salon->telephone;
	}

 ?>