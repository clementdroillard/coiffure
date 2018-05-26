setTimeout(chargerTableArticle, 1000);
setTimeout(chargerTablePrestation, 1000);


//fonction de chargement de la table des articles
function chargerTableArticle(){
    let dataTable = $('#tableArticle').DataTable();
    let xhr = new XMLHttpRequest();
    //cache la colonne id
    dataTable.column(0).visible(false);


    xhr.open("GET", api+"article/salon/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4 &&  xhr.responseText != "") {
            const articles = JSON.parse(xhr.responseText);
            dataTable.clear();
            articles.forEach(function(article) {  
                dataTable.row.add([
                    article.id,
                    article.libelle,
                    article.prix+"€",
                    article.codeBarre,
                    article.stock,
                    '<input class="form-control" type="number"  onchange="verifNombre(this)" value=0 />'
                ]).draw();          
            });    
        }
    };
}

//fonction de chargement de la table des prestations
function chargerTablePrestation(){
    let dataTable = $('#tablePrestation').DataTable();
    let xhr = new XMLHttpRequest();
    //cache la colonne id
    dataTable.column(0).visible(false);

    xhr.open("GET", api+"prestation/salon/"+salonId, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4 &&  xhr.responseText != "") {
            const prestations = JSON.parse(xhr.responseText);
            dataTable.clear();
            prestations.forEach(function(prestation) {  
                dataTable.row.add([
                    prestation.id,
                    prestation.libelle,
                    prestation.prix+"€",
                    prestation.duree,
                    '<input class="form-control" type="number"  onchange="verifNombre(this)" value=0 />'
                ]).draw();          
            });    
        }
    };
}

//fonction d'affichage des selecions des tableaux
function afficherSelections(){
    let tableArticle = document.getElementById("tableArticle").rows; 
    let tablePrestation = document.getElementById("tablePrestation").rows; 
    let longueurTableArticle = tableArticle.length;
    let longueurTablePrestation = tablePrestation.length;
    var i = 1 ; //on ne parcours pas les entetes
    var ligne;

    var tableArticleSelectionne = [];
    var tablePrestationSelectionne = [];

    while(i<longueurTableArticle-1)
    {
        ligne = tableArticle[i];
        //on vérifie si quantité de la ligne est suppérieur à 0
        if( ligne.cells[4].children[0].value > 0 )
        {
           tableArticleSelectionne.push(ligne);
           i++
        }
        else
        {
            ligne.remove();
            longueurTableArticle -=1;
        }
        
    }

    i = 1;

    while(i<longueurTablePrestation-1)
    {
        ligne = tablePrestation[i];
        //on vérifie si quantité de la ligne est suppérieur à 0
        if( ligne.cells[3].children[0].value > 0 )
        {
           tablePrestationSelectionne.push(ligne);
           i++
        }
        else
        {
            ligne.remove();
            longueurTablePrestation -=1;
        }
        
    }
}

function creerPDF()
{
    afficherSelections();
    var doc = new jsPDF();


    var specialElementHandlers = {
        '#editor': function(element, renderer){
            return true;
        },
        '.controls': function(element, renderer){
            return true;
        }
    };

    // All units are in the set measurement for the document
    // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    doc.fromHTML($('body').get(0), 15, 15, {
        'width': 170, 
        'elementHandlers': specialElementHandlers
    });

    doc.save('facture.pdf');
} 