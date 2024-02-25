var map = L.map('map').setView([33.88134, -117.8818], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var heat = L.heatLayer([
// 	[50.5, 30.5, 0.2], // lat, lng, intensity
// 	[50.6, 30.4, 0.5],
// ], {radius: 25}).addTo(map);

// var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 20
// });
var polygonCoords = [
    [33.88005, -117.8823], // top left
    [33.8808, -117.8823], // top right
    [33.8808, -117.8812], // bottom right
    [33.88005, -117.8812] // bottom left
];

var polygon = L.polygon(polygonCoords, {
    color: 'red', // Polygon border color
    fillColor: 'blue', // Polygon fill color
    fillOpacity: 0.5 // Opacity of the fill color
}).addTo(map);

polygon._path.setAttribute("style", "border-radius: 10px");


var Jawg_Matrix = L.tileLayer('https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	accessToken: 'a6J0dqksQhPs7oQY9rohxRxO5YcWaRRalE73ExUez1i7VIottlDMpfienle5A9cS'
});
Jawg_Matrix.addTo(map)
// CartoDB_DarkMatter.addTo(map)