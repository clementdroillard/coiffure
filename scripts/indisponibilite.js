
chargerListeCoiffeur();

function chargerListeCoiffeur()
{
    //on vide la liste
    document.getElementById("listeCoiffeur").innerHTML = "";
    const listeCoiffeur = document.getElementById("listeCoiffeur");

    //on envoie la requete de connexion
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

function chargerTimePicker(){
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        locale: 'fr',
    });
    $('#datetimepicker2').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        locale: 'fr',
    });
}

function ajoutIndispo(){
    document.getElementById("info").style.display = "none" ;
    const debutTaille = verifChamp(document.getElementById("debut"));
    const finTaille  = verifChamp(document.getElementById("fin"));
   
    if(debutTaille && finTaille)
        postIndispo();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

function postIndispo(){
    document.getElementById("infoOk").style.display = "none" ;
    const debut = document.getElementById("debut").value;
    const fin  = document.getElementById("fin").value;
    const idCoiffeur  = document.getElementById("listeCoiffeur").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"indisponibilite", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("coiffeur_id="+idCoiffeur+"&dateDebut="+debut+"&dateFin="+fin);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOk").style.display = "" ;
        }
    };
}