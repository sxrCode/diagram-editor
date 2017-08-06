flow.canvas = canvas;
var canvas = {
    canvas: {
        //线上面点的队列
        lp: [],
        init: function () {
            $('.flow').width($(window).width()).height($(window).height());
            var p = Raphael($('.flow')[0], $('.flow').width(), $('.flow').height());
            flow.canvas.can = p;


        }
    }
}

function init() {
    this.canvas.init();
    this.main.init();
}