const toggleCart = _ => {
	refreshCart();
	toggleWidth();
};

const toggleWidth = _ => {
	const darkOverlay = $('.dark-overlay');
	const cartSelector = $('.ajax--cart--popout--section');
	const currentCartStatus = {
		display: cartSelector.hasClass('closed--cart'),
		opacity: cartSelector.css('opacity')
	};

	if (currentCartStatus.display) {
		cartSelector.removeClass('closed--cart').addClass('open--cart');
	} else {
		cartSelector.removeClass('open--cart').addClass('closed--cart');
	}

	darkOverlay.css({
		display: currentCartStatus.display ? 'block' : 'none',
		opacity: currentCartStatus.opacity > 0 ? 1 : 0
	});
};

const hideCart = _ => {
	const darkOverlay = $('.dark-overlay');
	const cartSelector = $('.ajax--cart--popout--section');
	cartSelector.removeClass('open--cart').addClass('closed--cart');
	darkOverlay.css({ display: 'none', opacity: 0 });
};

const refreshCounter = QTY => {
	const itemNumberLabel = $('.cart--items--block');

	if (typeof QTY === 'undefined') {
		return $.getJSON('/cart.js', data => {
			return itemNumberLabel.text(data.item_count);
		});
	}

	if (QTY) {
		return itemNumberLabel.text(QTY);
	}

	return itemNumberLabel.text();
};

const refreshPrice = amount => {
	const priceLabel = $('.ajax--cart--subtotal--amount');

	if (amount) {
		return priceLabel.empty().text(window.currencySymbol + (amount / 100).toFixed(2));
	}

	return priceLabel.text();
};

const refreshCart = _ => {
	const cartSelector = $('.ajax--cart--popout--section');
	const itemsInCart = cartSelector.find('.ajax--cart--items').empty();

	$.getJSON('/cart.js', data => {
		cartSelector.find('.ajax--cart--items').empty();
		data.items.map(item => {
			const title = item.product_title;
			let subtitle = '&nbsp;';
			let size = item.variant_title;
			if (item.product_type === 'Pocket') {
				subtitle = item.variant_title;
				size = item.properties.size;
			}

			return itemsInCart.append(`
				<div class="ajax--cart--item item-start" data-variant-id="${item.variant_id}" data-product-type=${item.product_type}>
					<div class="ajax--cart--item--image">
						<img src='${item.image}' alt="${item.title}" title="${item.title}" />
					</div>
					<div class="ajax--cart--item--details">
						<div class="ajax--cart--item--block padding">
							<div class="ajax--cart--item--text bold--text">
								${title}
								<span class="ajax--cart--item--quantity remove" title="Remove">x</span>
							</div>
							<div class="ajax--cart--item--text">${subtitle}</div>
						</div>
						<div class="ajax--cart--item--block padding">
							<div class="ajax--cart--item--text">${size}</div>
						</div>
						<div class="ajax--cart--item--block flexed">
							<div class="ajax--cart--qty">
								<button class="ajax--cart--item--quantity less" title="Substract 1">-</button>
								<div class="ajax--cart--item--curQuantity">${item.quantity}</div>
								<button class="ajax--cart--item--quantity more" title="Add 1">+</button>
							</div>
							<div class="ajax--cart--price--block">
								${window.currencySymbol + (item.line_price / 100).toFixed(2)}
							</div>
						</div>
					</div>
				</div>
			`);
		});

		freeShipping(data.total_price);
		refreshCounter(data.item_count);
		refreshPrice(data.total_price);
	});
};

const updateQty = event => {
	const button = $(event.target);
	const item = button.closest('.item-start');
	const itemID = item.attr('data-variant-id');
	const itemPrice = item.find('.ajax--cart--price--block');
	const curQty = $(button.siblings('.ajax--cart--item--curQuantity'));
	let newQty = curQty.text();
	const operation = button.hasClass('more') ? 'add' : button.hasClass('less') ? 'substract' : 'delete';

	if (operation === 'add') {
		newQty++;
		button.removeProp('disabled');
	} else if (operation === 'substract') {
		if (newQty > 1) {
			newQty--;
		} else {
			button.prop('disabled', true);
		}
	} else {
		newQty = 0;
		item.remove();
	}

	$.post('/cart/update.js', `updates[${itemID}]=${newQty}`)
		.always(response => {
			if (typeof response === 'string') {
				response = JSON.parse(response);
			}

			const item = response.items.find(it => it.id === Number(itemID));

			if (item) {
				itemPrice.text(window.currencySymbol + (item.line_price / 100).toFixed(2));
			}

			curQty.text(newQty);
			refreshCounter();
			refreshPrice(response.total_price);
			freeShipping(response.total_price);
		});
};

const freeShipping = currentAmount => {
	const cartMessage = $('.ajax--cart--message');
	const remaining = 10000 - currentAmount;

	if (remaining > 0) {
		cartMessage.text(`Continue de même, il te manque ${window.currencySymbol}${(remaining / 100).toFixed(2)} pour avoir la livraison gratuite.`);
	} else {
		cartMessage.text('Good job! Tu as la livraison gratuite.');
	}
};

export { toggleCart, updateQty, refreshCart, hideCart };
