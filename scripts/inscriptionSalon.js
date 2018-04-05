//fonction de controle de saisie
function inscription(){
    document.getElementById("info").style.display = "none" ;
    const libelleTaille = verifChamp(document.getElementById("libelle"));
    const CPTaille  = verifChampCP(document.getElementById("CP"));
    const villeTaille  = verifChamp(document.getElementById("ville"));
    const adresseTaille  = verifChamp(document.getElementById("adresse"));
    const adressemailVerif  = verifMail(document.getElementById("adresseMail"));
    const telephoneVerif  = verifTel(document.getElementById("telephone"));
    const motDePasseTaille  = verifChamp(document.getElementById("motDePasse"));
   
    if(libelleTaille && CPTaille && villeTaille && adresseTaille && adressemailVerif  &&  telephoneVerif && motDePasseTaille)
        inscriptionPost();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

//fonction d'ajout de l'inscription
function inscriptionPost(){
    document.getElementById("infoInscription").style.display = "none" ;
    const libelle = document.getElementById("libelle").value;
    const CP = document.getElementById("CP").value;
    const ville = document.getElementById("ville").value;
    const adresse = document.getElementById("adresse").value;
    const adresseMail = document.getElementById("adresseMail").value;
    const telephone = document.getElementById("telephone").value;
    const motDePasse = document.getElementById("motDePasse").value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"salon", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("libelle="+libelle+"&CP="+CP+"&ville="+ville+"&adresse="+adresse+"&adresseMail="+adresseMail+"&telephone="+telephone+"&motDePasse="+motDePasse);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const salon = xhr.responseText;
            document.getElementById("salonValue").value = salon;
            document.getElementById("postSalon").submit();
        }
        //le nom de compte existe deja
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("infoInscription").style.display = "" ;
        }
    };
}