/*! jQuery Overlay Image Check - v0.1.0 - 2013-06-20
* https://github.com/jjacobs/jquery.overlayImageCheck
*
* jQuery plugin to create radio / checkboxes with a nonchecked image and an overlaid checked image.
* 
*
* Copyright (c) 2013 Julia Jacobs; Licensed MIT */
;(function ($) {
    "use strict";

    $.fn.overlayImageCheck = function (o) {
        var n = this;
        if (n.length < 1) {
            return n;
        }

        // Set up options (and defaults)
        o = (o) ? o : {};
        o = auditOptions(o);

        n.each(function () {
            var i = $(this);
            if (i.is(':checkbox') || i.is(':radio')) {
                setup(i, o);
            }
        });

        return n;
    };

    var containerProperties = function(n, container, o) {
        // Unless the tab index is manually set, jQuery may not be able to
        // get it using the attr() method, so we'll check multiple places
        // and then make sure its at least a number
        var ti = n.attr('tabindex') || n.get(0).tabIndex || 0;

        container.css({
                          cursor: 'pointer'
                      })
            // attach handlers to the image
            .click(function (e) {
                       e.preventDefault();
                       handleClick(n, container, o, false);
                   })
            .keypress(function (e) {
                          var k = (e.which) ? e.which : ((e.keyCode) ? e.keyCode : 0);
                          // trigger on space or enter keys
                          if (k === 13 || k === 32) {
                              $(this).click();
                          }
                      })
            // add class to image on hover
            .hover(

            function () {
                $(this).addClass('imageCheckHover');
            },

            function () {
                $(this).removeClass('imageCheckHover');
            })

            .get(0).tabIndex = ti;
    };

    var setup = function (n, o) {
        // wasChecked option persists checked state
        o.wasChecked ? n.prop('checked', true) : n.prop('checked', false);

        var c = n.is(':checked');

        // set id on input if it doesn't have one
        var id = n.attr('id');
        if (!id || id.length < 1) {
            id = n.attr('id', 'imageCheckInput_' + $.fn.overlayImageCheck.uid++).attr('id');
        }

        // to overlay the checked image on the regular image, we need to create two separate images
        var imageStates = ['checked', 'unchecked'];

        var imgArr = [];

        // create two separate image element objects
        for (var i = 0; i < imageStates.length; i++) {

            var isChecked = (imageStates[i] === 'checked');

            var dynElemId = 'ic_' + id + '_' + i;

            var imgElem = $('<img />')
                .attr('src', isChecked ? o.imageChecked : o.image)
                .attr('id', dynElemId)
                .attr('alt', n.attr('id'))
                .attr('title', n.attr('id'))
                .attr('width', (o.width) ? o.width : '')
                .attr('height', (o.height) ? o.height : '')
                .addClass("imageCheck" + (isChecked ? ' checked' : ''))
                .attr('role', 'checkbox')
                .attr('aria-checked', isChecked ? 'true' : 'false')
                .attr('aria-controls', dynElemId)
                .attr('pointer-events', isChecked ? 'none' : 'auto');

            if (isChecked) {
                imgElem.css({position: 'absolute'});
            }

            imgArr.push(imgElem);
        }

        var checkedImg = imgArr[0];
        var uncheckedImg = imgArr[1];
        var wrapper = $('<div></div>')
            .attr('id', checkedImg.attr('id') + "_wrapper")
            .css({
                     cursor: 'pointer',
                     position: 'relative',
                     width: o.width,
                     height: o.height,
                     padding: '4px 0 0 3px'
                 });

        wrapper.append(checkedImg);
        wrapper.append(uncheckedImg);

      if (c) {
          wrapper.addClass('checked');
    }

        if (c) {
            checkedImg.show();
        } else {
            checkedImg.hide();
        }

        n.before(wrapper);

        // attach handlers to the original input node to redirect to ours
        n.click(function (e, triggered) {
            // Avoid infinite loop & double checking
            if (triggered === true) {
                return;
            }
            handleClick(n, wrapper, o, true);
        })
            // Hide the original input box
            .hide();

        containerProperties(n, wrapper, o);
    };

    var handleClick = function (n, wrapper, o, inputClick) {
        // determine if we need to check input box. i.e. if input is
        // checked and wrapping container has 'checked' class, need to flip it

        // take wasClicked option state into account
        o.wasChecked || wrapper.hasClass('checked') ? n.prop('checked', false) : n.prop('checked', true);

        if (wrapper.hasClass('checked') === n.is(':checked') && !inputClick) {
            n.trigger('click', [true]).change();
        }

        // Now toggle the image source and change attributes to complete the ruse
        var c = n.is(':checked');

        wrapper.toggleClass('checked');

        var checkedImgId = wrapper.attr('id').replace("_wrapper", "");

        $('#' + checkedImgId).toggle();

        // Handle radio buttons
        if (n.is(':radio') && !inputClick) {
            $('input[name="' + n.attr('name') + '"]').not(n).each(function () {
                $('#ic_' + this.id)
                    .removeClass('checked')
                    .attr({
                              'aria-checked': 'false',
                              'src': '' + o.image
                          });
            });
        }

        // Timeout to allow for 'checking' to occur before callback
        setTimeout(function () {
            o.afterCheck.apply(n, [c]);
        }, 25);
    };

    // Defined outside overlayImageCheck to allow for usage during construction
    var auditOptions = function (o) {
        if (!$.isFunction(o.afterCheck)) {
            o.afterCheck = function () {};
        }
        if (typeof (o.image) !== 'string') {
            o.image = '';
        }
        if (typeof (o.imageChecked) !== 'string') {
            o.imageChecked = '';
        }
        if (typeof (o.width) !== 'string') {
            o.width = '';
        }
        if (typeof (o.height) !== 'string') {
            o.height = '';
        }
        if (typeof (o.wasChecked) !== 'boolean') {
            o.wasChecked = false;
        }

        return o;
    };

    // Static properties
    $.fn.overlayImageCheck.uid = 0;


})(jQuery);
