setTimeout(chargerTable, 1000);


//fonction de chargement de la table des prestations
function chargerTable(){
    let dataTable = $('#table').DataTable();
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"prestation/salon/all/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4 ) {
            const prestations = JSON.parse(xhr.responseText);
            dataTable.clear();
            prestations.forEach(function(prestation) {  
                let valid = "" ;
                let classBtn = "" ;
                //message sur le bouton
                if(prestation.validate)
                {
                    valid = "Désactiver";
                    classBtn = "danger"
                }
                else
                {
                    valid = "Activer";
                    classBtn = "success"
                }
                dataTable.row.add([
                    prestation.libelle,
                    prestation.prix+"€",
                    prestation.duree,
                    '<input class="btn  btn-'+classBtn+' btn-lg"  style="font-size: small;" type="submit" onclick="statutPrestation('+prestation.id+');" value="'+valid+'" />'
                ]).draw();          
            });    
        }
    };
}


//fonction qui permet de changer le statut de la prestation
function statutPrestation(prestationId)
{
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", api+"prestationValidate", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id="+prestationId+"&salon_id="+salonId);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            chargerTable();
        }
    };
}

//fonction de chargeent du time picker
function chargerTimePicker(){
    $('#datetimepicker1').datetimepicker({
        format: 'HH:mm',
        locale: 'fr',
    });
}

//fonction de control de saisie
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

//fonction d'ajout de prestation
function postPrestation(){
    document.getElementById("infoOk").style.display = "none" ;
    const libelle = document.getElementById("libelle").value;
    const duree  = document.getElementById("duree").value;
    const prix  = document.getElementById("prix").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"prestation", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("libelle="+libelle+"&duree="+duree+"&prix="+prix+"&salon_id="+salonId+"&validate=1");
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOk").style.display = "" ;
            chargerTable();
        }
    };
}