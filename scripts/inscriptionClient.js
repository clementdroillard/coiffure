function inscription(){
    document.getElementById("info").style.display = "none" ;
    const mailOk = verifMail(document.getElementById("adresseMail"));
    const tailleNom  = verifChamp(document.getElementById("nom"));
    const taillePrenom  = verifChamp(document.getElementById("prenom"));
    const tailleMail  = verifChamp(document.getElementById("adresseMail"));
    const tailleMotDePasse  = verifChamp(document.getElementById("motDePasse"));
   
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

function inscriptionForSalon(){
    document.getElementById("info").style.display = "none" ;
    const mailOk = verifMail(document.getElementById("adresseMail"));
    const tailleNom  = verifChamp(document.getElementById("nom"));
    const taillePrenom  = verifChamp(document.getElementById("prenom"));
    const tailleMail  = verifChamp(document.getElementById("adresseMail"));
    const tailleMotDePasse  = verifChamp(document.getElementById("motDePasse"));
   
    if(mailOk && tailleNom && taillePrenom && tailleMail && tailleMotDePasse)
        inscriptionPostForSalon();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

function inscriptionPostForSalon(){
    document.getElementById("infoInscription").style.display = "none" ;
    document.getElementById("infoOK").style.display = "none" ;
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
            const client = JSON.parse(xhr.responseText);
                //on envoie la requete de connexion
            let xhr2 = new XMLHttpRequest();
            xhr2.open("POST", api+"salonClient/", true);
            xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr2.send("salon_id="+salonId+"&client_id="+client.id+"&validate=1&code=1");
            document.getElementById("infoOK").style.display = "" ;
        }
        //le mail est mauvais
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("infoInscription").style.display = "" ;
        }
    };
}