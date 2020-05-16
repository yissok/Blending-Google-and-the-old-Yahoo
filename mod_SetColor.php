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

$mI = $_POST["mI"];
$mN = $_POST["mN"];
$mC = $_POST["mC"];


$sql = "UPDATE utenze SET cognome='$mC', id='$mI' WHERE nome='$mN'";

if (mysqli_query($conn, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
