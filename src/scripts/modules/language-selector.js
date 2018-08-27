var locales = {
	'en': {
		'CA': 'poches-development-mica.myshopify.com'
	},
	'fr': {
		'EU': 'pochesetfilsfrance.myshopify.com'
	}
};

$(function () {
	for (language in locales) {
		for(country in locales[language]) {
			var selected = '';
			if(locales[language][country] == window.location.host) {
				selected = ' selected="selected"';
			}
			$('.country-switcher-dropdown').append('<option value="' + language + '-' + country + '"' + selected + '>' + language.toUpperCase() + '-' + country + '</option>');
		}
	}

	$('.country-switcher-dropdown').change(function () {
		var countrySwitch = $(this).val().split('-');
		window.location.host = locales[countrySwitch[0]][countrySwitch[1]];
	});

	var euCountryCodes = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "UK", "GR", "GF", "GP", "MQ", "ME", "YT", "RE", "MF", "GI", "AX", "PM", "GL", "BL", "SX", "AW", "CW", "WF", "PF", "NC", "TF", "AI", "BM", "IO", "VG", "KY", "FK", "MS", "PN", "SH", "GS", "TC", "AD", "LI", "MC", "SM", "VA", "JE", "GG", "GI"];
	var language = (window.navigator.userLanguage || window.navigator.language).split('-')[0];
	
	if(locales[language]) {
		$.getJSON('http://ip-api.com/json?callback=?', function (ipData) {
			var countryCode = ipData['countryCode'];
			if($.inArray(countryCode, euCountryCodes)) {
				countryCode = 'EU';
			}
			if(window.location.host != locales[language][countryCode]) {
				window.location.host = locales[language][countryCode];
			}
		});
	}
});