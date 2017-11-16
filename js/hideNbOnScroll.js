var lastScroll = 0, hundert;
$(window).scroll(function(){
	//NAVIGATION FADEIN/OUT
	var st = $(document).scrollTop();
	if (st > 150 && st > lastScroll){
		$('nav.nav-bar').addClass('hiddentop');
		hundert = st;
	}
	else if(st < (hundert - 33)){
		$('nav.nav-bar').removeClass('hiddentop');
	}
  lastScroll = st; 	
  });