
$(document).ready(function(){
	$('#left-col').addClass('animated rollIn','-vendor-animation-duration: 4s');
	$('#i1').addClass('animated fadeInLeft','-vendor-animation-duration: 4s');
	$('#i2').addClass('animated fadeInRight','-vendor-animation-duration: 4s');
	$('#i3').addClass('animated fadeInLeft','-vendor-animation-duration: 4s');
	$('#i4').addClass('animated fadeInRight','-vendor-animation-duration: 4s');
	$('#edit-btn').addClass('animated fadeInDown','-vendor-animation-duration: 4s');
	$("#l1").hover(function(){
		$("#l1").css("background-color","#93cfea")},function(){
		$("#l1").css("background-color","#e8e8e8");}
	);
	$("#l2").hover(function(){
		$("#l2").css("background-color","#93cfea")},function(){
		$("#l2").css("background-color","#e8e8e8");}
	);
	$("#l3").hover(function(){
		$("#l3").css("background-color","#93cfea")},function(){
		$("#l3").css("background-color","#e8e8e8");}
	);
	$("#l4").hover(function(){
		$("#l4").css("background-color","#93cfea")},function(){
		$("#l4").css("background-color","#e8e8e8");}
	);
	$(".ui.medium.circular.image").hover(function(){
		$('.ui.medium.circular.image').addClass('animated swing').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
			$('.ui.medium.circular.image').removeClass('animated swing');
		});
	});
});