import httpx
import sqlite3
from datetime import datetime 

from bs4 import BeautifulSoup

def getAverageTime(name):
    new_con = sqlite3.connect("database.db")
    new_cur = new_con.cursor()
    t = datetime.now()
    threshhold_time= t.strftime('%H:%M:%S')
    res = new_cur.execute("SELECT location, time, estimatedtime FROM parking WHERE location=? ORDER BY date ASC LIMIT 18",(name,))
    #location, estimatedtime = res.fetchone()
    result = res.fetchall()
    sum = 0
    num1 = 0 
    for items in result:
        # if items[2] == 0:
            # items[]
        sum+=int(items[2])
        # print(items[2])
    if len(result) != 0:
        return sum/ len(result)
    else:
        return sum/1
    

def scrape():
    html = httpx.get("https://parking.fullerton.edu/parkinglotcounts/mobile.aspx").text
    soup = BeautifulSoup(html)
    table = soup.find("table")
    rows = table.find_all("tr")
    areas = {}
    for i in range(1, len(rows)):
        row = rows[i]

        cols = row.find_all("td")
        left_cols = cols[0].find_all("p")
        right_cols = cols[1]
        availability_str = right_cols.find_all('span')[0].text
        availability = None if availability_str == "Closed" else int(availability_str)
        name = left_cols[0].text.strip()
        total_spaces = int(left_cols[1].text.strip().replace("Total Spaces: \n", ""))
        last_update = left_cols[2].text
        fade_percentage = 0 if availability_str == "Closed" else max(0,min(1, availability/ total_spaces))
        avg_time = getAverageTime(name)

        areas[name] = {
            "availability": availability
            , "total_spaces": total_spaces
            , "last_update": last_update
            , "fade_percentage": fade_percentage
            , "avg_time": avg_time
        }
    return areas
