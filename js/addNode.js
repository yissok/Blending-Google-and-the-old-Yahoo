
function recursiveNetwork()
{
    $.ajax({
        url:'update_connections.php',
        method:'GET',
        success:function(data)
        {

            console.log(data);
            if(String(data).includes("incomplete"))
            {
                console.log("recursing");
                recursiveNetwork();
            }
            else
            {
                console.log("NOT recursing");
                document.getElementById("mynetwork").innerHTML = "";
                updateNodes();
                console.log("DONNNEE recursing");
                offOver();
                callExp("mynetwork");
            }
        }
    });
}

function addNode() {
    nodesAddedSoFar++;
    console.log("nodesAddedSoFar: "+nodesAddedSoFar);
    onOver();


    var emptyCheck=document.getElementById('query').value;

    if(nodesAddedSoFar<numberOfMaxNodes)
    {
        if(emptyCheck!="")
        {
            var newId=-1;
            var checkIDsToAssign = new XMLHttpRequest();
            checkIDsToAssign.open("GET", "listen_all_IDs.php", true);
            checkIDsToAssign.onload = function (e) {
                if (checkIDsToAssign.readyState === 4) {
                    if (checkIDsToAssign.status === 200) 
                    {


                        var IDsString=checkIDsToAssign.responseText;//.split(',');
                        console.log(IDsString);


                        if((IDsString.length)>2)
                        {
                            IDsString = IDsString.substring(0, IDsString.length - 2);

                            console.log("all IDs after: "+IDsString);
                            var arrOfStringIDs=IDsString.split(',');
                            console.log("indexes"+arrOfStringIDs);
                            for (index in arrOfStringIDs)
                            {
                                console.log(index);
                                if (parseInt(index)>newId);
                                {
                                    newId=parseInt(index);
                                }
                            }
                            var i=0;
                            while (i<=newId+1)
                            {
                                console.log(i);
                                if (arrOfStringIDs.includes(i.toString()))
                                {
                                    console.log("next");
                                }
                                else
                                {
                                    console.log("ID not found, chance for new ID");
                                    newId=i;
                                    break;
                                }
                                i=i+1;
                            }
                        }
                        else
                        {
                            newId=0;
                        }
                        console.log("newId"+newId);


                        var queryVal=document.getElementById('query').value;
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyDtUSk5jFQ8sZc_7oWcp60v6nLL4mhEles&cx=006160353462852140707:hmravflp3qw&q="+queryVal, true);
                        //1) xhr.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyDtUSk5jFQ8sZc_7oWcp60v6nLL4mhEles&cx=006160353462852140707:hmravflp3qw&q="+queryVal, true);
                        //2) xhr.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyCQEpul_mzwbjGpoT4qHYg-X1h83kn8xC8&cx=017758072927425657890:kqgnper_5b0&q="+queryVal, true);
                        xhr.onload = function (e) {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {

                                    var n = xhr.responseText.match('"totalResults": ".*?"');
                                    var finalNumber=n[0].substring(17);
                                    finalNumber = finalNumber.substring(0, finalNumber.length - 1);
                                    //document.getElementById("content2").innerHTML += finalNumber + "<br>";
                                    $.ajax({
                                        data:"aI="+newId+"&aN="+queryVal+"&aC=ciao&aA="+finalNumber+"",
                                        url:'trasporta.php',
                                        method:'POST',
                                        success:function(data)
                                        {
                                            console.log("come on show me response");
                                            console.log(data);
                                            if(data.includes("Go ahead"))
                                            {
                                                recursiveNetwork();
                                            }
                                            else
                                            {
                                                offOver();
                                            }
                                        }
                                    });





                                } else {
                                    console.error(xhr.statusText);
                                }
                            }
                        };
                        xhr.onerror = function (e) {
                            console.error(xhr.statusText);
                        };
                        xhr.send(null);





                    } else {
                        console.error(checkIDsToAssign.statusText);
                    }
                }
            };
            checkIDsToAssign.onerror = function (e) {
                console.error(checkIDsToAssign.statusText);
            };
            checkIDsToAssign.send(null);


            console.log("############     ADDED     #############");


        }
        else
        {
            offOver();
            console.log("############     not ADDED     #############");
        }
    }
    else
    {

        offOver();
        alert("Ask Andrea to allow more nodes");
        console.log("Max nodes");
    }




    /*setTimeout(function(){
        document.getElementById("mynetwork").innerHTML = "";
        updateNodes();
    }, 1500);*/




}