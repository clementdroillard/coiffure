 <?php
session_start();
//on se deconnecte
session_destroy();
header('Location: ../index.php');

 ?>