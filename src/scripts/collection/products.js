const generateFilterString = (filters, filterString) => {
	filterString = filterString ? filterString : '';

	const facets = {
		designs: 'vendor',
		colors: 'options.color',
		sizes: 'options.size'
	};

	const filterParams = Object.keys(filters).map(filter => {
		const facetName = facets[filter];

		if (filters[filter].length === 0) {
			return false;
		}

		return `(${filters[filter].map(val => `${facetName}:"${val}"`).join(' OR ')})`
	}).filter(v => Boolean(v)).join(' AND ');

	return filterParams ? `${filterString} AND ${filterParams}` : filterString;
};

const getProducts = async ({index, page, collectionTitle, filters, filterString}) => {
	const collection = collectionTitle === 'all' || !collectionTitle ? 'position > -1' : `named_tags.collection:"${collectionTitle}"`;
	filterString = generateFilterString(filters, filterString);
	$('.empty-collection').removeClass('empty-collection--visible');

	const {hits: products, nbPages: maxPages, nbHits: count} = await index.search({
		query: '',
		hitsPerPage: 12,
		page: page ? page : 0,
		filters: `${collection}${filterString}`,
		distinct: 1
	});

	if (count === 0 && maxPages === 0) {
		$('.empty-collection').addClass('empty-collection--visible');
		return [];
	}

	const {hits: variants} = await index.search({
		query: '',
		hitsPerPage: 1000,
		filters: products.map((product, index) => {
			return `handle:${product.handle}${index + 1 === products.length ? '' : ' OR'}`;
		}).join(' ')
	});

	if ($('[data-collection]').length > 0) {
		window.collectionState.set('maxPages', maxPages - 1);
	}

	return products.map(product => {
		product.variants = variants
			.filter(variant => product.handle === variant.handle)
			.sort((variantOne, variantTwo) => variantOne.position - variantTwo.position)
			.map(variant => ({
				option1: variant.option1,
				option2: variant.option2,
				id: variant.objectID,
				available: Boolean(variant.inventory_quantity),
				featured_image: {src: variant.image},
				gender: product.named_tags.gender,
				type: product.named_tags.type
			}));

		return product;
	});
};

const quickAddOptions = product => product.variants.reduce((options, variant) => {
	if (options.indexOf(variant.option1) > -1) {
		return options;
	}
	return options.concat(variant.option1);
}, []).map(option => option ? `
	<li>
		<a href="#" class="quick-add__size" data-size="${option}">
			${option}
		</a>
	</li>
` : '').join('');

const colorOptions = product => product.variants.reduce((options, variant) => {
	if (options.indexOf(variant.option2) > -1) {
		return options;
	}
	return options.concat(variant.option2);
}, []).map(option => option ? `
	<a
		href="#"
		class="color--${option.toLowerCase()} color-swatch"
		style="background-color: ${option.toLowerCase()}"
		data-color="${option}"
	></a>
` : '').join('');

const productHtml = product => `
	<div class="product-listing__item loading" data-variants='${JSON.stringify(product.variants)}'>
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
`;

const products = async state => {
	const results = await getProducts(state);
	return results.map(productHtml).join('');
};

export {getProducts};
export default products;
