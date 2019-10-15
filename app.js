var prompt = require('prompt');

var schema = {
	properties: {
		word: {
			description: 'Enter a word to shift'
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
	const U_SHIFT = 64;
	const L_SHIFT = 96;
	const U_RANGE = [64, 91];
	const L_RANGE = [96, 123];
	const ALPHABET = 26;

	for (let offset = 1; offset <= ALPHABET; offset++) {
		let temp = [];
		for (let i = 0; i < word.length; i++) {
			let code = word.charCodeAt(i);

			let upper;
			if (code > U_RANGE[0] && code < U_RANGE[1]) {
				code -= U_SHIFT;
				upper = true;
			}
			if (code > L_RANGE[0] && code < L_RANGE[1]) {
				code -= L_SHIFT;
				upper = false;
			}

			let newCode = code + offset;
			if (newCode > ALPHABET) newCode -= ALPHABET;
			newCode = upper ? newCode += U_SHIFT : newCode += L_SHIFT;

			let newLetter = String.fromCharCode(newCode);

			temp[i] = newLetter;
		}
		console.log(`${offset}: ${temp.join('')}`);
	}
}