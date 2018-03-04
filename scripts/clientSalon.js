
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
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOk").style.display = "" ;
        }
        if (xhr.readyState == 4 && xhr.status == 400) {
            document.getElementById("info").style.display = "" ;
        }
        if (xhr.readyState == 4 && xhr.status == 401) {
            document.getElementById("clientInfo").style.display = "" ;
        }
    };
}