jQuery(document).ready(function ($) {

    'use-strict';

    var $window = $(window);

    /**
     * Count To
     * @constructor
     */
    function OScountTo() {
        $('.counter-group').each(function (index) {
            var $this = $(this);
            $window.on('scroll', function () {
                var WindowToTop = $window.scrollTop();
                var itemToTop = $this.offset().top;
                if (WindowToTop + $window.height() > itemToTop + $this.height()) {
                    $this.find('.timer:not(.counted)').countTo().addClass('counted');
                }
            });
        });
    }

    OScountTo();

    /**
     * Count Down
     * @constructor
     */
    function OScountDown() {
        $('.countdown').each(function () {
            $(this).final_countdown()
        });
    }

    OScountDown();

    /**
     * Nav
     * @constructor
     */

    function OsNavMenuActiveLink() {
        var url = window.location.pathname
        var filename = url.substring(url.lastIndexOf('/') + 1);
        $(".nav-main-menu li a").each(function () {
            if ($(this).attr('href') === filename) {
                $(this).parents(".nav-main-menu li").addClass('current-menu-item');
            }
            ;
        });
    }

    OsNavMenuActiveLink();

    function OsNavMainMenu() {

        var $nav_MainMenu = $(".nav-main-menu");

        $window.on('resize load', function () {
            $nav_MainMenu.each(function () {
                var mainNav_height = $(this).filter(".small-screen").parents("nav").outerHeight();
                var mainMenu_height = $window.height() - mainNav_height;
                $(this).filter(".small-screen").css("height", mainMenu_height);
            });
        });

        $(".nav-main-menu a[href='#']").on('click', function (event) {
            event.preventDefault();
        });

        $nav_MainMenu.each(function () {
            $(this)
                .find("li:has(ul)")
                .not("ul.mega-menu-content li, .menu-tabs li")
                .addClass("sub-menu");

            $(this).find(">li li:has(ul)").children("a").on('click', function (event) {
                event.preventDefault();
            });
            ;

            $(this)
                .filter(".small-screen, .left-menu")
                .find("li:has(ul)")
                .addClass("menu-dropdown");

            $(this).filter(".small-screen, .left-menu").find(".menu-dropdown > a").each(function () {
                $(this).siblings('ul').hide();
                $(this).on("click", function (event) {
                    event.preventDefault();
                    menu_DropdownTrigger(this);
                });
            });

            function menu_DropdownTrigger(selector) {
                if ($(selector).hasClass('menu-trigger')) {
                    $(selector).parent('li')
                        .find('a')
                        .removeClass('menu-trigger')
                        .parent('li')
                        .children('ul')
                        .slideUp(400);
                } else {
                    $(selector)
                        .addClass('menu-trigger')
                        .parent('li')
                        .siblings()
                        .find('a')
                        .removeClass('menu-trigger')
                        .parent('li')
                        .children('ul')
                        .slideUp(400);

                    $(selector)
                        .siblings('ul').slideDown(400);
                }
            }
        });
    }

    OsNavMainMenu();

    function OsMainMenu_opened() {
        $(".main-nav").each(function () {
            var $mainNav = $(this);
                $menuTriger = $(this).find('.nav-hamburger'),
                $eventMarker = $(this).find('.nav-hamburger-wrapper');
            $menuTriger.on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                if ($eventMarker.is(":visible")) {
                    if (!($mainNav.hasClass('main-menu-opened'))) {
                        $mainNav.addClass('main-menu-opened');
                    }
                    
                    else {
                        $mainNav.removeClass('main-menu-opened');
                        setTimeout(function () {
                            $mainNav
                                .find('.nav-main-menu.small-screen .menu-dropdown > a')
                                .removeClass('menu-trigger')
                                .siblings('ul').hide();
                        }, 400);
                    }
                }
            });

            $window.on('resize load', function(event) {
                if ($eventMarker.is(":visible") && ($mainNav.hasClass('main-menu-opened'))) {
                    $mainNav.removeClass('main-menu-opened');
                }
            });
        });
    }

    OsMainMenu_opened();

    function OsNavContent_creativePage_toggle() {
        $(".main-nav.creative-page .nav-hamburger-special").each(function () {
            $(this).on('click', function (event) {
                event.preventDefault();
                var $this = $(this);
                if (!($this.parents(".main-nav").hasClass('nav-content-toggle'))) {
                    $this
                        .parents(".main-nav")
                        .addClass('nav-content-toggle');
                }
                else {
                    $this
                        .parents(".main-nav")
                        .removeClass('nav-content-toggle');
                }
            });
        });
    }

    OsNavContent_creativePage_toggle();


    /**
     * Caption slider
     * @constructor
     */

    function OsCaptionSlider() {
        $(".caption-slider").each(function () {

            //on start
            $(this).on('init', function (event, slick) {
                OsSliderCaptionInit($(this));
                OsSliderCaptionShow($(this));
            });

            //init slick
            $(this).slick({
                fade: ($(this).hasClass('animation-slide') ? false : true),
                autoplay: true,
                speed: 400,
                pauseOnHover: false,
                dots: ($(this).hasClass('control-nav') ? true : false),
                autoplaySpeed: $(this).data('time') || 8000,
                adaptiveHeight: ($(this).hasClass('height-auto') ? true : false),
                arrows: ($(this).hasClass('dir-nav') ? true : false)
            });

            //on before slide
            $(this).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                OsSliderCaptionHide($(this));
            });
            //on after slide done
            $(this).on('afterChange', function (event, slick, currentSlide) {
                OsSliderCaptionShow($(this));
            });

            //support function
            function OsSliderCaptionInit(container) {
                var $sliderElement = container.find('.caption');
                $sliderElement.each(function () {
                    var $captionAnimation = $(this);
                    var animationDuration = "1000ms";

                    if ($(this).data("animation-duration")) {
                        animationDuration = $(this).data("animation-duration") + "ms";
                    }

                    $(this).css("animation-duration", animationDuration);
                    $captionAnimation.addClass('caption-hide');
                });
            }

            function OsSliderCaptionShow(container) {
                var $sliderElement = container.find('.slick-active .caption');
                $sliderElement.each(function (index) {
                    var $captionAnimation = $(this);
                    var delayTime = $(this).data("caption-delay") || (index * 350 + 400);
                    var captionAnimationData = $captionAnimation.data('caption-animation') || "fadeInUp";
                    setTimeout(function () {
                        $captionAnimation.removeClass('caption-hide').addClass(captionAnimationData);
                    }, delayTime);
                });
            }

            function OsSliderCaptionHide(container) {
                var $sliderElement = container.find('.slick-active .caption');
                $sliderElement.each(function () {
                    var $captionAnimation = $(this);
                    var captionAnimationData = $captionAnimation.data('caption-animation') || "fadeInUp";
                    $captionAnimation.removeClass(captionAnimationData).addClass('caption-hide');
                });
            }
        });
    }

    OsCaptionSlider();

    function OsCaptionSliderFw_Height() {
        $(".home-fw-slider.parents-height").each(function () {
            var $this = $(this);
            var $target = $(this).find(".item-image");

            $window.on('resize load', function () {
                $target.css("max-height", $this.height());
            });
        });
    }

    OsCaptionSliderFw_Height();

    /**
     * Init slipscreen page
     * @constructor
     */
    function OsSlipScreenLoading() {
        var slipOn = false;
        OsSlipScreen();

        $window.on('resize load', function () {
            if ($(this).width() < 992) {
                slipOn = false;
                $.fn.fullpage.destroy('all');
            }
            else {
                OsSlipScreen();
            }

        });

        function OsSlipScreen() {
            $('.fullpage-container').each(function () {
                var $this = $(this);
                if (slipOn === false) {
                    slipOn = true;
                    $this.fullpage({
                        anchors: ['sectionHome', 'sectionAbout', 'sectionPortfolio', 'sectionServices', 'sectionBlog', 'sectionContact'],
                        navigation: true,
                        navigationTooltips: ['HOME', 'ABOUT', 'PORTFOLIO', 'SERVICES', 'BLOG', 'CONTACT'],
                        menu: '#slip-menu',
                        scrollOverflow: true
                    });
                }
            });
        }
    }

    if ($('.fullpage-container').length > 0) {
        OsSlipScreenLoading();
    }

    /**
     * Nav Onepage Easing Click
     * @constructor
     */
    function OsNavOnepageEasing() {
        $('#main-nav-onepage a[href^="#"]').not('[href="#"]').on('click', function () {
            event.preventDefault();
            var $this = $(this);
            var elementPostion = $($this.attr('href')).offset().top;
            $('html,body').animate({
                    scrollTop: elementPostion - 60,
                },
                400
            );
        });
    }

    OsNavOnepageEasing();


    /**
     * Sticky nav
     * @constructor
     */
    function OsStickyNav_allScreen() {
        var $elem = $(".main-nav").not(".home-sticky-nav");

        $elem.each(function () {
            var $navWrapper = $(this).parents(".main-nav-wrapper");
            var $nav = $(this).parent("nav");
            var stickyNavTop = 0;

            $window.on('resize load', function () {
                stickyNavTop = $navWrapper.offset().top;
            });

            $window.on('scroll', function () {
                if ($window.scrollTop() > stickyNavTop) {
                    $navWrapper.addClass('sticky-nav');
                }

                else {
                    $navWrapper.removeClass('sticky-nav');
                }
            });
        });
    }

    OsStickyNav_allScreen();

    function OsStickyNav_headerTrigger() {
        var $body = $("body").has(".main-nav.home-sticky-nav, header.home-sticky-nav-trigger");
        var $elem = $body.find(".main-nav.home-sticky-nav");
        var $siteHeader = $body.find("header.home-sticky-nav-trigger");

        $elem.each(function () {
            var $navWrapper = $(this).parents(".main-nav-wrapper");
            var $nav = $(this).parent("nav");
            var stickyNavTop = $navWrapper.offset().top;
            var $eventMarker = $(this).find('.nav-hamburger-wrapper');

            $window.on('resize load scroll', function () {
                if ($eventMarker.is(":visible")) {
                    if ($window.scrollTop() > stickyNavTop) {
                        $navWrapper.addClass('sticky-nav');
                    }

                    else {
                        $navWrapper.removeClass('sticky-nav');
                    }
                }

                if ($eventMarker.is(":hidden")) {
                    var siteHeader_height = $siteHeader.outerHeight();
                    var nav_height = $nav.data("sticky-nav-height") || 60;

                    if ($window.scrollTop() >= siteHeader_height - nav_height) {
                        $navWrapper.addClass('sticky-nav');
                    }

                    else {
                        $navWrapper.removeClass('sticky-nav');
                    }
                }
            });
        });
    }

    OsStickyNav_headerTrigger();

    /**
     * Scroll next section of home
     * @constructor
     */
    function OSHomeGetStart() {
        $('.home-get-start a').on('click', function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop: $window.height()}, 400);
        });
    }

    OSHomeGetStart();
    
    /**
     * Modals
     * @constructor
     */
    function OsModal() {
        $('.modal').each(function(index, el) {

           $(this).on('show.bs.modal', function () {
                if ($(document).height() > $(window).height()) {
                    // no-scroll
                    $('body').addClass("modal-open-noscroll");
                }
                else {
                    $('body').removeClass("modal-open-noscroll");
                }
            })

            $(this).on('hide.bs.modal', function () {
                $('body').removeClass("modal-open-noscroll");
            })

            $(this).on( 'mousewheel', function ( e ) {
                var event = e.originalEvent,
                    d = event.wheelDelta || -event.detail;

                this.scrollTop += ( d < 0 ? 1 : -1 ) * 30;
                e.preventDefault();
            });
        });
    }
    OsModal();

    /**
     * Submit contact form with ajax
     * @constructor
     */
    function OsContactSubmit() {
        $('#contact_form').on('submit', function (event) {
            event.preventDefault();

            var $submit_button = $(this).find('button[type="submit"]');
            var backup_button = $submit_button.html();
            var data = $(this).serialize();

            $submit_button.html('PROCESSING').attr('disabled','disabled');

            $.ajax({
                type : "POST",
                url : 'assets/phpscript/mail_handler.php',
                data : data,
                success : function (result) {
                    $submit_button.html('SUCCESSFUL <i class="fa fa-check"></i>');
                    setTimeout(function(){
                        $submit_button.removeAttr('disabled').html(backup_button);
                    },2000)
                },
                error : function (result) {
                    
                }
            });
        })
    }

    OsContactSubmit();

    loadContact();

    function loadContact() {
        var phone = '949-28';
        var ph = phone + '0-4674';
        var email = 'gmail.com';
        var em = ('kryseno' + '@' + email);

        $(".fa-mobile").append(ph);
        $(".fa-envelope").append(em);
    }

    $(window).load(function () {
        showContent();
    });

    function showContent() {
        $(".spinner-outer").css("display", "none");
        $(".spinner").css("display", "none");
        $("#main-nav-onepage").css("visibility", "visible");
        $("main").css("visibility", "visible");
    }
});