theme.FeaturedCollection = function(container) {
	const $container = $(container);
	const slider = `[data-section-type="${$container.data('section-type')}"] .glide`;
	const sliderOptions = {
		type: 'carousel',
		perView: 4,
		breakpoints: {
			801: {perView: 2},
			480: {perView: 1}
		}
	};

	const glide = new Glide(slider, sliderOptions);

	glide.on(['mount.after', 'update'], () => {
		$container.trigger('glide.mounted');
	});

	$container.on('glide.update', () => glide.update());

	glide.mount();
};