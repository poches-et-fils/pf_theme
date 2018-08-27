/**
 * If you're looking for the full menu JS I believe it's controlled
 * by webflow JS.
 */

!(function () {

	const toggleMenuOpen = e => {
		$('body').toggleClass('menu-open');
	};

	$(document).on('click', '.nav--menu--icon', toggleMenuOpen);

})();