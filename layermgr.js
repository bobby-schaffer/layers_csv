
  var map, csv;
  var latestLayer = null; //our reference to the current layer
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

var priorSelection = "unknown"; //the option the user selected (a string)

map.on("load", function() {
query("#lplist").on("change", function(e) {
var value = e.currentTarget.value;



// Remove previously added layer
if (null !== latestLayer) {
  if (true === isOverlaid) {

  }
  else {
    latestLayer.hide();
  }
} //if latestLayer not null
else {
  //hide the prior selection
  switch(priorSelection) {
    case "assault":
      assaultLayer.hide();
    break;
    case "auto":
      autoLayer.hide();
    break;
    case "burglary":
      burglaryLayer.hide();
    break;
    case "murder":
      murderLayer.hide();
    break;
    case "rape":
      rapeLayer.hide();
    break;
    case "robbery":
      robberyLayer.hide();
    break;
    case "theft":
      theftLayer.hide();
    break;
  } //switch
} //else

switch (value) {
  case "assault":
  if (null === assaultLayer) {
    assaultLayer = new CSVLayer("assault.csv");
    latestLayer = assaultLayer;
    currentColor = myRed;
  }
  else {
    assaultLayer.show();
    latestLayer = null;
  }
    break;
  case "auto":
    if (null === autoLayer) {
      autoLayer = new CSVLayer("auto.csv");
      latestLayer = autoLayer;
      currentColor = myBlue;
    }
    else {
      autoLayer.show();
      latestLayer = null;
    }
    break;
  case "burglary":
    latestLayer = new CSVLayer("burglary.csv");
    currentColor = myGreen;
    break;
  case "murder":
    if (null === murderLayer) {
      latestLayer = new CSVLayer("murder.csv");
      murderLayer = latestLayer; //our permanent copy
      currentColor = myPurple;
    }
    else {
      //we have a valid murderLayer to show
      murderLayer.show();
      latestLayer = null; //disconnect reference to rapeLayer
    }
    break;
  case "rape":
    if (null === rapeLayer){
      latestLayer = new CSVLayer("rape.csv");
      rapeLayer = latestLayer; // our permanent copy
      currentColor = myTurquoise;
    }
    else {
      //we have a valid rapeLayer to show
      rapeLayer.show();
      latestLayer = null; //disconnect reference to rapeLayer
    }
    break;
  case "robbery":
    if (null === robberyLayer) {
      robberyLayer = new CSVLayer("robbery.csv");
      latestLayer = robberyLayer;
      currentColor = myOrange;
    }
    else {
        robberyLayer.show();
        latestLayer = null;
    }
    break;
  case "theft":
    if (null === theftLayer) {
      theftLayer = new CSVLayer("theft.csv");
      latestLayer = theftLayer;
      currentColor = orangeRed;
    }
    else {
      theftLayer.show();
      latestLayer = null;
    }
    break;
}
//use this to figure out what layer to hide when we draw a new layer
priorSelection = value;

if (latestLayer) {
  var marker = new SimpleMarkerSymbol("solid", 15, null, currentColor);
  var renderer = new SimpleRenderer(marker);
  latestLayer.setRenderer(renderer);
  var template = new InfoTemplate("Location", "${address}");
  latestLayer.setInfoTemplate(template);
  map.addLayer(latestLayer);

  latestLayer.on("update-end", function() {
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
