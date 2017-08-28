
function main(container) {
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    } else {
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        var graph = new mxGraph(container);

        // Enables rubberband selection
        new mxRubberband(graph);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
            var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30, 'rounded;strokeColor=red;fillColor=green');
            var e1 = graph.insertEdge(parent, null, '', v1, v2);
        } finally {
            // Updates the display
            graph.getModel().endUpdate();
        }
    }

    test();
};

function test() {
    var object = new Object();
    object.myBool = true;
    object.myObject = new Object();
    object.myObject.name = 'Test';
    object.myArray = ['a', ['b', 'c'], {name: 'name', id: [1,2]}, 'd'];
    object.cus = new cusShape();
    object.cus.name = 'cusshape';
    object['ui'] = {name: 'ui', style:"group"};

    function cusShape() {

    }
    
    var encoder = new mxCodec();
    var node = encoder.encode(object);
    console.log(mxUtils.getXml(node));
}