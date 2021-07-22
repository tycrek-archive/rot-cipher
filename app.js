// Rotation cipher (letters only)

// Import modules
const prompt = require('prompt');
const colors = require('colors/safe');

// Remove unnecessary prints
prompt.message = '';

// Fix delimiter color in terminal
prompt.delimiter = colors.cyan(':');

// What to accept from user input
const schema = {
	properties: {
		word: {
			description: colors.cyan('Enter a word to shift').concat(colors.reset('')),
			type: 'string',
			pattern: /[a-z]/gi,
			message: 'Must use letters only (mixed case)',
			required: true
		}
	}
};

// Prompt the user for a word
prompt.start();
prompt.get(schema, (err, result) => (err) ? console.error(colors.red(`\n${err}`)) : cipher(result.word));

/**
 * Rotation cipher (shift) letters in a string
 * @param {string} word String of letters to shift
 */
function cipher(word) {

	// Iterate over the whole length of the alphabet
	for (let offset = 0; offset <= 26; offset++) {
		const shiftedLetters = [];

		// Iterate through each letter in the original word
		for (let i = 0; i < word.length; i++)
			shiftedLetters.push(String.fromCharCode(shiftCode(word.charCodeAt(i), offset)));

		// Print our shifted result
		//console.log(`${offset}: ${shiftedLetters.join('')}`);
		console.log(colors.grey(`${offset < 10 ? ' ' : ''}${offset}: `).concat(colors[offset % 26 === 0 ? 'green' : 'cyan'](shiftedLetters.join(''))));
	}
}

/**
 * Shift an ASCII code (letters only) and return a new code
 * @param {number} original Original character code
 * @param {number} offset Distance to shift for rotation cipher
 */
function shiftCode(original, offset) {
	// Changes depending if letter is uppercase or lowercase
	const shiftSize = getShiftSize(original);

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
 * @param {number} code ASCII code of a letter
 */
function getShiftSize(code) {
	const U_SHIFT = 64; // ASCII 'zero' (before 'A')
	const L_SHIFT = 96; // ASCII 'grave' (before 'a')
	const U_RANGE = [64, 91]; // ASCII range for uppercase letters
	const L_RANGE = [96, 123]; // ASCII range for lowercase letters

	return (code > U_RANGE[0] && code < U_RANGE[1]) ? U_SHIFT
		: (code > L_RANGE[0] && code < L_RANGE[1]) ? L_SHIFT
			: 0;
}
