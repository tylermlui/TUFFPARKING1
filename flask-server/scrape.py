import httpx

from bs4 import BeautifulSoup

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
        fade_percentage = 0 if availability_str == "Closed" else max(1,min(0, availability/ total_spaces))

        areas[name] = {
            "availability": availability
            , "total_spaces": total_spaces
            , "last_update": last_update
            , "fade_percentage": fade_percentage
        }
    return areas
