/*
Plugin: jQueryAppear
Version 1.0.0
Author: Nicolas LEPORT
Twitter: @niko_lp35
Author URL: http://www.nkcreation.com/

License: MIT
http://www.opensource.org/licenses/mit-license.php
*/

(function( $ ){
	var $window = $(window);
    // an array of positions
	var arrayPositions = {};

	$.fn.appearJS = function(settings) {
		var $this = $(this);
		var firstTop;

		var defaultSettings = {
			'visibleGap': 200,
			'timeOut': 200
		}

		var finalSettings = $.extend(defaultSettings, settings);

		$this.each(function(){
		    firstTop = $(this).offset().top;

			if (arrayPositions[firstTop] !== undefined) {
				arrayPositions[firstTop]++;
			} else {
				arrayPositions[firstTop] = 1;
			}

			$(this).data('firstTop', firstTop).data('indexEl', arrayPositions[firstTop]);
		});

		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();

			$this.each(function(){
				if (($(this).data('firstTop') - $window.height() + finalSettings.visibleGap) < pos) {
					// viewport entrance
					if (!$(this).data('isVisible')) {

						(function(i, that, timeout) {
							setTimeout(function(){
								that.data('isVisible', true);
								that.attr('data-appear', 'appear');
							}, (i * timeout));
						}( $(this).data('indexEl'), $(this), finalSettings.timeOut ));
					}
				} else {
					// exit viewport
					$(this).data('isVisible', false);
					$(this).attr('data-appear', 'disappear');
				}
			});
		}

		$window.bind('scroll', update).resize(update);
		update();

		return this;
	};
})(jQuery);
