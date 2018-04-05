//fonction de controle de saisie des champs
function modifCompte(){
    document.getElementById("info").style.display = "none" ;
    document.getElementById("infoMdp").style.display = "none" ;
    document.getElementById("infoOK").style.display = "none" ;
    document.getElementById("infoMail").style.display = "none" ;
    const mailOk = verifMail(document.getElementById("adresseMail"));
    const tailleNom  = verifChamp(document.getElementById("nom"));
    const taillePrenom  = verifChamp(document.getElementById("prenom"));
    const tailleMail  = verifChamp(document.getElementById("adresseMail"));
    const tailleOldMotDePasse  = verifChamp(document.getElementById("oldMotDePasse"));
    const tailleNewMotDePasse  = verifChamp(document.getElementById("newMotDePasse"));
    const telOK = verifTel(document.getElementById("telephone"));
   
   
    if(mailOk && tailleNom && taillePrenom && tailleMail && tailleOldMotDePasse && tailleNewMotDePasse && telOK)
        comptePut();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

//fonction de modification du compte
function comptePut(){
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("adresseMail").value;
    const passNew = document.getElementById("newMotDePasse").value;
    const passOld = document.getElementById("oldMotDePasse").value;
    const tel = document.getElementById("telephone").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", api+"client/pass/"+clientId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("adresseMail="+email+"&adresseMailOld="+oldMail+"&newMotDePasse="+passNew+"&oldMotDePasse="+passOld+"&nom="+nom+"&prenom="+prenom+"&telephone="+tel);
    xhr.onreadystatechange = function() {
        //le mail est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOK").style.display = "" ;
        }
        //le mail est existant
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("infoMdp").style.display = "" ;
        }
        //mail modifié et déjà existant
        if (xhr.readyState == 4 && xhr.status == 401) {
            document.getElementById("infoMail").style.display = "" ;
        }
    };
}





