import algoliasearch from 'algoliasearch';
import config from '../config';
import allDesigns from './all-designs';
import getCategories from './get-categories';

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

const mergeProductsWithSettings = (designProducts, designSettings, product) => {
	return designProducts.map(designProduct => {
		const vendor = designProduct.vendor.toLowerCase();
		const design = designSettings.find(designSetting => {
			return designSetting.name.toLowerCase() === vendor;
		});

		if (!design) {
			// There's no settings defined for the product, remove it.
			return false;
		}

		return {
			...designProduct,
			...design,
			thisDesign: designProduct.vendor === product.vendor
		};
	}).filter(a => a);
};

const onDesignSelected = design => {
	loading(true);
	window.location.href = `/products/${design.handle}`;
};

const updateDesignCategoryText = newCategory => {
	$('.product-design-list-container .selector--heading--left span').text(newCategory);
};

const initDesignCategorySlider = categories => {
	const slider = '.product-designs.glide';

	if (categories.length <= 1) {
		$(slider).find('.glide__arrows').hide();
		return;
	}

	const sliderOptions = {type: 'carousel', perView: 1};
	const glide = new Glide(slider, sliderOptions);

	glide.on(['mount.after'], () => {
		$('.product-designs__design a').click(() => loading(true));
	});

	glide.on(['run.after'], () => {
		const newCategory = $('.product-designs .glide__slide--active').data('category');
		updateDesignCategoryText(newCategory);
	});

	glide.mount();
};

const renderDesigns = async (designSettings, product) => {
	try {
		const {hits: designProducts} = await getDesignProducts(product);
		const designs = mergeProductsWithSettings(designProducts, designSettings, product);
		const designCategories = getCategories(designs);

		$('.product-designs .glide__slides').html(designCategories.map(({title, designs}) => `
			<li class="glide__slide" data-category="${title}">
				${designs.map(design => `
					<div class="product-designs__design ${design.thisDesign ? 'product-designs__design--active' : ''}">
						<a href="/products/${design.handle}">
							<img src="${design.swatch}" width="48" height="48"/>
						</a>
					</div>
				`).join('')}
			</li>
		`).join(''));

		updateDesignCategoryText(designCategories[0].title);
		initDesignCategorySlider(designCategories);
		allDesigns(designs, onDesignSelected);
		loading(false);
	} catch (error) {
		$('.product-design-list-container').hide();
	}
};

const renderDesign = (designs, product) => {
	const design = designs.find(design => design.name === product.vendor.toLowerCase());

	if (!design) {
		loading(false);
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

	$('.featured-collection').on('glide.mounted', () => {
		$('.featured-collection .product-listing__item').off('click', '.product-listing__colors a');
		$('.featured-collection .product-listing__item').on('click', '.product-listing__colors a', handleColorChange);
	});
};

export default productDesigns;
