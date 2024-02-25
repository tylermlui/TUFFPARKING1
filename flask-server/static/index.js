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
var nut  = [
    [33.88005, -117.8823], // top left
    [33.8808, -117.8823], // top right
    [33.8808, -117.8812], // bottom right
    [33.88005, -117.8812] // bottom left
];




const lowColor = {
    red: 255,
    green: 49,
    blue: 49
};
const mediumColor = {
    red: 255,
    green: 255,
    blue: 51
};
const highColor = {
    red: 57,
    green: 255,
    blue: 20
};

function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
    var color1 = rgbColor1;
    var color2 = rgbColor2;
    var fade = fadeFraction;

    // Do we have 3 colors for the gradient? Need to adjust the params.
    if (rgbColor3) {
      fade = fade * 2;

      // Find which interval to use and adjust the fade percentage
      if (fade >= 1) {
        fade -= 1;
        color1 = rgbColor2;
        color2 = rgbColor3;
      }
    }

    var diffRed = color2.red - color1.red;
    var diffGreen = color2.green - color1.green;
    var diffBlue = color2.blue - color1.blue;

    var gradient = {
      red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
      green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
      blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
    };

    return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
  }
  let dicAreas;

  fetch('/api')
      .then(response => response.json())
      .then(areas => {
          dicAreas = areas;
          getGradient(dicAreas);
      })
      .catch(error => {
          // Handle errors
          console.error('Error fetching data:', error);
      });
  
    var circles = {
        "Nutwood Structure" : { center: [33.87900170185511, -117.88865432488892], radius: 150, tooltip: "Nutwood Parking" },
        "Eastside Structure" : { center: [33.88053842742955, -117.88163836042212], radius: 150, tooltip: "Eastside Parking"},
        "State College Structure" : { center: [33.88189, -117.88927], radius: 150, tooltip: "State College Parking" },
        "Lot A & G" : { center: [33.8873, -117.88846], radius: 150, tooltip: "Lot A & G" }
    };


    function getGradient(dicAreas) {
        console.log(dicAreas)


        // for(key in circles){
        //     L.circle(circles[f'{key}'][center], {color: colorGradient(dicAreas[f"{key}"]["fade_percentage"], lowColor, mediumColor, highColor), radius: 150}).addTo(map);
            
        // }
        // gradientval = dicAreas["Eastside Structure"]["fade_percentage"]
        //     L.circle([33.88053842742955, -117.88163836042212 ], {color: colorGradient(gradientval, lowColor, mediumColor, highColor), radius: 150}).addTo(map);
      
    }

var nutwood= L.circle([33.87900170185511, -117.88865432488892], {color: colorGradient(0.9, lowColor, mediumColor, highColor), radius: 150}).addTo(map);
var stateCollege = L.circle([33.88300974613598, -117.88871227960868], {color: colorGradient(0.3, lowColor, mediumColor, highColor), radius: 150}).addTo(map);
var aAndG = L.circle([33.88693893278237, -117.88840889203954], {color: colorGradient(0.6, lowColor, mediumColor, highColor), radius: 150}).addTo(map);

var Jawg_Matrix = L.tileLayer('https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	accessToken: 'a6J0dqksQhPs7oQY9rohxRxO5YcWaRRalE73ExUez1i7VIottlDMpfienle5A9cS'
});
Jawg_Matrix.addTo(map)
// CartoDB_DarkMatter.addTo(map)