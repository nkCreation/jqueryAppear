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

	$.fn.appearJS = function() {
		var $this = $(this);
		var firstTop;

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
				if (($(this).data('firstTop') - $window.height() + 200) < pos) {
					// viewport entrance
					if (!$(this).data('isVisible')) {

						(function(i, that) {
							setTimeout(function(){
								that.data('isVisible', true);
								that.attr('data-appear', 'appear');
							}, (i * 200));
						}( $(this).data('indexEl'), $(this) ));
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
	};
})(jQuery);