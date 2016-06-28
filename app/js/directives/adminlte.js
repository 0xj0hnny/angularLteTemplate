angular.module('adminlte', [])
    .directive('body', ['$window',
        function($window) {
            'use strict';

            var _options = {
                //Add slimscroll to navbar menus
                //This requires you to load the slimscroll plugin
                //in every page before app.js
                navbarMenuSlimscroll: true,
                navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
                navbarMenuHeight: "200px", //The height of the inner menu
                //General animation speed for JS animated elements such as box collapse/expand and
                //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
                //'fast', 'normal', or 'slow'
                animationSpeed: 500,
                //Sidebar push menu toggle button selector
                sidebarToggleSelector: "[data-toggle='offcanvas']",
                //Activate sidebar push menu
                sidebarPushMenu: true,
                //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
                sidebarSlimScroll: true,
                //Enable sidebar expand on hover effect for sidebar mini
                //This option is forced to true if both the fixed layout and sidebar mini
                //are used together
                sidebarExpandOnHover: false,
                //BoxRefresh Plugin
                enableBoxRefresh: true,
                //Bootstrap.js tooltip
                enableBSToppltip: true,
                BSTooltipSelector: "[data-toggle='tooltip']",
                //Enable Fast Click. Fastclick.js creates a more
                //native touch experience with touch devices. If you
                //choose to enable the plugin, make sure you load the script
                //before AdminLTE's app.js
                enableFastclick: true,
                //Control Sidebar Options
                enableControlSidebar: true,
                controlSidebarOptions: {
                    //Which button should trigger the open/close event
                    toggleBtnSelector: "[data-toggle='control-sidebar']",
                    //The sidebar selector
                    selector: ".control-sidebar",
                    //Enable slide over content
                    slide: true
                },
                //Box Widget Plugin. Enable this plugin
                //to allow boxes to be collapsed and/or removed
                enableBoxWidget: true,
                //Box Widget plugin options
                boxWidgetOptions: {
                    boxWidgetIcons: {
                        //Collapse icon
                        collapse: 'fa-minus',
                        //Open icon
                        open: 'fa-plus',
                        //Remove icon
                        remove: 'fa-times'
                    },
                    boxWidgetSelectors: {
                        //Remove button selector
                        remove: '[data-widget="remove"]',
                        //Collapse button selector
                        collapse: '[data-widget="collapse"]'
                    }
                },
                //Direct Chat plugin options
                directChat: {
                    //Enable direct chat by default
                    enable: true,
                    //The button to open and close the chat contacts pane
                    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
                },
                //Define the set of colors to use globally around the website
                colors: {
                    lightBlue: "#3c8dbc",
                    red: "#f56954",
                    green: "#00a65a",
                    aqua: "#00c0ef",
                    yellow: "#f39c12",
                    blue: "#0073b7",
                    navy: "#001F3F",
                    teal: "#39CCCC",
                    olive: "#3D9970",
                    lime: "#01FF70",
                    orange: "#FF851B",
                    fuchsia: "#F012BE",
                    purple: "#8E24AA",
                    maroon: "#D81B60",
                    black: "#222222",
                    gray: "#d2d6de"
                },
                //The standard screen sizes that bootstrap uses.
                //If you change these in the variables.less file, change
                //them here too.
                screenSizes: {
                    xs: 480,
                    sm: 768,
                    md: 992,
                    lg: 1200
                }
            };

            var _layout = {
                fix: function() {
                    //Get window height and the wrapper height
                    var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                    var windowHeight = $($window).height();
                    var sidebarHeight = $(".sidebar").height();
                    //Set the min-height of the content and sidebar based on the
                    //the height of the document.
                    if ($("body").hasClass("fixed")) {
                        $(".content-wrapper, .right-side").css('min-height', windowHeight - $('.main-footer').outerHeight());
                    } else {
                        var postSetWidth;
                        if (windowHeight >= sidebarHeight) {
                            $(".content-wrapper, .right-side").css('min-height', windowHeight - neg);
                            postSetWidth = windowHeight - neg;
                        } else {
                            $(".content-wrapper, .right-side").css('min-height', sidebarHeight);
                            postSetWidth = sidebarHeight;
                        }

                        //Fix for the control sidebar height
                        var controlSidebar = $('.control-sidebar');
                        if (typeof controlSidebar !== "undefined") {
                            if (controlSidebar.height() > postSetWidth) {
                                $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                            }
                        }
                    }
                },

                fixSidebar: function() {
                    //Make sure the body tag has the .fixed class
                    if (!$("body").hasClass("fixed")) {
                        if (typeof $.fn.slimScroll !== undefined) {
                            $(".sidebar").slimScroll({
                                destroy: true
                            }).height("auto");
                        }
                        return;
                    } else if (typeof $.fn.slimScroll === undefined && window.console) {
                        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
                    }

                    if (_options.sidebarSlimScroll) {
                        if (typeof $.fn.slimScroll !== undefined) {
                            //Destroy if it exists
                            $(".sidebar").slimScroll({
                                destroy: true
                            }).height("auto");
                            //Add slimscroll
                            $(".sidebar").slimscroll({
                                height: ($(window).height() - $(".main-header").height()) + "px",
                                color: "rgba(0,0,0,0.2)",
                                size: "3px"
                            });
                        }
                    }
                }
            };

            $.fn.todolist = function (options) {
                // Render options
                var settings = $.extend({
                    //When the user checks the input
                    onCheck: function (ele) {
                        return ele;
                    },
                    //When the user unchecks the input
                    onUncheck: function (ele) {
                        return ele;
                    }
                }, options);

                return this.each(function () {

                    if (typeof $.fn.iCheck !== undefined) {
                        $('input', this).on('ifChecked', function () {
                            var ele = $(this).parents("li").first();
                            ele.toggleClass("done");
                            settings.onCheck.call(ele);
                        });

                        $('input', this).on('ifUnchecked', function () {
                            var ele = $(this).parents("li").first();
                            ele.toggleClass("done");
                            settings.onUncheck.call(ele);
                        });
                    } else {
                        $('input', this).on('change', function () {
                            var ele = $(this).parents("li").first();
                            ele.toggleClass("done");
                            if ($('input', ele).is(":checked")) {
                                settings.onCheck.call(ele);
                            } else {
                                settings.onUncheck.call(ele);
                            }
                        });
                    }
                });
            };

            var _boxWidget = {
                activate: function(box) {
                    if (!box) {
                        box = document;
                    }

                    box = $(box);

                    box.on('click', _options.boxWidgetOptions.boxWidgetSelectors.collapse, function(e) {
                        e.preventDefault();
                        _boxWidget.collapse($(this));
                    });

                    box.on('click', _options.boxWidgetOptions.boxWidgetSelectors.remove, function(e) {

                    });
                },

                collapse: function(element) {
                    var _this = this;
                    var box = element.parents(".box").first();
                    var boxContent = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
                    if (!box.hasClass("collapsed-box")) {
                        element.children(":first")
                            .removeClass(_options.boxWidgetOptions.boxWidgetIcons.collapse)
                            .addClass(_options.boxWidgetOptions.boxWidgetIcons.open);
                        boxContent.slideUp(_options.animationSpeed, function () {
                            box.addClass("collapsed-box");
                        });
                    } else {
                        element.children(":first")
                            .removeClass(_options.boxWidgetOptions.boxWidgetIcons.collapse)
                            .addClass(_options.boxWidgetOptions.boxWidgetIcons.open);
                        boxContent.slideDown(_options.animationSpeed, function () {
                            box.removeClass("collapsed-box");
                        });
                    }
                },

                remove: function(element) {
                    var box = element.parents('.box').first();
                    box.slideUp(_options.animationSpeed);
                }
            };


            return {
                restrict: 'E',
                link: function(scope, element, attrs) {
                    $.extend(true, _options, attrs);

                    _layout.fix();
                    _layout.fixSidebar();
                    $($window, '.wrapper').resize(function() {
                        _layout.fix();
                        _layout.fixSidebar();
                    });

                    if (_options.enableBSToppltip) {
                        $('body').tooltip({
                            selector: _options.BSTooltipSelector
                        });
                    }

                    if (_options.enableBoxWidget) {
                        _boxWidget.activate();
                    }

                    if (_options.enableFastclick && typeof FastClick !== undefined) {
                        FastClick.attach(document.body);
                    }

                    if (_options.directChat.enable) {
                        $(_options.directChat.contactToggleSelector, element).on('click', function() {
                            var box = $(this).parents('.direct-chat').first();
                            box.toggleClass('direct-chat-contacts-open');
                        });
                    }
                }
            };
        }])


    .directive('mainHeader', ['$window',
        function($window) {
            'use strict';

            var _options = {
                navbarMenuSlimscroll: true,
                navbarMenuSlimscrollWidth: "3px",
                navbarMenuHeight: "200px",
                sidebarExpandOnHover: false,
                enableControlSidebar: true,
                controlSidebarOptions: {
                    toggleBtnSelector: "[data-toggle='control-sidebar']",
                    selector: ".control-sidebar",
                    slide: true
                },
                screenSizes: {
                    xs: 480,
                    sm: 768,
                    md: 992,
                    lg: 1200
                }
            };


            return {
                restrict: 'C',
                link: function(scope, element, attrs) {
                    $.extend(true, _options, attrs);

                    var $body = $('body');

                    $("[data-toggle='offcanvas']").on('click', function(e) {
                        e.preventDefault();

                        if ($($window).width() > (_options.screenSizes.sm - 1)) {
                            if ($body.hasClass('sidebar-collapse')) {
                                $body.removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                            } else {
                                $body.addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                            }
                        } else {
                            if ($body.hasClass('sidebar-open')) {
                                $body.removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                            } else {
                                $body.addClass('sidebar-open').trigger('expanded.pushMenu');
                            }
                        }
                    });

                    $(".content-wrapper").on('click', function () {
                        //Enable hide menu when clicking on the content-wrapper on small screens
                        if ($($window).width() <= (_options.screenSizes.sm - 1) && $body.hasClass("sidebar-open")) {
                            $body.removeClass('sidebar-open');
                        }
                    });

                    $('.btn-group[data-toggle="btn-toggle"]').each(function () {
                        var group = $(this);
                        $(this).find(".btn").on('click', function (e) {
                            group.find(".btn.active").removeClass("active");
                            $(this).addClass("active");
                            e.preventDefault();
                        });
                    });

                    if (_options.navbarMenuSlimscroll && typeof $.fn.slimscroll !== undefined) {
                        $('.navbar .menu', element).slimscroll({
                            height: _options.navbarMenuHeight,
                            alwaysVisible: false,
                            size: _options.navbarMenuSlimscrollWidth
                        }).css('width', '100%');
                    }

                    if (_options.sidebarExpandOnHover || ($body.hasClass('fixed') && $body.hasClass('sidebar-mini'))) {
                        var screenWidth = _options.screenSizes.sm - 1;

                        $('.main-sidebar').hover(function () {
                            if ($body.hasClass('sidebar-mini') && $body.hasClass('sidebar-collapse') && $($window).width() > screenWidth) {
                                $body.removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
                            }
                        }, function () {
                            if ($body.hasClass('sidebar-mini') && $body.hasClass('sidebar-expanded-on-hover') && $($window).width() > screenWidth) {
                                if ($body.hasClass('sidebar-expanded-on-hover')) {
                                    $body.removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
                                }
                            }
                        });
                    }

                    var controlSidebar = {
                        open: function(sidebar, slide) {
                            if (slide) {
                                sidebar.addClass('control-sidebar-open');
                            } else {
                                $body.addClass('control-sidebar-open');
                            }
                        },

                        close: function(sidebar, slide) {
                            if (slide) {
                                sidebar.removeClass('control-sidebar-open');
                            } else {
                                $body.removeClass('control-sidebar-open');
                            }
                        },

                        fix: function(sidebar) {
                            if ($("body").hasClass('layout-boxed')) {
                                sidebar.css('position', 'absolute');
                                sidebar.height($(".wrapper").height());
                                $($window).resize(function () {
                                    controlSidebar.fix(sidebar);
                                });
                            } else {
                                sidebar.css({
                                    position: 'fixed',
                                    height: 'auto'
                                });
                            }
                        },

                        fixForFixed: function(sidebar) {
                            sidebar.css({
                                'position': 'fixed',
                                'max-height': '100%',
                                'overflow': 'auto',
                                'padding-bottom': '50px'
                            });
                        },

                        fixForContent: function(sidebar) {
                            $(".content-wrapper, .right-side").css('min-height', sidebar.height());
                        }
                    };

                    var sidebar = $(_options.controlSidebarOptions.selector);
                    var sidebarBtn = $(_options.controlSidebarOptions.toggleBtnSelector);

                    sidebarBtn.on('click', function(e) {
                        e.preventDefault();
                        if (!sidebar.hasClass('control-sidebar-open') && !$body.hasClass('control-sidebar-open')) {
                            controlSidebar.open(sidebar, _options.controlSidebarOptions.slide);
                        } else {
                            controlSidebar.close(sidebar, _options.controlSidebarOptions.slide);
                        }
                    });

                    var bg = $('.control-sidebar-bg');
                    controlSidebar.fix(bg);

                    if ($body.hasClass('fixed')) {
                        controlSidebar.fixForFixed(sidebar);
                    } else if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
                        controlSidebar.fixForContent(sidebar);
                    }
                }
            };

        }])


    .directive('mainSidebar', ['$window',
        function($window) {

            var _options = {
                sidebarSlimScroll: true,
                animationSpeed: 500
            };

            var _layout = {
                fix: function() {
                    var $mainFooter = $('.main-footer');
                    var neg = $('.main-header').outerHeight() + $mainFooter.outerHeight();
                    var windowHeight = $($window).height();
                    var sidebarHeight = $(".sidebar").height();

                    if ($("body").hasClass("fixed")) {
                        $(".content-wrapper, .right-side").css('min-height', windowHeight - $mainFooter.outerHeight());
                    } else {
                        var postSetWidth;
                        if (windowHeight >= sidebarHeight) {
                            $(".content-wrapper, .right-side").css('min-height', windowHeight - neg);
                            postSetWidth = windowHeight - neg;
                        } else {
                            $(".content-wrapper, .right-side").css('min-height', sidebarHeight);
                            postSetWidth = sidebarHeight;
                        }

                        var $controlSidebar = $('.control-sidebar');
                        if (typeof $controlSidebar !== "undefined") {
                            if ($controlSidebar.height() > postSetWidth) {
                                $(".content-wrapper, .right-side").css('min-height', $controlSidebar.height());
                            }
                        }
                    }
                },

                fixSidebar: function() {
                    var $sidebar = $('.sidebar');

                    if (!$("body").hasClass("fixed")) {
                        if (typeof $.fn.slimScroll !== undefined) {
                            $sidebar.slimScroll({
                                destroy: true
                            }).height("auto");
                        }
                        return;
                    } else if (typeof $.fn.slimScroll === undefined && $window.console) {
                        $window.console.error("Error: the fixed layout requires the slimscroll plugin!");
                    }

                    if (_options.sidebarSlimScroll) {
                        if (typeof $.fn.slimScroll !== undefined) {
                            $sidebar.slimScroll({
                                destroy: true
                            }).height("auto");

                            $sidebar.slimscroll({
                                height: ($($window).height() - $(".main-header").height()) + "px",
                                color: "rgba(0,0,0,0.2)",
                                size: "3px"
                            });
                        }
                    }
                }
            };

            $.fn.tree = function() {
                $('li a', this).on('click', function(e) {
                    //Get the clicked link and the next element
                    var $this = $(this);
                    var checkElement = $this.next();

                    //Check if the next element is a menu and is visible
                    if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                        //Close the menu
                        checkElement.slideUp(_options.animationSpeed, function () {
                            checkElement.removeClass('menu-open');
                            //Fix the layout in case the sidebar stretches over the height of the window
                            //_this.layout.fix();
                        });
                        checkElement.parent("li").removeClass("active");
                    }
                    //If the menu is not visible
                    else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                        //Get the parent menu
                        var parent = $this.parents('ul').first();
                        //Close all open menus within the parent
                        var ul = parent.find('ul:visible').slideUp(_options.animationSpeed);
                        //Remove the menu-open class from the parent
                        ul.removeClass('menu-open');
                        //Get the parent li
                        var parentLi = $this.parent("li");

                        //Open the target menu and add the menu-open class
                        checkElement.slideDown(_options.animationSpeed, function () {
                            //Add the class active to the parent li
                            checkElement.addClass('menu-open');
                            parent.find('li.active').removeClass('active');
                            parentLi.addClass('active');

                            _layout.fix();
                        });
                    }
                    //if this isn't a link, prevent the page from being redirected
                    if (checkElement.is('.treeview-menu')) {
                        e.preventDefault();
                    }
                });
            };

            return {
                restrict: 'C',
                link: function (scope, element, attrs) {
                    $.extend(true, _options, attrs);

                    $('.sidebar', element).tree();

                    _layout.fix();
                    _layout.fixSidebar();
                }
            };

        }]);
