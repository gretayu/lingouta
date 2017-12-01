<!--setting the map>
var map;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('realmap'), {
        center: {
            lat: 23.5,
            lng: 121
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
        //Fandle call for the 風水
        //add to the history list
        var myposition = e.latLng;
        var historydata = e.latLng;
        //alert(historydata);
        addItem(historydata);
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
                //add to the history list 
                addItem(address);
                //Fandel call for the 風水
            } else {
                alert('Not found!');
            }
        });
    })
});

function addItem(e) {
    var ul = document.getElementById("historylist");
    var li = document.createElement("li");
    //alert('here333!');
    li.appendChild(document.createTextNode(e));
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
