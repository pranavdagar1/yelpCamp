
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: campground.geometry.coordinates, // starting position [lng, lat]
	zoom: 10, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()	//makes a marker
	.setLngLat(campground.geometry.coordinates)	//sets longitude and latitude
	.setPopup(			// customises the marker
		new mapboxgl.Popup({offset:25})
		.setHTML(
			`<H3>${campground.title}</h3><p>${campground.location}</p>`
		)
	)
	.addTo(map)