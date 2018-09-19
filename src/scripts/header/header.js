import './dropdown-menus';
import './language-selector';
import {toggleCart, updateQty, hideCart} from './popout-cart';

(function () {
	const toggleMenuOpen = e => {
		$('body').toggleClass('menu-open');
	};

	$(document)
		.on('click', '.nav--menu--icon', toggleMenuOpen)
		.on('click', 'a[url="#"]', e => e.preventDefault())
		.on('click', '.ajax--cart--item--quantity', updateQty)
		.on('click', '.nav--cart--block', toggleCart)
		.on('click', '*[data-keep-shopping], .dark-overlay', hideCart);
})();
