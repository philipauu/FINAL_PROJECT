console.log('loaded frontend app');

var default_location = {
    lat: 22.3964,
    lng: 114.1095
};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: default_location,
        mapTypeID: google.maps.MapTypeId.ROADMAP
    });

    var script = document.createElement('script');
    script.src = 'https://api.data.gov.hk/v1/carpark-info-vacancy';
    document.getElementsByTagName('head')[0].appendChild(script);

    for (var counter = 0; counter < data.results.length; counter++) {
        var location = {
            lat: data.results[counter].latitude,
            lng: data.results[counter].longitude
        }

        var marker = new google.maps.Marker({

            position: location,
            map: map
        });

    }

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

        //ADD INFO WINDOW


    });
};