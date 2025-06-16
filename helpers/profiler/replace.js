'use strict';
//26/05/25
/* global module:readable */
{
	// Helper
	String.prototype.replaceAll = function replaceAll(word, newWord) { // NOSONAR
		const len = newWord.length;
		let copy = this;
		let prevIdx = copy.indexOf(word);
		let idx = prevIdx;
		while (idx !== -1) {
			copy = copy.replace(word, newWord);
			prevIdx = idx + len;
			idx = copy.indexOf(word, prevIdx);
		}
		return copy;
	};

	const consecutiveReplaceRegExp = {
		name: 'consecutiveReplaceRegExp',
		description: 'String\'s .replace() method using RegExp multiple times',
		keywords: [
			'RegExp',
			'string',
			'method'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'd.replace(..., ...).replace(..., ...)...',
		f: (d) => {
			return d.replace(/:/g, '_')
				.replace(/\\/g, '-')
				.replace(/\//g, '-')
				.replace(/\?/g, '')
				.replace(/</g, '')
				.replace(/>/g, '')
				.replace(/\*/g, '')
				.replace(/"/g, '\'')
				.replace(/\|/g, '-');
		}
	};

	const singleReplaceRegExp = {
		name: 'singleReplaceRegExp',
		description: 'String\'s .replace() method using RegExp',
		keywords: [
			'RegExp',
			'string',
			'method'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'd.replace(..., ...)',
		f: (d) => {
			return d.replace(/:|\\|\/|\|/g, '_')
				.replace(/\?|<|>|\*|"/g, '');
		}
	};

	const consecutiveReplace = {
		name: 'consecutiveReplace',
		description: 'String\'s .replaceAll() method multiple times',
		keywords: [
			'string',
			'method'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'd.replaceAll(..., ...).replaceAll(..., ...)...',
		f: (d) => {
			return d.replaceAll(':', '_')
				.replaceAll('\\', '-')
				.replaceAll('/', '-')
				.replaceAll('?', '')
				.replaceAll('<`', '')
				.replaceAll('>', '')
				.replaceAll('*', '')
				.replaceAll('"', '\'')
				.replaceAll('|', '-');
		}
	};

	const functions = [
		consecutiveReplaceRegExp,
		singleReplaceRegExp,
		consecutiveReplace
	];

	module.exports = {
		name: 'replace',
		description: {
			long: 'String replace variations: Replacing part of strings using different techniques.',
			short: 'String replace variations.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords || [])
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a,b) => a.localeCompare(b)),
		functions,
		testDataType: 'string',
		defaultOptions: {
			'iterations': 1000,
			'magnitude': 10000
		}
	};
}