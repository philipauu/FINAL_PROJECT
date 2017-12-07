console.log('loaded map');

// FUNCTION TO EDIT INFOWINDOW

function edit_marker_name(a, thiis) {
    var edit_marker_name = prompt("Edit marker name : " + $(thiis).html());

    marker = window['marker_' + a];

    if (edit_marker_name) {
        $(thiis).html(edit_marker_name);

        marker.setTitle(edit_marker_name);

        google.maps.event.clearListeners(marker, 'click');

        var content = "<span class='address_name' onclick='edit_marker_name(\"" + a + "\", this)'>" + edit_marker_name + "</span>";
        var infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
            return function () {
                infowindow.setContent(content);
                infowindow.open(map, marker);
            };
        })(marker, content, infowindow));
    }
}

// LOAD MAP

var default_location = {
    lat: 22.3964,
    lng: 114.1095
};

function initMap() {
    console.log(data);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: default_location,
        mapTypeID: google.maps.MapTypeId.ROADMAP
    });

    var script = document.createElement('script');
    script.src = 'https://api.data.gov.hk/v1/carpark-info-vacancy';
    document.getElementsByTagName('head')[0].appendChild(script);

    for (var counter = 0; counter < data.length; counter++) {
        var location = {
            lat: data[counter].latitude,
            lng: data[counter].longitude
        }

        var marker = new google.maps.Marker({

            position: location,
            map: map
        });

    }

    // AUTOCOMPLETE SEARCHBAR 

    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        //CREATING MARKER BY CLICKING

        var marker_name = 'null';

        google.maps.event.addListener(map, 'click', function (event) {

            if (marker_name === 'null') {
                marker_name = 'a';
            } else {
                marker_name = String.fromCharCode(marker_name.charCodeAt(0) + 1);
            }

            //ADDING PARAMETER MARKER

            icons = 'http://maps.google.com/mapfiles/ms/micons/red-dot.png';
            var location = event.latLng;
            window['marker_' + marker_name] = new google.maps.Marker({
                position: location,
                map: map,
                icon: icons,
                draggable: true,
                title: '' + marker_name
            });

            //ID MARKER

            var marker = window['marker_' + marker_name];

            //EVENT TO SHOW MARKER TITLE

            var content = "<span class='address_name' onclick='edit_marker_name (\"" + marker_name + "\", this)'>" + marker_name + "</span>";
            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                return function () {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                };
            })(marker, content, infowindow));
        });

    });
};