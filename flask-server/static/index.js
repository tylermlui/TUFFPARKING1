var map = L.map('map').setView([33.883, -117.88568213440378], 16).setMaxBounds([[33.897892, -117.896706],[33.865440, -117.869467]]);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


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

    if (rgbColor3) {
      fade = fade * 2;

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

  fetch('/scrape')
      .then(response => response.json())
      .then(areas => {
          dicAreas = areas;
          getGradient(dicAreas);
          console.log(dicAreas)
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

        for (let key in circles) {

            console.log(key, circles)

        for (let key in circles) {

            const center = circles[key].center;
            const fade_percentage = dicAreas[key].fade_percentage;
            const color = colorGradient(fade_percentage, lowColor, mediumColor, highColor);
        
            var circle = L.circle(center, { color: color, radius: 150 });
            circle.bindTooltip("<span class='text-info'>" + circles[key].tooltip + "</span>", {
                permanent: true,
                direction: 'center',
                offset: [0, 0],
                className: 'transparent-tooltip'
            });            
            circle.addTo(map);

            
            // addTo(map);
        }
            L.circle(center, { color: color, radius: 150 }).addTo(map);
        }
    }


var Jawg_Matrix = L.tileLayer('https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	accessToken: 'a6J0dqksQhPs7oQY9rohxRxO5YcWaRRalE73ExUez1i7VIottlDMpfienle5A9cS'
});
Jawg_Matrix.addTo(map)



var info = dicAreas
// CartoDB_DarkMatter.addTo(map)