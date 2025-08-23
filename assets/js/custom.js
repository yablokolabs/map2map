(function ($) {
	
	"use strict";

	// ===== ENHANCED ANIMATIONS AND INTERACTIONS =====

	// Typing Animation for Main Headline
	function initTypingAnimation() {
		const headline = document.querySelector('.typing-animation');
		if (headline) {
			const text = headline.innerHTML;
			headline.innerHTML = '';
			headline.style.borderRight = '2px solid #fc7303';
			
			let i = 0;
			function typeWriter() {
				if (i < text.length) {
					headline.innerHTML = text.slice(0, i + 1);
					i++;
					setTimeout(typeWriter, 50);
				}
			}
			
			// Start typing after a delay
			setTimeout(typeWriter, 1000);
		}
	}

	// Parallax Effect
	function initParallaxEffect() {
		$(window).scroll(function() {
			const scrolled = $(window).scrollTop();
			const rate = scrolled * -0.5;
			$('.main-banner::before').css('transform', 'translateY(' + rate + 'px)');
		});
	}

	// Intersection Observer for Section Animations
	function initScrollAnimations() {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('animated');
				}
			});
		}, observerOptions);

		// Observe all sections
		document.querySelectorAll('.section').forEach(function(section) {
			observer.observe(section);
		});
	}

	// Enhanced Service Item Interactions
	function initServiceAnimations() {
		$('.service-item').each(function(index) {
			$(this).css('animation-delay', (index * 0.1) + 's');
		});

		$('.service-item').hover(
			function() {
				$(this).addClass('pulse-animation');
			},
			function() {
				$(this).removeClass('pulse-animation');
			}
		);
	}

	// Skill Bar Progress Animation
	function animateSkillBars() {
		$('.skill-slide').each(function() {
			const $this = $(this);
			const $fill = $this.find('.fill');
			const skillLevel = $this.hasClass('marketing') ? '95%' : 
							 $this.hasClass('digital') ? '88%' : '92%';
			
			$fill.css({
				'width': skillLevel,
				'transition': 'width 2s ease-in-out'
			});
		});
	}

	// Enhanced Button Hover Effects
	function initButtonAnimations() {
		$('.main-button, .second-button').hover(
			function() {
				$(this).addClass('float-animation');
			},
			function() {
				$(this).removeClass('float-animation');
			}
		);
	}

	// Smooth Number Counter Animation
	function initCounterAnimation() {
		$('.counter').each(function() {
			const $this = $(this);
			const countTo = $this.attr('data-count');
			
			$({ countNum: $this.text() }).animate({
				countNum: countTo
			}, {
				duration: 2000,
				easing: 'linear',
				step: function() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function() {
					$this.text(this.countNum);
				}
			});
		});
	}

	// Enhanced Mouse Cursor Effect
	function initCursorEffect() {
		if (window.innerWidth > 768) {
			const cursor = $('<div class="custom-cursor"></div>');
			$('body').append(cursor);
			
			$(document).mousemove(function(e) {
				cursor.css({
					left: e.clientX + 'px',
					top: e.clientY + 'px'
				});
			});

			$('a, button, .service-item, .owl-features .item').hover(
				function() {
					cursor.addClass('cursor-hover');
				},
				function() {
					cursor.removeClass('cursor-hover');
				}
			);
		}
	}

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');
        
        // Initialize all custom animations
        initTypingAnimation();
        initScrollAnimations();
        initServiceAnimations();
        initButtonAnimations();
        initParallaxEffect();
        initCursorEffect();
        
        // Animate skill bars when they come into view
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        });
        
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }

    });

	// WOW JS
	$(window).on ('load', function (){
        if ($(".wow").length) { 
            var wow = new WOW ({
                boxClass:     'wow',      // Animated element css class (default is wow)
                animateClass: 'animated', // Animation css class (default is animated)
                offset:       20,         // Distance to the element when triggering the animation (default is 0)
                mobile:       true,       // Trigger animations on mobile devices (default is true)
                live:         true,       // Act on asynchronously loaded content (default is true)
            });
            wow.init();
        }
    });

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }

	  // Back to top button visibility
	  if (scroll > 300) {
	    $('.back-to-top').addClass('active');
	  } else {
	    $('.back-to-top').removeClass('active');
	  }
	});

	// Back to top button click event
	$(document).on('click', '.back-to-top', function() {
	  $('html, body').animate({ scrollTop: 0 }, 800);
	  return false;
	});



	const Accordion = {
		settings: {
		  // Expand the first item by default
		  first_expanded: false,
		  // Allow items to be toggled independently
		  toggle: false
		},
  
		openAccordion: function(toggle, content) {
		  if (content.children.length) {
			toggle.classList.add("is-open");
			let final_height = Math.floor(content.children[0].offsetHeight);
			content.style.height = final_height + "px";
		  }
		},
  
		closeAccordion: function(toggle, content) {
		  toggle.classList.remove("is-open");
		  content.style.height = 0;
		},
  
		init: function(el) {
		  const _this = this;
  
		  // Override default settings with classes
		  let is_first_expanded = _this.settings.first_expanded;
		  if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
		  let is_toggle = _this.settings.toggle;
		  if (el.classList.contains("is-toggle")) is_toggle = true;
  
		  // Loop through the accordion's sections and set up the click behavior
		  const sections = el.getElementsByClassName("accordion");
		  const all_toggles = el.getElementsByClassName("accordion-head");
		  const all_contents = el.getElementsByClassName("accordion-body");
		  for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const toggle = all_toggles[i];
			const content = all_contents[i];
  
			// Click behavior
			toggle.addEventListener("click", function(e) {
			  if (!is_toggle) {
				// Hide all content areas first
				for (let a = 0; a < all_contents.length; a++) {
				  _this.closeAccordion(all_toggles[a], all_contents[a]);
				}
  
				// Expand the clicked item
				_this.openAccordion(toggle, content);
			  } else {
				// Toggle the clicked item
				if (toggle.classList.contains("is-open")) {
				  _this.closeAccordion(toggle, content);
				} else {
				  _this.openAccordion(toggle, content);
				}
			  }
			});
  
			// Expand the first item
			if (i === 0 && is_first_expanded) {
			  _this.openAccordion(toggle, content);
			}
		  }
		}
	  };
  
	  (function() {
		// Initiate all instances on the page
		const accordions = document.getElementsByClassName("accordions");
		for (let i = 0; i < accordions.length; i++) {
		  Accordion.init(accordions[i]);
		}
	  })();
  



	$(document).on("click", ".naccs .menu div", function() {
		var numberIndex = $(this).index();
	
		if (!$(this).is("active")) {
			$(".naccs .menu div").removeClass("active");
			$(".naccs ul li").removeClass("active");
	
			$(this).addClass("active");
			$(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");
	
			var listItemHeight = $(".naccs ul")
				.find("li:eq(" + numberIndex + ")")
				.innerHeight();
			$(".naccs ul").height(listItemHeight + "px");
		}
	});


	$('.owl-features').owlCarousel({
		center: true,
      items:2,
      loop:true,
      nav: true,
      margin:30,
      responsive:{
        992:{
            items:3
        },
		1200:{
			items:4
		}
      }
	});

	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#js-preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#js-preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

	

	const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuad');
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }


	// Google Analytics Integration
	(function() {
		var ga = document.createElement('script');
		ga.async = true;
		ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-TELQN7ZQCV';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);

		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-TELQN7ZQCV');
	})();

	// Tawk.to Chat Integration
	var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
	(function() {
	  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
	  s1.async = true;
	  s1.src = 'https://embed.tawk.to/681e0c3d9b96651916dbab23/1iqqlvk5k';
	  s1.charset = 'UTF-8';
	  s1.setAttribute('crossorigin', '*');
	  s0.parentNode.insertBefore(s1, s0);
	})();

})(window.jQuery);