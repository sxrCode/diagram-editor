"use strict";
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
        this.onDrop.bind(this);
    }

    createFigure() {

        $(this.widget).draggable({
            scroll: true,
            cursor: 'pointer',
            start: this.onStartDrag.bind(this),
            revert: this.onRevert,
            helper: this.getRealDom,
            drag: this.onDrag,
            stop: this.onStop,
        });
        return this.widget;
    }

    onStartDrag(event, ui) {
        console.log('drag start!');
        console.log('template: ' + this.template);
        if (ui) {
            $(ui.helper).css({ 'border-color': 'red' });
            $.extend(ui.helper, {
                callback: (function () { return this.onDrop(); }).bind(this),
            });
        }
    }

    onDrop() {
        console.log('callback onDrop!')
        return true;
    }

    onDrag(event, ui) {
        $("#dashboard").html("top: " + ui.position.top + "; left: " + ui.position.left);
    }

    getRealDom(event) {
        this.draggableEle = $('<div class="dragaable rectangle"></div>');
        return this.draggableEle;
    }

    onRevert(dropped) {
        let result = true;
        console.log('onRevert!');
        if ($(dropped).hasClass('droppable')) {
            console.log('hasClass(\'droppable\')');
            result = false;
            this.droppedEle = dropped;
        }
        return result;
    }

    onStop(event, ui) {
        console.log('onStop!');
        if (this.droppedEle) {
            console.log('ui.helper && this.droppedEle');
        }
        return true;
    }
}


$(document).ready(function () {
    console.log("my script!");
    let ellipse = widgetFactory('ellipse');
    $('#left-closet').append(ellipse.createFigure());

    $('.droppable').droppable({
        drop: function (event, ui) {

            console.log('drop!!');
            if (ui.helper.callback()) {
                if (event) {
                    console.clear();
                    console.log($(ui.helper).attr('class'));
                    //ui.helper.appendTo(event.target);
                    $(event.target).append($('<div class="dragaable rectangle"></div>'));
                }
            }
        },

        accept: ".dragaable",
        activeClass: "ui-state-highlight",

    });
});

