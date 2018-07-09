var pro = 1;

function AutoMenuUpdate(Htag, des, aniTime) {
    var name = "";
    var id = "";
    $("article " + Htag).each(function () {

        // create menu
        name = $(this).text().replace(" ", "");

        var aTag = '<a data="' + name + '"  class="' + name + 'Link hvr-hang" href="#' + name + '">' + $(this).text() + '</a>';

        $('#' + des).append(aTag);

        // give tags id's

        $(this).attr('id', name);


        // ani

        $("." + name + "Link").click(function () {
            id = $(this).attr('data');;
            console.log('Go to: ' + id);
            $('html, body').animate({
                scrollTop: $('#' + id).offset().top - 80
            }, aniTime);

        })
    })

    $('nav a').each(function () {
        if ($(this).is(':last-child')) {
            $(this).after('');
        } else {
            $(this).after(' I ');
        }


    });

}

function setUpRevealAni(aniTime) {

    // Changing the defaults
    window.sr = ScrollReveal({
        reset: true
    });

    // set up for all articles
    $('article').each(function () {
        if ($(this).parent().hasClass('farvebg')) {
            sr.reveal($(this).parent()), {
                duration: aniTime
            };
        } else {
            sr.reveal($(this)), {
                duration: aniTime
            };
        }
    });

    sr.reveal('.footer', {
        duration: aniTime
    });

}

function newsBox() {
    $('.newsContainer>div:last-child').addClass('newsShow');
    $('.newsContainer div:not(.newsShow)').css({
        width: 60
    }, 2000);
    $('.newsContainer>div:last-child').css({
        width: '100%'
    }, 2000);


    $('.newsContainer>div').hover(function (evt) {
        $('.newsShow').removeClass('newsShow').css({
            width: 60
        }, 200);;
        $(this).addClass('newsShow').css({
            width: '100%'
        }, 200);

    });



}

$(document).ready(function () {
    var viewportWidth = $(window).width();
    var headerheigt = $('header').height() + $('.somedia').height() * pro;
    var smallHeader = 90;
    var menuPX = $('header').height();
    var scrollcount = 0;

    AutoMenuUpdate('h1', 'nav', 800);
    setUpRevealAni(200);
    newsBox();

    $('#goToTopBut').hide();
    $('#goToTopBut').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    $(window).resize(function () {
        viewportWidth = $(window).width();
        menuPX = $('header').height();

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
            $('#goToTopBut').slideDown(200);
        } else {
            $('.space').css('display', 'none');
            $('.space').css('height', 0);
            $('.profilimg').removeClass('displayNone');
            $('.somedia').removeClass('displayNone');
            $('.header').removeClass('fixedMenu');
            $('.header').removeClass('notransition');
            $('#goToTopBut').slideUp(200);
            if (scrollcount >= 1) {
                $('.profilimg').addClass('ani4');
                $('.somedia').addClass('ani');
                $('.header').addClass('ani');
                $('#name').addClass('ani2');
                $('#titel').addClass('ani2');
            }

        }

        ActiveLinksUpdate();

        /*

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

*/

    });
});


function ActiveLinksUpdate() {

    /* update aktiv linkes */

    mostVisible = getMostVisible($("article"));

    mostVisibleH1 = mostVisible.find("h1:first");

    nameH1 = mostVisibleH1.text().replace(" ", "");

    console.log(nameH1);

    $('nav a').each(function () {
        if (!$('.' + nameH1 + 'Link').is($(this))) {
            $(this).removeClass('activeLink');
        }
    })

    if (!$('.' + nameH1 + 'Link').hasClass('activeLink')) {
        $('.' + nameH1 + 'Link').addClass('activeLink');
    }


}

function getMostVisible($elements) {
    var $element = $(),
        viewportHeight = $(window).height(),
        max = 0;

    $elements.each(function () {
        var visiblePx = getVisibleHeightPx($(this), viewportHeight);

        if (visiblePx > max) {
            max = visiblePx;
            $element = $(this);
        }
    });

    return $element;
}

function getVisibleHeightPx($element, viewportHeight) {
    var rect = $element.get(0).getBoundingClientRect(),
        height = rect.bottom - rect.top,
        visible = {
            top: rect.top >= 0 && rect.top < viewportHeight,
            bottom: rect.bottom > 0 && rect.bottom < viewportHeight
        },
        visiblePx = 0;

    if (visible.top && visible.bottom) {
        // Whole element is visible
        visiblePx = height;
    } else if (visible.top) {
        visiblePx = viewportHeight - rect.top;
    } else if (visible.bottom) {
        visiblePx = rect.bottom;
    } else if (height > viewportHeight && rect.top < 0) {
        var absTop = Math.abs(rect.top);

        if (absTop < height) {
            // Part of the element is visible
            visiblePx = height - absTop;
        }
    }

    return visiblePx;
}
