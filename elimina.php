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

$sql = "DELETE FROM utenze WHERE nome='$eI'";

if (mysqli_query($conn, $sql)) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}

mysqli_close($conn);
?>


<br><br><br>


<center>
<a href="https://searchengineplayground.000webhostapp.com/formSQL.html">
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