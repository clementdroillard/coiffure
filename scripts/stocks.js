setTimeout(chargerTable, 1000);

//fonction de chargement de la table des articles
function chargerTable(){
    let dataTable = $('#table').DataTable();
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api+"article/salon/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4 &&  xhr.responseText != "") {
            const articles = JSON.parse(xhr.responseText);
            dataTable.clear();
            articles.forEach(function(article) {  
                dataTable.row.add([
                    article.libelle,
                    article.prix+"€",
                    article.codeBarre,
                    '<input class="form-control" type="number"  onblur="stockArticle('+article.id+',this)" value='+article.stock+' />'
                ]).draw();          
            });    
        }
    };
}
function stockArticle(idArticle,champ){
    if(verifNombre(champ))
    {
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", api+"articleStock", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("id="+idArticle+"&salon_id="+salonId+"&stock="+champ.value);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                chargerTable();
            }
        };
    }
}



//fonction de control de saisie
function ajoutArticle(){
    document.getElementById("info").style.display = "none" ;
    const libelleTaille = verifChamp(document.getElementById("libelle"));
    const codeBarreTaille  = verifChamp(document.getElementById("codeBarre"));
    const prixNombre  = verifNombre(document.getElementById("prix"));
    const stockNombre  = verifNombre(document.getElementById("stock"));

    if(libelleTaille && codeBarreTaille && prixNombre && stockNombre)
        postArticle();
    else
    {
        document.getElementById("info").style.display = "" ;
    }
}

//fonction d'ajout de prestation
function postArticle(){
    document.getElementById("infoOk").style.display = "none" ;
    const libelle = document.getElementById("libelle").value;
    const codeBarre  = document.getElementById("codeBarre").value;
    const prix  = document.getElementById("prix").value;
    const stock  = document.getElementById("stock").value;

    //on envoie la requete de connexion
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api+"article", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("libelle="+libelle+"&codeBarre="+codeBarre+"&prix="+prix+"&salon_id="+salonId+"&stock="+stock);
    //lorsque la requete a réussi
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("infoOk").style.display = "" ;
            chargerTable();
        }
    };
}