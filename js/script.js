jQuery(document).ready(function() {
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();


    header();
    jQuery(window).scroll(function() {
        header();
    });

    jQuery('.scroll-to-top').click(function(event) {
        jQuery('html, body').animate({ scrollTop: 0 }, 1000);
    });

    /*=================================================
                            Custom
    =====================================================*/
    jQuery(window).load(function() {
        jQuery(".fr-loading").delay(1000).fadeOut("slow");
    });

    //SHOW AND HIDE LIGHBOX
    jQuery(document).on('click', '.md-trigger', function(event) {
        event.preventDefault();
        jQuery('#' + jQuery(this).attr('data-type')).addClass('md-show');
    });

    jQuery(document).on('click', '.md-close, .md-overlay, .md-cancel', function() {
        jQuery('.md-modal').removeClass('md-show');
        jQuery('body').removeClass('none-scroll');
        jQuery(this).parent().find('iframe').attr('src', '');
        jQuery('body').removeClass('none-scroll');
    });
    jQuery(document).on('click', '.input--icon', function() {
        if (jQuery(this).parent().hasClass('pass--view')) {
            jQuery(this).parent().find('.password--control').attr('type', 'password');
            jQuery(this).parent().removeClass('pass--view');
        } else {
            jQuery(this).parent().find('.password--control').attr('type', 'text');
            jQuery(this).parent().addClass('pass--view');
        }
    })
    jQuery(document).on('click', '.item--like', function() {
        jQuery(this).toggleClass('liked');
    })
    jQuery(document).on('click', '.action--like', function() {
        jQuery(this).toggleClass('liked');
    })

    var twoToneButton = document.querySelector('.cld--bmore');
    if (twoToneButton) {
        twoToneButton.addEventListener("click", function() {
            twoToneButton.innerHTML = "Loading ...";
            twoToneButton.classList.add('active');

            setTimeout(
                function() {
                    twoToneButton.classList.remove('active');
                    twoToneButton.innerHTML = "Show more result";

                }, 6000);
        }, false);
    }

    jQuery(document).on('click', '.notify--icon', function() {
        jQuery(this).parent().toggleClass('open');
        jQuery('#dark-shadow').removeClass('active');
        jQuery('#header-responsive .bottoms .menu').removeClass('active');
        jQuery('#header-responsive .bottoms .menu-mobile').removeClass('active');
    })

    jQuery('.dropdown--select').select2();

    jQuery(document).on('click', '#header .header-actions .notify .notify--dropdown .dropdown--clear', function(event) {
        jQuery(this).parent().find('.dropdown--list').html('');
    })

    // Menu
    jQuery('#dark-shadow').click(function(event) {
        jQuery('#header-responsive .bottoms .menu').removeClass('active');
        jQuery('#header-responsive .bottoms .menu-mobile').removeClass('active');
        jQuery(this).removeClass('active');
    });


    jQuery(document).on('click', '#header-responsive .bottoms .menu', function(event) {
        event.preventDefault();
        if (jQuery(this).hasClass('active')) {
            jQuery(this).removeClass('active');
            jQuery(this).parent().find('.box-menu').removeClass('active');
            jQuery(this).parent().find('.menu-mobile').removeClass('active');
            jQuery('#dark-shadow').removeClass('active');
            jQuery('body').removeClass('none-scroll');
            jQuery('.notify').removeClass('open');
        } else {
            jQuery(this).addClass('active');
            jQuery(this).parent().find('.box-menu').addClass('active');
            jQuery(this).parent().find('.menu-mobile').addClass('active');
            jQuery('#header-responsive .bottoms .book, #header-responsive .bottoms .box-book').removeClass('active');
            jQuery('#dark-shadow').addClass('active');
            jQuery('body').addClass('none-scroll');
            jQuery('.notify').removeClass('open');
        }
    });

    jQuery(document).on('click', '.dropbox .dropdown--current, .search--dropdown .dropdown--current', function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (jQuery(this).parent().hasClass('open')) {
            jQuery(this).parent().removeClass('open');
        } else {
            jQuery('.dropbox, .search--dropdown').removeClass('open');
            jQuery(this).parent().addClass('open');
        }
        jQuery('.box--suggest').removeClass('active')
    });

    jQuery(document).on('click', '.dropbox .dropdown--ui li', function(event) {
        event.preventDefault();
        jQuery(this).closest('.dropbox').removeClass('open');
        jQuery(this).closest('.dropbox').find('.dropdown--current').text(jQuery(this).text());
        jQuery(this).closest('.dropbox').find('.dropdown--option').val(jQuery(this).text());
    });
    jQuery(document).on('click', '.search--dropdown .dropdown--ui li', function(event) {
        event.preventDefault();
        jQuery(this).closest('.search--dropdown').removeClass('open');
        jQuery(this).closest('.search--dropdown').find('.dropdown--current').text(jQuery(this).text());
        jQuery(this).closest('.search--dropdown').find('.dropdown--option').val(jQuery(this).text());
    });

    jQuery(document).on('click', '.sort--filter .dropdown-nborder', function(event) {
        event.preventDefault();
        jQuery(this).toggleClass("open");
        jQuery('.box--filter').slideToggle(300);
    });

    jQuery(document).on('keyup', '.box--search .search--input input', function(e) {
        if(e.keyCode != 38 && e.keyCode != 40) {
            jQuery(this).attr('data', jQuery(this).val());
            if (jQuery(this).val().length > 2) {
                jQuery(this).parent().addClass('active');
                jQuery(this).closest('.box--search').parent().find('.box--suggest').addClass('active');
            } else {
                jQuery(this).parent().removeClass('active');
                jQuery(this).closest('.box--search').parent().find('.box--suggest').removeClass('active');
            }
            jQuery('.search--dropdown').removeClass('open');
        }
    })

    jQuery(document).on('click', '.box--search .search--input input', function(event) {
        event.stopPropagation();
        if (jQuery(this).val().length > 2) {
            jQuery(this).parent().addClass('active');
            jQuery(this).closest('.box--search').parent().find('.box--suggest').addClass('active');
        } else {
            jQuery(this).parent().removeClass('active');
            jQuery(this).closest('.box--search').parent().find('.box--suggest').removeClass('active');
        }
        jQuery('.search--dropdown').removeClass('open');
    })
    jQuery(document).on('keydown', '.box--search .search--input input', function(e) {
        switch (e.which) {
            case 40:
                e.preventDefault(); // prevent moving the cursor
                if($('.suggest--key ul li.selected').length > 0) {
                    if($('.suggest--key ul li:last-child.selected').length > 0){
                        $('.suggest--key ul li:last-child.selected').removeClass('selected');
                        $('.suggest--key ul li:first-child').addClass('selected');
                    } else {
                        $('.suggest--key ul li:not(:last-child).selected').removeClass('selected')
                            .next().addClass('selected');
                    }
                } else {
                    $('.suggest--key ul li:first-child').addClass('selected');
                }
                $(this).val($('.suggest--key ul li.selected').text());
                break;
            case 38:
                e.preventDefault(); // prevent moving the cursor
                if($('.suggest--key ul li.selected').length > 0) {
                    if($('.suggest--key ul li:first-child.selected').length > 0){
                        $('.suggest--key ul li:first-child.selected').removeClass('selected');
                        $('.suggest--key ul li:last-child').addClass('selected');
                    } else {
                        $('.suggest--key ul li:not(:first-child).selected').removeClass('selected')
                            .prev().addClass('selected');
                    }
                } else {
                    $('.suggest--key ul li:last-child').addClass('selected');
                }
                $(this).val($('.suggest--key ul li.selected').text());
                break;
        }
    })

    jQuery(document).on('click', '.box--search .search--input svg', function(event) {
        jQuery(this).parent().find('input').val('');
        jQuery(this).parent().removeClass('active');
        jQuery(this).closest('.box--search').parent().find('.box--suggest').removeClass('active');
    })

    jQuery(document).on('click', '.layout--grid', function(event) {
        event.preventDefault();
        if (jQuery(this).hasClass('active')) {
            jQuery(this).removeClass('active');
            jQuery('.box--render--grid').show();
            jQuery('.box--render--list').hide();
        } else {
            jQuery(this).addClass('active');
            jQuery('.box--render--list').show();
            jQuery('.box--render--grid').hide();
        }
    });
    jQuery(document).on('click', '.list--table table th svg', function(event) {
        event.preventDefault();
        jQuery(this).parent().toggleClass('active');
    });

    jQuery(document).on('click', 'html, body', function() {
        jQuery('.dropbox, .search--dropdown').removeClass('open');
        jQuery('.box--suggest').removeClass('active');
    });
});

function header() {
    if (jQuery(this).scrollTop() > 100) {
        jQuery('body:not(.homepage) #header').addClass('active');
    } else {
        jQuery('body:not(.homepage) #header').removeClass('active');
    }
}

var keyAction = function(jQuery, getMenu, getKeyTap) {
    var isSelected;
    var getChild;
    var thisChild;
    var $ = jQuery;
    var allowKeys = [38, 40, 13];
    var keyCode = false;

    var upDown = function(getKeyTap) {
        return (getKeyTap == 38 || getKeyTap == 40);
    }

    this.keyAllowed = function() {
        return upDown(getKeyTap);
    }

    this.isAllowed = function() {
        return (allowKeys.indexOf(getKeyTap) != -1);
    }

    this.setKey = function(keyCode) {
        getKeyTap = keyCode;
        return this;
    }

    this.isSelected = function() {
        return isSelected;
    }

    this.setReturn = function(thisChild, func) {
        if (getKeyTap == 13) {
            if (thisChild)
                func(thisChild);

            return false;
        }
    }

    this.firstClick = function() {
        getChild = (getKeyTap == 38) ? 'last' : 'first';
        isSelected = getMenu.children('li:' + getChild + '-child');
        isSelected.addClass('selected');
        return isSelected;
    }

    this.currClick = function(isSelected) {
        var setSpot = 'last';

        if (getKeyTap == 38)
            thisChild = isSelected.prev();
        else if (getKeyTap == 40) {
            thisChild = isSelected.next();
            setSpot = 'first';
        }

        if (!thisChild.hasClass('selectable'))
            thisChild = getMenu.children("li:" + setSpot + "-child");

        isSelected.removeClass('selected');
        thisChild.addClass('selected');
        return thisChild;
    }

    this.doAction = function(func) {
        return func();
    }
}