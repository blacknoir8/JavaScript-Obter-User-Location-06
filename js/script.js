let locationButton = document.querySelector("#get")
let locationDiv = document.querySelector("#location-details")

locationButton.addEventListener("click", ()=> {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError)
  }else {
    locationDiv.innerHTML = "The browser does not support geolocation"
  }
})

const checkError = (error) => {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.innerHTML = "Please allow access to location";
    break;
    case error.POSITION_UNAVAILABLE:
      locationDiv.innerHTML = "Location information unavailable"
      break;
    case error.TIMEOUT:
      locationDiv.innerHTML = "The request to get user location timed out"
  }
}

const showLocation = async(position) => {
  let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json
  `);

  let data = await response.json();
  console.log(data.address.city);
  console.log(data.address.country);
  locationDiv.innerHTML = `${data.address.city}, ${data.address.country}`
}