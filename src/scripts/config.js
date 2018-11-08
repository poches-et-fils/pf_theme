const config = {
	development: {
		algolia: {
			appId: '7M9U4OP0D8',
			apiKey: 'dc5c134cd92b8d6fdaff3232cb7c9e83',
			index: 'poches_dev_products'
		}
	},

	production: {
		algolia: {
			appId: 'H0IUYXLYYP',
			apiKey: '0fa9a8c172edb3c3f5ddedffbd0f8fbb',
			index: 'poches_fr_productsproducts'
		}
	}
};

// Check snippets/global-theme-js for the env variable
export default config[window.theme.env || 'production'];
