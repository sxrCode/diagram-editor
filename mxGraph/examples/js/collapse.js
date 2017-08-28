function main(container) {
    if (mxClient.isBrowserSupported()) {

        var graph = new mxGraph(container);
        var parent = graph.getDefaultParent();
        var getModelStyle = graph.model.getStyle;
        graph.model.getStyle = function (cell) {
            if (cell != null) {
                var style = getModelStyle.apply(this, arguments);
                if (this.isCollapsed(cell)) {
                    style = style + ';shape=image;image=http://www.jgraph.com/images/mxgraph.gif;' +
                        'noLabel=1;imageBackground=#C3D9FF;imageBorder=#6482B9';
                }
                return style;
            }
            return null;
        }

        graph.getModel().beginUpdate();
        try { 
            var v1 = graph.insertVertex(parent, null, 'Container', 20, 20, 200, 200,
                'shape=swimlane;startSize=20;');
            v1.geometry.alternateBounds = new mxRectangle(0, 0, 110, 70);
            var v11 = graph.insertVertex(v1, null, 'Hello,', 10, 40, 120, 80);
            var v111 = graph.insertVertex(v11, null, 'world,', 10, 10, 60, 30);
        } finally {
            graph.getModel().endUpdate();
        }

    } else {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    }
}