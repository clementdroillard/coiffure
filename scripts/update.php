 <?php	

  	//connexion a notre base de donnee
 	include("../connexion.php");
 	parse_str(file_get_contents("php://input"),$_PUT);
 	if(isset($_PUT["update"]) && isset($_PUT["id"]))
 	{
 		if($_PUT["update"] != $_PUT["old"])
 		{
	 		$id = $_PUT["id"];
	 		$update = urlencode($_PUT["update"]); 
	 		//on met cette valeur dans la bdd
	 		$requete = json_decode(file_get_contents($api.'todo/update/'.$id.'/'.$update));
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
 			http_response_code(200);
 		}
 	}
 	else
 	{
 		http_response_code(500);
 	}

 ?>