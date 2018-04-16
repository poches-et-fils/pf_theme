const getRandColor = _ => {
  const colors = ['dad7ff', 'b8ffe1', 'ffcdd3', 'fff7dc', 'cee7e5']
  return `#${colors[Math.floor(Math.random() * colors.length)]}c2`
}

function fillBg () {
  const itemsContainer = $('.random-colored-bg')
  itemsContainer.map((i, item) => $(item).css('background-color', getRandColor()))
}

$(document).ready(fillBg)
