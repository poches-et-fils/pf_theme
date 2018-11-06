const shortGender = gender => {
	gender = gender ? String(gender).toLowerCase() : '';
	const abbreviations = {
		homme: 'H',
		femme: 'F',
		men: 'M',
		female: 'F'
	};

	return abbreviations[gender] || gender;
};

export default shortGender;
