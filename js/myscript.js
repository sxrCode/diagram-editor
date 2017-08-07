$(document).ready(function () {
    console.log("my script!");

    $('.dragaable').eq(2).draggable({
        scroll: true,
        cursor: "pointer",
        create: function () {
            console.log('draggable creation!');
        },

        drag: function (event, ui) {
            $("#dashboard").html("top: " + ui.position.top + "; left: " + ui.position.left);
        },

        start: function (event, ui) {
            // console.log('drag start!');
        },

        stop: function (event, ui) {
            // console.log('drag stop!');

        },
        revert: function (dropped) {
            let result = true;
            if ($(dropped).hasClass('droppable')) {
                result = false;
            }
            return result;
        },
    });

    $('.droppable').droppable({

    });
});
