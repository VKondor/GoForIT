$(document).ready(function() {

	jQuery.scrollSpeed(100, 800);

	$('.nav_icon svg').click(function() {
		$('.menu_nav ul').toggleClass('active');
	});

	$('a[href^="#"]').click(function () { 
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;

		$('html,body').animate( { scrollTop: destination }, 1000);
		
		return false;﻿
	});

	$("#services .container").animated("zoomIn", "zoomOut");
	$(".story .container").animated("zoomIn", "zoomOut");
	$(".pricing .container").animated("zoomIn", "zoomOut");
	$("#gallery .container").animated("zoomIn", "zoomOut");
});


