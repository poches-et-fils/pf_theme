import './a11y';
import './cart';
import './currency';
import './images';
import './rte';
import './sections';
import './utils';
import './variants';
import './templates/templates';

$(() => {
	// Common a11y fixes
	slate.a11y.pageLinkFocus($(window.location.hash));

	$('.in-page-link').on('click', function(evt) {
		slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
	});

	// Target tables to make them scrollable
	var tableSelectors = '.rte table';

	slate.rte.wrapTable({
		$tables: $(tableSelectors),
		tableWrapperClass: 'rte__table-wrapper',
	});

	// Target iframes to make them responsive
	var iframeSelectors =
		'.rte iframe[src*="youtube.com/embed"],' +
		'.rte iframe[src*="player.vimeo"]';

	slate.rte.wrapIframe({
		$iframes: $(iframeSelectors),
		iframeWrapperClass: 'rte__video-wrapper'
	});

	// Apply a specific class to the html element for browser support of cookies.
	if (slate.cart.cookiesEnabled()) {
		document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
	}
});