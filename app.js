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

	// Iterate over the whole length of the alphabet
	for (let offset = 0; offset <= 26; offset++) {
		let shiftedLetters = [];

		// Iterate through each letter in the original word
		for (let i = 0; i < word.length; i++) {
			let originalcode = word.charCodeAt(i);
			let shiftedCode = shiftCode(originalcode, offset);
			let letter = String.fromCharCode(shiftedCode);
			shiftedLetters[i] = letter;
		}
		console.log(`${offset}: ${shiftedLetters.join('')}`);
	}
}

function shiftCode(original, offset) {
	let shift = getShiftSize(original);
	let newCode = (original - shift) + offset;
	if (newCode > 26) newCode -= 26;
	newCode += shift;
	return newCode;
}

/**
 * Returns the shift amount for a letter (upper/lower)
 * @param {Integer} code ASCII code of a letter
 */
function getShiftSize(code) {
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