const getRandColor = _ => {
    const colors = ['dad7ff', 'b8ffe1', 'ffcdd3', 'fff7dc', 'cee7e5']
    return `#${colors[Math.floor(Math.random() * colors.length)]}c2`
  }
  
  $(document).ready(_ => {
    const itemsContainer = $('.product--grid--item--four')
  
    itemsContainer
    .map((index, item) => {
      $(item)
      .find('.product--grid--item--image')
      .css('background-color', getRandColor())
    })
  })
