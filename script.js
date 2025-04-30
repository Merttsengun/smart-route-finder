// Initialize the map
const map = L.map('map').setView([37.178066, 28.372723], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Variables
let startMarker = null;
let endMarker = null;
let routeControl = null;
let graph = {}; // Will be loaded from graph-data.json

// Load graph data
fetch('./graph-data.json')
    .then(response => response.json())
    .then(data => {
        graph = data;
    })
    .catch(error => console.error("Graph failed to load:", error));

// Map click event
map.on('click', function(e) {
    if (!startMarker) {
        startMarker = L.marker(e.latlng, {
            draggable: true,
            icon: L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [25, 41]
            })
        }).addTo(map)
        .bindPopup("Start")
        .openPopup();

        startMarker.on('dragend', updateRoute);

    } else if (!endMarker) {
        endMarker = L.marker(e.latlng, {
            draggable: true,
            icon: L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [25, 41]
            })
        }).addTo(map)
        .bindPopup("End")
        .openPopup();

        endMarker.on('dragend', updateRoute);
        updateRoute();
    }
});

// Draw route function
function updateRoute() {
    if (routeControl) {
        map.removeControl(routeControl);
    }

    if (startMarker && endMarker) {
        const dijkstra = new Dijkstra();
        const result = dijkstra.findShortestPath(startMarker.getLatLng(), endMarker.getLatLng());

        routeControl = L.Routing.control({
            waypoints: [
                startMarker.getLatLng(),
                endMarker.getLatLng()
            ],
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: '#4CAF50', weight: 5 }]
            },
            router: L.Routing.osrmv1({
                serviceUrl: "https://router.project-osrm.org/route/v1"
            }),
            addWaypoints: false,
            draggableWaypoints: false,
            createMarker: () => null
        }).addTo(map);

        document.getElementById('distance').textContent = result.distance;
        document.getElementById('duration').textContent = result.duration;
    }
}

// Reset button
document.getElementById('reset-btn').addEventListener('click', function () {
    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    if (routeControl) map.removeControl(routeControl);

    startMarker = null;
    endMarker = null;
    routeControl = null;

    document.getElementById('distance').textContent = '-';
    document.getElementById('duration').textContent = '-';
});
