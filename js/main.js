var pro = 1;


$(document).ready(function () {




    // Changing the defaults
    window.sr = ScrollReveal({
        reset: true
    });

    // Customizing a reveal set
    sr.reveal('#aboutMe', {
        duration: 200
    });
    sr.reveal('#projects', {
        duration: 200
    });

    sr.reveal('.footer', {
        duration: 200
    });




    var viewportWidth = $(window).width();
    var headerheigt = $('header').height() + $('.somedia').height() * pro;
    var smallHeader = 90;
    var menuPX = $('header').height();

    $(".abouteMeLink").click(function () {
        $('html, body').animate({
            scrollTop: $("#aboutMe").offset().top - 80
        }, 800);
    })

    $(".projectsLink").click(function () {
        $('html, body').animate({
            scrollTop: $("#projects").offset().top - 80
        }, 800);
    })




    $(window).resize(function () {
        viewportWidth = $(window).width();

        if (viewportWidth > 1280) {
            headerheigt = 500 + $('.somedia').height() * pro;
            smallHeader = 90;
            menuPX = $('.somedia').position().top;
        } else if (viewportWidth < 1280 && viewportWidth >= 1024) {
            headerheigt = 400 + $('.somedia').height() * pro;
            smallHeader = 75;
        } else if (viewportWidth < 1024 && viewportWidth >= 768) {
            headerheigt = 300 + $('.somedia').height() * pro;
            smallHeader = 70;
        } else if (viewportWidth < 768 && viewportWidth >= 480) {
            headerheigt = 260 + $('.somedia').height() * pro;
            smallHeader = 65;
        } else {
            headerheigt = 260 + $('.somedia').height() * pro;
            smallHeader = 60;
        }


        menuPX = $('header').height();
    });

    var scrollcount = 0;

    $(window).bind('scroll', function () {

        if ($(window).scrollTop() > menuPX) {
            scrollcount++;
            $('.space').css('height', headerheigt + 15);
            $('.space').css('display', 'block');
            $('.profilimg').addClass('displayNone');
            $('.somedia').addClass('displayNone');
            $('.header').addClass('fixedMenu');
            $('.header').addClass('notransition');
            $('.profilimg').removeClass('ani4');
            $('.somedia').removeClass('ani');
            $('.header').removeClass('ani');
            $('#name').removeClass('ani2');
            $('#titel').removeClass('ani2');
        } else {
            $('.space').css('display', 'none');
            $('.space').css('height', 0);
            $('.profilimg').removeClass('displayNone');
            $('.somedia').removeClass('displayNone');
            $('.header').removeClass('fixedMenu');
            $('.header').removeClass('notransition');
            if (scrollcount >= 1) {
                $('.profilimg').addClass('ani4');
                $('.somedia').addClass('ani');
                $('.header').addClass('ani');
                $('#name').addClass('ani2');
                $('#titel').addClass('ani2');
            }

        }


        if ($('#aboutMe').visible()) {
            $('.abouteMeLink').addClass('activeLink');
        } else {
            $('.abouteMeLink').removeClass('activeLink');
        }

        if ($('#projects').visible()) {
            $('.projectsLink').addClass('activeLink');
        } else {
            $('.projectsLink').removeClass('activeLink');
        }



    });





});
