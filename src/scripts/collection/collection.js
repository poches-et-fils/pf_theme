import algoliasearch from 'algoliasearch';
import queryString from 'query-string';
import allDesigns from '../designs/all-designs';
import config from '../config';
import sidebar from './sidebar';
import {updateUrl} from './url';
import products from './products';

const collectionState = initialState => {
	const state = initialState;

	return {
		set: (property, value) => {
			state[property] = value;
			return state;
		},
		get: () => state
	};
};

const renderProducts = async state => {
	const $collection = $('.product-listing--collection');
	const html = await products(state);

	if (state.page === 0) {
		$collection.fadeOut(300, () => {
			$collection.html(html);
			$collection.fadeIn(300);
			$collection.removeClass('loading');
			$collection.find('.product-listing__item').removeClass('loading');
		});
	} else {
		$collection.append(html);
		$collection.removeClass('loading');
		$collection.find('.product-listing__item').removeClass('loading');
	}
}

const pager = () => {
	const collectionState = window.collectionState;
	const prevState = collectionState.get();
	const footerHeight = $('.footer').height() / 3;
	const pageHeight = $(document).height();
	const scrollIntent = 150;
	const scrollTop = $(window).scrollTop();

	if (prevState.page >= prevState.maxPages) {
		return;
	}

	if (
		scrollTop + $(window).height() > pageHeight - footerHeight - scrollIntent &&
		$('.product-listing--collection.loading').length === 0
	) {
		$('.product-listing--collection').addClass('loading');
		renderProducts(collectionState.set('page', prevState.page + 1));
	}
};

const filter = (type, value) => {
	const collectionState = window.collectionState;
	const prevState = collectionState.get();

	if (type === 'type' || type === 'reset') {
		prevState.filters = {designs: [], sizes: [], colors: []};
	}

	if (type === 'type') {
		collectionState.set('handle', value);
	}

	if (type === 'designs' || type === 'colors' || type === 'sizes') {
		if (prevState.filters[type].indexOf(value) > -1) {
			prevState.filters[type] = prevState.filters[type].filter(v => v !== value);
		} else {
			prevState.filters[type].push(value);
		}
	}

	collectionState.set('filters', prevState.filters);
	const state = collectionState.set('page', 0);
	updateUrl(state);
	return renderProducts(state);
};

const renderSidebar = async ({handle, index, designs, filters}) => {
	const {facets} = await index.search({
		query: '',
		hitsPerPage: 1,
		facets: ['options.color', 'options.size', 'vendor'],
		filters: handle === 'all' ? '' : `collections:${handle}`
	});

	const filteredDesgins = facets.vendor && Object.keys(facets.vendor).map(designName => {
		return designs.find(design => design.name.toLowerCase() === designName.toLowerCase());
	}).filter(design => Boolean(design));

	sidebar({
		designs: filteredDesgins,
		colors: facets['options.color'] && Object.keys(facets['options.color']),
		sizes: facets['options.size'] && Object.keys(facets['options.size']),
		filters
	});

	allDesigns(filteredDesgins, design => {
		const $designOption = $(`[data-design="${design.name}"]`);
		$designOption.addClass('sidebar-designs__design--active');

		if (!$designOption.parents('.toggle--item').hasClass('toggle--item--open')) {
			$designOption.parents('.toggle--item').find('.toggle--activation').trigger('click');
		}

		filter('designs', design.name);
	});
};

const handleTypeClick = e => {
	e.preventDefault();
	const $target = $(e.currentTarget);
	let handle = '';
	
	if ($target.is('a')) {
		$('[data-type-filters] a').removeClass('sidebar-link--active')
		handle = $target.data('collection-handle');
		$target.addClass('sidebar-link--active');
	} else {
		handle = $target.val();
	}

	filter('type', handle);
	renderSidebar(window.collectionState.get());
};

const handleDesignClick = e => {
	e.preventDefault();
	const $design = $(e.currentTarget);
	const designName = $design.data('design');
	$design.toggleClass('sidebar-designs__design--active');
	filter('designs', designName);
};

const toggleMobileFilters = e => {
	e.preventDefault();
	window.scrollTo(0, 0);
	$('html, body').toggleClass('no-scroll');
	$('.collection--sidebar').toggleClass('open');
}

const handleFiterClear = e => {
	e.preventDefault();
	filter('reset');
	$('body').removeClass('no-scroll');
	$('.collection--sidebar').removeClass('open');
	renderSidebar(window.collectionState.get());
}

const collection = async () => {
	if ($('[data-collection]').length === 0) {
		return;
	}

	const client = algoliasearch(config.algolia.appId, config.algolia.apiKey);
	const urlParams = queryString.parse(location.search);
	const state = {
		page: 0,
		handle: $('.collection--sidebar').data('collection'),
		index: client.initIndex('poches_dev_products'),
		designs: JSON.parse($('[data-design-json]').html()),
		filterString: '',
		filters: {
			designs: urlParams.designs ? urlParams.designs.split(',') : [], 
			sizes: urlParams.sizes ? urlParams.sizes.split(',') : [], 
			colors: urlParams.colors ? urlParams.colors.split(',') : []
		}
	};

	window.collectionState = collectionState(state);
	renderSidebar(window.collectionState.get());

	if (state.filters.designs.length > 0 || state.filters.sizes.length > 0 || state.filters.colors.length > 0) {
		filter('reload');
	} 

	$('.collection--sidebar')
		.on('click', '[data-type-filters] a', handleTypeClick)
		.on('click', '.sidebar-designs__design', handleDesignClick)
		.on('change', '[data-color-filters] input', e => filter('colors', e.target.value))
		.on('change', '[data-size-filters] input', e => filter('sizes', e.target.value))
		.on('click', '.collection--sidebar--close, .close-filters', toggleMobileFilters)
		.on('click', '.clear-filters', handleFiterClear);

	$('.collection--sidebar--mobile')
		.on('change', '[data-type-select-filters]', handleTypeClick)
		.on('click', '.show-mobile-filters', toggleMobileFilters);

	$(document).off('scroll').scroll(() => pager());
};

export default () => $(collection);
