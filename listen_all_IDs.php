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
while($row = mysqli_fetch_assoc($result)){
     $a= "".$a."".$row["ID"]. ",";
}

echo $a;

mysqli_close($conn);
?>

