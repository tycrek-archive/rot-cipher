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

		// Print our shifted result
		console.log(`${offset}: ${shiftedLetters.join('')}`);
	}
}

/**
 * Shift an ASCII code (letters only) and return a new code
 * @param {Integer} original Original character code
 * @param {Integer} offset Distance to shift for rotation cipher
 */
function shiftCode(original, offset) {
	// Changes depending if letter is uppercase or lowercase
	let shiftSize = getShiftSize(original);

	// Subtract the shiftSize to get a "normal" value between A-Z (1-26)
	// Then add the offset for the cipher
	let newCode = (original - shiftSize) + offset;

	// Cycle from Z back to A if required
	if (newCode > 26) newCode -= 26;

	// Make our "normal" code back into an ASCII code
	newCode += shiftSize;

	return newCode;
}

/**
 * Returns the shift amount for a letter (upper/lower)
 * @param {Integer} code ASCII code of a letter
 */
function getShiftSize(code) {
	const U_SHIFT = 64; // ASCII 'zero' (before 'A')
	const L_SHIFT = 96; // ASCII 'grave' (before 'a')
	const U_RANGE = [64, 91]; // ASCII range for uppercase letters
	const L_RANGE = [96, 123]; // ASCII range for lowercase letters

	if (code > U_RANGE[0] && code < U_RANGE[1]) return U_SHIFT;
	else if (code > L_RANGE[0] && code < L_RANGE[1]) return L_SHIFT;
	else return 0;
}