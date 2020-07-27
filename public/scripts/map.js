const long = document.querySelector("#longitude");
const lat = document.querySelector("#lattitude");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        long.value = position.coords.longitude;
        lat.value = position.coords.latitude;
        generateMap();
    });
} else {
    long.value = 0;
    lat.value = 0;
    generateMap();
}

const generateMap = () => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaGJ1bGw1IiwiYSI6ImNrYmltNXJuODBlYzkyemswMW0yMXA0cHEifQ.GQ2xmB_vl-dsDet_3GbaLQ";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [long.value, lat.value],
        zoom: 12,
    });

    const marker = new mapboxgl.Marker().setLngLat([long.value, lat.value]).setDraggable(true).addTo(map);
    marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        long.value = lngLat.lng;
        lat.value = lngLat.lat;
    });
};
