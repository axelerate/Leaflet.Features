L.LineSegment = L.Polyline.extend({});

L.lineSegment = function (latlngs, options) {
    return new L.LineSegment(latlngs, options);
};