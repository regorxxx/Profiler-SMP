'use strict';
//01/11/22
{
	// Helper
	String.prototype.replaceAll = function replaceAll(word, newWord) {
		let copy = this;
		while (copy.indexOf(word) !== -1) {copy = copy.replace(word, newWord);}
		return copy;
	}	
	
	const consecutiveReplaceRegExp = {
		name: 'consecutiveReplaceRegExp',
		description: 'String\'s .replace() method using RegExp multiple times',
		keywords: [
			'RegExp',
			'string',
			'method'
		].sort(),
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
		},
		testDataType: 'string'
	};
	
	const singleReplaceRegExp = {
		name: 'singleReplaceRegExp',
		description: 'String\'s .replace() method using RegExp',
		keywords: [
			'RegExp',
			'string',
			'method'
		].sort(),
		codeSample: 'd.replace(..., ...)',
		f: (d) => {
			return d.replace(/:|\\|\/|\|/g, '_')
				.replace(/\?|<|>|\*|"/g, '')
		},
		testDataType: 'string'
	};
	
	const consecutiveReplace = {
		name: 'consecutiveReplace',
		description: 'String\'s .replaceAll() method multiple times',
		keywords: [
			'string',
			'method'
		].sort(),
		codeSample: 'd.replaceAll(..., ...).replaceAll(..., ...)...',
		f: (d) => {
			return d.replaceAll(':', '_')
				.replaceAll('\\', '-')
				.replaceAll('\/', '-')
				.replaceAll('\?', '')
				.replaceAll('<`', '')
				.replaceAll('>', '')
				.replaceAll('\*', '')
				.replaceAll('"', '\'')
				.replaceAll('\|', '-');
		},
		testDataType: 'string'
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
			functions.map((fn) => fn.keywords)
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
			)].sort(),
		functions,
		defaultOptions: {
			"iterations": 100,
			"magnitude": 10000
		}
	};
}