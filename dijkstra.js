class Dijkstra {
    findShortestPath(startLatLng, endLatLng) {
        const distance = (L.latLng(startLatLng).distanceTo(L.latLng(endLatLng)) / 1000).toFixed(2);
        return {
            path: [startLatLng, endLatLng],
            distance: distance,
            duration: (distance * 2.5).toFixed(0) // 60 km/h 
        };
    }
}
