!(function () {

	const form = 'form[action="/cart/add"]';

	const addItem = (id, quantity) => {
		return $.ajax({
			url: '/cart/add.js',
			dataType: 'json',
			data: {
				id: id,
				quantity: typeof quantity === 'undefined' ? 1 : quantity
			}
		});
	}

	const handleSubmit = e => {
		e.preventDefault();
		const id = $(form).find('select[name="id"]').val();
		const quantity = $(form).find('input[name="quantity"]').val();
		addItem(id, quantity).done(toggleCart);
	}

	$(document).on('submit', form, handleSubmit);

})();