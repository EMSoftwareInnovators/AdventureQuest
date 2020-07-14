mapboxgl.accessToken = "pk.eyJ1IjoiaGJ1bGw1IiwiYSI6ImNrYmltNXJuODBlYzkyemswMW0yMXA0cHEifQ.GQ2xmB_vl-dsDet_3GbaLQ";
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v11",
	center: [0, 0],
	zoom: 1
});

const marker = new mapboxgl.Marker().setLngLat([0, 0]).setDraggable(true).addTo(map);
marker.on("dragend", () => {
	const lngLat = marker.getLngLat();
	console.log(`Longitude: ${lngLat.lng} Lattitude: ${lngLat.lat}`);
});
