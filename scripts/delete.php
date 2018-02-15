 <?php
 	//connexion a notre base de donnee
 	include("../connexion.php");
 	parse_str(file_get_contents("php://input"),$_DELETE);
 	//on verifie si on a cliquee sur le bouton supprimer
 	if(isset($_DELETE["del"]) && is_numeric($_DELETE["del"])){
 		$id = $_DELETE["del"];
 		//on supprime la saisie souhaitee
 		$requete = json_decode(file_get_contents($api.'todo/delete/'.$id));
 		// on revoie le bon code http
 		if($requete == "1"){
 			http_response_code(200);
 		}
 		else
 		{
 			http_response_code(503);
 		}
 	}
 	else{
 		http_response_code(500);
 	}

 ?>