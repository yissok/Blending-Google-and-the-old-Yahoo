<html>
<head><title>DATI MODIFICATI:</title></head>
<body>
<h4>
ID
<?php echo $_POST["mI"]; ?>
</h4>
<h4>
nome
<?php echo $_POST["mN"]; ?>
</h4>
<hr>
<h4>
cognome
<?php echo $_POST["mC"]; ?>
</h4>
<hr>
<h4>
anno di nascita
    <?php echo $_POST["mA"]; ?>
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

$mI = $_POST["mI"];
$mN = $_POST["mN"];
$mC = $_POST["mC"];
$mA = $_POST["mA"];


$sql = "UPDATE utenze SET nome='$mN', cognome='$mC', nascita='$mA' WHERE id='$mI'";

if (mysqli_query($conn, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($conn);
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