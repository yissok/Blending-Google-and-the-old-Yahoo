<html>
<head><title>DATI ELIMINATI:</title></head>
<body>
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


$sql = "DELETE FROM utenze";

if (mysqli_query($conn, $sql)) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}

$sql = "DELETE FROM connections";
if (mysqli_query($conn, $sql)) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}

mysqli_close($conn);
?>


<br><br><br>
Everything has been successfully deleted!
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