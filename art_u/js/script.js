$(function(){
	$('.sub_wrap').hide();
	$('#gnb li').mouseover(function(){
		$(this).children('.sub_wrap').stop().slideDown();
		
	});
	$('#gnb li').mouseleave(function(){
		$(this).children('.sub_wrap').stop().slideUp();
	});
	var prevScrollpos = window.pageYOffset;
	window.onscroll = function() {
	var currentScrollPos = window.pageYOffset;
	  if (prevScrollpos > currentScrollPos) {
		document.getElementById("header_wrap").style.top = "0";
	  } else {
		document.getElementById("header_wrap").style.top = "-70px";
	  }
	  prevScrollpos = currentScrollPos;
	}
	
});
