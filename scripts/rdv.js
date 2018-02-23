
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
            chargerListeCoiffeur(0); 
            chargerListeprestation(0); 
            chargerEmploieDuTemps();
        }       
    }
    //les identifiants sont mauvais
    if (xhr.readyState == 4 && xhr.status == 404) {
        document.getElementById("info").style.display = "" ;
    }
};

function chargerListeCoiffeur(ListeSalonIndex)
{
    //on vide la liste
    document.getElementById("listeCoiffeur").innerHTML = "";
    const listeCoiffeur = document.getElementById("listeCoiffeur");
	const listeSalon = document.getElementById("listeSalon");
    const idSalon = listeSalon.options[ListeSalonIndex].value;
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
        }
        //les identifiants sont mauvais
        if (xhr.readyState == 4 && xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}

function chargerListeprestation(ListeSalonIndex)
{
    //on vide la liste
    document.getElementById("listePrestation").innerHTML = "";
    const listePrestation = document.getElementById("listePrestation");
    const listeSalon = document.getElementById("listeSalon");
    const idSalon = listeSalon.options[ListeSalonIndex].value;
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
        if (xhr.readyState == 4 && xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}


function chargerEmploieDuTemps()
{
     $('#calendar').fullCalendar({
        // put your options and callbacks here
    });

}