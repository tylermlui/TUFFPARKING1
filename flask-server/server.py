from flask import Flask, request, redirect
from scrape import scrape
import sqlite3
from datetime import datetime


app = Flask(__name__)


def indexPage():
    # map_content = getMap()
    return f"""
    <body>
        <div class="header"> FULLYPARKS</div>
        <div id="map"></div>
        <div id="info"></div>
        <form action="/api" method="post">
        <select name="location"> 
        <option value="Nutwood Structure">
        Nutwood Structure</option>
        <option value="Eastside Structure">
        Eastside Structure</option>
        <option value="State College Structure">
        State College Structure</option>
        <option value="Lot A & G">
        Lot A & G</option>
        </select>


        <select name="estimatedtime"> 
        <option value="1">
        0-10 </option>
        <option value="10">
        10-20 </option>
        <option value="20">
        20-30</option>
        <option value="30">
        30-40</option>
        <option value="40">
        40-50</option>
        <option value="50">
        50-60</option>
        <option value="60">
        60+</option>
        </select>
        
        <button type="submit"> 
        submit</button>

        </form>
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

@app.route("/scrape")
def scrapeRoute():
    return scrape()


@app.route("/api",methods =["POST"])
def api():
    conn = sqlite3.connect('database.db')
    data = request.form
    print(data['location'])

    curr = conn.cursor()
    c = datetime.now()
    current_time = c.strftime('%H:%M:%S')
    curr.execute("""INSERT INTO parking (location, date, time, estimatedtime) values (?,?,?,?)""",(data["location"],datetime.today().weekday(),current_time, data["estimatedtime"] ))
    conn.commit()
    conn.close()

    return redirect("/")



if __name__ == "__main__":
    app.run(debug=True)
