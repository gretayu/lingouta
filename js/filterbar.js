$(document).ready( function() {

    $("#filter-bar li").click(function(){
	    $("#filter-bar li").removeClass("active");
	    $(this).addClass("active");
	    $("#filter-bar").removeClass().addClass($(this).attr("data-target"));
	    
	    $('#branch-option .active').removeClass('active'); // remove the class of the corresponding tab content
	    $('.branch-option #' + $(this).attr("id")).addClass('active'); // add the class to the corresponding tab content
    });

})
