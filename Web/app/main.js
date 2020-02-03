// we use define instead of require when we create a module
define([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/layers/support/LabelClass"，
  "esri/layers/GeoJSONLayer"
], function (WebScene, SceneView, FeatureLayer, LabelClass) {

  // the module exports an object with an init method
  // init creates the web scene and the view
  return {

    init: function() {

      // the web scene is the data model: it contains the basemap, the ground and the layers
      const webscene = new WebScene({
        basemap: null,
		ground: {
		surfaceColor: [226, 240, 255]
		}
      });
	  const countryBoundaries = new GeoJSONLayer({
		  url: "D:\\Wuhan-nCov\\Web\\data\\world_map.geojson",
		  title: "World Countries",
		  // we use a simple renderer when we want to symbolize all features with the same symbol
		  renderer: {
			type: "simple",
			symbol: {
			  type: "polygon-3d",
			  symbolLayers: [{
				type: "fill",
				material: { color: [255, 250, 239, 0.8] },
				outline: {
				  color: [70, 70, 70, 0.7]
				}
			  }]
			}
		  }
		});

		// then we add the layer to the web scene
		// I use the addMany method because we'll add some more layers later
		webscene.addMany([countryBoundaries]);
      // the view is the visual representation of the web scene
     const view = new SceneView({
		  container: "view",
		  map: webscene,
		  alphaCompositingEnabled: true,
		  environment: {
			background: {
			  type: "color",
			  color: [0, 0, 0, 0]
			},
			starsEnabled: false,
			atmosphereEnabled: false
		  },
		  highlightOptions: {
			color: "#ffee00",
			fillOpacity: 0
		  }
		});

		view.ui.empty("top-left");
      // setting the view as a global object is useful for debugging
      window.view = view;

    }
  }
});