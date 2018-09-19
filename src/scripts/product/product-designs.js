import algoliasearch from 'algoliasearch';
import config from '../config';

const loading = isLoading => {
	const $container = $('.product-designs-container');
	const loaded = 'product-designs--loaded';
	return isLoading ? $container.removeClass(loaded) : $container.addClass(loaded);
};

const getProductGender = product => product.tags.find(tag => {
	return tag.indexOf('gender:') > -1;
}).replace('gender:', '') || '';

const getDesignProducts = product => {
	const client = algoliasearch(config.algolia.appId, config.algolia.apiKey);
	const index = client.initIndex('poches_dev_products');
	const gender = getProductGender(product);

	return index.search({
		query: '',
		hitsPerPage: 1000,
		attributesToRetrieve: ['vendor', 'handle'],
		filters: `product_type:"${product.type}" AND named_tags.gender:"${gender}" AND position = 1`
	});
};

const renderDesigns = async (designs, product) => {
	const {hits: designProducts} = await getDesignProducts(product);

	if (!designProducts) {
		return;
	}

	const designsHtml = designProducts.map(designProduct => {
		const vendor = designProduct.vendor.toLowerCase();
		const design = designs.find(design => design.name.toLowerCase() === vendor);
		const thisDesign = designProduct.vendor === product.vendor;

		return design ? `
			<div class="product-designs__design ${thisDesign ? 'product-designs__design--active' : ''}">
				<a href="/products/${designProduct.handle}">
					<img src="${design.swatch}" width="48" height="48"/>
				</a>
			</div>
		` : '';
	}).join('');

	$('.product-designs').html(designsHtml);
	loading(false);
};

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

	loading(false);
};

const productDesigns = (designs, product) => {
	renderDesign(designs, product);
	renderDesigns(designs, product);
	$('.product-designs').on('click', '.product-designs__design', () => loading(true));
};

export default productDesigns;
