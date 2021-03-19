const getCurrentPositionButton = document.getElementById("PLA")
getCurrentPositionButton.addEventListener("click",gCPButton)
let userPosition;

function getPosition(position) {
  userPosition = ([position.coords.latitude, position.coords.longitude]);
  console.log(userPosition)
  getCurrentPositionButton.innerText = "Ok ..."
  getCurrentPositionButton.disabled = true;
  map.flyTo(userPosition,8)
}


console.log("Carregando mapa...")
const mapi = document.getElementById("map")
let map = L.map('map').setView([51.505, -0.09], 20);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Yxqsnz 2021-2021',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieXhxc256IiwiYSI6ImNrbWVzaGp6MDJ2ejMzM29jeHN3Y2s2d24ifQ.yiJ4faHehBwdKB6-FC9ZNg'
}).addTo(map);
//Ah Sr.Show se vc tiver vendo vc esqueceu da chave lá no link.ovo usar ela k
mapi.style.height = `${window.screen.height - 130}px`
let markers = new Array();
map.on('click', async (e) => {
    const from = `${userPosition[0]}, ${userPosition[1]}`;
    const to = `${e.latlng.lat},${e.latlng.lng}`;
    const URL = `https://graphhopper.com/api/1/route?point=${from}&point=${to}&vehicle=car&points_encoded=false&key=60eed1a4-e582-4303-81c9-36330658c9bc`
    const r = await axios({
        method: 'get',
        url: URL,
    });
    const time = humanizeDuration(r.data.paths[0].time, { language: "pt" });  
    const distance = Math.round(r.data.paths[0].distance / 1000)
    const popup = L.popup(e.latlng)
    .setLatLng(e.latlng)
    .setContent(`<p>${distance}km de distancia</p> <p> ${time} até chegar lá.</p>`)
    .openOn(map);
    const marker = new L.marker(e.latlng);
    markers.push(marker);
    if(markers.length >= 2) {
      map.removeLayer(markers[0]);
      markers.shift();
    }
    map.addLayer(markers[0]);
  
})

async function gCPButton(){

    getCurrentPositionButton.disabled = true
    getCurrentPositionButton.innerText = "Clique em sim no popup";
    await navigator.geolocation.getCurrentPosition(getPosition,()=>{
        getCurrentPositionButton.className = "btn btn-danger"
        getCurrentPositionButton.innerText = "error";
        console.log(userPosition) 
    });
    setTimeout(() => {
        getCurrentPositionButton.style.display = "none";
    }, 5000);
}
///
