from flask import Flask, request, redirect
from scrape import scrape
import sqlite3
from datetime import datetime


app = Flask(__name__)

parkingInfo = scrape()

infoHTML = "<div class='lot-container'>\n"
for location, data in parkingInfo.items():
    availability = data['availability']
    avg_time = int(data['avg_time'])
    
    infoHTML += f"""
    <div class="lot-info" style="display: flex; justify-content: space-between;">
        <h2 style="margin: 0;">{location}</h2>
        <p style="margin: 0;">{availability} spaces</p>
    </div>
    <p class="timeText">~ {avg_time} minutes to find parking</p>
    <br>
    """
infoHTML += "</div>\n"

def indexPage():
    # map_content = getMap()
    return f"""
    <body>
        <h1>Tuff-Parking</h1>
        <div class="container">
            <div class="info-box">
                {infoHTML}
                <div class="last-update"> Updated: {parkingInfo['Nutwood Structure']['last_update']} </div>
            </div>
            <div id="map"></div>
        </div>
        <div class="submitForm">
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
            0-10 minutes </option>
            <option value="10">
            10-20 minutes </option>
            <option value="20">
            20-30 minutes </option>
            <option value="30">
            30-40 minutes </option>
            <option value="40">
            40-50 minutes </option>
            <option value="50">
            50-60 minutes </option>
            <option value="60">
            60+ minutes </option>
            </select>
            
            <button type="submit"> 
            Submit</button>
            </form>
        </div>
    </body>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
        <link rel="stylesheet" href="./static/index.css" />
        <link rel="stylesheet" href="https://use.typekit.net/szi4gim.css">
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
        <script src="static/index.js"></script>
    """
    

# members API route
@app.route("/")
def main():
    return indexPage()

@app.route("/scrape")
def scrapeRoute():
    print("scrape is running")
    return scrape()


@app.route("/api",methods =["POST"])
def api():
    print("database is running")
    conn = sqlite3.connect('database.db')
    data = request.form
    print(data['location'])

    curr = conn.cursor()
    c = datetime.now()
    current_time = c.strftime('%H:%M:%S')
    print(data["location"],datetime.today().weekday(),current_time, data["estimatedtime"])
    curr.execute("""INSERT INTO parking (location, date, time, estimatedtime) values (?,?,?,?)""",(data["location"],datetime.today().weekday(),current_time, data["estimatedtime"] ))
    conn.commit()
    conn.close()

    return redirect("/")



if __name__ == "__main__":
    app.run(debug=True)
