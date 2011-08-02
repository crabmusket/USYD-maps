function SimpleProjection()
{
  this.origin = new google.maps.Point(0, 0);
}

SimpleProjection.prototype.fromLatLngToPoint = function(latLng)
{
  return new google.maps.Point(latLng.lng(), latLng.lat());
}

SimpleProjection.prototype.fromPointToLatLng = function(point)
{
  return new google.maps.LatLng(point.y, point.x);
}

  var usydTypeOptions = {
    getTileUrl: function(coord, zoom) {
        if(!getNormalizedCoord(coord, zoom))
            return null;
        return "./usydlarge.gif";
    },
    tileSize: new google.maps.Size(256, 256),
    isPng: false,
    maxZoom: 4,
    minZoom: 0,
    name: "Default",
    projection: new SimpleProjection()
  };

  var usydMapType = new google.maps.ImageMapType(usydTypeOptions);

  function initialize() {
    var myLatlng = new google.maps.LatLng(0, 0);
    var myOptions = {
      center: myLatlng,
      zoom: 0,
      mapTypeControlOptions: {
        mapTypeIds: ["usyd"]
      }
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
    map.mapTypes.set('usyd', usydMapType);
    map.setMapTypeId('usyd');

  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(0, 0),
      map: map, 
      title:"The Origin!"
  });

  }

  // Normalizes the coords that tiles repeat across the x axis (horizontally)
  // like the standard Google map tiles.
  function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
      return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
      return null;
    }

    return {
      x: x,
      y: y
    };
  }
