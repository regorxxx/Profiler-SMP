'use strict';
//26/05/25
/* global module:readable */
{
	const compGreater = {
		name: 'compGreater',
		description: '>, greater than',
		keywords: [
			'comparison',
			'greater',
			'operator'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a > b',
		f: (d) => d > 5
	};

	const compGreaterEqual = {
		name: 'compGreaterEqual',
		description: '>=, greater than or equal to',
		keywords: [
			'comparison',
			'greater',
			'equal',
			'operator'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a >= b',
		f: (d) => d >= 5
	};

	const compLess = {
		name: 'compLess',
		description: '<, less than',
		keywords: [
			'comparison',
			'less',
			'operator'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a < b',
		f: (d) => d < 5
	};

	const compLessEqual = {
		name: 'compLessEqual',
		description: '<=,less than or equal to',
		keywords: [
			'comparison',
			'less',
			'equal',
			'operator'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a <= b',
		f: (d) => d <= 5
	};

	const compEqlLoose = {
		name: 'compEqlLoose',
		description: '==, loose equality',
		keywords: [
			'comparison',
			'equal',
			'loose',
			'equality'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a == b',
		f: (d) => d == 5 // eslint-disable-line eqeqeq
	};

	const compEqlStrict = {
		name: 'compEqlStrict',
		description: '===, strict equality, identity, tripple equals',
		keywords: [
			'comparison',
			'equal',
			'strict',
			'equality',
			'identity',
			'tripple',
			'equals',
			'type'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a === b',
		f: (d) => d === 5
	};

	const compNotEqlLoose = {
		name: 'compNotEqlLoose',
		description: '!=, loose non-equality',
		keywords: [
			'comparison',
			'equal',
			'loose',
			'equality',
			'not',
			'nonequal'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a != b',
		f: (d) => d != 5 // eslint-disable-line eqeqeq
	};

	const compNotEqlStrict = {
		name: 'compNotEqlStrict',
		description: '!==, strict non-equality',
		keywords: [
			'comparison',
			'equal',
			'strict',
			'equality',
			'not',
			'nonequal'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a !== b',
		f: (d) => d !== 5
	};

	const compAnd = {
		name: 'compAnd',
		description: '&&, logical and operator',
		keywords: [
			'comparison',
			'logical',
			'and',
			'boolean',
			'operator'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a && b',
		f: (d) => d && d - 5
	};

	const compOr = {
		name: 'compOr',
		description: '||, logical or operator',
		keywords: [
			'comparison',
			'logical',
			'or',
			'boolean',
			'operator'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a || b',
		f: (d) => d || d - 5
	};

	const functions = [
		compGreater,
		compGreaterEqual,
		compLess,
		compLessEqual,
		compEqlLoose,
		compEqlStrict,
		compNotEqlLoose,
		compNotEqlStrict,
		compAnd,
		compOr
	];

	module.exports = {
		name: 'comparison operators',
		description: {
			long: 'Variable comparison operators.',
			short: 'Comparison operators.'
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