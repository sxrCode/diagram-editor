function widgetFactory(type) {
    if (type === 'ellipse') {
        return new EliipseWidget();
    } else if (type === 'rectangle') {
        return new RectangleWidget();
    } else {
        return new CircleWidget();
    }
}

class EliipseWidget {
    constructor() {
        this.template = '<div class="dragaable ellipse"></div>';
        this.widget = $(this.template);
    }

    createFigure() {
        $(this.widget).draggable({
            scroll: true,
            cursor: 'pointer',
            start: this.onStartDrag,
            revert: this.onRevert,
            helper: this.getRealDom,
            drag: this.onDrag,
        });

        return this.widget;
    }

    onStartDrag(event, ui) {
        console.log('drag start!');
        if (ui) {
            $(ui.helper).css({ 'border-color': 'red' });
        }
    }

    onDrag(event, ui) {
         $("#dashboard").html("top: " + ui.position.top + "; left: " + ui.position.left);
    }

    getRealDom(event) {
        return $('<div class="dragaable rectangle"></div>');
    }

    onRevert(dropped) {
        let result = true;
        if ($(dropped).hasClass('droppable')) {
            result = false;
        }
        return result;
    }
}


$(document).ready(function () {
    console.log("my script!");
    let ellipse = widgetFactory('ellipse');
    $('#left-closet').append(ellipse.createFigure());
    
    $('.droppable').droppable({
        drop: function (event, ui) {
            console.log('drop!!');
        },
    });
});

