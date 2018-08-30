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

	new Glide(slider, sliderOptions).mount();
};