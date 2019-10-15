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
	let letters = word.split('');

	let shifts = [];

	for (let offset = 1; offset <= 26; offset++) {
		let temp = [];
		for (let i = 0; i < letters.length; i++) {
			let code = word.charCodeAt(i);

			// Check uppercase
			let upper;
			if (code > 64 && code < 91) {
				code -= 64;
				upper = true;
			}
			if (code > 96 && code < 123) {
				code -= 96;
				upper = false;
			}

			let newCode = code + offset;
			if (newCode > 26) newCode -= 26;
			newCode = upper ? newCode += 64 : newCode += 96;

			let newLetter = String.fromCharCode(newCode);

			temp[i] = newLetter;
		}
		console.log(`${offset}: ${temp.join('')}`);
	}
}