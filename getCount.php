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

$cI = $_POST['cI'];

$sql = "
SELECT nascita
FROM utenze
WHERE ID='$cI'";//
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$a=$row["nascita"];

/*while($row = mysqli_fetch_assoc($result)){
$a=$a."<br>".$row["nascita"]."<br>";
}*/

echo $a;

mysqli_close($conn);
?>

