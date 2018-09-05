!(function() {

	const errorMessage = ($container, message) => {
		
	}

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
		const $container = $sizeButton.parents('.product-listing');
		const variants = $container.data('variants');
		const size = $sizeButton.data('size');
		const color = getSelectedColor($container);
		const variant = getSelectedVariant(variants, size, color);

		if (!variant) {
			errorMessage($container, 'Option not available.');
		}

		$.post('/cart/add.js', {id: variant.id, quantity: 1})
		.fail(() => errorMessage($container, 'Error, click see more details.'))
		.done(() => toggleCart());
	}

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
		$('.product-listing')
			.off('click', '.quick-add')
			.off('click', '.quick-add__size')
			.off('mouseleave', '.product-listing__image')
			.on('click', '.quick-add', openSizes)
			.on('click', '.quick-add__size', buy)
			.on('mouseleave', '.product-listing__image', closeSizes);
	}

	$(document).on('click', '.product--quickadd', e => e.preventDefault())
	$(document).on('click', '.product--quickadd--CTA', handleQuickAdd)
	$(document).on('click', '.product--quickadd--sizes .product--size--selector', quickAdd)
	$(document).on('click', '.product-quickadd--no-options', quickAdd)

	bindEvents();
	$('.featured-collection').on('glide.mounted', () => bindEvents());

})();
