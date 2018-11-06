const locales = {
	fr: {
		CA: {
			redirect: 'https://pochesetfils.com',
			showFor: ['pochesetfilsfrance.myshopify.com', 'pochesetfils.com', 'poches-development-mica.myshopify.com']
		}
	},
	en: {
		CA: {
			redirect: 'https://www.pnfgoods.com',
			showFor: ['www.pnfgoods.com', 'en.pochesetfils.com']
		}
	}
};

$(() => {
	for (const language in locales) {
		for (const country in locales[language]) {
			let selected = '';
			if (locales[language][country].showFor.indexOf(window.location.host) > -1) {
				selected = ' selected="selected"';
			}
			$('.country-switcher-dropdown').append(`
				<option value="${locales[language][country].redirect}" ${selected}>
					${language.toUpperCase()}-${country.toUpperCase()}
				</option>
			`);
		}
	}

	$('.country-switcher-dropdown').change(e => {
		window.location.href = e.target.value;
	});
});
