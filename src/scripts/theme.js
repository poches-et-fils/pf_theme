import 'babel-polyfill';
import '../styles/theme.scss';
import './slate/slate';
import './modules/newsletter';
import './header/header';
import './product/product-listing-colors';
import './product/quickadd-handler';

import ProductSection from './product/product-section';
import collection from './collection/collection';
import FeaturedCollectionSection from './modules/featured-collection';
import SliderSection from './modules/slider';
import toggleHandler from './modules/toggle-list';
import {handleAddItemSubmit} from './modules/add-to-cart';
import faq from './modules/faq';
import giftCardThemes from './modules/gift-card-themes';

$(() => {
	const sections = new slate.Sections();
	sections.register('product', ProductSection);
	sections.register('collection-custom-section', FeaturedCollectionSection);
	sections.register('slider', SliderSection);
	faq();
	collection();
	giftCardThemes();

	$(document).on('submit', 'form[action="/cart/add"]', handleAddItemSubmit);
	$(document).on('click', '.toggle--activation', toggleHandler);
});
