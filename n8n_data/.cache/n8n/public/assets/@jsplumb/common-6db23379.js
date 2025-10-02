var PerimeterAnchorShapes;
(function(PerimeterAnchorShapes2) {
  PerimeterAnchorShapes2["Circle"] = "Circle";
  PerimeterAnchorShapes2["Ellipse"] = "Ellipse";
  PerimeterAnchorShapes2["Triangle"] = "Triangle";
  PerimeterAnchorShapes2["Diamond"] = "Diamond";
  PerimeterAnchorShapes2["Rectangle"] = "Rectangle";
  PerimeterAnchorShapes2["Square"] = "Square";
})(PerimeterAnchorShapes || (PerimeterAnchorShapes = {}));
var AnchorLocations;
(function(AnchorLocations2) {
  AnchorLocations2["Assign"] = "Assign";
  AnchorLocations2["AutoDefault"] = "AutoDefault";
  AnchorLocations2["Bottom"] = "Bottom";
  AnchorLocations2["BottomLeft"] = "BottomLeft";
  AnchorLocations2["BottomRight"] = "BottomRight";
  AnchorLocations2["Center"] = "Center";
  AnchorLocations2["Continuous"] = "Continuous";
  AnchorLocations2["ContinuousBottom"] = "ContinuousBottom";
  AnchorLocations2["ContinuousLeft"] = "ContinuousLeft";
  AnchorLocations2["ContinuousRight"] = "ContinuousRight";
  AnchorLocations2["ContinuousTop"] = "ContinuousTop";
  AnchorLocations2["ContinuousLeftRight"] = "ContinuousLeftRight";
  AnchorLocations2["ContinuousTopBottom"] = "ContinuousTopBottom";
  AnchorLocations2["Left"] = "Left";
  AnchorLocations2["Perimeter"] = "Perimeter";
  AnchorLocations2["Right"] = "Right";
  AnchorLocations2["Top"] = "Top";
  AnchorLocations2["TopLeft"] = "TopLeft";
  AnchorLocations2["TopRight"] = "TopRight";
})(AnchorLocations || (AnchorLocations = {}));
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function noSuchPoint() {
  return {
    d: Infinity,
    x: null,
    y: null,
    l: null,
    x1: null,
    y1: null,
    x2: null,
    y2: null
  };
}
function EMPTY_BOUNDS() {
  return {
    xmin: Infinity,
    xmax: -Infinity,
    ymin: Infinity,
    ymax: -Infinity
  };
}
var AbstractSegment = function() {
  function AbstractSegment2(params) {
    _classCallCheck(this, AbstractSegment2);
    this.params = params;
    _defineProperty(this, "x1", void 0);
    _defineProperty(this, "x2", void 0);
    _defineProperty(this, "y1", void 0);
    _defineProperty(this, "y2", void 0);
    _defineProperty(this, "extents", EMPTY_BOUNDS());
    _defineProperty(this, "type", void 0);
    this.x1 = params.x1;
    this.y1 = params.y1;
    this.x2 = params.x2;
    this.y2 = params.y2;
  }
  _createClass(AbstractSegment2, [{
    key: "findClosestPointOnPath",
    value: function findClosestPointOnPath(x, y) {
      return noSuchPoint();
    }
  }, {
    key: "lineIntersection",
    value: function lineIntersection(x1, y1, x2, y2) {
      return [];
    }
  }, {
    key: "boxIntersection",
    value: function boxIntersection(x, y, w, h) {
      var a = [];
      a.push.apply(a, this.lineIntersection(x, y, x + w, y));
      a.push.apply(a, this.lineIntersection(x + w, y, x + w, y + h));
      a.push.apply(a, this.lineIntersection(x + w, y + h, x, y + h));
      a.push.apply(a, this.lineIntersection(x, y + h, x, y));
      return a;
    }
  }, {
    key: "boundingBoxIntersection",
    value: function boundingBoxIntersection(box) {
      return this.boxIntersection(box.x, box.y, box.w, box.h);
    }
  }]);
  return AbstractSegment2;
}();
var UNDEFINED = "undefined";
var DEFAULT = "default";
var TRUE = "true";
var FALSE = "false";
var WILDCARD = "*";
export {
  AbstractSegment as A,
  DEFAULT as D,
  EMPTY_BOUNDS as E,
  FALSE as F,
  PerimeterAnchorShapes as P,
  TRUE as T,
  UNDEFINED as U,
  WILDCARD as W,
  AnchorLocations as a
};
