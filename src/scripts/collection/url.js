const updateUrl = ({collectionHandle, filters}) => {
	const path = collectionHandle ? `/collections/${collectionHandle}` : '/collections/all';
	const filterParams = Object.keys(filters).map(filter => {
		return `${filter}=${filters[filter].map(val => encodeURIComponent(val)).join(',')}`;
	}).join('&');

	const newUrl = `${path}?${filterParams}`;

	if (window.location.pathname + window.location.search === newUrl) {
		return;
	}

	history.pushState(null, null, newUrl);
};

export {updateUrl};
