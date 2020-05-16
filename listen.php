<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Yoogle";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn)
{
    die("Connection failed: ".mysqli_connect_error());
}


$sql = "
SELECT ID, nome, cognome, nascita
FROM utenze
";//WHERE ID='$cI'
$result = mysqli_query($conn, $sql);
$a="";
$IDArr=array();
$nameArr=array();
$ResArr=array();

while($row = mysqli_fetch_assoc($result)){

    array_push($IDArr,$row["ID"]);
    array_push($nameArr,$row["nome"]);
    array_push($ResArr,$row["nascita"]);
    $a= "".$a."ID: ".$row["ID"]. "<br>nome: ".$row["nome"]."<br>cognome: ".$row["cognome"]."<br>nascita: ".$row["nascita"]."<br><br>";
}
echo $a;




mysqli_close($conn);
?>

