let dateDebutSemaine;
let dateFinSemaine;


chargerListeClient();
chargerListeCoiffeur();
chargerListeprestation();

//fonction de chargement de la liste des client
function chargerListeClient()
{
    //on vide la liste
    document.getElementById("listeClient").innerHTML = "";
    const listeClient = document.getElementById("listeClient");
    document.getElementById("info").style.display = "none" ;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"clients/salon/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const clients = JSON.parse(xhr.responseText);
            clients.forEach(function(client) {
                let option = document.createElement("option");
                option.text = client.nom+ " " +client.prenom;
                option.value = client.id;
                listeClient.add(option);
            });     
        }
        if ( xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}

//fonction de chargement de la liste des coiffeurs
function chargerListeCoiffeur()
{
    //on vide la liste
    document.getElementById("listeCoiffeur").innerHTML = "";
    const listeCoiffeur = document.getElementById("listeCoiffeur");
    document.getElementById("info").style.display = "none" ;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"coiffeur/salon/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {

            const coiffeurs = JSON.parse(xhr.responseText);
            coiffeurs.forEach(function(coiffeur) {
                let option = document.createElement("option");
                option.text = coiffeur.prenom+" "+coiffeur.nom+" / Spécialité: "+coiffeur.specialite;
                option.value = coiffeur.id;
                listeCoiffeur.add(option);
            });   
            if(coiffeurs.length > 0)
            {
                //on charge l'eploie du temps et le time picker
                chargerEmploieDuTemps(); 
                $('#datetimepicker1').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm',
                    locale: 'fr',
                });
            }
            //on charge les evenements
            chargerEvenements();               
        }
        if (xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}

//fonction de chargement de la liste des prestations
function chargerListeprestation()
{
    //on vide la liste
    document.getElementById("listePrestation").innerHTML = "";
    const listePrestation = document.getElementById("listePrestation");
    document.getElementById("info").style.display = "none" ;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"prestation/salon/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {

            const prestations = JSON.parse(xhr.responseText);
            prestations.forEach(function(prestation) {
                let option = document.createElement("option");
                option.text = "'"+prestation.libelle+ "' Durée : " +prestation.duree + " Prix: "+ prestation.prix+"€";
                option.value = prestation.id;
                listePrestation.add(option);
            });    
        }
        if ( xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}

//fonction de chargement de chargement de l'emploie du temps
function chargerEmploieDuTemps()
{
     $('#calendar').fullCalendar({
        defaultView: 'agendaWeek' ,
        locale: 'fr',
        timeFormat: 'H(:mm)',
        allDaySlot: false,
        minTime: "06:00:00",
        maxTime: "21:00:00",
        slotEventOverlap: false,
        viewRender: function (view, element) {
            dateDebutSemaine = view.start._d;
            dateFinSemaine  = view.end._d;
            chargerEvenements();
        },
        eventClick: function (event) {
            if(event.title == 'RDV')
            {
                //on affiche les infos de l'evenement
                alert(detailEvenement(event));
            }
        },
    });  
}

//fonction qui retourne le détail d'un evenement
function detailEvenement(event)
{
    let message = "Date \nDébut : "+moment(event.start).format('DD-MM-YYYY HH:mm')+" \nFin : ";
    message     += moment(event.end).format('DD-MM-YYYY HH:mm')+" \n\n";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"client/"+event.clientId, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    if (xhr.status === 200 ) {
        const client = JSON.parse(xhr.responseText);
        message += "Client  \nNom: "+client.nom+" \nPrénom: "+client.prenom+" \nMail: "
        message +=  client.adresseMail+" \nTéléphone: "+client.telephone+" \n\n";
    }
    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", api+"prestation/"+event.prestationId, false);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.send(null);
    if (xhr1.status === 200 ) {
        const prestation = JSON.parse(xhr1.responseText);
        message += "Prestation \nLibelle: "+prestation.libelle+" \nDurée: "+prestation.duree+" \nPrix: "+prestation.prix+"€ \n\n\n";
    }
    return message;
}


//fonction de chargement de la liste des evenements
function chargerEvenements()
{
    const idCoiffeur    = document.getElementById("listeCoiffeur").value;
    let eventsDispo     = chargerDisponibilite(idCoiffeur);
    let eventsIndispo   = chargerInsponibilite(idCoiffeur);
    let eventRDV        = chargerRDV(idCoiffeur);
    $('#calendar').fullCalendar( 'removeEvents');

    $('#calendar').fullCalendar( 'renderEvents', eventsDispo );
    $('#calendar').fullCalendar( 'renderEvents', eventsIndispo );
    $('#calendar').fullCalendar( 'renderEvents', eventRDV );
}

//fonction qui renvoie une date au format des date des evenements
function dateToString(date)
{
    const year = date.getFullYear()+"";
    let month = (date.getMonth()+1);
    if(month < 10)
    {
        month = "0"+month;
    }
    let day = date.getDate();
    if(day < 10)
    {
        day = "0"+day;
    }
    return year+"-"+month+"-"+day;
}

//fonction de chargement des disponibilites
function chargerDisponibilite(idCoiffeur)
{
    var events = [];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"disponibilite/coiffeur/"+idCoiffeur, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    if (xhr.status === 200 ) {
        const disponibilites = JSON.parse(xhr.responseText);
        disponibilites.forEach(function(disponibilite) {
                let dateDebutSemaineDisponibilite = new Date(dateDebutSemaine);
                dateDebutSemaineDisponibilite.setDate(dateDebutSemaineDisponibilite.getDate()+disponibilite.jourSemaine-1);
                const event ={id: disponibilite.id , title: 'Dispo', start: dateToString(dateDebutSemaineDisponibilite)+" "+disponibilite.heureDebut, 
                end: dateToString(dateDebutSemaineDisponibilite)+" "+disponibilite.heureFin};
                events.push(event); 
            });
    }
    
    return events
}

//fonction de chargement des indisponibilites
function chargerInsponibilite(idCoiffeur)
{
    var events = [];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"indisponibilite/coiffeur/"+idCoiffeur+"/"+dateToString(dateDebutSemaine)+"/"+dateToString(dateFinSemaine), false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    if (xhr.status === 200 ) {
        const indisponibilites = JSON.parse(xhr.responseText);
        indisponibilites.forEach(function(indisponibilite) {
                const event ={id: indisponibilite.id , title: 'Indispo', start: indisponibilite.dateDebut, 
                end: indisponibilite.dateFin, backgroundColor: '#FF0000'};
                events.push(event); 
            });
    }
    
    return events
}

//fonction de chargement des rdv
function chargerRDV(idCoiffeur)
{
    var events = [];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"rdv/coiffeur/"+idCoiffeur+"/"+dateToString(dateDebutSemaine)+"/"+dateToString(dateFinSemaine), false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    if (xhr.status === 200 ) {
        const rdvs = JSON.parse(xhr.responseText);
        rdvs.forEach(function(rdv) {
                const event ={id: rdv.id , title: 'RDV', start: rdv.dateDebut, 
                end: rdv.dateFin, backgroundColor: '#610B5E' , clientId: rdv.client_id, prestationId: rdv.prestation_id};
                events.push(event); 
            });
    }
    
    return events
}

//fonction d'ajout d'un rdv
function postRdv(){
    //on enleve les alerts
    document.getElementById("infoRdvOK").style.display = "none" ;
    document.getElementById("infoRdvKO").style.display = "none" ;
    document.getElementById("info").style.display = "none" ;

    //recupère les infos a envoyer
    dateDebut = $("#datetimepicker1").find("input").val()+':00';
    coiffeur_id = document.getElementById("listeCoiffeur").value;
    prestation_id = document.getElementById("listePrestation").value;
    client_id = document.getElementById("listeClient").value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"rdv/salon", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("dateDebut="+dateDebut+"&coiffeur_id="+coiffeur_id+"&prestation_id="+prestation_id+"&client_id="+client_id);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        //les renseignements du rdv sont bon
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoRdvOK").style.display = "" ;
        }
        //les renseignements sont mauvais
        if ( xhr.readyState == 4 && xhr.status == 400 ) {
            document.getElementById("infoRdvKO").style.display = "" ;
        }
        //erreur 404
        if ( xhr.readyState == 4 && xhr.status == 404 ) {
            document.getElementById("info").style.display = "" ;
        }
        if(xhr.readyState == 4){
            //quand on la reponse on recharge les rdv
            chargerEvenements(); 
        }
    };
}