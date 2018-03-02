function inscription(){
    document.getElementById("info").style.display = "none" ;
    var mailOk = verifMail(document.getElementById("adresseMail"));
    var tailleNom  = verifChamp(document.getElementById("nom"));
    var taillePrenom  = verifChamp(document.getElementById("prenom"));
    var tailleMail  = verifChamp(document.getElementById("adresseMail"));
    var tailleMotDePasse  = verifChamp(document.getElementById("motDePasse"));
   
    if(mailOk && tailleNom && taillePrenom && tailleMail && tailleMotDePasse)
        inscriptionPost();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

function inscriptionPost(){
    document.getElementById("infoInscription").style.display = "none" ;
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("adresseMail").value;
    const pass = document.getElementById("motDePasse").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"client", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("adresseMail="+email+"&motDePasse="+pass+"&nom="+nom+"&prenom="+prenom);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        //le mail est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            const client = xhr.responseText;
            document.getElementById("clientValue").value = client;
            document.getElementById("postClient").submit();
        }
        //le mail est mauvais
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("infoInscription").style.display = "" ;
        }
    };
}