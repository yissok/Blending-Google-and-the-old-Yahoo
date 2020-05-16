<html>
    <head><title>DATI ELIMINATI:</title></head>
    <body>
        <h4>
            ID
            <?php echo $_POST["eI"]; ?>
        </h4>
        <hr>
    </body>
</html>



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

$eI = $_POST["eI"];


//INSERT INTO `utenze`(`ID`, `nome`, `cognome`, `nascita`) VALUES (2,"italy","ads",434343)


$sql = "SELECT nome FROM utenze WHERE ID='$eI'";
$correspondingName="";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$correspondingName=$row["nome"];
echo "$correspondingName <br>";

$sql = "DELETE FROM connections WHERE node1='$correspondingName'";

if (mysqli_query($conn, $sql)) {
    echo "Record deleted successfully<br>";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}

$sql = "DELETE FROM connections WHERE node2='$correspondingName'";

if (mysqli_query($conn, $sql)) {
    echo "Record deleted successfully<br>";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}



$sql = "DELETE FROM utenze WHERE ID='$eI'";

if (mysqli_query($conn, $sql)) {
    echo "Record deleted successfully<br>";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}

mysqli_close($conn);
?>


<br><br><br>


<center>
    <a href="http://localhost:8080/yoogle/formSQL.html">
        <table border="1" style="width:50%;">
            <tr>
                <td valign="bottom">
                    <br>
                    <h3><center>BECK</center></h3>
                    <br>
                </td>
            </tr>
        </table>
    </a>
</center>