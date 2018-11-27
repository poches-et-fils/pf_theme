!(function () {
	const toggleBanner = shouldDisplay => {
		const overlay = $('.dark-overlay, .page--popup--section');

		if (shouldDisplay === 'open') {
			toggleBanner('close');
			setTimeout(() => {
				overlay.css({ display: 'flex', opacity: 1 });
			}, 5000);
		} else {
			overlay.css({ display: 'none', opacity: 0 });
		}
	};

	const toggleLoading = () => {
		const $button = $('.newsletter input[type="submit"]');
		const loadingText = $button.attr('data-wait');
		const buttonText = $button.val();

		$button.text(loadingText);
		$button.attr('data-wait', buttonText);
	};

	const hideBanner = _ => {
		toggleBanner('close');
		localStorage.setItem('lastTimeSeen', new Date().getTime());
	};

	const hideForAYear = _ => {
		toggleBanner('close');
		localStorage.setItem('lastTimeSeen', new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
	};

	const handleSubmit = e => {
		e.preventDefault();
		const $parent = $(e.currentTarget).parents('.newsletter');
		const $message = $parent.find('.message');
		const email = $parent.find('input[name="EMAIL"]').val();
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
				$message.find('.message__error').html(message).show();
				return $message.show();
			}

			$parent.find('.form--block--widen').hide();
			$message.find('.message__error').hide();
			$message.find('.message__success').show();
			$message.show();
			setTimeout(() => hideForAYear(), 4000);
		});
	};

	const checkLastTimeSeen = _ => {
		const sevenDaysAgo = new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)).getTime();;
		const lastTimeSeen = localStorage.getItem('lastTimeSeen');

		if (sevenDaysAgo > lastTimeSeen || !lastTimeSeen) {
			toggleBanner('open');
		} else {
			toggleBanner('close');
		}
	};

	$(document).on('click', '.close--popup, input#Subscribe, .dark-overlay', hideBanner);
	$(document).on('submit', '.newsletter form', handleSubmit);
	$(document).ready(checkLastTimeSeen);

	$(document).on('click', '.page--popup--section', function (e) {
		if (e.target !== this) {
			return;
		}

		hideBanner();
	});
})();
