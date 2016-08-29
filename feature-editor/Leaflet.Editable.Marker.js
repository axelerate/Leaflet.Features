L.Editable.MarkerEditor.include({

    initialize: function (map, feature, options){
        L.Editable.BaseEditor.prototype.initialize.call(this, map, feature, options);
        this.feature = feature;
        this._addVertexMarker();
        this._showCoordinatePopup();
    },

    addVertexMarker: function (latlng, latlngs) {
        return new this.tools.options.vertexMarkerClass(latlng, latlngs, this);
    },

    onVertexMarkerMouseDown: function (e) {
        this.fireAndForward('editable:vertex:mousedown', e);
    },

    onVertexMarkerDrag: function (e) {
        this.onMove(e);
        if (this.feature._bounds) this.extendBounds(e);
        this.fireAndForward('editable:vertex:drag', e);
    },

    onVertexMarkerDragStart: function (e) {
        this.fireAndForward('editable:vertex:dragstart', e);
    },

    onVertexMarkerDragEnd: function (e) {
        this.fireAndForward('editable:vertex:dragend', e);
    },

    refresh: function () {
        this.feature.update();
    },

    _onDragStart: function (e) {
        if(this.feature.metadata && (this.feature.metadata.renderableType === 'IMAGE' || 'ICON' || 'TEXT')) {
            L.DomUtil.remove(this.vertexMarker._icon);
        }
        this.onEditing();
        this.fireAndForward('editable:dragstart', e);
    },

    _onDrag: function (e) {
        this._showCoordinatePopup();
        this.fireAndForward('editable:drag', e);
    },

    _onDragEnd: function (e) {
        this._addVertexMarker();
        this.fireAndForward('editable:dragend', e);
    },

    _addVertexMarker: function(){
        if(this.feature.metadata && (this.feature.metadata.renderableType === 'IMAGE' || 'ICON' || 'TEXT')) {
            var latlngs = [this.feature._latlng];
            this.vertexMarker = this.addVertexMarker(latlngs[0], latlngs);
        }
    },

    _showCoordinatePopup: function(){
        if(!this.feature.metadata) {
            if(!this.feature.getPopup()){
                this.feature.bindPopup(this.feature._latlng).openPopup();
            }else {
                this.feature.setPopupContent('LatLng: ' + this.feature._latlng);
                this.feature.openPopup();
            }
        }
    }

});