from flask import Flask 

app = Flask(__name__)

sample = 5


def indexPage():
    # map_content = getMap()
    return f"""
    <div id="map" style="height: 80vw; width: 80vh"></div>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="static/index.js"></script>
    <script src="leaflet-heat.js"></script>
    """
    

# members API route
@app.route("/")
def main():
    return indexPage()

if __name__ == "__main__":
    app.run(debug=True)
