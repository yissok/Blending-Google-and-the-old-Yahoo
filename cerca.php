<html>
<head><title>DATI CERCATI:</title></head>
<body>
<h4>
ID
<?php echo $_POST["cI"]; ?>
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

$cI = $_POST["cI"];

$sql = "
SELECT ID, nome, cognome, nascita
FROM utenze
";//WHERE ID='$cI'
$result = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($result)){
     echo "ID: ".$row["ID"]. "<br>";
echo "nome: ".$row["nome"]."<br>";
echo "cognome: ".$row["cognome"]."<br>";
echo "nascita: ".$row["nascita"]."<br><br>";
}
echo $cI;
echo $cI;
echo $cI;
echo $cI;

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