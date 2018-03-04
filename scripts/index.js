//fonction de connexion pour le client
function connexionClient()
{
    const email = document.getElementById("adresseMail").value;
    const pass = document.getElementById("motDePasseClient").value;
    document.getElementById("info").style.display = "none" ;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"client/auth", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("adresseMail="+email+"&motDePasse="+pass);
    xhr.onreadystatechange = function() {
        //les identifiants sont bons
        if (xhr.readyState == 4 && xhr.status == 200) {
            const client = xhr.responseText;
            document.getElementById("clientValue").value = client;
            document.getElementById("postClient").submit();
        }
        //les identifiants sont mauvais
        if (xhr.readyState == 4 && xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}

//fonction de connexion pour le salon
function connexionSalon()
{
    const nomDeCompte = document.getElementById("nomDeCompte").value;
    const pass = document.getElementById("motDePasseSalon").value;
    document.getElementById("info").style.display = "none" ;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"salon/auth", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("nomDeCompte="+nomDeCompte+"&motDePasse="+pass);
    xhr.onreadystatechange = function() {
        //les identifiants sont bons
        if (xhr.readyState == 4 && xhr.status == 200) {
            const salon = xhr.responseText;
            document.getElementById("salonValue").value = salon;
            document.getElementById("postSalon").submit();
        }
        //les identifiants sont mauvais
        if (xhr.readyState == 4 && xhr.status == 404) {
            document.getElementById("info").style.display = "" ;
        }
    };
}