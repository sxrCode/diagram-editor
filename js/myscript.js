$(document).ready(function () {
    console.log("my script!");
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
});
