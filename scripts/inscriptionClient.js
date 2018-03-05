//fonction de controle de saisie de l'inscription d'un client
function inscription(){
    document.getElementById("info").style.display = "none" ;
    const mailOk = verifMail(document.getElementById("adresseMail"));
    const tailleNom  = verifChamp(document.getElementById("nom"));
    const taillePrenom  = verifChamp(document.getElementById("prenom"));
    const tailleMail  = verifChamp(document.getElementById("adresseMail"));
    const tailleMotDePasse  = verifChamp(document.getElementById("motDePasse"));
    const telOK = verifTel(document.getElementById("telephone"));
   
   
    if(mailOk && tailleNom && taillePrenom && tailleMail && tailleMotDePasse && telOK)
        inscriptionPost();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

//fonction d'ajout de l'inscription d'un client
function inscriptionPost(){
    document.getElementById("infoInscription").style.display = "none" ;
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("adresseMail").value;
    const pass = document.getElementById("motDePasse").value;
    const tel = document.getElementById("telephone").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"client", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("adresseMail="+email+"&motDePasse="+pass+"&nom="+nom+"&prenom="+prenom+"&telephone="+tel);
    xhr.onreadystatechange = function() {
        //le mail est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            const client = xhr.responseText;
            document.getElementById("clientValue").value = client;
            document.getElementById("postClient").submit();
        }
        //le mail est existant
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("infoInscription").style.display = "" ;
        }
    };
}

//fonction de controle de saisie de l'inscription depuis un compte salon
function inscriptionForSalon(){
    document.getElementById("info").style.display = "none" ;
    const mailOk = verifMail(document.getElementById("adresseMail"));
    const tailleNom  = verifChamp(document.getElementById("nom"));
    const taillePrenom  = verifChamp(document.getElementById("prenom"));
    const tailleMail  = verifChamp(document.getElementById("adresseMail"));
    const tailleMotDePasse  = verifChamp(document.getElementById("motDePasse"));
    const telOK = verifTel(document.getElementById("telephone"));
   
    if(mailOk && tailleNom && taillePrenom && tailleMail && tailleMotDePasse && telOK)
        inscriptionPostForSalon();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}


//fonction d'ajout de l'inscription d'un client depuis un compte salon
function inscriptionPostForSalon(){
    document.getElementById("infoInscription").style.display = "none" ;
    document.getElementById("infoOK").style.display = "none" ;
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("adresseMail").value;
    const pass = document.getElementById("motDePasse").value;
    const tel = document.getElementById("telephone").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"client", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("adresseMail="+email+"&motDePasse="+pass+"&nom="+nom+"&prenom="+prenom+"&telephone="+tel);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //on ajoute le client aux clients du salon
            const client = JSON.parse(xhr.responseText);
            let xhr2 = new XMLHttpRequest();
            xhr2.open("POST", api+"salonClient/", true);
            xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr2.send("salon_id="+salonId+"&client_id="+client.id+"&validate=1&code=1");
            document.getElementById("infoOK").style.display = "" ;
        }
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("infoInscription").style.display = "" ;
        }
    };
}