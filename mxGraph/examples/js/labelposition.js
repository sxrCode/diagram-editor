function init(container) {
    var graph = new mxGraph(container);
    var parent = graph.getDefaultParent();

    // Defines the common part of all cell styles as a string-prefix
    var prefix = 'shape=image;image=images/icons48/keys.png;';

    graph.getModel().beginUpdate();
    try {
        graph.insertVertex(parent, null, 'Bottom', 60, 60, 60, 60,
            prefix + 'verticalLabelPosition=bottom;verticalAlign=top');
        graph.insertVertex(parent, null, 'Top', 140, 60, 60, 60,
            prefix + 'verticalLabelPosition=top;verticalAlign=bottom');
        graph.insertVertex(parent, null, 'Left', 60, 160, 60, 60,
            prefix + 'labelPosition=left;align=right');
        graph.insertVertex(parent, null, 'Right', 140, 160, 60, 60,
            prefix + 'labelPosition=right;align=left');
    } finally {
        graph.getModel().endUpdate();
    }
}

