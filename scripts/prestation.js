

function chargerTimePicker(){
    $('#datetimepicker1').datetimepicker({
        format: 'HH:mm',
        locale: 'fr',
    });
}

function ajoutPrestation(){
    document.getElementById("info").style.display = "none" ;
    const libelleTaille = verifChamp(document.getElementById("libelle"));
    const dureeTaille  = verifChamp(document.getElementById("duree"));
    const prixNombre  = verifNombre(document.getElementById("prix"));
   
    if(libelleTaille && dureeTaille && prixNombre)
        postPrestation();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

function postPrestation(){
    document.getElementById("infoOk").style.display = "none" ;
    const libelle = document.getElementById("libelle").value;
    const duree  = document.getElementById("duree").value;
    const prix  = document.getElementById("prix").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"prestation", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("libelle="+libelle+"&duree="+duree+"&prix="+prix+"&salon_id="+salonId);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOk").style.display = "" ;
        }
    };
}