!(function() {

	let $relatedProducts;

	const getProducts = () => {
		const vendor = $relatedProducts.data('vendor');
		const handle = $relatedProducts.data('handle');
		const client = algoliasearch('7M9U4OP0D8', 'dc5c134cd92b8d6fdaff3232cb7c9e83');
		const index = client.initIndex('poches_dev_products');

		return index.search({
			query: '',
			hitsPerPage: 1000,
			filters: `NOT handle:"${handle}" AND vendor:"${vendor}"`,
		});
	}

	const productsWithVariants = products => {
		let storedProducts = [];
		let processedHandles = {};

		products.forEach(product => {
			if (processedHandles[product.handle]) {
				return;
			}

			processedHandles[product.handle] = true;
			product.variants = [];

			products.forEach(variant => {
				if (variant.handle !== product.handle) {
					return;
				}

				product.variants.push({
					option1: variant.option1,
					option2: variant.option2,
					id: variant.objectID,
					available: Boolean(variant.inventory_quantity),
					featured_image: {src: variant.image}
				});
			});

			storedProducts.push(product);
		});

		return storedProducts;
	}

	const quickAddOptions = product => product.variants.reduce((options, variant) => {
		if (options.indexOf(variant.option1) > -1) {
			return options;
		}
		return options.concat(variant.option1);
	}, []).map(option => `
		<li>
			<a href="#" class="quick-add__size" data-size="${option}">
				${option}
			</a>
		</li>
	`).join('');

	const colorOptions = product => product.variants.reduce((options, variant) => {
		if (options.indexOf(variant.option2) > -1) {
			return options;
		}
		return options.concat(variant.option2);
	}, []).map(option => `
		<a
			href="#"
			class="color--${option.toLowerCase()} color-swatch"
			style="background-color: ${option.toLowerCase()}"
			data-color="${option}"
		></a>
	`).join('');

	const renderProducts = async () => {
		const {hits: products} = await getProducts();

		if (products.length === 0) {
			$('.related-products-container').hide();
		}

		const productHtml = productsWithVariants(products).map(product => `
			<div class="product-listing__item" data-variants='${JSON.stringify(product.variants)}'>
				<div class="product-listing__image">
					<a href="/products/${product.handle}">
						<img
							src="${slate.Image.getSizedImageUrl(product.product_image, '500x')}"
							width="500px"
							height="500px"
							alt="${product.title}"
						/>
					</a>

					<a href="#" class="quick-add">
						${window.theme.strings.quickAdd.buttonText}
					</a>

					<ul class="quick-add__sizes">
						${quickAddOptions(product)}
					</ul>

					<div class="quick-add__error">
						<span class="quick-add__error--sold-out">${window.theme.strings.quickAdd.soldOut}</span>
						<span class="quick-add__error--unavailable">${window.theme.strings.quickAdd.unavailable}</span>
						<span class="quick-add__error--error">${window.theme.strings.quickAdd.generalError}</span>
					</div>
				</div>
				<div class="product-listing__content">
					<div class="color-option-list product-listing__colors">
						${colorOptions(product)}
					</div>
					<h5>${product.title}</h5>
					<h6>${window.currencySymbol}${product.price}</h6>
					<a href="/products/${product.handle}">
						<div class="product-listing__see-more">See more details</div>
					</a>
				</div>
			</div>
		`).join('');

		$relatedProducts.html(productHtml);
	}

	$(() => {
		$relatedProducts = $('.related-products');

		if ($relatedProducts.length === 0) {
			return;
		}

		renderProducts();
	});

})();