import algoliasearch from 'algoliasearch';
import config from '../config';
import products from '../collection/products';

const relatedProducts = async () => {
	const $relatedProducts = $('.related-products');
	const vendor = $relatedProducts.data('vendor');
	const handle = $relatedProducts.data('handle');
	const client = algoliasearch(config.algolia.appId, config.algolia.apiKey);
	const index = client.initIndex(config.algolia.index);
	const filterString = ` AND NOT handle:"${handle}" AND vendor:"${vendor}"`;
	const productHtml = await products({index, filters: {}, filterString});

	if (!productHtml || !vendor || vendor === 'Poches & Fils') {
		return $('.related-products-container').hide();
	}

	$relatedProducts.html(productHtml);
	$relatedProducts.find('.product-listing__item').removeClass('loading');
};

export default relatedProducts;
