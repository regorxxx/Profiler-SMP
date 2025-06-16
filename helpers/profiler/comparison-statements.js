'use strict';
//26/05/25
/* global module:readable */
{
	const compIf = {
		name: 'compIf',
		description: 'if statement',
		codeSample: 'if (d > 0) { return d / 2; }',
		keywords: [
			'if',
			'comparison',
			'statement',
			'else',
			'else if',
			'branching',
			'control structure',
			'control flow',
			'flow'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			if (d === 0) {
				return d;
			} else if (d > 0) {
				return d / 2;
			} else {
				return 0;
			}
		}
	};

	const compSwitch = {
		name: 'compSwitch',
		description: 'switch statement',
		codeSample: 'switch (d) { case 0: return d; default: return d / 2; }',
		keywords: [
			'switch',
			'comparison',
			'statement',
			'break',
			'branching',
			'control structure',
			'control flow',
			'flow'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			switch (d) { // NOSONAR
				case 0:
					return d;
				default:
					return d / 2;
			}
		}
	};

	const compTernary = {
		name: 'compTernary',
		description: 'ternary expression',
		keywords: [
			'ternary',
			'expression',
			'comparison',
			'statement',
			'branching',
			'control structure',
			'control flow',
			'flow'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'd > 0 ? d / 2 : d',
		f: (d) => d > 0 ? d / 2 : d
	};

	const compAnd = {
		name: 'compAnd',
		description: 'and-or, && ||',
		keywords: [
			'and',
			'or',
			'comparison',
			'statement',
			'expression',
			'branching',
			'control structure',
			'control flow',
			'flow'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: '(d > 0 && d / 2) || d',
		f: (d) => (d > 0 && d / 2) || d
	};

	const functions = [
		compIf,
		compSwitch,
		compTernary,
		compAnd
	];

	module.exports = {
		name: 'comparison statements',
		description: {
			long: 'Comparison statements: conditionally branching in a function based on simple comparisons.',
			short: 'Comparison statements: if vs. switch vs. ternary vs. logical.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords || [])
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a, b) => a.localeCompare(b)),
		functions,
		testDataType: 'number',
		defaultOptions: {
			'iterations': 1000,
			'magnitude': void(0)
		}
	};
}