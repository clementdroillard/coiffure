setTimeout(chargerTable, 1000);


//fonction de chargement de la table des coiffeurs
function chargerTable(){
    var dataTable = $('#table').DataTable();
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"coiffeur/salon/all/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4 ) {
            const coiffeurs = JSON.parse(xhr.responseText);
            dataTable.clear();
            coiffeurs.forEach(function(coiffeur) {  
                let valid = "" ;
                if(coiffeur.validate)
                {
                    valid = "Oui";
                }
                else
                {
                    valid = "Non";
                }
                dataTable.row.add([
                    coiffeur.nom,
                    coiffeur.prenom,
                    coiffeur.specialite,
                    valid,
                    '<input class="btn  btn-danger btn-lg"  style="font-size: small;" type="submit" onclick="statutCoiffeur('+coiffeur.id+');" value="Activer/Désactiver" />'
                ]).draw();          
            });    
        }
    };
}


//fonction qui permet de changer le statut du coiffeur
function statutCoiffeur(coiffeurId)
{
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", api+"coiffeurValidate", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id="+coiffeurId+"&salon_id="+salonId);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            chargerTable();
        }
    };
}


//fonction de control de saisie
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

//fonction d'enregistrement d'un coiffeur
function postCoiffeur(){
    document.getElementById("infoOk").style.display = "none" ;
    const nom = document.getElementById("nom").value;
    const prenom  = document.getElementById("prenom").value;
    const specialite  = document.getElementById("specialite").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"coiffeur", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("nom="+nom+"&prenom="+prenom+"&specialite="+specialite+"&salon_id="+salonId+"&validate=1");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOk").style.display = "" ;
            chargerTable();
        }
    };
}