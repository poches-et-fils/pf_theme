theme.Slider = function(container) {
	const $container = $(container);

	if ($(slider).find('.glide__slide').length === 0) {
		return;
	}

	const speed = $container.data('slider-speed');
	const slider = `[data-section-type="${$container.data('section-type')}"].glide`;
	const sliderOptions = {
		type: 'carousel',
		perView: 1,
		autoplay: $(slider).find('.glide__slide').length > 1 ? speed : false
	};

	new Glide(slider, sliderOptions).mount();
};