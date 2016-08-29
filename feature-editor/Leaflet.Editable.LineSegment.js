L.Editable.LineSegmentEditor = L.Editable.PolylineEditor.extend({
    options: {
        skipMiddleMarkers: true
    }
});

L.LineSegment.include(L.EditableMixin);

L.LineSegment.include({

    getEditorClass: function (map) {
        return (map && map.options.lineSegmentEditorClass) ? map.options.lineSegmentEditorClass : L.Editable.LineSegmentEditor;
    }

});