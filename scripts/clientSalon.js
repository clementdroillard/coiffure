setTimeout(chargerTable, 1000);


//fonction de chargement de la table des clients
function chargerTable(){
    let dataTable = $('#table').DataTable();
    dataTable.clear();
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"clients/salon/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4 && xhr.responseText != "") {
            const clients = JSON.parse(xhr.responseText);
            clients.forEach(function(client) {  
                let valid = "" ;
                let classBtn = "" ;
                dataTable.row.add([
                    client.nom,
                    client.prenom,
                    client.adresseMail,
                    client.telephone,
                    '<input class="btn  btn-danger btn-lg"  style="font-size: small;" type="submit" onclick="statutCoiffeur('+client.id+',true);" value="Désactiver" />'
                ]).draw();          
            });    
        }
    };
    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", api+"clients/salon/desactivate/"+salonId, true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.send(null);
    xhr1.onreadystatechange = function() {
        if (xhr1.status == 200 && xhr1.readyState == 4 && xhr1.responseText != "") {
            const clients = JSON.parse(xhr1.responseText);
            clients.forEach(function(client) {  
                let valid = "" ;
                let classBtn = "" ;
                dataTable.row.add([
                    client.nom,
                    client.prenom,
                    client.adresseMail,
                    client.telephone,
                    '<input class="btn  btn-success btn-lg"  style="font-size: small;" type="submit" onclick="statutCoiffeur('+client.id+',false);" value="Activer" />'
                ]).draw();          
            });    
        }
    };
}


//fonction qui permet de changer le statut du client
function statutCoiffeur(clientId)
{
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", api+"salonClientValidate", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("client_id="+clientId+"&salon_id="+salonId);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            chargerTable();
        }
    };
}


//fonction de control de saisie
function ajoutClient(){
    document.getElementById("info").style.display = "none" ;
    const mailOK = verifMail(document.getElementById("mail"));
   
    if(mailOK)
        postClient();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

//fonction d'ajout d'un client
function postClient(){
    document.getElementById("infoOk").style.display = "none" ;
    document.getElementById("info").style.display = "none" ;
    document.getElementById("clientInfo").style.display = "none" ;
    const mail = document.getElementById("mail").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"salonClient/salon/"+mail, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("salon_id="+salonId);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOk").style.display = "" ;
            chargerTable();
        }
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("info").style.display = "" ;
        }
        if (xhr.readyState == 4 && xhr.status == 401) {
            document.getElementById("clientInfo").style.display = "" ;
        }
    };
}