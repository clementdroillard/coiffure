
chargerListeCoiffeur();

//fonction de chargement la liste des coiffeurs
function chargerListeCoiffeur()
{
    //on vide la liste
    document.getElementById("listeCoiffeur").innerHTML = "";
    const listeCoiffeur = document.getElementById("listeCoiffeur");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"coiffeur/salon/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const coiffeurs = JSON.parse(xhr.responseText);
            coiffeurs.forEach(function(coiffeur) {
                let option = document.createElement("option");
                option.text = coiffeur.prenom+" "+coiffeur.nom;
                option.value = coiffeur.id;
                listeCoiffeur.add(option);
            });                
        }
    };
}

//fonction de chargement des time picker
function chargerTimePicker(){
    $('#datetimepicker1').datetimepicker({
        format: 'HH:mm',
        locale: 'fr',
    });
    $('#datetimepicker2').datetimepicker({
        format: 'HH:mm',
        locale: 'fr',
    });
}

//fonction de controle de saisie
function ajoutDispo(){
    document.getElementById("info").style.display = "none" ;
    document.getElementById("infoHorraire").style.display = "none" ;
    
    const debutTaille = verifChamp(document.getElementById("debut"));
    const finTaille  = verifChamp(document.getElementById("fin"));
   
    if(debutTaille && finTaille)
    {
        if(document.getElementById("debut").value < document.getElementById("fin").value)
        {
            postDispo();
        }
        else
        {
            document.getElementById("infoHorraire").style.display = "" ;
        }  
    }
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

//fonction d'ajout d'une disponibilite
function postDispo(){
    document.getElementById("infoOk").style.display = "none" ;
    const debut = document.getElementById("debut").value;
    const fin  = document.getElementById("fin").value;
    const idJour  = document.getElementById("listeJour").value;
    const idCoiffeur  = document.getElementById("listeCoiffeur").value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"disponibilite", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("coiffeur_id="+idCoiffeur+"&jourSemaine="+idJour+"&heureDebut="+debut+"&heureFin="+fin);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOk").style.display = "" ;
        }
    };
}