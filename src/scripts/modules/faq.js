import * as JsSearch from 'js-search';
import queryString from 'query-string';
import {toggleItem} from './toggle-list';

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
	const questionHtml = questions.map(({question, answer}) => toggleItem({
		title: question,
		contents: $('<div/>').html(answer).text()
	})).join('');

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

	$('.faq__sidebar ul a').click(e => {
		e.preventDefault();
		const category = $(e.currentTarget).data('category');
		question.category(category);
	});

	$('.faq__search-form').submit(e => {
		e.preventDefault();
		const query = $('.faq__search').val();
		question.search(query);
	});

	$('.live-chat-button').click(e => {
		e.preventDefault();
		$('.facebook-message-us-button > img').trigger('click');
	});
});

export default faq;
