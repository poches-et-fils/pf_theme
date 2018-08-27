const handleQuickAdd = event => {
	event.preventDefault()

	const button 				= $(event.target)
	const hiddenQA 			= button.next('.product--quickadd--sizes')
	const hiddenQAContainer 	= hiddenQA.parent()

	if (button.is('[class="product--quickadd--CTA"]')) {
		button.toggle()
		hiddenQA.css({'display': 'flex', 'opacity': 1 })
		hiddenQAContainer.css('opacity', 1)
	}
}

const quickAdd = event => {
	const button = $(event.target).closest('.product--quickadd')
	const info = $(event.target).closest('*[data-quickadd-info]')

	if(typeof info.attr('data-quickadd-variantid') !== 'undefined') {
		$.post('/cart/add.js', {
			'id': info.attr('data-quickadd-variantid'),
			'quantity': 1
		})
		.error(error => console.log("Error:", error))
		.complete(data => {
			if (data.status === 200) {
				button.css('opacity', 0)
				toggleCart()
			}
		})
	} else {
		const option_size = $(event.target).text()
		const product_handle = info.attr('data-product-handle')
		const option_color = info.attr('data-option-color')
		const option_type = info.attr('data-option-type')
		const option_gender = info.attr('data-option-gender')

		$.getJSON('/products/' + product_handle + '.json', function(productData) {
			productData = productData['product']
			var optionMap = {'Gender': '', 'Color': '', 'Type': ''}
			for(var i = 0;i < productData['options'].length; i++) {
				optionMap[productData['options'][i]['name']] = 'option' + productData['options'][i]['position']
			}
			var match = false
			for(var i = 0;i < productData['variants'].length; i++) {
				if(productData['variants'][i][optionMap['Gender']] == option_gender
				&& productData['variants'][i][optionMap['Type']] == option_type
				&& productData['variants'][i][optionMap['Color']] == option_color) {
					match = productData['variants'][i]['id']
					break
				}
			}
			
			if(match) {
				$.post('/cart/add.js', {
					'id': match,
					'quantity': 1,
					'properties': {
						'size': option_size
					}
				})
				.error(error => console.log("Error:", error))
				.complete(data => {
					if (data.status === 200) {
						button.css('opacity', 0)
						toggleCart()
					}
				})
			} else {
				console.log('Error: no match found')
			}
		})
	}
}

$(document).on('click', '.product--quickadd', e => e.preventDefault())
$(document).on('click', '.product--quickadd--CTA', handleQuickAdd)
$(document).on('click', '.product--quickadd--sizes .product--size--selector', quickAdd)
$(document).on('click', '.product-quickadd--no-options', quickAdd)