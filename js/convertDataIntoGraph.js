var lastSelected=(-1);
var numberOfMaxNodes=20;
var nodesAddedSoFar=8;
var allowance=15;
var tapsForAdminMode=0;

function start()
{
    //console.log('start');
    updateNodes();
}


window.onload=function () { start() }



function createNetwork()
{

}




function encodeNodeJSONFormat(finalSetOfNodes,name,ID)
{
    var additionalOptions=', "font": { "color":"#3C1518"}';
    var editedStr=finalSetOfNodes+'{ "id": "'+ID+'", "label": "'+name+'"'+additionalOptions+'},';
    return editedStr;
}

function findID1(jsonLinkRecord,nameArray,IDArray)
{
    //console.log(jsonLinkRecord['node1']);
    return IDArray[nameArray.indexOf(jsonLinkRecord['node1'])];
}

function findID2(jsonLinkRecord,nameArray,IDArray)
{
    return IDArray[nameArray.indexOf(jsonLinkRecord['node2'])];
}

function indexOfMax(arr) {

    var max = -1;
    var maxIndex = 0;

    for (var i = 0; i < arr.length; i++) {
        //console.log("-----   MAX SO FAR   -----");
        //console.log(max);
        if (parseFloat(arr[i]) > parseFloat(max)) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


function getODG(num)
{
    var n=(num < 1000);
    var k=(1000 <= num)&(num < 1000000);
    var m=(1000000 <= num)&(num < 1000000000);
    var g=(1000000000 <= num)&(num < 1000000000000);
    var t=(1000000000000 <= num)&(num < 1000000000000000);

    var letterToUse="";
    var coeffAccordingToODG3by3=1;
    if(n)
    {
        return "a";
    }
    else
    {
        if(k)
        {
            return "b";
        }
        else
        {
            if(m)
            {
                return "c";
            }
            else
            {
                if(g)
                {
                    return "d";
                }
                else
                {
                    ////console.log("I dont even know anymore");
                    return "e";
                }
            }                                                                                                           
        }
    }
}

function chooseODG(resNumArray)
{
    var counters=[0,0,0,0,0];
    for(var i=0;i<(resNumArray.length);i++)
    {
        var res=getODG(resNumArray[i]);
        if(res=="a")
        {
            counters[0]=counters[0]+1;
        }
        else
        {
            if(res=="b")
            {
                counters[1]=counters[1]+1;
            }
            else
            {
                if(res=="c")
                {
                    counters[2]=counters[2]+1;
                }
                else
                {
                    if(res=="d")
                    {
                        counters[3]=counters[3]+1;
                    }
                    else
                    {
                        counters[4]=counters[4]+1;
                    }
                }
            }
        }
    }
    //console.log("<>|<> <>|<> <>|<> <>|<> <>|<> <>|<> <>|<> <>|<> <>|<> <>|<> <>|<> <>|<> ");
    //console.log(counters);
    let ind=indexOfMax(counters);

    switch(ind) {
        case 0: return 1;
            break;
        case 1: return 1000;
            break;
        case 2: return 1000000;
            break;
        case 3: return 1000000000;
            break;
        case 4: return 1000000000000;
            break;
        default: return 1;
              }
}


function encodeEdgeJSONFormat(resNumArray,jsonLinkTable,nameArray,IDArray)
{
    //console.log("LLLLLLLLLLLLength");
    //console.log(jsonLinkTable);
    //console.log(resNumArray);
    var editedStr="[";
    var divFactor=chooseODG(resNumArray);
    divFactor=1;
    for(var i=0;i<(resNumArray.length);i++)//loop through all nodes to find the edge with most strength
    {
        //console.log(resNumArray[i]+" with "+nameArray[i]+"--------------------");
        var connNum=[];
        var indexOfConn=[];
        var ID1=[];
        var ID2=[];
        var moreThanThreshold=[];
        for(var j=0;j<(Object.keys(jsonLinkTable).length);j++)
        {
            ////console.log("1) "+jsonLinkTable[j]['node1']+" V 2) "+jsonLinkTable[j]['node2']+" => "+nameArray[i]);
            if(jsonLinkTable[j]['node1']==nameArray[i])//find one edge
            {
                //console.log("ENTERED 1111");
                //console.log(jsonLinkTable[j]['nResults']);
                connNum.push(jsonLinkTable[j]['weight']);
                ID1.push(jsonLinkTable[j]['node1']);
                ID2.push(jsonLinkTable[j]['node2']);
                indexOfConn.push(j);
            }
            if(jsonLinkTable[j]['node2']==nameArray[i])//find one edge
            {
                //console.log("ENTERED 2222");
                //console.log(jsonLinkTable[j]['nResults']);
                connNum.push(jsonLinkTable[j]['weight']);
                ID1.push(jsonLinkTable[j]['node1']);
                ID2.push(jsonLinkTable[j]['node2']);
                indexOfConn.push(j);
            }

        }
        for(var j=0;j<(connNum.length);j++)
        {
            //console.log(connNum[j]);
            //console.log(indexOfConn[j]);
            //console.log(ID1[j]);
            //console.log(ID2[j]);
        }
        //console.log(connNum);
        var max = indexOfMax(connNum);//get the biggest
        var additionalOptions="";
        let threshold=0.85;
        for(var j=0;j<(connNum.length);j++)
        {
            //console.log("Candidate: "+parseFloat(connNum[j]));
            //console.log("MAX: "+parseFloat(connNum[max])*threshold);
            if(parseFloat(connNum[j])>(parseFloat(connNum[max])*threshold))
            {
                //console.log("enteratooooooooo"+connNum[j]);
                if(connNum[j]!=connNum[max])
                    moreThanThreshold.push(indexOfConn[j]);
            }
        }
        //console.log(moreThanThreshold);
        //console.log(ID1);
        for(var j=0;j<(moreThanThreshold.length);j++)//add the ones more than 50%
        {
            //"label": "'+jsonLinkTable[moreThanThreshold[j]]['nResults']+'", 
            var shortenedWeight=jsonLinkTable[moreThanThreshold[j]]['weight']/divFactor;
            shortenedWeight=shortenedWeight.toFixed(2);
            additionalOptions='"width": "2", "selectionWidth": "1", "hoverWidth": "1", "label": "'+shortenedWeight+'", "font": { "size":"8", "color":"#3C1518", "align": "middle"}, "color": { "color": "rgba(105, 20, 14,0.2)", "highlight": "rgba(105, 20, 14,0.2)", "hover": "rgba(80, 20, 14,0.2)"}';
            //additionalOptions='"width": "1", "selectionWidth": "1", "hoverWidth": "1", "color": "{ "color": "green", "highlight": "blue", "hover": "green", "opacity": "1.0"}"';
            //console.log("PERCHE SBAGLI NOME PORCA PUTTANA");
            //console.log(nameArray[i]);
            //console.log(jsonLinkTable[moreThanThreshold[j]]['node1']);
            if(nameArray[i]==jsonLinkTable[moreThanThreshold[j]]['node1'])//write it out to the graph
            {
                //console.log("FROM ");
                editedStr=editedStr+'{ "from": "'+IDArray[nameArray.indexOf(jsonLinkTable[moreThanThreshold[j]]['node1'])]+'", "to": "'+IDArray[nameArray.indexOf(jsonLinkTable[moreThanThreshold[j]]['node2'])]+'", '+additionalOptions+'},';
            }
            else
            {
                editedStr=editedStr+'{ "from": "'+IDArray[nameArray.indexOf(jsonLinkTable[moreThanThreshold[j]]['node2'])]+'", "to": "'+IDArray[nameArray.indexOf(jsonLinkTable[moreThanThreshold[j]]['node1'])]+'", '+additionalOptions+'},';
            }

        }

        //console.log("the max is: "+nameArray[i]+", "+connNum[max]);
        var shortenedWeight=connNum[max]/divFactor;
        shortenedWeight=shortenedWeight.toFixed(2);
        additionalOptions='"width": "3", "selectionWidth": "1", "label": "'+shortenedWeight+'", "font": { "size":"12", "color":"#3C1518", "background":"#F2F3AE"}, "hoverWidth": "1"';
        if(nameArray[i]==ID1[max])//write it out to the graph
        {
            //console.log("FROM ");
            editedStr=editedStr+'{ "from": "'+IDArray[nameArray.indexOf(ID1[max])]+'", "to": "'+IDArray[nameArray.indexOf(ID2[max])]+'", '+additionalOptions+'},';
        }
        else
        {
            editedStr=editedStr+'{ "from": "'+IDArray[nameArray.indexOf(ID2[max])]+'", "to": "'+IDArray[nameArray.indexOf(ID1[max])]+'", '+additionalOptions+'},';
        }


    }
    /*for(var i=0;i<(Object.keys(jsonLinkTable).length);i++)
    {

        if(parseInt(jsonLinkTable[i]['nResults'])>0)
        {
            console.log(jsonLinkTable[i]);
            ID1=findID1(jsonLinkTable[i],nameArray,IDArray);
            ID2=findID2(jsonLinkTable[i],nameArray,IDArray);
            editedStr=editedStr+'{ "from": "'+ID1+'", "to": "'+ID2+'" },';
            console.log(editedStr);
        }
    }*/
    if(editedStr!="[")
        editedStr=editedStr.slice(0, -1);
    editedStr=editedStr+']';


    return editedStr;
}



/*
function encodeEdgeJSONFormat(jsonLinkTable,nameArray,IDArray)
{
    console.log("Object.keys[jsonLinkTable].length");
    console.log(jsonLinkTable);
    var editedStr="[";
    for(var i=0;i<(Object.keys(jsonLinkTable).length);i++)
    {

        if(parseInt(jsonLinkTable[i]['nResults'])>0)
        {
            console.log(jsonLinkTable[i]);
            ID1=findID1(jsonLinkTable[i],nameArray,IDArray);
            ID2=findID2(jsonLinkTable[i],nameArray,IDArray);
            editedStr=editedStr+'{ "from": "'+ID1+'", "to": "'+ID2+'" },';
            console.log(editedStr);
        }
    }
    if(editedStr!="[")
        editedStr=editedStr.slice(0, -1);
    editedStr=editedStr+']';


    return editedStr;
}
*/


var myVar = setTimeout(updateNodes, 10);

function updateNodes() {
    console.log('updateNodes');
    var username="aaaaoooo";
    $.ajax({
        url:'listen.php',
        method:'POST',
        data:{name:username},
        success:function(data)
        {
            //console.log(data);
            var a=data.replace(/\n/ig, "");
            var res = a.split("<br><br>");
            console.log(res);
            document.getElementById("area").innerHTML="";

            //  //  //  //  //  //  //  //  //
            //  //  //  //  //  //  //  //  //
            //  //  //  //  //  //  //  //  //
            //  //  //  //  //  //  //  //  //
            //  //  //  //  //  //  //  //  //
            //debugger;
            //debugger;
            //debugger;
            //debugger;
            //debugger;
            //  //  //  //  //  //  //  //  //
            //  //  //  //  //  //  //  //  //
            //  //  //  //  //  //  //  //  //
            //  //  //  //  //  //  //  //  //
            //  //  //  //  //  //  //  //  //

            var nameArray=[];
            var IDArray=[];
            var resNumArray=[];
            var finalSetOfNodes="[";
            var originalFinalSetOfNodes="[";

            for(var i=0;i<res.length-1;i++)
            {
                var regexed = res[i].match(/nome: (.*?)<br>/g);
                var name=regexed[0].substring(6);
                name=name.slice(0, -4);
                nameArray.push(name);
                var regexed = res[i].match(/ID: (.*?)<br>/g);
                var ID=regexed[0].substring(4);
                ID=ID.slice(0, -4);
                IDArray.push(ID);
                regexed = res[i].match(/cognome: (.*?)<br>/g);
                var color=regexed[0].substring(9);
                color=color.slice(0, -4);

                regexed = res[i].match(/nascita: (.*?)$/g);
                var num=regexed[0].substring(9);
                resNumArray.push(num);

                finalSetOfNodes=encodeNodeJSONFormat(finalSetOfNodes,name,ID);



            }
            if(finalSetOfNodes!="[")
                finalSetOfNodes=finalSetOfNodes.slice(0, -1);
            finalSetOfNodes=finalSetOfNodes+']';
            originalFinalSetOfNodes=finalSetOfNodes;
            originalFinalSetOfNodes=JSON.parse(originalFinalSetOfNodes);
            //console.log(finalSetOfNodes);



            if(finalSetOfNodes!="[]")
            {
                $.ajax(
                    {
                        url:'listen_to_links.php',
                        method:'POST',
                        data:{name:username},
                        success:function(data)
                        {
                            var ja = JSON.parse(finalSetOfNodes);
                            //console.log(data);
                            var jsonLinkTable = JSON.parse(data);
                            //console.log(jsonLinkTable);
                            finalSetOfNodes=encodeEdgeJSONFormat(resNumArray,jsonLinkTable,nameArray,IDArray);
                            //console.log(finalSetOfNodes);


                            var nodes = new vis.DataSet(ja);
                            var jaLinks = JSON.parse(finalSetOfNodes);
                            var edges = new vis.DataSet(jaLinks);
                            var container = document.getElementById('mynetwork');
                            var data = {
                                nodes: nodes,
                                edges: edges
                            };
                            var options = {


                                /*manipulation: {
                                enabled: true,
                                initiallyActive: false,
                                addNode: true,
                                addEdge: true,
                                editEdge: true,
                                deleteNode: true,
                                deleteEdge: true,
                                controlNodeStyle:{
                                    // all node options are valid.
                                }
                            },*/

                                height:"80%",

                                layout: {
                                    randomSeed: undefined,
                                    improvedLayout:true,
                                    hierarchical: {
                                        enabled:false,
                                        levelSeparation: 150,
                                        nodeSpacing: 300,
                                        treeSpacing: 200,
                                        blockShifting: true,
                                        edgeMinimization: true,
                                        parentCentralization: true,
                                        direction: 'UD',        // UD, DU, LR, RL
                                        sortMethod: 'hubsize'   // hubsize, directed
                                    }
                                },
                                interaction:{
                                    dragNodes:true,
                                    dragView: true,
                                    hideEdgesOnDrag: false,
                                    hideNodesOnDrag: false,
                                    hover: true,
                                    hoverConnectedEdges: true,
                                    keyboard: {
                                        enabled: false,
                                        speed: {x: 10, y: 10, zoom: 0.02},
                                        bindToWindow: true
                                    },
                                    multiselect: false,
                                    navigationButtons: false,
                                    selectable: true,
                                    selectConnectedEdges: true,
                                    tooltipDelay: 300,
                                    zoomView: true
                                },


                                nodes:{
                                    shape: 'box',
                                    font : {
                                        size : 20,
                                    },
                                    shapeProperties: {
                                        borderDashes: false, // only for borders
                                        borderRadius: 2,     // only for box shape
                                        interpolation: false,  // only for image and circularImage shapes
                                        useImageSize: false,  // only for image and circularImage shapes
                                        useBorderWithImage: false  // only for image shape

                                    },
                                    color: {
                                        border: '#F2F3AE',
                                        background: '#D58936',
                                        highlight: {
                                            border: '#E8BE91',
                                            background: '#E8BE91'
                                        },
                                        hover: {
                                            border: '#E8BE91',
                                            background: '#E8BE91'
                                        }
                                    },


                                },
                                physics:{
                                    enabled: false,},
                                edges:{length: 200,
                                       arrows: {
                                           to:     {enabled: true, scaleFactor:1.25, type:'arrow'},
                                       },
                                       color: {
                                           color: 'rgba(105, 20, 14,1)',
                                           highlight: 'rgba(105, 20, 14,1)',
                                           hover: 'rgba(80, 20, 14,1)',
                                           inherit: false,
                                           opacity:1.0
                                       },
                                       smooth: {
                                           type: "curvedCW",
                                           forceDirection: "none",
                                           roundness: 0.25

                                       }
                                      },
                                clickToUse: false
                            }
                            var network = new vis.Network(container, data, options);
                            //var container = document.getElementById('mynetwork');
                            //network.redraw();
                            //network.unselectAll();

                            network.on("click", function (params) {
                                params.event = "[original event]";
                                let nodeVal=this.getNodeAt(params.pointer.DOM);
                                //document.getElementById('eventSpan').innerHTML = '<h2>Click event:</h2>' + JSON.stringify(params, null, 4);
                                console.log('click event, getNodeAt returns: ' + nodeVal);
                                lastSelected=nodeVal;
                                if(IDArray.includes(nodeVal))
                                {
                                    //on(nameArray[nodeVal]);
                                    if(checked2 == true)
                                    {

                                        //console.log('getNameGivenID: ' + getNameGivenID(originalFinalSetOfNodes,nodeVal));
                                        addStuffToList(getNameGivenID(originalFinalSetOfNodes,nodeVal));

                                    }
                                }
                            });
                        }
                    });
            }

        }
    });

}

function getNameGivenID(originalFinalSetOfNodes,id)
{
    for(var i=0;i<originalFinalSetOfNodes.length;i++)
    {
        if(originalFinalSetOfNodes[i]['id']==id)
        {
            return originalFinalSetOfNodes[i]['label'];
        }
    }
    //console.log('length: '+originalFinalSetOfNodes.length);
    //console.log('originalFinalSetOfNodes: '+originalFinalSetOfNodes[id]['label']);
    return "not found";
}

function checkDuplicateItem(allItems,newItem)
{
    if (allItems !== null)
    {
        var regexed = allItems.match(/newItem/g);
        var rgx = ""+newItem;
        var rgxFull = new RegExp(rgx,"g");
        var matches=allItems.match(rgxFull);
        //console.log("matches");
        //console.log(matches);
        //console.log(rgxFull);
        if (matches !== null)
        {
            if (matches.length>0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }

}

function checkMaxItems(allItems)
{
    var regexed = allItems.match(/<br>/g);
    if (regexed !== null)
    {

        return regexed.length;
    }
    else
    {
        return 0;
    }

}


function addStuffToList(newItem)
{
    console.log('addStuffToList: ' + newItem);
    var allItems=document.getElementById("text").innerHTML;
    var nSoFar=checkMaxItems(allItems);
    if (nSoFar>4)
    {
        console.log('max keywords reached');
    }
    else
    {
        if (checkDuplicateItem(allItems,newItem))
        {
            console.log('Already exists');
        }
        else
        {
            console.log('Adding');
            console.log('nSoFar: ' + nSoFar);
            document.getElementById("text").innerHTML += newItem+"<br>";
        }
    }
}



















// create an array with nodes

//var a='[{ "id": "1", "label": "aaaa 1" }, { "id": "2", "label": "Node 2" }, { "id": "3", "label": "Node 3" }, { "id": "4", "label": "Node 4" }, { "id": "5", "label": "Node 5" } ]';
