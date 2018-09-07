!(function() {
	const getSelectedVariant = (variants, color) => {
		return variants.find(variant => variant.option2 === color);
	};

	const swapImage = ($imageContainer, newImg) => {
		const imageSize = '500x';
		const sizedImgUrl = slate.Image.getSizedImageUrl(newImg, imageSize);
		const oldImg = $imageContainer.find('img').attr('src');

		$imageContainer.addClass('product-listing__image--swapping');

		img = new Image(); 
		img.src = sizedImgUrl;
		img.onload = () => {
			$(`img[src="${oldImg}"]`).attr('src', sizedImgUrl);
			$imageContainer.removeClass('product-listing__image--swapping');
		};
	}

	const variantUrl = (variant, url) => {
		if (url.indexOf('variant') > -1) {
			url = url.substr(0, url.indexOf('?'));
		}

		return `${url}?variant=${variant.id}`;
	};

	const handleColorChange = e => {
		e.preventDefault();
		const $swatch = $(e.currentTarget);
		const $container = $swatch.parents('.product-listing');
		const $links = $container.find('a:not(.color-swatch):not(.quick-add__size)');
		const $imageContainer = $container.find('.product-listing__image');
		const color = $swatch.data('color');
		const currentUrl = $links.first().attr('href');
		const variants = $swatch.parents('.product-listing').data('variants');
		const variant = getSelectedVariant(variants, color);

		$container.find('.color-swatch').removeClass('color-swatch--selected');
		$swatch.addClass('color-swatch--selected');
		$links.prop('href', variantUrl(variant, currentUrl));
		swapImage($imageContainer, variant.featured_image.src);
	}

	$('.product-listing').on('click', '.product-listing__colors a', handleColorChange);

	$('.featured-collection').on('glide.mounted', () => {
		$('.featured-collection .product-listing').off('click', '.product-listing__colors a');
		$('.featured-collection .product-listing').on('click', '.product-listing__colors a', handleColorChange);
	});

})();