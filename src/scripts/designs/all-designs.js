import scroll from 'scroll';

const togglePopup = e => {
	if (e) {
		e.preventDefault();
	}

	window.scrollTo(0, 0);
	$('.all-designs').toggleClass('full-page-popup--open');
	$('html, body').toggleClass('no-scroll');
};

const backToTop = e => {
	e.preventDefault();
	scroll.top($('.all-designs')[0], 0);
};

const onCategoryFilter = e => {
	e.preventDefault();
	const $categoryLink = $(e.target);
	const category = $categoryLink.data('category');

	$('.all-designs__categories a').removeClass('active-category');
	$categoryLink.addClass('active-category');

	if (category === 'all') {
		return $('.all-designs__design').addClass('category-active').show();
	}

	$('.all-designs__design').removeClass('category-active');
	$(`.all-designs__design[data-category="${category}"]`).addClass('category-active').show();
	$('.all-designs__design:not(.category-active)').hide();
};

const onDesignSelected = (e, designs, callback) => {
	const designName = $(e.currentTarget).data('design');
	const design = designs.find(design => design.name === designName);
	callback(design);
	togglePopup();
};

const categoryHtml = designs => designs.reduce((categories, {category}) => {
	return categories.indexOf(category) > -1 ? categories : categories.concat(category);
}, []).map((category, index) => `
	${index === 0 ? '<li><a href="#" class="active-category" data-category="all">All</a></li>' : ''}
	<li><a href="#" data-category="${category}">${category}</a></li>
`).join('');

const designsHtml = designs => designs.map(design => `
	<div
		class="all-designs__design"
		data-design='${design.name}'
		data-category="${design.category}"
	>
		<img src="${design.swatch}" width="240" height="240"/>
		<div>${design.title}</div>
	</div>
`).join('');

const allDesigns = (designs, callback) => {
	$('.see-all-designs').addClass('see-all-designs--loaded');
	$('.all-designs__designs').html(designsHtml(designs));
	$('.all-designs__categories').html(categoryHtml(designs));

	$('.all-designs__close, .see-all-designs').off('click').click(togglePopup);
	$('.all-designs__back').off('click').click(backToTop);
	$('.all-designs__categories a').off('click').click(onCategoryFilter);

	$('.all-designs__designs').off('click', '.all-designs__design').on('click', '.all-designs__design', e => {
		onDesignSelected(e, designs, callback);
	});
};

export default allDesigns;
