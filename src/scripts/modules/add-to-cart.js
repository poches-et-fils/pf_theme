import {toggleCart} from '../header/popout-cart';

const addItem = (id, quantity) => {
	return $.ajax({
		url: '/cart/add.js',
		dataType: 'json',
		data: {
			id,
			quantity: typeof quantity === 'undefined' ? 1 : quantity
		}
	});
};

const handleAddItemSubmit = e => {
	e.preventDefault();
	const $form = $(e.target);
	const id = $form.find('select[name="id"]').val();
	const quantity = $form.find('input[name="quantity"]').val();
	addItem(id, quantity).done(toggleCart);
};

export {addItem, handleAddItemSubmit};
