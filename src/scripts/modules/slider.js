const Slider = function (container) {
	const $container = $(container);
	const speed = $container.data('slider-speed');
	const slider = `[data-section-type="${$container.data('section-type')}"].glide`;

	if ($(slider).find('.glide__slide').length === 0) {
		return;
	}

	const sliderOptions = {
		type: 'carousel',
		perView: 1,
		autoplay: $(slider).find('.glide__slide').length > 1 ? speed : false
	};

	new Glide(slider, sliderOptions).mount();
};

export default Slider;
