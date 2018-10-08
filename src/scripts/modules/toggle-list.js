const toggleHandler = event => {
	const $container = $(event.target).parents('.toggle--item');
	$container.toggleClass('toggle--item--open');
	$container.find('.toggle--contents').toggle('fast');
};

const toggleItem = ({title, contents}) => `
	<div class="toggle--item">
		<div class="toggle--activation" data-ix="toggle-interaction">
			<h4 class="toggle--heading">${title}</h4>
			<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" viewBox="0 0 20 20"><path fill="#444" d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z"/></svg>
			<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" viewBox="0 0 20 20"><path fill="#444" d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z"/></svg>
		</div>
		<div class="toggle--contents">
			<div>
				${contents}
			</div>
		</div>
	</div>
`;

export {toggleItem};
export default toggleHandler;
