from flask import Flask 
from scrape import scrape

app = Flask(__name__)

def indexPage():
    # map_content = getMap()
    return f"""
    <body>
        <div class="header"> FULLYPARKS</div>
        <div id="map"></div>
        <div id="info"></div>
    </body>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
        <link rel="stylesheet" href="./static/index.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
        <script src="static/index.js"></script>
        <script src="leaflet-heat.js"></script>
    """
    

# members API route
@app.route("/")
def main():
    return indexPage()

@app.route("/api")
def api():
    return scrape()

if __name__ == "__main__":
    app.run(debug=True)
