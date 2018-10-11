import slug from '@sindresorhus/slugify';

const getDesignCategories = designs => {
	const thisDesign = designs.find(design => design.thisDesign);
	const thisCategory = thisDesign && thisDesign.category;

	const categories = designs.reduce((categories, design) => {
		const categorySlug = slug(design.category);

		if (categories[categorySlug]) {
			categories[categorySlug].designs.push(design);
		} else {
			categories[categorySlug] = {
				title: design.category,
				designs: [design]
			};
		}

		return categories;
	}, {});

	return Object.keys(categories)
		.sort(category => thisCategory && category.toLowerCase() === thisCategory.toLowerCase() ? -1 : 1)
		.map(category => categories[category]);
};

export default getDesignCategories;
 