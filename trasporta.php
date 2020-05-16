
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

$aI = $_POST["aI"];
$aN = $_POST["aN"];
$aC = $_POST["aC"];
$aA = $_POST["aA"];

$sql = "SELECT nome FROM utenze";
$result = mysqli_query($conn, $sql);
$nameArr=array();
$a="";
while($row = mysqli_fetch_assoc($result))
{
    array_push($nameArr,$row["nome"]);
    $a= $a."name: ".$row["nome"]."<br>";
}
//echo $a;

if (in_array($aN, $nameArr))
{
    echo "No";
}
else
{
    $sql = "INSERT INTO utenze (ID, nome, cognome, nascita)
VALUES ('$aI','$aN', '$aC', '$aA')";

    if(mysqli_query($conn, $sql))
    {
        //echo "record caricato";
    }
    else
    {
        echo "err: ".mysqli_error($conn);
    }
    echo "Go ahead";
}



mysqli_close($conn);
?>
