
  var map, csv, layer;
  var assaultLayer = null,
      autoLayer = null,
      burglaryLayer = null,
      theftLayer = null,
      murderLayer = null,
      rapeLayer = null,
      robberyLayer = null;
  var isOverlaid = false;
  require([
    "dojo/query",
    "esri/map",
    "esri/layers/CSVLayer",
    "esri/Color",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/InfoTemplate",
    "esri/urlUtils",
    "dojo/domReady!"
  ], function(
    query, Map, CSVLayer, Color, SimpleMarkerSymbol, SimpleRenderer, InfoTemplate, urlUtils
  )
  {
    map = new Map("map", {
      basemap: "gray",
      center: [ -95.4, 29.8 ],
      zoom: 10
    });

var currentColor;
var orangeRed = new Color([238, 69, 0, 0.5]); // hex is #ff4500
var myRed = new Color([255,0,0,0.5]);
var myGreen = new Color([0,255,0,0.5]);
var myBlue = new Color([0,0,255,0.5]);
var myPurple = new Color([255,0,255,0.5]);
var myTurquoise = new Color([0,255,255,0.5]);
var myOrange = new Color([255,255,0,0.5]);

map.on("load", function() {
query("#lplist").on("change", function(e) {
var value = e.currentTarget.value;

// Remove previously added layer
if (layer) {

  if (true === isOverlaid) {
    //save layer to be nuked later;
    //figure out what type of crime layer
    //then see if that crimeLayer type is null
    //  if it is, then save as crimeLayer = layer
    //  if it is not null, then we have to release the resources for the
    //    layer before we overwrite it
    // ?? map.removeLayer(crimeLayer);
    //    crimeLayer = null;
    //    crimeLayer = newCrimeLayer;
  }
  else { //release resources
    map.removeLayer(layer);
    layer = null;
  }

}

switch (value) {
  case "assault":
    layer = new CSVLayer("assault.csv");
    currentColor = myRed;
    break;
  case "auto":
    layer = new CSVLayer("auto.csv");
    currentColor = myBlue;
    break;
  case "burglary":
    layer = new CSVLayer("burglary.csv");
    currentColor = myGreen;
    break;
  case "murder":
    layer = new CSVLayer("murder.csv");
    currentColor = myPurple;
    break;
  case "rape":
    layer = new CSVLayer("rape.csv");
    currentColor = myTurquoise;
    break;
  case "robbery":
    layer = new CSVLayer("robbery.csv");
    currentColor = myOrange;
    break;
  case "theft":
    layer = new CSVLayer("theft.csv");
    currentColor = orangeRed;
    break;
}

if (layer) {
  var marker = new SimpleMarkerSymbol("solid", 15, null, currentColor);
  var renderer = new SimpleRenderer(marker);
  layer.setRenderer(renderer);
  var template = new InfoTemplate("Location", "${address}");
  layer.setInfoTemplate(template);
  map.addLayer(layer);

  layer.on("update-end", function() {
    //alert("end update");  //remove symbol showing that system is loading info?
    // map.centerAt(graphicsUtils.graphicsExtent(array.filter(this.graphics, function(graphic) {
    //   return graphic.geometry;
    // })).getCenter());
  });
}
});
});

map.on("unload", function() {
  console.log("unloading");
});

});

function handleClick(cb) {
  //alert("Clicked, new value = " + cb.checked);
  isOverlaid = cb.checked;
  console.log("Clicked, new value = " + cb.checked);
  // console.log( " and cbid is" + cb.id);
  // console.log( " and value is" + cb.value);
}
