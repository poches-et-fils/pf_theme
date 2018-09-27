import * as JsSearch from 'js-search';
import queryString from 'query-string';

const updateTitle = title => {
	$('.faq__questions h2').text(title);
};

const updateCategoryLink = category => {
	$('.faq__sidebar a').removeClass('active');

	if (!category) {
		return;
	}

	$(`.faq__sidebar a[data-category="${category}"]`).addClass('active');
};

const updateQuestions = questions => {
	const $toggleSection = $('.faq__questions .toggles--section');
	const questionHtml = questions.map(({question, answer}) => `
		<div class="toggle--item">
			<div class="toggle--activation" data-ix="toggle-interaction">
				<h4 class="toggle--heading">${question}</h4>
				<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" viewBox="0 0 20 20"><path fill="#444" d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z"/></svg>
				<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" viewBox="0 0 20 20"><path fill="#444" d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z"/></svg>
			</div>
			<div class="toggle--contents">
				${$('<div/>').html(answer).text()}
			</div>
		</div>
	`).join('');

	$toggleSection.html(questionHtml);
};

const questions = questionJson => {
	const questionSearch = new JsSearch.Search('id');
	questionSearch.addIndex('question');
	questionSearch.addDocuments(questionJson);

	const category = categorySlug => {
		const categoryQuestions = questionJson.filter(q => q.categorySlug === categorySlug);
		updateQuestions(categoryQuestions);
		updateCategoryLink(categorySlug);
		updateTitle(categoryQuestions[0].category);
	};

	const search = query => {
		const searchedQuestions = questionSearch.search(query);
		updateQuestions(searchedQuestions);
		updateCategoryLink();
		updateTitle(`Search: ${query}`);
	};

	return {category, search};
};

const faq = () => $(() => {
	if ($('[data-questions-json]').length === 0) {
		return;
	}

	const question = questions(JSON.parse($('[data-questions-json]').html()));
	const urlQuery = queryString.parse(location.search).q;

	if (urlQuery) {
		question.search(urlQuery);
	}

	$('.faq__sidebar a').click(e => {
		e.preventDefault();
		const category = $(e.currentTarget).data('category');
		question.category(category);
	});

	$('.faq__search-form').submit(e => {
		e.preventDefault();
		const query = $('.faq__search').val();
		question.search(query);
	});
});

export default faq;
