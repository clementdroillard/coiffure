//fonction de controle de saisie des champs
function modifCompte(){
    document.getElementById("info").style.display = "none" ;
    document.getElementById("infoMdp").style.display = "none" ;
    document.getElementById("infoOK").style.display = "none" ;
    document.getElementById("infoMail").style.display = "none";
    const libelleTaille = verifChamp(document.getElementById("libelle"));
    const CPTaille  = verifChampCP(document.getElementById("CP"));
    const villeTaille  = verifChamp(document.getElementById("ville"));
    const adresseTaille  = verifChamp(document.getElementById("adresse"));
    const adressemailVerif  = verifMail(document.getElementById("adresseMail"));
    const telephoneVerif  = verifTel(document.getElementById("telephone"));
    const oldMotDePasseTaille  = verifChamp(document.getElementById("oldMotDePasse"));
    const newMotDePasseTaille  = verifChamp(document.getElementById("newMotDePasse"));

   
    if(libelleTaille && CPTaille && villeTaille && adresseTaille && adressemailVerif  &&  telephoneVerif && oldMotDePasseTaille && newMotDePasseTaille)
        comptePut();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

//fonction de modification du compte
function comptePut(){
    const libelle = document.getElementById("libelle").value;
    const CP  = document.getElementById("CP").value;
    const ville  = document.getElementById("ville").value;
    const adresse = document.getElementById("adresse").value;
    const adresseMail = document.getElementById("adresseMail").value;
    const telephone = document.getElementById("telephone").value;
    const oldMotDePasse  = document.getElementById("oldMotDePasse").value;
    const newMotDePasse  = document.getElementById("newMotDePasse").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", api+"salon/pass/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("adresseMail="+adresseMail+"&adresseMailOld="+oldMail+"&newMotDePasse="+newMotDePasse+"&oldMotDePasse="+oldMotDePasse+"&libelle="+libelle+"&CP="+CP+"&adresse="+adresse+"&ville="+ville+"&telephone="+telephone);
    xhr.onreadystatechange = function() {
        //le mot de passe et le mail est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOK").style.display = "" ;
        }
        //le mail est existant
        if (xhr.readyState == 4 && xhr.status == 401) {
            document.getElementById("infoMail").style.display = "" ;
        }
        //le mot de passe est faux
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("infoMdp").style.display = "" ;
        }
    };
}