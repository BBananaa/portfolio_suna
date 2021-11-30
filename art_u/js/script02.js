$(function(){
	$('.sub_wrap').hide();
	$('#gnb li').mouseover(function(){
		$(this).children('.sub_wrap').stop().slideDown();
		
	});
	$('#gnb li').mouseleave(function(){
		$(this).children('.sub_wrap').stop().slideUp();
	});
});
