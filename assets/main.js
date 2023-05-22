(function ($) {
    "use strict";
    /*=================================
      JS Index Here
  ==================================*/
    /*
    01. Mobile Menu Active
    02. Search Box Popup
    03. Slider Activations
    04. Dark Mode Toggle
    04. Quantity Plus Minus
  */

    /*---------- 01. Mobile Menu Active ----------*/
    $.fn.otmobilemenu = function (options) {
        var opt = $.extend(
            {
                menuToggleBtn: ".ot-menu-toggle",
                bodyToggleClass: "ot-body-visible",
                subMenuClass: "ot-submenu",
                subMenuParent: "ot-item-has-children",
                subMenuParentToggle: "ot-active",
                meanExpandClass: "ot-mean-expand",
                appendElement: '<span class="ot-mean-expand"></span>',
                subMenuToggleClass: "ot-open",
                toggleSpeed: 400,
            },
            options
        );

        return this.each(function () {
            var menu = $(this); // Select menu

            // Menu Show & Hide
            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);

                // collapse submenu on menu hide or show
                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function () {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }

            // Class Set Up for every submenu
            menu.find("li").each(function () {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                submenu.parent().addClass(opt.subMenuParent);
                submenu.prev("a").append(opt.appendElement);
                submenu.next("a").append(opt.appendElement);
            });

            // Toggle Submenu
            function toggleDropDown($element) {
                if ($($element).next("ul").length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).next("ul").slideToggle(opt.toggleSpeed);
                    $($element).next("ul").toggleClass(opt.subMenuToggleClass);
                } else if ($($element).prev("ul").length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).prev("ul").slideToggle(opt.toggleSpeed);
                    $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
                }
            }

            // Submenu toggle Button
            var expandToggler = "." + opt.meanExpandClass;
            $(expandToggler).each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });

            // Menu Show & Hide On Toggle Btn click
            $(opt.menuToggleBtn).each(function () {
                $(this).on("click", function () {
                    menuToggle();
                });
            });

            // Hide Menu On out side click
            menu.on("click", function (e) {
                e.stopPropagation();
                menuToggle();
            });

            // Stop Hide full menu on menu click
            menu.find("div").on("click", function (e) {
                e.stopPropagation();
            });
        });
    };

    $(".ot-menu-wrapper").otmobilemenu();

	// Class Set Up for every submenu
	$('.ot-header .main-menu').find("li").each(function () {
		var pcsubmenu = $(this).find(".sub-menu");
		pcsubmenu.parent().addClass('menu-item-has-children');
	});

    /*---------- 02. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        $($searchOpen).on("click", function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });
        $($searchBox).on("click", function (e) {
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
        $($searchBox)
            .find("form")
            .on("click", function (e) {
                e.stopPropagation();
                $($searchBox).addClass($toggleCls);
            });
        $($searchCls).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    }
    popupSarchBox(
        ".popup-search-box",
        ".searchBoxToggler",
        ".searchClose",
        "show"
    );

    /*----------- 03. Slider Activations ----------*/
    var splideCheck1 = document.getElementById("review-slider");
    if (splideCheck1) {
        var splide = new Splide("#review-slider", {
            type: "loop",
            perPage: 1,
            perMove: 1,
            arrows: true,
            autoplay: true,
            autoplayspeed: 3000,
            interval: 3000,
            pauseOnHover: false,
            autoHeight: true,
            arrowPath:
                "M19.375 24L16.6625 21.1L23.5406 14H0V10H23.5406L16.6625 2.9L19.375 0L31 12L19.375 24Z",
            pagination: false,
            gap: 0,
        });
        splide.mount();
    }
    var splideCheck1 = document.getElementById("review-slider2");
    if (splideCheck1) {
        var splide = new Splide("#review-slider2", {
            type: "loop",
            perPage: 1,
            perMove: 1,
            arrows: true,
            autoplay: true,
            autoplayspeed: 3000,
            interval: 3000,
            pauseOnHover: false,
            autoHeight: true,
            arrowPath:
                "M19.375 24L16.6625 21.1L23.5406 14H0V10H23.5406L16.6625 2.9L19.375 0L31 12L19.375 24Z",
            pagination: false,
            gap: 0,
        });
        splide.mount();
    }

    /*----------- 04. Dark Mode Toggle ----------*/
    $(".dark-select").on("click", function (e) {
        e.preventDefault();
        $("html").addClass("dark-theme").removeClass("light-theme");
        $("html").attr("data-theme", $("html").attr("data-theme") === "light" ? "dark" : "light");
        $(".dropdown-link .light").css("display", "none");
        $(".dropdown-link .dark").css("display", "inline");
    });
    $(".light-select").on("click", function (e) {
        e.preventDefault();
        $("html").removeClass("dark-theme");
        $(".dropdown-link .light").css("display", "inline");
        $(".dropdown-link .dark").css("display", "none");
    });

    /*----------- 04. Quantity Plus Minus ----------*/
    $(".quantity-plus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
    });

    $(".quantity-minus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });
    });

    new WOW().init();

    if(window.location.href == 'https://theskinbiomeco.myshopify.com/pages/customer-support-faq'){
        $(".nav.faq-tab a").eq(0).removeClass('active');
        $(".nav.faq-tab a").eq(1).addClass('active');
    }

})(jQuery);
