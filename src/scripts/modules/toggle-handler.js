const toggleHandler = event => {
	const $container = $(event.target).parents('.toggle--item');
	$container.toggleClass('toggle--item--open');
	$container.find('.toggle--contents').toggle('fast');
};

export default toggleHandler;
