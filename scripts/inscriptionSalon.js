
function inscription(){
    document.getElementById("info").style.display = "none" ;
    var libelleTaille = verifChamp(document.getElementById("libelle"));
    var CPTaille  = verifChampCP(document.getElementById("CP"));
    var villeTaille  = verifChamp(document.getElementById("ville"));
    var adresseTaille  = verifChamp(document.getElementById("adresse"));
    var nomDeCompteTaille  = verifChamp(document.getElementById("nomDeCompte"));
    var motDePasseTaille  = verifChamp(document.getElementById("motDePasse"));
   
    if(libelleTaille && CPTaille && villeTaille && adresseTaille && nomDeCompteTaille && motDePasseTaille)
        inscriptionPost();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

function inscriptionPost(){
    document.getElementById("infoInscription").style.display = "none" ;
    const libelle = document.getElementById("libelle").value;
    const CP = document.getElementById("CP").value;
    const ville = document.getElementById("ville").value;
    const adresse = document.getElementById("adresse").value;
    const nomDeCompte = document.getElementById("nomDeCompte").value;
    const motDePasse = document.getElementById("motDePasse").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"salon", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("libelle="+libelle+"&CP="+CP+"&ville="+ville+"&adresse="+adresse+"&nomDeCompte="+nomDeCompte+"&motDePasse="+motDePasse);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        //le mail est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            const salon = xhr.responseText;
            document.getElementById("salonValue").value = salon;
            document.getElementById("postSalon").submit();
        }
        //le mail est mauvais
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("infoInscription").style.display = "" ;
        }
    };
}