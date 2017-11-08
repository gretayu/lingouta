$(function(){

    $('#tabs a').click(function(){

        $('#tabs .active').removeClass('active'); // remove the class from the currently selected
        $(this).addClass('active'); // add the class to the newly clicked link
       

        $('#tabs-content .active').removeClass('active'); // remove the class of the corresponding tab content
        $('.tabs-content #' + $(this).attr("id")).addClass('active'); // add the class to the corresponding tab content
    });
});
