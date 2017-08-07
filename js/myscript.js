$(document).ready(function () {
    console.log("my script!");

    $('.dragaable').eq(2).draggable({
        scroll: true,
        cursor: "pointer",
        //helper: 'clone',

        create: function () {
            console.log('draggable creation!');
        },

        drag: function (event, ui) {
            $("#dashboard").html("top: " + ui.position.top + "; left: " + ui.position.left);
        },

        start: function (event, ui) {
             console.log('drag start!');
             if (ui) {
                 $(ui.helper).css({'border-color': 'green'});
             }
            
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
        drop: function(event, ui) {
            console.log('drop!!');
        },
    });
});
