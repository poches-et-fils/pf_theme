(function () {
	const toggleLoading = () => {
		const $button = $('.newsletter--popup input[type="submit"]');
		const loadingText = $button.attr('data-wait');
		const buttonText = $button.val();

		$button.text(loadingText);
		$button.attr('data-wait', buttonText);
	}; 

	const handleSubmit = e => {
		e.preventDefault();
		const $message = $('.newsletter--popup .message');
		const email = $('.newsletter--popup input[name="EMAIL"]').val();
		const mailchimpUrl = 'https://pochesetfils.us11.list-manage.com/subscribe/post-json?u=079201818dbf290a767b95ffb&id=4abed72bd7';
		const body = `&EMAIL=${email}&b_4753c07213be229168b88045d_0bdd4738d0=`;

		toggleLoading();

		$.ajax(`${mailchimpUrl}${body}`, {
			type: 'GET',
			dataType: 'jsonp',
			jsonp: 'c'
		}).always(res => {
			toggleLoading();
			const message = res.msg.replace('0 -', '');

			if (res.result === 'error') {
				return $message.html(message).show();
			}

			$('.newsletter--popup .form--block--widen').hide();
			$message.html(message).show();
			setTimeout(() => toggleBanner('close'), 3000);
		});
	}

	const checkLastTimeSeen = _ => {
		const sevenDaysAgo = new Date(Date.now()-(1000 * 60 * 60 * 24 * 7)).getTime()
		const lastTimeSeen = localStorage.getItem('lastTimeSeen')
		
		if (sevenDaysAgo > lastTimeSeen || !lastTimeSeen ) {
			toggleBanner('open')
		} else {
			toggleBanner('close')
		}
	}
	
	const toggleBanner = shouldDisplay => {
		const overlay = $('.dark-overlay, .page--popup--section');

		if (shouldDisplay === 'open') {
			toggleBanner('close')
			setTimeout(() => {
				overlay.css({'display': 'flex', 'opacity': 1});
			}, 10000);
		} else {
			overlay.css({'display': 'none', 'opacity': 0})
		}
	}
	
	const hideBanner = _ => {
		toggleBanner('close')
		localStorage.setItem('lastTimeSeen', new Date().getTime())
	}

	$(document).on('click', '.close--popup, input#Subscribe, .dark-overlay', hideBanner)
	$(document).on('submit', '#newsletter-popup-form', handleSubmit)
	$(document).ready(checkLastTimeSeen)

	$(document).on('click', '.page--popup--section', function(e) {
		if (e.target !== this) {
			return;
		}

		hideBanner();
	});
})();