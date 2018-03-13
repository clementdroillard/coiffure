let dateDebutSemaine;
let dateFinSemaine;
let dureeMin; 

chargerListeSalon();

//fonction de chargement de la liste des salons
function chargerListeSalon()
{
    //on vide la liste
    document.getElementById("listeSalon").innerHTML = "";
    const listeSalon = document.getElementById("listeSalon");
    document.getElementById("info").style.display = "none" ;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"salons/client/"+clientId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
            const salons = JSON.parse(xhr.responseText);
            salons.forEach(function(salon) {
                let option = document.createElement("option");
                option.text = salon.libelle;
                option.value = salon.id;
                listeSalon.add(option);
            });
            if(salons.length > 0)
            {
                chargerDureeMin();
                chargerListeCoiffeur(); 
                chargerListeprestation();
            }       
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
    const idSalon = document.getElementById("listeSalon").value;
    document.getElementById("info").style.display = "none" ;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"coiffeur/salon/"+idSalon, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {

            const coiffeurs = JSON.parse(xhr.responseText);
            coiffeurs.forEach(function(coiffeur) {
                let option = document.createElement("option");
                option.text = coiffeur.prenom+" "+coiffeur.nom+" / Spécialité: "+coiffeur.specialite;
                option.value = coiffeur.id;
                listeCoiffeur.add(option);
            });   
            if(coiffeurs.length > 0)
            {
                chargerEmploieDuTemps(); 
                $('#datetimepicker1').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm',
                    locale: 'fr',
                });
            }
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
    document.getElementById("listePrestation").innerHTML = "";
    const listePrestation = document.getElementById("listePrestation");
    const idSalon = document.getElementById("listeSalon").value;
    document.getElementById("info").style.display = "none" ;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"prestation/salon/"+idSalon, true);
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

//on charge la duree minimum de prestation du salon
function chargerDureeMin()
{
    const idSalon    = document.getElementById("listeSalon").value;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"prestation/salon/min/"+idSalon, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    if (xhr.status === 200 ) {
        dureeMin = xhr.responseText;
    }
}

//fonction de chargement de l'emploie du temps
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
    });
    
}

//fonction de chargement des evenements
function chargerEvenements()
{
    const idCoiffeur    = document.getElementById("listeCoiffeur").value;
    if(idCoiffeur != "")
    {
        $('#calendar').fullCalendar( 'removeEvents');

        chargerDisponibilite(idCoiffeur);
        chargerInsponibilite(idCoiffeur);
        chargerRDV(idCoiffeur);
    }
}

//creation d'un evenement sur le calendrier si il est plus long ou égale a la plus courte prestation du salon
function createEvent(event)
{
    const dateDebut = new Date(event.start.replace(' ','T'));
    const dateFin = new Date(event.end.replace(' ','T'));
    const dureeEvent = dateDebut - dateFin
    const minPrestation = new Date('T'+dureeMin).getTime();
    if( dureeEvent <= minPrestation)
    {
        $('#calendar').fullCalendar( 'renderEvent', event );
    }   
}




//fonction convertion de format date
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
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"disponibilite/coiffeur/"+idCoiffeur, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    if (xhr.status === 200 ) {
        const disponibilites = JSON.parse(xhr.responseText);
        disponibilites.forEach(function(disponibilite) {
                let dateDebutSemaineDisponibilite = new Date(dateDebutSemaine);
                dateDebutSemaineDisponibilite.setDate(dateDebutSemaineDisponibilite.getDate()+disponibilite.jourSemaine-1);
                const event ={ title: 'Disponible', start: dateToString(dateDebutSemaineDisponibilite)+" "+disponibilite.heureDebut, 
                end: dateToString(dateDebutSemaineDisponibilite)+" "+disponibilite.heureFin};
                createEvent(event); 
            });
    }
}

//fonction de chargement des indisponibilites on supprime les horraires sur les indisponibilités
function chargerInsponibilite(idCoiffeur)
{
    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"indisponibilite/coiffeur/"+idCoiffeur+"/"+dateToString(dateDebutSemaine)+"/"+dateToString(dateFinSemaine), false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    if (xhr.status === 200 ) {
        let event;
        let event1;
        const indisponibilites = JSON.parse(xhr.responseText);
        indisponibilites.forEach(function(indisponibilite) {
                //affichage uniquement du temps disponible
                $('#calendar').fullCalendar('clientEvents').forEach(function(eventCalendar) {
                    if(eventCalendar.title == "Disponible")
                    {
                        if(eventCalendar.start._i >= indisponibilite.dateDebut && eventCalendar.end._i <= indisponibilite.dateFin )
                        {
                            $('#calendar').fullCalendar('removeEvents', eventCalendar._id );
                        }
                        else if(eventCalendar.start._i < indisponibilite.dateDebut && eventCalendar.end._i > indisponibilite.dateFin )
                        {
                            $('#calendar').fullCalendar('removeEvents', eventCalendar._id );
                            event ={ title: 'Disponible', start: eventCalendar.start._i, end: indisponibilite.dateDebut};
                            event1 ={ title: 'Disponible', start: indisponibilite.dateFin,end: eventCalendar.end._i};
                            createEvent(event);
                            createEvent(event1);
                        }
                        else if(eventCalendar.start._i >= indisponibilite.dateDebut && eventCalendar.start._i < indisponibilite.dateFin )
                        {
                            $('#calendar').fullCalendar('removeEvents', eventCalendar._id );
                            event ={ title: 'Disponible', start: indisponibilite.dateFin, end: eventCalendar.end._i };
                            createEvent(event);
                        }
                        else if(eventCalendar.end._i > indisponibilite.dateDebut && eventCalendar.end._i <= indisponibilite.dateFin )
                        {
                            $('#calendar').fullCalendar('removeEvents', eventCalendar._id );
                            event ={ title: 'Disponible', start: eventCalendar.start._i , end: indisponibilite.dateDebut };
                            createEvent(event);
                        }
                    }
                });
            });
    }
}

//fonction de chargement des rdv  on supprime les horraires sur les rdv
function chargerRDV(idCoiffeur)
{
    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"rdv/coiffeur/"+idCoiffeur+"/"+dateToString(dateDebutSemaine)+"/"+dateToString(dateFinSemaine), false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    if (xhr.status === 200 ) {
        let event;
        let event1;
        const rdvs = JSON.parse(xhr.responseText);
            rdvs.forEach(function(rdv) {
            $('#calendar').fullCalendar('clientEvents').forEach(function(eventCalendar) {
                //affichage uniquement du temps disponible
                if(eventCalendar.title == "Disponible")
                {
                    if(eventCalendar.start._i == rdv.dateDebut && eventCalendar.end._i == rdv.dateFin )
                    {
                        $('#calendar').fullCalendar('removeEvents', eventCalendar._id );
                    }
                    if(eventCalendar.start._i < rdv.dateDebut && eventCalendar.end._i > rdv.dateFin )
                    {
                        $('#calendar').fullCalendar('removeEvents', eventCalendar._id );
                        event ={ title: 'Disponible', start: eventCalendar.start._i, end: rdv.dateDebut};
                        event1 ={ title: 'Disponible', start: rdv.dateFin,end: eventCalendar.end._i};
                        createEvent(event);
                        createEvent(event1);
                    }
                    else if(eventCalendar.start._i >= rdv.dateDebut && eventCalendar.start._i < rdv.dateFin )
                    {
                        $('#calendar').fullCalendar('removeEvents', eventCalendar._id );
                        event ={ title: 'Disponible', start: rdv.dateFin, end: eventCalendar.end._i };
                        createEvent(event);
                    }
                    else if(eventCalendar.end._i > rdv.dateDebut && eventCalendar.end._i <= rdv.dateFin )
                    {
                        $('#calendar').fullCalendar('removeEvents', eventCalendar._id );
                        event ={ title: 'Disponible', start: eventCalendar.start._i , end: rdv.dateDebut };
                        createEvent(event);
                    }
                }
            });
            //on affiche uniquement les rdvs du client
            if(rdv.client_id == clientId )
            {
                    event ={ id: rdv.id, title: 'RDV', start: rdv.dateDebut, end: rdv.dateFin, backgroundColor: '#610B5E' };
                    createEvent(event);
            }
        });
    }
}

//fonction d'ajout d'un rdv
function postRdv(){
    //on enleve les alerts
    document.getElementById("infoRdvOK").style.display = "none" ;
    document.getElementById("infoRdvKO").style.display = "none" ;
    document.getElementById("info").style.display = "none" ;

    //recupère les infos a envoyer
    dateDebut = $("#datetimepicker1").find("input").val();
    coiffeur_id = document.getElementById("listeCoiffeur").value;
    prestation_id = document.getElementById("listePrestation").value;

    if(dateDebut != "" && coiffeur_id != ""  && prestation_id != ""  && clientId != "" )
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", api+"rdv/client", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("dateDebut="+dateDebut+"&coiffeur_id="+coiffeur_id+"&prestation_id="+prestation_id+"&client_id="+clientId);
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

}