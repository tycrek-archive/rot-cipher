var prompt = require('prompt');

var schema = {
	properties: {
		word: {
			description: 'Enter a word to shift',
			type: 'string',
			pattern: /[a-zA-Z]/g,
			message: 'Must use letters only (mixed case)',
			required: true
		}
	}
};

prompt.start();

prompt.get(schema, (err, result) => {
	if (err) console.error(err);
	else {
		let word = result.word;
		shift(word);
	}
});

function shift(word) {
	const ALPHABET = 26;

	for (let offset = 1; offset <= ALPHABET; offset++) {
		let temp = [];
		for (let i = 0; i < word.length; i++) {
			let code = word.charCodeAt(i);
			let shift = getShift(code);
			let newCode = (code - shift) + offset;
			if (newCode > ALPHABET) newCode -= ALPHABET;
			newCode += shift;
			let newLetter = String.fromCharCode(newCode);
			temp[i] = newLetter;
		}
		console.log(`${offset}: ${temp.join('')}`);
	}
}

function getShift(code) {
	const U_SHIFT = 64;
	const L_SHIFT = 96;
	const U_RANGE = [64, 91];
	const L_RANGE = [96, 123];
	if (code > U_RANGE[0] && code < U_RANGE[1]) {
		return U_SHIFT;
	}
	if (code > L_RANGE[0] && code < L_RANGE[1]) {
		return L_SHIFT;
	}
}