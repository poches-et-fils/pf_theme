import algoliasearch from 'algoliasearch';
import queryString from 'query-string';
import allDesigns from '../designs/all-designs';
import config from '../config';
import sidebar from './sidebar';
import {updateUrl} from './url';
import products from './products';

const updateBreadcrumbs = (second, third) => {
	const $breadcrumbs = $('.collection--divider--crumbs ul');
	$breadcrumbs.find('li:first').nextAll().remove();

	if (!second || second === $breadcrumbs.find('li:first a').data('collection')) {
		return;
	}

	const [secondHandle, secondTitle] = second.split(':');
	$breadcrumbs.append(`
		<li>
			<a href="/collections/${secondHandle}" data-collection="${secondHandle}:${secondTitle}" class="breadcrumb__link">
				${secondTitle}
			</a>
		</li>
	`);

	if (third) {
		const [thirdHandle, thirdTitle] = third.split(':');
		$breadcrumbs.append(`
			<li>
				<a href="/collections/${thirdHandle}" data-parent-collection="${secondHandle}:${secondTitle}" data-collection="${thirdHandle}:${thirdTitle}" class="breadcrumb__link">
					${thirdTitle}
				</a>
			</li>
		`);
	}
};

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
};

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
		collectionState.set('collectionHandle', value.split(':')[0]);
		collectionState.set('collectionTitle', value.split(':')[1]);
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

const renderSidebar = async ({collectionTitle, index, designs, filters}) => {
	const {facets} = await index.search({
		query: '',
		hitsPerPage: 1,
		facets: ['options.color', 'options.size', 'vendor'],
		filters: collectionTitle === 'all' ? '' : `named_tags.collection:"${collectionTitle}"`
	});

	const filteredDesigns = facets.vendor && Object.keys(facets.vendor).map(designName => {
		return designs.find(design => design.name.toLowerCase() === designName.toLowerCase());
	}).filter(design => Boolean(design));

	sidebar({
		designs: filteredDesigns,
		colors: facets['options.color'] && Object.keys(facets['options.color']),
		sizes: facets['options.size'] && Object.keys(facets['options.size']),
		filters
	});

	allDesigns(filteredDesigns, design => {
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
	let newCollection = '';

	if ($target.is('a')) {
		if ($target.hasClass('breadcrumb__link')) {
			newCollection = $target.data('collection');
			updateBreadcrumbs($target.data('collection'));
		} else {
			$('[data-type-filters] a').removeClass('sidebar-link--active');
			newCollection = $target.data('collection');
			$target.addClass('sidebar-link--active');
			if ($target.data('parent-collection')) {
				updateBreadcrumbs($target.data('parent-collection'), $target.data('collection'));
			} else {
				updateBreadcrumbs($target.data('collection'));
			}
		}
	} else {
		newCollection = $target.val();
		updateBreadcrumbs($target.val());
	}

	filter('type', newCollection);
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
};

const handleFiterClear = e => {
	e.preventDefault();
	filter('reset');
	$('body').removeClass('no-scroll');
	$('.collection--sidebar').removeClass('open');
	renderSidebar(window.collectionState.get());
};

const collection = async () => {
	if ($('[data-collection]').length === 0) {
		return;
	}

	const client = algoliasearch(config.algolia.appId, config.algolia.apiKey);
	const urlParams = queryString.parse(location.search);
	const state = {
		page: 0,
		collectionTitle: $('.collection--sidebar').data('collection'),
		collectionHandle: $('.collection--sidebar').data('collection-handle'),
		index: client.initIndex(config.algolia.index),
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

	$('.collection--divider--crumbs').on('click', '.breadcrumb__link', handleTypeClick);

	$('.collection--sidebar')
		.on('click', '[data-type-filters] a', handleTypeClick)
		.on('click', '.sidebar-designs__design', handleDesignClick)
		.on('change', '[data-color-filters] input', e => filter('colors', e.target.value))
		.on('change', '[data-size-filters] input', e => filter('sizes', e.target.value))
		.on('click', '.collection--sidebar--close, .close-filters', toggleMobileFilters);

	$('.collection--sidebar--mobile')
		.on('change', '[data-type-select-filters]', handleTypeClick)
		.on('click', '.show-mobile-filters', toggleMobileFilters);

	$(document).off('scroll').scroll(() => pager());
	$(document).on('click', '.clear-filters', handleFiterClear);
};

export default () => $(collection);
