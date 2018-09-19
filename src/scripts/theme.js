import 'babel-polyfill';
import '../styles/theme.scss';
import './slate/slate';
import './modules/newsletter';
import './header/header';
import './product/product-listing-colors';
import './product/quickadd-handler';

import ProductSection from './product/product-section';
import FeaturedCollectionSection from './modules/featured-collection';
import SliderSection from './modules/slider';
import toggleHandler from './modules/toggle-handler';
import {handleAddItemSubmit} from './modules/add-to-cart';

$(() => {
	const sections = new slate.Sections();
	sections.register('product', ProductSection);
	sections.register('collection-custom-section', FeaturedCollectionSection);
	sections.register('slider', SliderSection);

	$(document).on('submit', 'form[action="/cart/add"]', handleAddItemSubmit);
	$(document).on('click', '.toggle--activation', toggleHandler);
});
