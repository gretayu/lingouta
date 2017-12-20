<!--setting the map>
var map;
var markers = [];
var result_type;
var research_type;
var infoWindow;

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
	
        $.ajax({
			method: "post",
			url: "connect_feng_shui.php",
			data: {
                lat:e.latLng.lat(),
                lng:e.latLng.lng()
              
              
            },
			success: function(datas) {
            var output = JSON.parse(datas);
                //output.content_1to4 -> the peom of the type of feng shui 
                //output.content_5 -> the judgement of chosen place
                console.log(output);
				if(output.content!=""){
					/*更新map.html中的詩句顯示*/
                    $(".typ5-1").html(output.content_1);
                    $(".typ5-2").html(output.content_2);
                    $(".typ5-3").html(output.content_3);
                    $(".typ5-4").html(output.content_4);
                    $("#finalresult").html(output.content_5);
                    
                    //add to the history list
                    var myposition = e.latLng;
                    var historydata = e.latLng;
                    result_type = "---> " + output.content_5;
                    //alert(historydata);
                    addItem(historydata,result_type);
				}
            }
        })
        
        
    });

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
                var address = current_latitude+","+current_longitude;

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
                                    /*更新map.html中的詩句顯示*/
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
                        })
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
        var address = $("input[id='inputaddress']").val();

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
                            /*更新map.html中的詩句顯示*/
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
                })
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
            var lsplit = new Array();
            lsplit = es.split(",");
            
            research = lsplit[0].substring(1,lsplit[0].length)+","+lsplit[1].substring(0,lsplit[1].length-1);
            research_type=1;
        }
        else{
            research = es;
            research_type=2;
        }
        
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
                            /*更新map.html中的詩句顯示*/
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
                })
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
