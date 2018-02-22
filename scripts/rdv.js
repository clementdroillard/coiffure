
//on vide la liste
document.getElementById("listeSalon").innerHTML = "";
const listeSalon = document.getElementById("listeSalon");
document.getElementById("info").style.display = "none" ;

//on envoie la requete de connexion
let xhr = new XMLHttpRequest();
xhr.open("GET", "http://127.0.0.1:8000/api/salons/client/1", true);
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
            console.log(option);
            listeSalon.add(option);
        });    
    }
    //les identifiants sont mauvais
    if (xhr.readyState == 4 && xhr.status == 404) {
        document.getElementById("info").style.display = "" ;
    }
};


function chargerListeCoiffeur()
{
    //on vide la liste
    document.getElementById("listeCoiffeur").innerHTML = "";
    const listeCoiffeur = document.getElementById("listeCoiffeur");
	const listeSalon = document.getElementById("listeSalon");
    const idSalon = listeSalon.options[listeSalon.selectedIndex].value;
    document.getElementById("info").style.display = "none" ;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/coiffeur/salon/"+idSalon, true);
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
                console.log(option);
                listeCoiffeur.add(option);
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

}