$(function() {
	//"use strict";
	
	var topoffset = 50; // variable for menu height
	var slideqty = $('#featured .item').length;		//(carousel) finds the amount of .item classes
	var wheight = $(window).height(); 				//(carousel) get the height of the window
	
	var randSlide = Math.floor(Math.random()*slideqty);
	
	$('#featured .item').eq(randSlide).addClass('active');
	
	$('.fullheight').css('height', wheight); 		// (carousel) set to window height
	
	// (carousel)
	// we find each image source attribute and make their parent(div) have this image as a background
	// and then we remove the source attribute from the image so we have only the background being displayed
	$('#featured .item img').each(function() {
		var imgSrc = $(this).attr('src');
		$(this).parent().css({'background-image': 'url(' + imgSrc + ')'});
		$(this).remove();
	});
	
	// (carousel)
	// adjust height of .fullheight elements on window resize
	$(window).resize(function() {
		wheight = $(window).height();
		$('.fullheight').css('height', wheight);
	});
	
	//Activate Scrollspy
	$('body').scrollspy({
		target: 'header .navbar',
		offset: topoffset
	});
	
	
	// (navbar inbody)
	// finds and store the attribute of the anchor tag of the active class inside a li tag, in 'this' document
	var hash = $(this).find('li.active a').attr('href');
	
	
	if(hash !== '#featured') {
		$('header nav').addClass('inbody');
		$('.return').fadeIn(500);			// this is for the back to top button
	} else {
		$('header nav').removeClass('inbody');
		$('.return').fadeOut(500);
	}
	
	// (navbar inbody)
	// Adds inbody class to nav when scrollspy event fires
	$('.navbar-fixed-top').on('activate.bs.scrollspy', function() {

		// finds and store the attribute of the anchor tag of the active class inside a li tag, in 'this' document
		var hash = $(this).find('li.active a').attr('href');
		
		if(hash !== '#featured') {
			$('header nav').addClass('inbody');
			$('.return').fadeIn(500);
		} else {
			$('header nav').removeClass('inbody');
			$('.return').fadeOut(500);
		}
		
	});
	
	
	//Use smooth scrolling when clicking on navigation
	$('.navbar a').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top-topoffset+2
                }, 500);
                return false;
            } //target.length
        } //click function
    }); //smooth scrolling
	
	
	
	//Smooth scrolling fot the back to top button
	$('a .return').click(function() {
        var target = $('#featured');
        $('html,body').animate({
						scrollTop: target.offset().top
						}, 500);
    }); //smooth scrolling
	
	
	//Automatically generate carousel indicators
	for (var i=0; i<slideqty; i++) {
		var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
		if (i === randSlide) {
			insertText += ' class="active" ';
		}
		insertText += '></li>';
		$('#featured ol').append(insertText);
	}
	
	
	$('.carousel').carousel({		//$('#featured'). would work as well
	  pause: false		//makes the carousel not to pause when the mouse is over the slide
	});


});