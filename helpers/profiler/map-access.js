'use strict';
//26/05/25
/* global module:readable */
{
	const randInt = (max) => Math.floor(Math.random() * Math.floor(max));

	const accessMap = {
		name: 'accessMap',
		description: 'Map\'s get() method',
		keywords: [
			'map',
			'access',
			'get'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'Map.get()',
		f: (d) => d.get(randInt(d.size - 1)),
		testDataType: 'map'
	};

	const accessObject = {
		name: 'accessObject',
		description: 'access object property',
		keywords: [
			'map',
			'access',
			'object',
			'property'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: '{}.prop',
		f: (d) => d[randInt(d.size - 1)],
		testDataType: 'objectMap'
	};

	const functions = [
		accessMap,
		accessObject
	];

	module.exports = {
		name: 'map:access',
		description: {
			long: 'Object literal vs. Map: retrieving values.',
			short: 'Object literal vs. Map access.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords || [])
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a,b) => a.localeCompare(b)),
		functions,
		waitBetweenRuns: 50,
		defaultOptions: {
			'iterations': 1000,
			'magnitude': 100000
		}
	};
}