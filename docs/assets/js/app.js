//Animación splash
function screenOne() {
  document.getElementById('screenOne').style.display = 'block';
  document.getElementById('screenTwo').style.display = 'none';
}

function screenTwo() {
  document.getElementById('screenOne').style.display = 'none';
  document.getElementById('screenTwo').style.display = 'block';
}

window.onload = function() {
  setTimeout(screenTwo, 4000);
};

// Api de Zomato
// const callApiZomato = () => {
//   return fetch('https://developers.zomato.com/api/v2.1/geocode', {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'user-key': 'a451c91355efeb18293bfd7b738d7596'
//     }
//   }).then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('La llamada a la API falló');
//     }
//   }).then((respuestaJson) => {
//     console.log(respuestaJson);

//     return respuestaJson;
//   }).catch((err) => {
//     console.error(err);
//   });
// };
// callApiZomato();

//Inicia mapa
function initMap() {
  const myLatLng = { lat: -33.400, lng: -70.600 };
  const map = new google.maps.Map(document.getElementById('mapContainer'), {
    center: myLatLng,
    zoom: 15,
  });

  /* let marker = new google.maps.Marker({
    position: myLatLng,
    title: 'Hello World!'
  });
  marker.setMap(map);
  */

  infoWindow = new google.maps.InfoWindow;

  //Input de búsqueda
  let input = document.getElementById('searchInput');
  let searchBox = new google.maps.places.SearchBox(input);

  // Centra la búsqueda en la parte del mapa que se está viendo
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Cuando se hace click en una de las predicciones
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    // Limpia marcadores anteriores
    markers.forEach(function(markers) {
      markers.setMap(null);
    });
    markers = []; 

    // For each place, get the icon, name and location.
    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      let icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  //Ubicación actual (geolocalización)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Tu ubicación actual');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
     'Error: Your browser doesn\'t support geolocation.');
infoWindow.open(map);
}


//Ventana de información
/*
 let infowindow = new google.maps.InfoWindow();
  let service = new google.maps.places.PlacesService(map);

   service.getDetails({
     placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
   }, function(place, status) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       let marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location
       });
       google.maps.event.addListener(marker, 'click', function() {
         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
           'Place ID: ' + place.place_id + '<br>' +
           place.formatted_address + '</div>');
         infowindow.open(map, this);
       });
     }
   });
   */
}
