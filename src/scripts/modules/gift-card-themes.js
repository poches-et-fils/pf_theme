const giftCardThemes = () => {
	const $container = $('.gift-card__themes-container');

	if ($container.length === 0) {
		return;
	}

	$container.on('change', 'input', e => {
		$container.find('.selector--heading--left span').text(e.target.value);
	});
};

export default giftCardThemes;
