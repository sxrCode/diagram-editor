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

class EliipseDragWidget {
    constructor(prototypeWidget) {
        this.widget = $(prototypeWidget).clone();
        this.init();
    }

    init() {
        $(this.widget).draggable({
            cursor: 'pointer',
            revert: this.onRevert,
        });
        this.addEventHandler();
        return this;
    }

    addEventHandler() {
        let that = this;
        $(this.widget).on('onselecting', function (event) {
            that.onselecting(event, this);
        }).on('onUnselecting', function (event) {
            that.onUnselecting(event, this);
        });
    }

    setText(text) {
        $(this.widget).text(text);
        return this;
    }

    onselecting(event, element) {
        $(element).css({
            'box-shadow': '0 0 18px rgba(41, 134, 238, .75)',
        });
    }

    onUnselecting(event, element) {
        $(element).css({
            'box-shadow': 'none',
        });
    }

    getWidget() {
        return this.widget;
    }
}
class EliipseWidget {
    constructor() {
        this.template = '<div class="draggable ellipse"></div>';
        this.widget = $(this.template);
        this.widgetNumber = 1;
    }

    createFigure() {
        $(this.widget).draggable({
            scroll: true,
            cursor: 'pointer',
            start: this.onStartDrag.bind(this),
            revert: this.onRevert,
            helper: (function (event) { return this.getRealDom(event); }).bind(this),
            drag: this.onDrag,
            stop: this.onStop,
        });
        return this.widget;
    }

    onStartDrag(event, ui) {
        if (ui) {
            $(ui.helper).css({ 'border-color': 'red' });
            $.extend(ui.helper, {
                onDrop: (function (droppable, ui) {
                    return this.onDrop(droppable, ui);
                }).bind(this),
            });
        }
    }

    onDrop(droppable, ui) {
        let result = false;
        if (ui) {
            let dragPart = new EliipseDragWidget(ui.helper).setText(this.widgetNumber);
            let widget = dragPart.getWidget();
            $(droppable).append(widget);
            return true;
        }
        return result;
    }

    onDrag(event, ui) {
        $("#dashboard").html("top: " + ui.position.top + "; left: " + ui.position.left);
    }

    getRealDom(event) {
        this.draggableEle = $('<div class="draggable rectangle"></div>');
        return this.draggableEle;
    }

    onRevert(dropped) {
        let result = true;
        if ($(dropped).hasClass('droppable')) {
            result = false;
        }
        return result;
    }

    onStop(event, ui) {
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
                if (ui.helper.onDrop) {
                    if (ui.helper.onDrop(this, ui)) {
                        console.log('callback success!');
                    } else {
                        console.log('callback failure');
                    }
                }
            },

            accept: ".draggable",
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

        }).selectable({
            classes: {
                "ui-selectable": "highlight"
            },
            selected: function (event, ui) {
                if (ui) {
                    console.log($(ui.selected).text() + ' was selected');
                }
            },
            selecting: function (event, ui) {
                if (ui) {
                    console.log($(ui.selecting).text() + ' selecting');
                    $(ui.selecting).trigger('onselecting', [event]);
                }
            },
            unselected: function (event, ui) {
                if (ui) {
                    console.log($(ui.unselected).text() + ' was unselected');
                }
            },
            unselecting: function (event, ui) {
                if (ui) {
                    console.log($(ui.unselecting).text() + ' unselecting');
                    $(ui.unselecting).trigger('onUnselecting');
                }
            },
            stop: function (event, ui) {
                if (ui) {
                    console.log('stop!');
                }
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

