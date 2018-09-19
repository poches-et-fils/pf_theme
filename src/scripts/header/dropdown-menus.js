export default (function () {
	const maintainOpen = element => {
		element.mouseleave(_ => element.hide())
	}

	const showDrop = event => {
		const selectedDrop = $(event.target)
		const selectedMenu = selectedDrop.text()
		const dropdowns	 = $('.dropdown-content') || false
		const dropElement	 = $(`.dropdown-content.main.${selectedMenu}`) || false

		$('.w-nav-link').not(selectedDrop).css('opacity', 0.4)

		if (dropElement) {
			dropElement.css('display', 'flex')
			dropdowns.not(dropElement).hide()
			maintainOpen(dropElement)
		}
	}

	const highlightLabels = event => {
		const selectedDrop = $(event.target)
		const menus		 = $('.w-nav-link')

		menus.css('opacity', 1)
	}

	$(document).ready(_ => {
		$('a.w-nav-link').hover(showDrop, highlightLabels)
	})
})();