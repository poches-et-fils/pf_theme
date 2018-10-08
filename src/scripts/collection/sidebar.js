import getDesignCategories from '../designs/get-categories';
import {toggleItem} from '../modules/toggle-list';

const openActiveToggles = () => setTimeout(() => {
	$('.sidebar-designs__design--active').parents('.toggle--item').find('.toggle--activation').trigger('click');
	$('[data-size-filters] input:checked').parents('.toggle--item').find('.toggle--activation').trigger('click');
	$('[data-color-filters] input:checked').parents('.toggle--item').find('.toggle--activation').trigger('click');
}, 500);

const renderDesignOptions = (designs, activeDesigns) => {
	const $designs = $('[data-design-filters]');

	if (!designs || designs.length === 0) {
		return $designs.parents('.sidebar--block').hide();
	}

	const categories = getDesignCategories(designs);
	const options = categories.map(category => toggleItem({
		title: category.title,
		contents: category.designs.map(design => `
			<div
				class="sidebar-designs__design ${activeDesigns.indexOf(design.name) > -1 ? 'sidebar-designs__design--active' : ''}"
				data-design="${design.name}"
			>
				<img src="${design.swatch}" width="48" height="48"/>
			</div>
		`).join('')
	})).join('');

	$designs.parents('.sidebar--block').show();
	$designs.html(options);
};

const renderColorOptions = (colors, activeColors) => {
	const $colors = $('[data-color-filters]');

	if (!colors) { 
		return $colors.parents('.toggle--item').hide();
	}

	const options = `
		<div class="color-option-list">
			${colors.map((color, index) => `
				<input
					type="checkbox"
					id="SingleOptionSelector-${index}-${color}"
					data-single-option-selector
					value="${color}"
					name="color-option"
					${activeColors.indexOf(color) > -1 ? 'checked="checked"' : ''}
				/>
				<label
					for="SingleOptionSelector-${index}-${color}"
					class="color--${color.toLowerCase()}"
					style="background-color: ${color.toLowerCase()}"
				>
				</label>
			`).join('')}
		</div>
	`;

	$colors.parents('.toggle--item').show();
	$colors.html(options);
};

const renderSizeOptions = (sizes, activeSizes) => {
	const $sizes = $('[data-size-filters]');

	if (!sizes) {
		return $sizes.parents('.toggle--item').hide();
	}

	const options = `
		<div class="size-option-list">
			${sizes.map((size, index) => `
				<input
					type="checkbox"
					id="SingleOptionSelector-${index}-${size}"
					data-single-option-selector
					value="${size}"
					name="size-option"
					${activeSizes.indexOf(size) > -1 ? 'checked="checked"' : ''}
				/>
				<label for="SingleOptionSelector-${index}-${size}">
					${size}
				</label>
			`).join('')}
		</div>
	`;

	$sizes.parents('.toggle--item').show();
	$sizes.html(options);
};

const sidebar = ({designs, colors, sizes, filters}) => {
	renderDesignOptions(designs, filters.designs);
	renderColorOptions(colors, filters.colors);
	renderSizeOptions(sizes, filters.sizes);
	openActiveToggles();
}

export default sidebar;
