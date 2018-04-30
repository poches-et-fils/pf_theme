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
  const button			 = $(event.target).closest('.product--quickadd')
  const info 			 = $(event.target).closest('*[data-variant-info]')
  const variant_size 	 = $(event.target).text()
  const variant_id 	   	 = info.attr('data-variant-id')
  const variant_color 	 = info.attr('data-variant-color')
  const variant_quantity = info.attr('data-variant-quantity')
  const clothing_type	 = info.attr('data-variant-clothing')
  const variant_type	 = info.attr('data-variant-type')

  console.log(info)
  
  $.post('/cart/add.js', {
    'id': 		variant_id,
    'quantity': variant_quantity,
    'properties': {
      'size': 	variant_size,
      'color': 	variant_color,
      'product':variant_type,
      'type': 	clothing_type,
    }
  })
  .error(error => console.log("Error:", error))
  .complete(data => {
    if (data.status === 200) {
      button.css('opacity', 0)
      toggleCart()
    }
  })

}

$(document).on('click', '.product--quickadd', e => e.preventDefault())
$(document).on('click', '.product--quickadd--CTA', handleQuickAdd)
$(document).on('click', '*[class^="product--size"]', quickAdd)