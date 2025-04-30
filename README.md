Smart Route Planner
This is a web-based smart route planner built with Leaflet.js and Dijkstra's algorithm. Users can select a start and end location on the map to view the optimal route, estimated distance, and travel time.

Features
Interactive map using Leaflet.js

Click to set start and end points

Dynamic route drawing using Leaflet Routing Machine

Distance and estimated duration display

Reset button to clear markers and route

Demo
Open the index.html file in a web browser to run the application locally.

How It Works
Click on the map to place the start marker.

Click again to place the end marker.

The shortest route is calculated and displayed.

Drag the markers to update the route dynamically.

Use the Reset button to clear and start over.

Technologies Used
Leaflet.js

Leaflet Routing Machine

JavaScript

HTML & CSS

Project Structure
index.html: Main HTML file

style.css: Styling

script.js: Main script to handle user interaction and map

dijkstra.js: Simplified Dijkstra implementation

graph-data.json: Sample data for node coordinates

Setup Instructions
To run this project locally:

Clone the repository using the command:
git clone https://github.com/Merttsengun/smart-route-finder.git

Open the downloaded folder.

Locate the file named index.html and open it with your web browser.
(You can double-click it or use a local server like Live Server if you prefer.)

No installation is required. All necessary libraries are loaded via CDN
