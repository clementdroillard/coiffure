 <?php	

  	//connexion a notre base de donnee
 	include("../connexion.php");
 	parse_str(file_get_contents("php://input"),$_PUT);
 	if(isset($_PUT["valider"]) && isset($_PUT["id"]) && is_numeric($_PUT["id"]) && is_numeric($_PUT["valider"]) ){
 		$id = $_PUT["id"];
 		$valider = $_PUT["valider"];
 		//on change la valeur de la validation 
 		$valider = (boolval(!$valider) ? 1 : 0);
 		//on met cette valeur dans la bdd
 		$requete = json_decode(file_get_contents($api.'todo/valider/'.$id.'/'.$valider));
 		// on revoie le bon code http
 		if($requete == "1")
 		{
 			http_response_code(200);
 		}
 		else
 		{
 			http_response_code(503);
 		}
 	}
 	else
 	{
 		http_response_code(500);
 	}

 ?>