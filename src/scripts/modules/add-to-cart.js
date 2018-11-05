import { toggleCart } from '../header/popout-cart';

const addItem = (id, quantity, properties) => {
	properties = properties || {};

	return $.ajax({
		url: '/cart/add.js',
		dataType: 'json',
		data: {
			id,
			quantity: typeof quantity === 'undefined' ? 1 : quantity,
			properties
		}
	});
};

const handleAddItemSubmit = e => {
	e.preventDefault();
	const $form = $(e.target);
	const id = $form.find('select[name="id"]').val();
	const quantity = $form.find('input[name="quantity"]').val();
	const type = $form.find('input[name="type"]').val();

	addItem(id, quantity, type ).done(toggleCart);
};

export { addItem, handleAddItemSubmit };
