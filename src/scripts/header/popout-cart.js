const cartHTML = `
<div class="ajax--cart--popout--section closed--cart">
	<div class="ajax--cart--popout" style="width: 100%">
		<a href="#" data-keep-shopping
			style="background-color: #161616; padding: 20px 23px; display: flex; font-weight: 500;"
				class="button wide-text full-caps black w-button text-center">
			← Continue shopping
		</a>
		<div class="ajax--cart--lower">
			<div class="ajax--cart--items"></div>
			<div class="ajax--cart--bottom">
				<h5 class="ajax--cart--free-shipping">Free Shipping</h3>
				<p class="ajax--cart--message">
			Add another
			$<span class="ajax--cart--shippingLeft">100</span>
			to cart to get free shipping.
		</p>
				<a href="#" data-keep-shopping>Continue Shopping</a>
				<div class="ajax--cart--subtotal">
					<h4 class="ajax--cart--title--text">Subtotal</h4>
					<h4 class="ajax--cart--title--text right">
			<strong class="ajax--cart--subtotal--amount"></strong>
			</h4>
				</div>
				<a href="/checkout"
				class="button wide-text full-caps black full-width w-button text-center">
			Checkout
		</a>
			</div>
		</div>
	</div>
</div>

<style>
.ajax--cart--popout--section {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	height: 100vh;
	z-index: 1001;
	justify-content: flex-end;
	align-items: stretch;
	background-image: -webkit-linear-gradient(270deg, rgba(0, 0, 0, .57), rgba(0, 0, 0, .57));
	background-image: linear-gradient(180deg, rgba(0, 0, 0, .57), rgba(0, 0, 0, .57));
	box-shadow: 8px 0px 20px 1px black;
}

.ajax--cart--popout {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	width: 30%;
	height: 100%;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	background-color: #fff;
}

.ajax--cart--link--shop {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	width: 100%;
	height: 8%;
	padding: 15px;
	align-items: center;
	background-color: #161616;
}

.ajax--cart--link--title {
	margin-top: 0px;
	margin-bottom: 0px;
	color: #fff;
	font-size: 13px;
	font-weight: 400;
	letter-spacing: 1px;
}

.ajax--cart--lower {
	width: 100%;
	height: 86%;
}

.ajax--cart--items {
	height: inherit;
	padding: 8px 0 110px;
	overflow-y: scroll;
}

.ajax--cart--item {
	display: flex;
	height: 125px;
	margin-bottom: 40px;
}

.ajax--cart--item--image {
	width: 40%;
	text-align: center;
}
.ajax--cart--item--image img {
	max-width: 100%;
	max-height: 100%;
}

.ajax--cart--item--details {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	width: 80%;
	padding-left: 5%;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	-ms-flex-pack: justify;
	justify-content: space-between;
}

.ajax--cart--item--text.bold--text {
	font-weight: 700;
}

.ajax--cart--item--block {
	margin-bottom: 5px;
}

.ajax--cart--item--block.padding {
	margin-bottom: 30px;
}

.ajax--cart--item--block.flexed {
	display: flex;
	align-items: flex-end;
}

.ajax--cart--qty { width: 50%; }

.ajax--cart--price--block {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	width: 50%;
	height: 20px;
	-webkit-box-pack: end;
	-webkit-justify-content: flex-end;
	-ms-flex-pack: end;
	justify-content: flex-end;
}

.ajax--cart--bottom {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 20px;
	background-color: #ddd;
}

.ajax--cart--free-shipping {
	margin: 10px 0; 
	font-size: 18px;
	line-height: 1em;
	font-weight: 500;
}

.ajax--cart--message {
	margin-bottom: 0em;
	font-size: 14px;
}

.ajax--cart--subtotal {
	display: flex;
	padding: 0 0 5px 0;
}

.ajax--cart--title--text {
	width: 50%;
	margin-top: 20px;
	margin-bottom: 0px;
	font-weight: 400;
}

.ajax--cart--title--text.right {
	text-align: right;
}

@media screen and (max-width: 900px) {
	.ajax--cart--popout--section { width: 100%; }

	.ajax--cart--item--image { width: 20%; }
}

@media screen and (min-width: 901px) {
	.ajax--cart--popout--section { width: 33%; }
}

.ajax--cart--popout--section {
	position: fixed;
	top: 0;
	left: 100%;
	height: 100%;
}

.ajax--cart--popout--section.open--cart {
	transform: translateX(-100%); 
	transition: 0.6s;
}
.ajax--cart--popout--section.closed--cart {
	transform: translateX(0); 
	transition: 0.6s;
}

.ajax--cart--item--quantity {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border: 2px solid lightgray;
	border-radius: 50%;
	background: transparent;
	cursor: pointer;
	color: gray;
	height: 18px;
	width: 18px;
	text-align: center;
	line-height: 1px;
	user-select: none;
}

.ajax--cart--item--curQuantity { display: inline-block; }
.ajax--cart--item--quantity.remove {
	float: right;
	font-weight: 200;
	line-height: 1;
}

.ajax--cart--item--image {
	background-size: contain;
	position: relative;
	background-repeat: no-repeat;
	background-position: center;
	background-color: #f9f9f9;
}

*[disabled] { cursor: not-allowed; }
</style>`;

const toggleCart = _ => {
	const cartSelector = $('.ajax--cart--popout--section');
	const cartIsAppended = cartSelector.length > 0;

	if (!cartIsAppended) {
		$('#CartHolder').append(cartHTML);
	}

	setTimeout(_ => {
		refreshCart();
		toggleWidth();
	}, 200);
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
	darkOverlay.css({display: 'none', opacity: 0});
};

const refreshCounter = QTY => {
	const itemNumberLabel = $('.cart--items--block');

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
		data.items.map(item => {
			const title = item.product_title;
			let subtitle = '&nbsp;';
			let size = item.variant_title;
			if (item.product_type === 'Pocket') {
				subtitle = item.variant_title;
				size = item.properties.size;
			}

			return itemsInCart.append(`
		<div class="ajax--cart--item item-start" 
				data-variant-id="${item.variant_id}"
				data-product-type=${item.product_type}>
		<div class="ajax--cart--item--image">
			<img src='${item.image}' alt="${item.title}" title="${item.title}" />
		</a>
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
				<div class="ajax--cart--item--text">Size: ${size}</div>
				</div>
				<div class="ajax--cart--item--block flexed">
				<div class="ajax--cart--qty">
					<button class="ajax--cart--item--quantity less" title="Substract 1">-</button>
					<div class="ajax--cart--item--curQuantity">${item.quantity}</div>
					<button class="ajax--cart--item--quantity more" title="Add 1">+</button>
		</div>
				<div class="ajax--cart--price--block">${window.currencySymbol + (item.line_price/100).toFixed(2)}</div>
				</div>
				</div>
				</div>`);
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
		refreshCounter(Number(refreshCounter()) + 1);
	} else if (operation === 'substract') {
		if (newQty > 1) {
			newQty--;
			refreshCounter(Number(refreshCounter()) - 1);
		} else {
			button.prop('disabled', true);
		}
	} else {
		newQty = 0;
		setTimeout(refreshCart, 1000);
	}

	$.post('/cart/update.js', `updates[${itemID}]=${newQty}`)
		.always(response => {
			if (typeof response === 'string') {
				response = JSON.parse(response);
			}

			const linePrice = response.items.find(it => it.id === Number(itemID)).line_price;

			curQty.text(newQty);
			itemPrice.text(window.currencySymbol + (linePrice / 100).toFixed(2));
			refreshPrice(response.total_price);
			freeShipping(response.total_price);
		});
};

const freeShipping = currentAmount => {
	const cartMessage = $('.ajax--cart--message');

	if (100 - currentAmount > 0) {
		cartMessage.text(`Add another ${window.currencySymbol}${100 - currentAmount} to cart to get free shipping.`);
	} else {
		cartMessage.text('Congratulations! You may apply for Free Shipping.');
	}
};

export {toggleCart, updateQty, refreshCart, hideCart};
