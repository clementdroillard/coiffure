
function connexion()
{
    const email = document.getElementById("adresseMail").value;
    const pass = document.getElementById("motDePasse").value;
    document.getElementById("info").style.display = "none" ;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/api/client/auth", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("adresseMail="+email+"&motDePasse="+pass);
    //lorsque la requete a réussi
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

function verifMail(champ)
{
   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
   if(!regex.test(champ.value))
   {
      surligne(champ, true);
      return false;
   }
   else
   {
      surligne(champ, false);
      return true;
   }
}

function surligne(champ, erreur)
{
   if(erreur)
      champ.style.backgroundColor = "#fba";
   else
      champ.style.backgroundColor = "";
}

function verifChamp(champ)
{
   if(champ.value.length < 3 || champ.value.length > 190)
   {
      surligne(champ, true);
      return false;
   }
   else
   {
      surligne(champ, false);
      return true;
   }
}

function inscription(){
    document.getElementById("info").style.display = "none" ;
    var mailOk = verifMail(document.getElementById("adresseMail"));
    var tailleNom  = verifChamp(document.getElementById("nom"));
    var taillePrenom  = verifChamp(document.getElementById("prenom"));
    var tailleMail  = verifChamp(document.getElementById("adresseMail"));
    var tailleMotDePasse  = verifChamp(document.getElementById("motDePasse"));
   
    if(mailOk && tailleNom && taillePrenom && tailleMail && tailleMotDePasse)
        inscriptionPost();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

function inscriptionPost(){
    document.getElementById("infoInscription").style.display = "none" ;
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("adresseMail").value;
    const pass = document.getElementById("motDePasse").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/api/client", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("adresseMail="+email+"&motDePasse="+pass+"&nom="+nom+"&prenom="+prenom);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        //le mail est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            const client = xhr.responseText;
            document.getElementById("clientValue").value = client;
            document.getElementById("postClient").submit();
        }
        //le mail est mauvais
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("infoInscription").style.display = "" ;
        }
    };
}