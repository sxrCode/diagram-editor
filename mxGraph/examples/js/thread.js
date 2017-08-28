function init(container) {
    var graph = new mxGraph(container);
    graph.setEnabled(false);
    var parent = graph.getDefaultParent();
    var v1, v2, e1;

    graph.getModel().beginUpdate();
    try {
        v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
        v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
        e1 = graph.insertEdge(parent, null, '', v1, v2);
    }
    finally {
        // Updates the display
        graph.getModel().endUpdate();
    }

    var f = function () {
        //var overlays = graph.getCellOverlays(v1);
        var overlays = graph.getCellOverlays(v1);

        if (overlays == null) {
            graph.removeCellOverlays(v2);
            graph.setCellWarning(v1, 'Tooltip');
        }
        else {
            graph.removeCellOverlays(v1);
            graph.setCellWarning(v2, 'Tooltip');
        }
    };

    window.setInterval(f, 1000);
    f();
}