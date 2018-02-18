
function connexion()
{
    const email = document.getElementById("adresseMail").value;
    const pass = document.getElementById("motDePasse").value;

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
            document.getElementById("info").innerHTML = "erreur de connexion";
        }
    };
}