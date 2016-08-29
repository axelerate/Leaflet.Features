L.Editable.EllipseEditor = L.Editable.PathEditor.extend({

    ellipseMarkers: [],

    options: {
        skipMiddleMarkers: true
    },

    initialize: function (map, feature, options) {
        L.Editable.PathEditor.prototype.initialize.call(this, map, feature, options);
        this._resizeLatLngX = this.computeResizeLatLngX();
        this._resizeLatLngY = this.computeResizeLatLngY();
        this.feature._editor = this;
    },

    computeResizeLatLngX: function () {
        var point = this.map.project(L.latLng(this.feature._latlng.lat, this.feature._latlng.lng + this.feature._getLngRadius()));
        return this.map.unproject([point.x, point.y]);
    },

    computeResizeLatLngY: function () {
        var point = this.map.project(L.latLng(this.feature._latlng.lat + this.feature._getLatRadius(), this.feature._latlng.lng));
        return this.map.unproject([point.x, point.y]);
    },

    getLatLngs: function () {
        return [this.feature._latlng, this._resizeLatLngX, this._resizeLatLngY];
    },

    getDefaultLatLngs: function () {
        return this.getLatLngs();
    },

    resizeX: function (e) {
        var radius = this.feature._latlng.distanceTo(e.latlng);
        this.feature.setRadius([radius, this.feature._mRadiusY]);
    },

    resizeY: function (e) {
        var radius = this.feature._latlng.distanceTo(e.latlng);
        this.feature.setRadius([this.feature._mRadiusX, radius]);
    },

    tilt: function (e) {

    },

    recomputeMarkers: function (rightEndPointLatlng, topEndPointLatlng) {
        var xVertex = this._resizeLatLngX.__vertex;
        var yVertex = this._resizeLatLngY.__vertex;
        this._setMarkerPosition(xVertex, topEndPointLatlng);
        this._setMarkerPosition(yVertex, rightEndPointLatlng);
    },

    onVertexMarkerDrag: function(e){
        var iconPos = L.DomUtil.getPosition(e.vertex._icon);
        var latlng = e.vertex._map.layerPointToLatLng(iconPos);
        if (e.vertex.getIndex() === 1){
            this.resizeX(e);
            latlng = L.latLng(this._resizeLatLngX.lat, latlng.lng);
            this._setMarkerPosition(e.vertex, latlng);
        } else if (e.vertex.getIndex() === 2){
            this.resizeY(e);
            latlng = L.latLng(latlng.lat, this._resizeLatLngY.lng);
            this._setMarkerPosition(e.vertex, latlng);
        } else {
            this.updateResizeLatLng(e);
        }
        e.vertex.editor.refresh();
    },

    _setMarkerPosition: function(position, latlng){
        L.DomUtil.setPosition(position._icon, position._map.latLngToLayerPoint(latlng));
        position.latlng.update(L.latLng(latlng.lat, latlng.lng));
        position._latlng = position.latlng;  // Push back to Leaflet our reference.
    }
});

L.Ellipse.include(L.EditableMixin);

L.Ellipse.include({

    getEditorClass: function (map) {
        return (map && map.options.ellipseEditorClass) ? map.options.ellipseEditorClass : L.Editable.EllipseEditor;
    }

});