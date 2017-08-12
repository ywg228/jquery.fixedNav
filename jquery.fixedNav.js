/**
 * jquery.fixedNav 固定导航条插件
 * github:https://github.com/ywg228
 */
;(function ($) {
    'use strict';

    $.fn.fixedNav = function (options) {

        var defaults = {
            sectionSelector: '.section',    //section选择器
            navItemSelector: '.nav-list a', //导航项选择器
            speed: '400',                   //滚动速度
            easing: 'swing',                //滚动动画曲线
            activeClass: 'active'           //导航项active class
        };

        var options = $.extend({}, defaults, options);

        return this.each(function () {
            var $fixedNav = $(this),
                $fixedNavPosition = $fixedNav.css('position'),
                $fixedNavZIndex = $fixedNav.css('zIndex'),
                $win = $(window),
                $sections = $(options.sectionSelector),
                $navItems = $(options.navItemSelector),
                fixedNavHeight = $fixedNav.height(),
                prevEle = $fixedNav.prev(),
                nextEle = $fixedNav.next(),
                topPosition = $(window).scrollTop(),
                navPosition = prevEle.outerHeight(true);

            $win.on('scroll', function () {
                topPosition = $(window).scrollTop();

                updateFixedNav();
            });

            $win.on('resize', function () {
                navPosition = prevEle.outerHeight(true);

                updateFixedNav();
            });

            function updateFixedNav() {

                if (topPosition >= navPosition) {
                    $fixedNav.css({
                        'position': 'fixed',
                        'top': 0,
                        'left': 0,
                        'z-index': 9999
                    });
                    nextEle.css('margin-top', fixedNavHeight + 'px');
                } else {
                    $fixedNav.css({
                        'position': $fixedNavPosition,
                        'z-index': $fixedNavZIndex
                    });
                    nextEle.css('margin-top', '');
                }

                fixedNavHeight = $fixedNav.height();

                $sections.each(function () {
                    var section = $(this),
                        sectionHeight = section.outerHeight(true),
                        sectionOffsetTop = section.offset().top,
                        winScrollTop = $win.scrollTop(),
                        sectionAnchor = $fixedNav.find('li a[href~="#' + section.attr('id') + '"]');
                    if ((sectionOffsetTop - fixedNavHeight <= winScrollTop) && (sectionOffsetTop + sectionHeight - fixedNavHeight > winScrollTop)) {
                        $navItems.removeClass(options.activeClass);
                        sectionAnchor.addClass(options.activeClass);
                    } else {
                        sectionAnchor.removeClass(options.activeClass);
                    }
                });
            }

            $navItems.on('click', function (e) {
                e.preventDefault();
                if (!$(this).hasClass(options.activeClass)) {
                    var hash = this.hash;
                    var target = $(hash);
                    if (target.length) {
                        $('html,body').animate({
                            'scrollTop': target.offset().top - fixedNavHeight + 1
                        }, options.speed, options.easing, function () {
                            window.location.hash = hash;
                        });
                    }
                }
            });
        });
    };

})(jQuery);