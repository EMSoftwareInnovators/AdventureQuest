const long = document.querySelector("#longitude");
const lat = document.querySelector("#latitude");
const selectedLong = map.getAttribute("data-longitude");
const selectedLat = map.getAttribute("data-latitude");

if (selectedLong !== "" && selectedLong !== "") {
	long.value = selectedLong;
	lat.value = selectedLat;
	generateMap();
} else {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				long.value = position.coords.longitude;
				lat.value = position.coords.latitude;
				generateMap();
			},
			(error) => {
				// middle of augusta
				long.value = -81.96791123383188;
				lat.value = 33.47367594703721;
				generateMap();
			}
		);
	} else {
		// middle of augusta
		long.value = -81.96791123383188;
		lat.value = 33.47367594703721;
		generateMap();
	}
}

function generateMap() {
	mapboxgl.accessToken = "pk.eyJ1IjoiaGJ1bGw1IiwiYSI6ImNrYmltNXJuODBlYzkyemswMW0yMXA0cHEifQ.GQ2xmB_vl-dsDet_3GbaLQ";
	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
		center: [long.value, lat.value],
		zoom: 12
	});

	const marker = new mapboxgl.Marker().setLngLat([long.value, lat.value]).setDraggable(true).addTo(map);
	marker.on("dragend", () => {
		const lngLat = marker.getLngLat();
		long.value = lngLat.lng;
		lat.value = lngLat.lat;
		console.log(lngLat.lng, lngLat.lat);
	});
}
