 <?php
 	 //connexion a notre base de donnee
 	include("../connexion.php");
 	//on vérifie si il y a eu une saisie 
 	if(isset($_POST["insert"]))
 	{
 		//contient la valeur qui vient d'etre saisie au format html
 		$valeur = urlencode($_POST["insert"]); 
 		//insertion de la valeur dans la base
 		$requete = json_decode(file_get_contents($api.'todo/insert/'.$valeur));
 		
 		// on revoie le bon code http
 		if($requete == "1")
 		{
 			http_response_code(200);
 			// on recupere l'id de l'insertion
 			$id = json_decode(file_get_contents($api.'todo/maxID'));
 			echo $id[0]->max;
 		}
 		else
 		{
 			//http_response_code(503);
 		}
 	}
 	else
 	{
 		http_response_code(500);
 	}


 ?>