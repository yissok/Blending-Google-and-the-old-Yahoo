<?php

function indexOfElement($array,$element)
{
    $chosenIndex=0;
    foreach ($array as &$value)
    {
        if($value==$element)
        {
            return $chosenIndex;
        }
        $chosenIndex=$chosenIndex+1;
    }

    return -1;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Yoogle";

$economyMode = "off";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn)
{
    die("Connection failed: ".mysqli_connect_error());
}


$sql = "SELECT nome,nascita FROM utenze";
$result = mysqli_query($conn, $sql);
$nameArr=array();
$resArr=array();
$a="";
while($row = mysqli_fetch_assoc($result))
{
    array_push($nameArr,$row["nome"]);
    array_push($resArr,$row["nascita"]);
    $a= $a."node1: ".$row["nascita"]."<br>";
}
echo $a;

$sql = "
SELECT node1, node2
FROM connections
";//WHERE ID='$cI'
$result = mysqli_query($conn, $sql);
$node1=array();
$node2=array();
$empty=true;
$breakOut=false;
$a="";
while($row = mysqli_fetch_assoc($result)){
    $empty=false;
    array_push($node1,$row["node1"]);
    array_push($node2,$row["node2"]);
    $a= $a."node1: ".$row["node1"]."<br>node2: ".$row["node2"]."<br><br>";
}
//echo $a;
if($empty)
{
    if(sizeof($nameArr)>1)
    {
        echo "".$nameArr[0]."<br>";
        echo "".$nameArr[1]."<br>";
        $json="";
        if ($economyMode=="on")
        {
            $rnd=rand(1000, 100000000);
            $json='[{"totalResults": "' . $rnd . '"}]';
        }
        else
        {

            $input_request=(string)"https://www.googleapis.com/customsearch/v1?key=AIzaSyDtUSk5jFQ8sZc_7oWcp60v6nLL4mhEles&cx=006160353462852140707:hmravflp3qw&q=".(string)$nameArr[0]."%20".(string)$nameArr[1];
            //1) $input_request=(string)"https://www.googleapis.com/customsearch/v1?key=AIzaSyDtUSk5jFQ8sZc_7oWcp60v6nLL4mhEles&cx=006160353462852140707:hmravflp3qw&q=".(string)$nameArr[0]."%20".(string)$nameArr[1];
            //2) $input_request=(string)"https://www.googleapis.com/customsearch/v1?key=AIzaSyCQEpul_mzwbjGpoT4qHYg-X1h83kn8xC8&cx=017758072927425657890:kqgnper_5b0&q=".(string)$nameArr[0]."%20".(string)$nameArr[1];

            $json = file_get_contents($input_request);
        }

        preg_match_all('/"totalResults": ".*?"/', $json, $output_array);
        $str2 = substr($output_array[0][0], 17);
        $str2 = substr($str2, 0, -1);
        //echo "".$str2."<br>";

        $weight = (((int) $str2)/((int) $resArr[0]))+(((int) $str2)/((int) $resArr[1]));
        echo "weight";

        echo $weight;

        $sql = "INSERT INTO connections (node1, node2, nResults, weight, other)VALUES ('$nameArr[0]', '$nameArr[1]', '$str2', '$weight', 'active')";//
        $result = mysqli_query($conn, $sql);
        $breakOut=true;
    }
}
//$sql = "INSERT INTO connections (node1, node2, nResults, weight, other)VALUES ('ciao', 'hello', '1550000', '1', 'active')";//
//$result = mysqli_query($conn, $sql);

//echo "sizeof(nameArr): ".sizeof($nameArr)."<br><br>";
//$added=array();

for ($x = 0; $x < sizeof($nameArr); $x++)
{
    //array_push($added,false);
    //echo "sizeof(node1): ".sizeof($node1);
    for ($y = 0; $y < sizeof($node1); $y++)
    {
        //echo "nameArr[$x]:$nameArr[$x] + node1[$y]:$node1[$y] + node2[$y]:$node2[$y]<br>";
        if(($node1[$y]==$nameArr[$x])||($node2[$y]==$nameArr[$x]))
        {
            //$added[x]=true;
            //echo "seen this";
            break;
        }
        if($y==(sizeof($node1)-1))
        {

            //echo "Not seen this: $nameArr[$x]";
            /*$sql = "SELECT node1, node2FROM connections";//WHERE ID='$cI'
            $result = mysqli_query($conn, $sql);
            while($row = mysqli_fetch_assoc($result)){
                array_push($node1,$row["node1"]);
                array_push($node2,$row["node2"]);
            }*/
            $nameArrOLD=array();
            for ($w = 0; $w < sizeof($node1); $w++)
            {
                if(in_array($node1[$w], $nameArrOLD))
                {
                    //already there
                }
                else
                {
                    array_push($nameArrOLD,$node1[$w]);
                }
                if(in_array($node2[$w], $nameArrOLD))
                {
                    //already there
                }
                else
                {
                    array_push($nameArrOLD,$node2[$w]);
                }
            }
            for ($w = 0; $w < sizeof($nameArrOLD); $w++)
            {
                echo "-|-|-: $nameArrOLD[$w] \n";
            }


            for ($z = 0; $z < sizeof($nameArrOLD); $z++)
            {
                $output_array="";
                if ($economyMode=="on")
                {
                    $rnd=rand(1000, 100000000);
                    $json='[{"totalResults": "' . $rnd . '"}]';
                }
                else
                {
                    $input_request="https://www.googleapis.com/customsearch/v1?key=AIzaSyDtUSk5jFQ8sZc_7oWcp60v6nLL4mhEles&cx=006160353462852140707:hmravflp3qw&q=".$nameArr[$x]."%20".$nameArrOLD[$z];
                    //1) $input_request="https://www.googleapis.com/customsearch/v1?key=AIzaSyDtUSk5jFQ8sZc_7oWcp60v6nLL4mhEles&cx=006160353462852140707:hmravflp3qw&q=".$nameArr[$x]."%20".$nameArrOLD[$z];
                    //2) $input_request="https://www.googleapis.com/customsearch/v1?key=AIzaSyCQEpul_mzwbjGpoT4qHYg-X1h83kn8xC8&cx=017758072927425657890:kqgnper_5b0&q=".$nameArr[$x]."%20".$nameArrOLD[$z];

                    $json = file_get_contents($input_request);
                }

                preg_match_all('/"totalResults": ".*?"/', $json, $output_array);
                $str2 = substr($output_array[0][0], 17);
                $str2 = substr($str2, 0, -1);
                //echo "".$str2."<br>";

                $oldValIndex=indexOfElement($nameArr,$nameArrOLD[$z]);
                echo "<br>index: ";
                echo $oldValIndex;
                $weight = (((int) $str2)/((int) $resArr[$x]))+(((int) $str2)/((int) $resArr[$oldValIndex]));
                echo "<br>weight: ";
                echo $weight;
                $sql = "INSERT INTO connections (node1, node2, nResults, weight, other)VALUES ('$nameArr[$x]', '$nameArrOLD[$z]', '$str2', '$weight', 'active')";//
                $result = mysqli_query($conn, $sql);
                $breakOut=true;
            }
        }
    }
    //echo "<br>";
    if($breakOut)
    {
        break;
    }
}

if($breakOut)
{
    echo "incomplete";
}
else
{
    echo "done";

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// this is just a cog that needs to be ran a sufficient number of times, will return "incomplete" when links are still missing and "done" when all are present
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
$combinations=0;
for ($x = 0; $x < sizeof($IDArr); $x++)
{
    for ($y = $x+1; $y < sizeof($IDArr); $y++)
    {
        echo " $nameArr[$x] and $nameArr[$y] <br>";
        $output_array="";
        //$input_request=(string)"https://www.googleapis.com/customsearch/v1?key=AIzaSyDtUSk5jFQ8sZc_7oWcp60v6nLL4mhEles&cx=006160353462852140707:hmravflp3qw&q=".(string)$nameArr[$x]."%20".(string)$nameArr[$y];
        //$json = file_get_contents($input_request);
        $json='[{"totalResults": "123000"}]';
        preg_match_all('/"totalResults": ".*?"/', $json, $output_array);
        $str2 = substr($output_array[0][0], 17);
        $str2 = substr($str2, 0, -1);
        echo "".$str2."<br>";
        $sql = "INSERT INTO connections (node1, node2, nResults, weight, other)VALUES ('$nameArr[$x]', '$nameArr[$y]', '$str2', '1', 'active')";//
        $result = mysqli_query($conn, $sql);
        $combinations=$combinations+1;
    }
}*/





mysqli_close($conn);
?>

