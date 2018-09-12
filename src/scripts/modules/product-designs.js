!(function() {

	const renderDesign = (designs, product) => {
		const design = designs.find(design => design.name === product.vendor.toLowerCase());

		if (!design) {
			return $('.product-design').addClass('product-design--not-found');
		}

		$('.product-design').html(`
			<div class="product-design__image">
				<img src="${design.image}" alt="${design.title}"/>
			</div>
			<div class="product-design__content">
				<h4 data-product-price>${$('[data-product-price]:first').text()}</h4>
				<h5>${design.tagline}</h5>
				<h6>${design.title}</h6>
			</div>
		`); 
	};

	const renderDesigns = async (designs, product) => {
		const client = algoliasearch('7M9U4OP0D8', 'dc5c134cd92b8d6fdaff3232cb7c9e83');
		const index = client.initIndex('poches_dev_products');
		const gender = product.tags.find(tag => {
			return tag.indexOf('gender:') > -1
		}).replace('gender:', '') || '';

		const results = await index.search({
			query: '',
			hitsPerPage: 1000,
			attributesToRetrieve: ['vendor', 'handle'],
			filters: `product_type:"${product.type}" AND named_tags.gender:"${gender}" AND position = 1`,
		});

		console.log(results);
	};

	$(() => {
		if ($('[data-design-json]').length === 0 || $('[data-product-json]').length === 0) {
			return;
		}

		const designs = JSON.parse($('[data-design-json]').html());
		const product = JSON.parse($('[data-product-json]').html());
		renderDesign(designs, product);
		renderDesigns(designs, product);
	});

})();