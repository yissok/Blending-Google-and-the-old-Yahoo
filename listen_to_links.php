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
SELECT node1, node2, nResults, weight, other
FROM connections
";//WHERE ID='$cI'
$result = mysqli_query($conn, $sql);
$a="[";
while($row = mysqli_fetch_assoc($result)){
    $a= $a.'{ "node1": "'.$row['node1'].'", "node2": "'.$row['node2'].'", "nResults": "'.$row['nResults'].'", "weight": "'.$row['weight'].'", "other": "'.$row['other'].'"},';
}
$a=$a.",,";
$a=rtrim($a,",,,");
$a=$a."]";
echo $a;




mysqli_close($conn);
?>

