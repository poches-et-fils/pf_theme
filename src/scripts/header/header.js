import './dropdown-menus';
import './language-selector';
import {toggleCart, updateQty, hideCart} from './popout-cart';

(function () {
	const freezeScroll = e => e.preventDefault();

	const toggleMenuOpen = () => {
		if ($('body').hasClass('menu-open')) {
			$('html, body').removeClass('menu-open');
			document.body.addEventListener('touchmove', freezeScroll, false);
			document.ontouchmove = () => true;
		} else {
			$('html, body').addClass('menu-open');
			document.body.removeEventListener('touchmove', freezeScroll, false);
		}

		$('.all-designs').removeClass('full-page-popup--open');
		$('.collection--sidebar').removeClass('open');
	};

	$(document)
		.on('click', '.menu-button', toggleMenuOpen)
		.on('click', 'a[url="#"]', e => e.preventDefault())
		.on('click', '.ajax--cart--item--quantity', updateQty)
		.on('click', '.nav--cart--block', toggleCart)
		.on('click', '*[data-keep-shopping], .dark-overlay', hideCart);
})();
