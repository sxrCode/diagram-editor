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
        if (ui) {
            $(ui.helper).css({ 'border-color': 'red' });
            $.extend(ui.helper, {
                callback: (function (droppable, ui) { return this.onDrop(droppable, ui); }).bind(this),
            });
        }
    }

    onDrop(droppable, ui) {
        let result = false;
        if (ui) {
            let widget = $(ui.helper).clone();
            $(droppable).append(widget);
            $(widget).draggable({
                cursor: 'pointer',
            });
            return true;
        }
        return result;
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
        if ($(dropped).hasClass('droppable')) {
            result = false;
            this.droppedEle = dropped;
        }
        return result;
    }

    onStop(event, ui) {
        if (this.droppedEle) {
            console.log('ui.helper && this.droppedEle');
        }
        return true;
    }
}

class platteWidget {
    constructor() {
        this.template = " <div class=\"component-platte droppable\" id=\"platte\"></div>";

    }

    createFigure() {
        this.widget = $(this.template).droppable({
            drop: function (event, ui) {
                let that = this;
                if (ui.helper.callback) {
                    if (ui.helper.callback(this, ui)) {
                        console.log('callback success!');
                    } else {
                        console.log('callback failure');
                    }
                }
            },

            accept: ".dragaable",
            activeClass: "ui-state-highlight",

            activate: function (event, ui) {
                console.log('droppable activate!');
            },

            create: function (event, ui) {
                console.log('droppable create!');
            },

            deactivate: function (event, ui) {
                console.log('droppable deactivate!');
            },

        });

        return this.widget;
    }

}


$(document).ready(function () {
    console.log("my script!");

    let ellipse = widgetFactory('ellipse');
    $('#left-closet').append(ellipse.createFigure());

    let platte = new platteWidget();
    $('#media-space').append(platte.createFigure());
});

