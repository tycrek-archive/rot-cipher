// Rotation cipher (letters only)

// Import modules
var prompt = require('prompt'); // Accept user input
var colors = require('colors/safe'); // Fix colors in terminal output

// Remove unnecessary prints
prompt.message = '';

// Fix delimiter color in terminal
prompt.delimiter = colors.reset(':');

// What to accept from user input
const schema = {
	properties: {
		word: {
			description: colors.reset('Enter a word to shift'),
			type: 'string',
			pattern: /[a-zA-Z]/g,
			message: 'Must use letters only (mixed case)',
			required: true
		}
	}
};

// Prompt the user for a word
prompt.start();
prompt.get(schema, (err, result) => {
	if (err) console.error(colors.red(`\n${err}`));
	else cipher(result.word);
});

/**
 * Rotation cipher (shift) letters in a string
 * @param {String} word String of letters to shift
 */
function cipher(word) {
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

/**
 * Returns the shift amount for a letter (upper/lower)
 * @param {Integer} code ASCII code of a letter
 */
function getShift(code) {
	const U_SHIFT = 64;
	const L_SHIFT = 96;
	const U_RANGE = [64, 91];
	const L_RANGE = [96, 123];
	if (code > U_RANGE[0] && code < U_RANGE[1]) {
		return U_SHIFT;
	} else if (code > L_RANGE[0] && code < L_RANGE[1]) {
		return L_SHIFT;
	} else {
		return 0;
	}
}