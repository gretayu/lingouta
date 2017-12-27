<!--setting the map>
var map;
var markers = [];
var result_type;
var research_type;
var infoWindow;
var data_get;
var dataset = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var empty = [[0,0,0],[0,0,0],[0,0,0]];
var address;

function initMap() {
    map = new google.maps.Map(document.getElementById('realmap'), {
        center: {
            lat: 22.994234471309202,
            lng:120.21691918373108 
        },
        zoom: 10
    });
    
    map.addListener('click', function (e) {
        //alert(e.latLng);
        //place a pan
        placeMarkerAndPanTo(e.latLng, map);
        //set the center at the positon
        map.setCenter(e.latLng);
        //set a suitable zoom
        if (map.zoom <= 13) {
            map.setZoom(13);
        }
        //call for the feng shui
        console.log(e.latLng.lat()); 
        var obj = {};
		obj.latitude = e.latLng.lat();
        obj.longitude = e.latLng.lng();
        
        $(".typ5-1").html("");
        $(".typ5-2").html("");
        $(".typ5-3").html("");
        $(".typ5-4").html("");
        $("#finalresult").html("");

        data_get=0;
        var surrounding;
        for(surrounding=0; surrounding<=8; surrounding++){
			var temp_lat=e.latLng.lat();
			var temp_lng=e.latLng.lng();
			
            temp_lat=transform(surrounding,parseFloat(e.latLng.lat()),1);
            temp_lng=transform(surrounding,parseFloat(e.latLng.lng()),2);
            
            fsearching(temp_lat,temp_lng,surrounding,1);
        }
        
        
    });
}

function fsearching(temp_lat,temp_lng,surrounding,renew_type){
    $.ajax({
        method: "post",
        url: "connect_feng_shui.php",
        data: {
            type:1,
            lat:temp_lat,
            lng:temp_lng,
            data:empty
          
        },
        success: function(datas) {
        var output = JSON.parse(datas);
            //output.content_1to4 -> the peom of the type of feng shui 
            //output.content_5 -> the judgement of chosen place
            //console.log(output);
            if(output.content!=""){
                data_get++;
                //console.log(data_get);
                dataset[0][surrounding]=output.content_1;
                dataset[1][surrounding]=output.content_2;
                dataset[2][surrounding]=output.content_3;
                dataset[3][surrounding]=output.content_4;
                dataset[4][surrounding]=output.content_5;
                dataset[5][surrounding]=output.content_6;
                
                //console.log(surrounding+" => "+dataset[0][surrounding]);
                
                if(data_get==9){
                    analysis(temp_lat,temp_lng,renew_type);
                }
            }
        }
    })
}

function analysis(temp_lat,temp_lng,renew_type){
    if(data_get==9){
        
        var obj = {"[0][0]":dataset[0][0],"[0][1]":dataset[0][1],"[0][2]":dataset[0][2],"[0][3]":dataset[0][3],"[0][4]":dataset[0][4],"[0][5]":dataset[0][5],"[0][6]":dataset[0][6],"[0][7]":dataset[0][7],"[0][8]":dataset[0][8],
                    "[1][0]":dataset[1][0],"[1][1]":dataset[1][1],"[1][2]":dataset[1][2],"[1][3]":dataset[1][3],"[1][4]":dataset[1][4],"[1][5]":dataset[1][5],"[1][6]":dataset[1][6],"[1][7]":dataset[1][7],"[1][8]":dataset[1][8],
                    "[2][0]":dataset[2][0],"[2][1]":dataset[2][1],"[2][2]":dataset[2][2],"[2][3]":dataset[2][3],"[2][4]":dataset[2][4],"[2][5]":dataset[2][5],"[2][6]":dataset[2][6],"[2][7]":dataset[2][7],"[2][8]":dataset[2][8],
                    "[3][0]":dataset[3][0],"[3][1]":dataset[3][1],"[3][2]":dataset[3][2],"[3][3]":dataset[3][3],"[3][4]":dataset[3][4],"[3][5]":dataset[3][5],"[3][6]":dataset[3][6],"[3][7]":dataset[3][7],"[3][8]":dataset[3][8],
                    "[4][0]":dataset[4][0],"[4][1]":dataset[4][1],"[4][2]":dataset[4][2],"[4][3]":dataset[4][3],"[4][4]":dataset[4][4],"[4][5]":dataset[4][5],"[4][6]":dataset[4][6],"[4][7]":dataset[4][7],"[4][8]":dataset[4][8],
                    "[5][0]":dataset[5][0],"[5][1]":dataset[5][1],"[5][2]":dataset[5][2],"[5][3]":dataset[5][3],"[5][4]":dataset[5][4],"[5][5]":dataset[5][5],"[5][6]":dataset[5][6],"[5][7]":dataset[5][7],"[5][8]":dataset[5][8]}
        var sendobj = JSON.stringify(obj);
        //alert(sendobj);

        $.ajax({
            method: "post",
            url: "connect_feng_shui.php",
            data: {
                type:2,
                lat:23.0,
                lng:20.0,
                data:sendobj
              
            },
            success: function(datas) {
            var output = JSON.parse(datas);
                //output.content_1to4 -> the peom of the type of feng shui 
                //output.content_5 -> the judgement of chosen place
                console.log(output);
                if(output.content!=""){
                    //更新map.html中的詩句顯示
                    
                    $(".typ5-1").html(output.content_1);
                    $(".typ5-2").html(output.content_2);
                    $(".typ5-3").html(output.content_3);
                    $(".typ5-4").html(output.content_4);
                    $("#finalresult").html(output.content_5);
                    
                    
                    //add to the history list
                    
                    //var myposition = e.latLng;
                    if(renew_type==1){
                        var historydata = "(" + temp_lat + "," + temp_lng + ")";
                        result_type = "---> " + output.content_5;
                        //alert(historydata);
                        addItem(historydata,result_type);
                    }
                    else if(renew_type==2){
                        result_type = "---> " + output.content_5;
                        var addr = new Array();
                        addr = address.split(",");
                        address="("+addr[0]+", "+addr[1]+")";
                        //add to the history list 
                        addItem(address,result_type);
                    }
                    else if(renew_type==3){
                        result_type = "---> " + output.content_5;
                        //add to the history list 
                        addItem(address,result_type);
                    }
                    else if(renew_type==4){
                        /*
                        alert(address);
                        result_type = "---> " + output.content_5;
                        var addr = new Array();
                        addr = address.split(",");
                        if(research_type==1){
                            address="("+addr[0]+", "+addr[1]+")";
                        }
                        //add to the history list 
                        addItem(address,result_type);
                        */
                        var historydata = "(" + temp_lat + "," + temp_lng + ")";
                        result_type = "---> " + output.content_5;
                        //alert(historydata);
                        addItem(historydata,result_type);
                    }
                    
                    console.log("done!");
                    
                }
            }
        })
    }
}

function transform(surr,value,typ){
    if(typ==1){
        if(surr==4 || surr==5 || surr==6){
            return parseFloat(value)-0.0002;
        }
        else if(surr==0 || surr==3 || surr==7){
            return parseFloat(value);
        }
        else if(surr==1 || surr==2 || surr==8){
            return parseFloat(value)+0.0002;
        }
    }
    else{
        if(surr==6 || surr==7 || surr==8){
            return parseFloat(value)-0.0002;
        }
        else if(surr==0 || surr==1 || surr==5){
            return parseFloat(value);
        }
        else if(surr==2 || surr==3 || surr==4){
            return parseFloat(value)+0.0002;
        }
    }
}


function placeMarkerAndPanTo(latLng, map) {
    var img = {
        url: 'image/logo.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 30)
    };

    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: img
    });

    map.panTo(latLng);
    //add to the array of markers 
    markers.push(marker);
}

<!--end of setting the map>

<!--the process of searching by address>
$(document).ready(function () {
    $('#locationbutton').click(function () { //when the botton is pressed
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var current_latitude = position.coords.latitude; 
                var current_longitude = position.coords.longitude;
                //alert(current_latitude);
                //alert(current_longitude);
                
                
                
                //get the input
                address = current_latitude+","+current_longitude;

                //new a Geocoder
                var geocoder = new google.maps.Geocoder();
                //decode

                geocoder.geocode({
                    'address': address
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {

                        //                alert(results[0].geometry.location.lat());
                        //                alert(results[0].geometry.location.lng());
                        var myLatlng = {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                        };

                        //move the center of the map to the position
                        map.setCenter(myLatlng);
                        //place a pin there
                        placeMarkerAndPanTo(myLatlng, map);
                        //set the suitable zoom
                        map.setZoom(15);
                        //Fandel call for the 風水
                        
                        //call for the feng shui
                        
                        $(".typ5-1").html("");
                        $(".typ5-2").html("");
                        $(".typ5-3").html("");
                        $(".typ5-4").html("");
                        $("#finalresult").html("");
                        //alert("try2");
                        
                        data_get=0;
                        var surrounding;
                        for(surrounding=0; surrounding<=8; surrounding++){
                            var temp_lat=results[0].geometry.location.lat();
                            var temp_lng=results[0].geometry.location.lng();
                            
                            temp_lat=transform(surrounding,parseFloat(results[0].geometry.location.lat()),1);
                            temp_lng=transform(surrounding,parseFloat(results[0].geometry.location.lng()),2);
                            
                            fsearching(temp_lat,temp_lng,surrounding,2);
                        }
					    
                        /*
                        $.ajax({
                            method: "post",
                            url: "connect_feng_shui.php",
                            data: {
                                lat:results[0].geometry.location.lat(),
                                lng:results[0].geometry.location.lng()
                              
                              
                            },
                            success: function(datas) {
                            var output = JSON.parse(datas);
                                //output.content_1to4 -> the peom of the type of feng shui 
                                //output.content_5 -> the judgement of chosen place
                                console.log(output);
                                if(output.content!=""){
                                    //更新map.html中的詩句顯示
                                    $(".typ5-1").html(output.content_1);
                                    $(".typ5-2").html(output.content_2);
                                    $(".typ5-3").html(output.content_3);
                                    $(".typ5-4").html(output.content_4);
                                    $("#finalresult").html(output.content_5);

                                    result_type = "---> " + output.content_5;
                                    var addr = new Array();
                                    addr = address.split(",");
                                    address="("+addr[0]+", "+addr[1]+")";
                                    //add to the history list 
                                    addItem(address,result_type);
                                }
                            }
                        })*/
                    } else {
                        //alert('Not found!');
                        $(".typ5-1").html("Not found...");
                        $(".typ5-2").html("");
                        $(".typ5-3").html("");
                        $(".typ5-4").html("");
                        $("#finalresult").html("");
                    }
                });
                
            }, function() {
                alert("please change to https://");
                //handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            // handleLocationError(false, infoWindow, map.getCenter());
        }
        
    })
    
    
    $('#searchbutton').click(function () { //when the botton is pressed
        //get the input
        address = $("input[id='inputaddress']").val();

        //new a Geocoder
        var geocoder = new google.maps.Geocoder();
        //decode


        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                //                alert(results[0].geometry.location.lat());
                //                alert(results[0].geometry.location.lng());
                var myLatlng = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };

                //move the center of the map to the position
                map.setCenter(myLatlng);
                //place a pin there
                placeMarkerAndPanTo(myLatlng, map);
                //set the suitable zoom
                map.setZoom(15);
                //Fandel call for the 風水
                
                //call for the feng shui
                //console.log(e.latLng.lat()); 
                //var obj = {};
                //obj.latitude = results[0].geometry.location.lat();
                //obj.longitude = results[0].geometry.location.lng();
                
                $(".typ5-1").html("");
                $(".typ5-2").html("");
                $(".typ5-3").html("");
                $(".typ5-4").html("");
                $("#finalresult").html("");
                //alert("try2");
            
                data_get=0;
                var surrounding;
                for(surrounding=0; surrounding<=8; surrounding++){
                    var temp_lat=parseFloat(results[0].geometry.location.lat());
                    var temp_lng=parseFloat(results[0].geometry.location.lng());
                    
                    temp_lat=transform(surrounding,parseFloat(results[0].geometry.location.lat()),1);
                    temp_lng=transform(surrounding,parseFloat(results[0].geometry.location.lng()),2);
                    
                    fsearching(temp_lat,temp_lng,surrounding,3);
                }
            
                /*$.ajax({
                    method: "post",
                    url: "connect_feng_shui.php",
                    data: {
                        lat:results[0].geometry.location.lat(),
                        lng:results[0].geometry.location.lng()
                      
                      
                    },
                    success: function(datas) {
                    var output = JSON.parse(datas);
                        //output.content_1to4 -> the peom of the type of feng shui 
                        //output.content_5 -> the judgement of chosen place
                        console.log(output);
                        if(output.content!=""){
                            //更新map.html中的詩句顯示
                            $(".typ5-1").html(output.content_1);
                            $(".typ5-2").html(output.content_2);
                            $(".typ5-3").html(output.content_3);
                            $(".typ5-4").html(output.content_4);
                            $("#finalresult").html(output.content_5);

                            result_type = "---> " + output.content_5;
                            //add to the history list 
                            addItem(address,result_type);
                        }
                    }
                })*/
            } else {
                ///alert('Not found!');
                $(".typ5-1").html("Not found...");
                $(".typ5-2").html("");
                $(".typ5-3").html("");
                $(".typ5-4").html("");
                $("#finalresult").html("");
            }
        });
    })
});


function addItem(e,f) {
    var ul = document.getElementById("historylist");
    var li = document.createElement("li");
    //alert('here333!');
    li.appendChild(document.createTextNode(e));
    ul.appendChild(li);
    
    li.onclick = function() { // Note this is a function
        var es =(JSON.stringify(e)).substring(1,(JSON.stringify(e)).length-1);
        var research;
        //alert(e);
        
        if(JSON.stringify(e)[0]=="{"){
            //alert("type==0");
            var lsplit = new Array();
            lsplit = es.split(",");
            
            var fsplit1 = new Array();
            var fsplit2 = new Array();
            fsplit1 = lsplit[0].split(":");
            fsplit2 = lsplit[1].split(":");
            
            research = fsplit1[1]+","+fsplit2[1];
            research_type=1;
        }
        else if(e[0]=="("){
            //alert("type==1");
            //alert(es);
            var lsplit = new Array();
            lsplit = es.split(",");
            
            research = lsplit[0].substring(1,lsplit[0].length)+","+lsplit[1].substring(0,lsplit[1].length-1);
            //alert(research);
            research_type=1;
        }
        else{
            research = es;
            research_type=2;
        }
        
        //console.log("type="+research_type);
        
        //alert(research);
        
        
        //get the input
        var address = research;

        //new a Geocoder
        var geocoder = new google.maps.Geocoder();
        //decode


        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                //                alert(results[0].geometry.location.lat());
                //                alert(results[0].geometry.location.lng());
                var myLatlng = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };

                //move the center of the map to the position
                map.setCenter(myLatlng);
                //place a pin there
                placeMarkerAndPanTo(myLatlng, map);
                //set the suitable zoom
                map.setZoom(15);
                //Fandel call for the 風水
                
                //call for the feng shui
                //console.log(e.latLng.lat()); 
                //var obj = {};
                //obj.latitude = results[0].geometry.location.lat();
                //obj.longitude = results[0].geometry.location.lng();
                
                $(".typ5-1").html("");
                $(".typ5-2").html("");
                $(".typ5-3").html("");
                $(".typ5-4").html("");
                $("#finalresult").html("");
                //alert("try2");
            
            
                data_get=0;
                var surrounding;
                for(surrounding=0; surrounding<=8; surrounding++){
                    var temp_lat=parseFloat(results[0].geometry.location.lat());
                    var temp_lng=parseFloat(results[0].geometry.location.lng());
                    
                    temp_lat=transform(surrounding,parseFloat(results[0].geometry.location.lat()),1);
                    temp_lng=transform(surrounding,parseFloat(results[0].geometry.location.lng()),2);
                    
                    fsearching(temp_lat,temp_lng,surrounding,4);
                }
                
                /*$.ajax({
                    method: "post",
                    url: "connect_feng_shui.php",
                    data: {
                        lat:results[0].geometry.location.lat(),
                        lng:results[0].geometry.location.lng()
                      
                      
                    },
                    success: function(datas) {
                    var output = JSON.parse(datas);
                        //output.content_1to4 -> the peom of the type of feng shui 
                        //output.content_5 -> the judgement of chosen place
                        console.log(output);
                        if(output.content!=""){
                            //更新map.html中的詩句顯示
                            $(".typ5-1").html(output.content_1);
                            $(".typ5-2").html(output.content_2);
                            $(".typ5-3").html(output.content_3);
                            $(".typ5-4").html(output.content_4);
                            $("#finalresult").html(output.content_5);

                            result_type = "---> " + output.content_5;
                            var addr = new Array();
                            addr = address.split(",");
                            if(research_type==1){
                                address="("+addr[0]+", "+addr[1]+")";
                            }
                            //add to the history list 
                            addItem(address,result_type);
                        }
                    }
                })*/
            } else {
                //alert('Not found!');
                $(".typ5-1").html("Not found...");
                $(".typ5-2").html("");
                $(".typ5-3").html("");
                $(".typ5-4").html("");
                $("#finalresult").html("");
            }
        });
        
    };
  
    li.appendChild(document.createTextNode(f));
    ul.appendChild(li);
    

    
}
<!--end of the process of searching by address>

<!--handling the event of cleaning the history>
$(document).ready(function () {
    $("#clean").click(function () {
        //when the 'clean' buttom is pressed
        DeleteMarkers(); //call the function too clean the markers
    });

})
<!--end of the enent of cleaning the history>

function DeleteMarkers() {
    //Loop through all the markers and remove   
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    //delete the list
    $('#historylist li').remove();
}
