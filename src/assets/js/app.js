(function() {
  const preload = document.getElementById("preload");
  let loading = 0;
  let id = setInterval(frame, 64);

  function frame() {
    if(loading == 100) {
      clearInterval(id);
      document.getElementById("splash").style.display = "none";
      
    } else {
      loading = loading + 1;
      if(loading == 90) {
        preload.style.animation = "fadeout 1s ease";
      }
    }
  }
  })();

  function initMap() {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }

