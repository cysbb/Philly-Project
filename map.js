// ADD YOUR MAPBOX ACCESS TOKEN
mapboxgl.accessToken = "pk.eyJ1IjoiYWFtY2hpIiwiYSI6ImNra3phOHc2aTVrYXAydnF0cThlM2RoMmQifQ.macNTiCXmO9tzUN-uaY42Q"; //YOUR KEY HERE
 
// CREATE A NEW OBJECT CALLED MAP
const map = new mapboxgl.Map({
  container: "map", // container ID for the map object (this points to the HTML element)
  style: "mapbox://styles/aamchi/cl9wtvzju000k14mrr3a8bz7a", //YOUR STYLE URL
  center: [-75.1652, 39.9526], // starting position [lng, lat]
  zoom: 12, // starting zoom
  projection: "globe", // display the map as a 3D globe
});
// ADD A GEOJSON SOURCE THAT POINTS TO YOUR LOCAL FILE
map.on("load", function () {
    map.addSource("heat", {
      type: "geojson",
      data: "./heatVulnerability.geojson",
    });
   
    // ADD A LAYER TO THE MAP
    map.addLayer({
      id: "heat",
      type: "fill",
      source: "heat",
      layout: {},
      paint: {
        "fill-color": [
            // first introduce conditional in-case of null values
            "case",
            ["==", ["get", "HSI_SCORE"], null], 
            "rgba(0,0,0,0)",
            [
              // then use a linear ramp to display number values. Adjust rgba color values.
              "interpolate",
              ["linear"],
              ["get", "HSI_SCORE"],
              0,
              "rgba(255,0,0,0)",
              1,
              "rgba(60,60,60,20)",
              2,
              "rgba(90,60,60,100)",
              3,
              "rgba(175,60,60,175)",
              4,
              "rgba(255,60,60,225)",
            ],
          ],
          "fill-opacity": 0.9,
        },
      });
    });
    
    