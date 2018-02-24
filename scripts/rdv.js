chargerListeSalon();
let dateDebut;
function chargerListeSalon()
{
    //on vide la liste
    document.getElementById("listeSalon").innerHTML = "";
    const listeSalon = document.getElementById("listeSalon");
    document.getElementById("info").style.display = "none" ;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"salons/client/"+clientId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        //les identifiants sont bons
        if (xhr.readyState == 4 && xhr.status == 200) {
            const salons = JSON.parse(xhr.responseText);
            salons.forEach(function(salon) {
                let option = document.createElement("option");
                option.text = salon.libelle;
                option.value = salon.id;
                listeSalon.add(option);
            });
            if(salons.length > 0)
            {
                chargerListeCoiffeur(); 
                chargerListeprestation();
            }       
        }
        //les identifiants sont mauvais
        if ( xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}


function chargerListeCoiffeur()
{
    //on vide la liste
    document.getElementById("listeCoiffeur").innerHTML = "";
    const listeCoiffeur = document.getElementById("listeCoiffeur");
    const idSalon = document.getElementById("listeSalon").value;
    document.getElementById("info").style.display = "none" ;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"coiffeur/salon/"+idSalon, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        //les identifiants sont bons
        if (xhr.readyState == 4 && xhr.status == 200) {

            const coiffeurs = JSON.parse(xhr.responseText);
            coiffeurs.forEach(function(coiffeur) {
                let option = document.createElement("option");
                option.text = coiffeur.prenom+" "+coiffeur.nom;
                option.value = coiffeur.id;
                listeCoiffeur.add(option);
            });   
            if(coiffeurs.length > 0)
            {
                chargerEmploieDuTemps(); 
            } 
                
        }
        //les identifiants sont mauvais
        if (xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}

function chargerListeprestation()
{
    //on vide la liste
    document.getElementById("listePrestation").innerHTML = "";
    const listePrestation = document.getElementById("listePrestation");
    const idSalon = document.getElementById("listeSalon").value;
    document.getElementById("info").style.display = "none" ;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"prestation/salon/"+idSalon, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        //les identifiants sont bons
        if (xhr.readyState == 4 && xhr.status == 200) {

            const prestations = JSON.parse(xhr.responseText);
            prestations.forEach(function(prestation) {
                let option = document.createElement("option");
                option.text = prestation.libelle;
                option.value = prestation.id;
                listePrestation.add(option);
            });    
        }
        //les identifiants sont mauvais
        if ( xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}


function chargerEmploieDuTemps()
{
     $('#calendar').fullCalendar({
        defaultView: 'agendaWeek' ,
        locale: 'fr',
        timeFormat: 'H(:mm)',
        allDaySlot: false,
        minTime: "06:00:00",
        maxTime: "20:00:00",
        viewRender: function (view, element) {
            dateDebut = view.start._d;
            chargerEvenements();
        },
    });
    
}

function chargerEvenements()
{
    const idCoiffeur = document.getElementById("listeCoiffeur").value;
    let events = chargerDisponibilite(idCoiffeur);
    //$('#calendar').fullCalendar( 'removeEvents');

    $('#calendar').fullCalendar( 'renderEvents', events );
}

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


function chargerDisponibilite(idCoiffeur)
{
    var events = [];

    for (var i = 1; i < 8; i++) {
        //on envoie la requete de connexion
        let xhr = new XMLHttpRequest();
        xhr.open("GET", api+"disponibilite/coiffeur/"+idCoiffeur+"/jour/"+i, false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(null);
        if (xhr.status === 200) {
            const disponibilites = JSON.parse(xhr.responseText);
            disponibilites.forEach(function(disponibilite) {
                    let event ={id: disponibilite.id , title: 'Dispo', start: dateToString(dateDebut)+" "+disponibilite.heureDebut, 
                    end: dateToString(dateDebut)+" "+disponibilite.heureFin};
                    events.push(event); 
                    console.log(event);
                });
        }
        xhr.abort();
        dateDebut.setDate(dateDebut.getDate()+1);
    }
    return events
}