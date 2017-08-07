$(document).ready(function () {
    console.log("my script!");
<<<<<<< Updated upstream
    $('.dragaable').eq(2).draggable({
        scroll: true,
        revert: function(dropped) {
            console.log('execute revert function!');
            if (dropped) {
                console.log('has dropped!');
                return false;
            }
            console.log('has not dropped!');
            return true;
        }
    });

    $('#platte').droppable();
=======

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
>>>>>>> Stashed changes
});
