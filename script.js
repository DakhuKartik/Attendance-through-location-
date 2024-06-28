document.getElementById('checkLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      displayError("Geolocation is not supported by this browser.");
    }
  });
  
  function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Latitude:", latitude, "Longitude:", longitude);
  
    if (isInSpecificLocation(latitude, longitude)) {
      displayResult("User is in the specific location!");
    } else {
      displayResult("User is not in the specific location.");
    }
  }
  
  function errorCallback(error) {
    displayError("Error getting location: " + error.message);
  }
  
  function isInSpecificLocation(latitude, longitude) {
    const targetLatitude = 19.11225351919087;
    const targetLongitude = 77.29305993754807;//19.878433983469108, 75.36393874523812 19.11225351919087, 77.29305993754807
    const radius = 1; // Radius in kilometers
  
    const distance = calculateDistance(latitude, longitude, targetLatitude, targetLongitude);
    return distance <= radius;
  }
  
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  function displayResult(message) {
    document.getElementById('result').textContent = message;
  }
  
  function displayError(message) {
    document.getElementById('error').textContent = message;
  }
  