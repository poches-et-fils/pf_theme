import {toggleCart} from '../header/popout-cart';
import shortGender from '../modules/short-gender';

!(function () {

	const errorMessage = ($container, type) => {
		const $errorContainer = $container.find('.quick-add__error');
		const $error = $errorContainer.find(`.quick-add__error--${type}`);

		$error.show();
		$errorContainer.show();

		setTimeout(() => {
			$errorContainer.hide();
			$error.hide();
		}, 1800);
	};

	const getSelectedVariant = (variants, size, color) => {
		return variants.find(variant => {
			return variant.option1 === size && variant.option2 === color;
		});
	};

	const getSelectedColor = $container => {
		if ($container.find('.color-swatch--selected').length > 0) {
			return $container.find('.color-swatch--selected').data('color');
		}

		return $container.find('.color-swatch').first().data('color');
	};

	const buy = e => {
		e.preventDefault();
		const $sizeButton = $(e.currentTarget);
		const $container = $sizeButton.parents('.product-listing__item');
		const variants = $container.data('variants');
		const size = $sizeButton.data('size');
		const color = getSelectedColor($container);
		const variant = getSelectedVariant(variants, size, color);

		if (!variant) {
			return errorMessage($container, 'unavailable');
		}

		if (!variant.available) {
			return errorMessage($container, 'sold-out');
		}

		$.post('/cart/add.js', {
			id: variant.id,
			quantity: 1,
			properties: {
				Info: `${variant.type} / ${shortGender(variant.gender)}`
			}
		}).fail(() => {
			errorMessage($container, 'error');
		}).done(() => {
			toggleCart();
		});
	};

	const closeSizes = () => {
		$('.quick-add__sizes').removeClass('quick-add__sizes--active');
	};

	const openSizes = e => {
		e.preventDefault();
		closeSizes();
		const $button = $(e.currentTarget);
		const $sizes = $button.siblings('.quick-add__sizes');
		$sizes.addClass('quick-add__sizes--active');
	};

	const bindEvents = () => {
		if ($(window).width() < 960) {
			return;
		}

		$('.product-listing')
			.off('click', '.quick-add')
			.off('click', '.quick-add__size')
			.off('mouseleave', '.product-listing__image')
			.on('click', '.quick-add', openSizes)
			.on('click', '.quick-add__size', buy)
			.on('mouseleave', '.product-listing__image', closeSizes);
	};

	bindEvents();
	$('.featured-collection').on('glide.mounted', () => bindEvents());

})();
