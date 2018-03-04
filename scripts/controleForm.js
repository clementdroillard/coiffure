//fonction de controle de saisie de mail
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

//fonction d'affichage de controle de saisie
function surligne(champ, erreur)
{
   if(erreur)
      champ.style.backgroundColor = "#fba";
   else
      champ.style.backgroundColor = "";
}

//fonction de controle de saisie pour libelle
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

//fonction de controle de saisie de code postal
function verifChampCP(champ)
{
   if(champ.value.length < 5 || champ.value.length > 9)
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

//fonction de controle de saisie de nombre
function verifNombre(champ)
{
   var nombre = parseInt(champ.value);
   if(isNaN(nombre) || champ.value.length > 190 )
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