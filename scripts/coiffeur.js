
function ajoutCoiffeur(){
    document.getElementById("info").style.display = "none" ;
    const nomTaille = verifChamp(document.getElementById("nom"));
    const prenomTaille  = verifChamp(document.getElementById("prenom"));
    const specialiteTaille  = verifChamp(document.getElementById("specialite"));
   
    if(nomTaille && prenomTaille && specialiteTaille)
        postCoiffeur();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

function postCoiffeur(){
    document.getElementById("infoOk").style.display = "none" ;
    const nom = document.getElementById("nom").value;
    const prenom  = document.getElementById("prenom").value;
    const specialite  = document.getElementById("specialite").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"coiffeur", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("nom="+nom+"&prenom="+prenom+"&specialite="+specialite+"&salon_id="+salonId);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOk").style.display = "" ;
        }
    };
}