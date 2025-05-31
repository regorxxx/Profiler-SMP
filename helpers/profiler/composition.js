'use strict';
//26/05/25
/* global module:readable */
/* eslint-disable no-unused-vars */
{
	const destructureObject = {
		name: 'destructureObject',
		description: 'Destructuring an Object',
		codeSample: 'const { a, b } = obj',
		keywords: [
			'assignment',
			'object',
			'destructuring',
			'decomposition',
			'composition'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			const { num, obj } = d; // NOSONAR
		},
		testDataType: 'object'
	};

	const destructureObjectDefault = {
		name: 'destructureObjectDefault',
		description: 'Destructuring an Object with default values',
		codeSample: 'const { a = i } = obj',
		keywords: [
			'assignment',
			'object',
			'destructuring',
			'decomposition',
			'composition',
			'default',
			'values'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			const { num = 5, foo = 'bar' } = d; // NOSONAR
		},
		testDataType: 'object'
	};

	const destructureArray = {
		name: 'destructureArray',
		description: 'Destructuring an Array',
		codeSample: 'const [a,b] = arr',
		keywords: [
			'assignment',
			'array',
			'destructuring',
			'decomposition',
			'composition'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			const [a, b] = d; // NOSONAR
		},
		testDataType: 'array'
	};

	const destructureArrayDefault = {
		name: 'destructureArrayDefault',
		description: 'Destructuring an Array with default values',
		codeSample: 'const [a = i, b] = arr',
		keywords: [
			'assignment',
			'array',
			'destructuring',
			'decomposition',
			'composition',
			'default',
			'values'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			const [a = 5, b] = d; // NOSONAR
		},
		testDataType: 'array'
	};

	const destructureArrayTail = {
		name: 'destructureArrayTail',
		description: 'Destructuring an Array with tail',
		codeSample: 'const [a,b, ...tail] = arr',
		keywords: [
			'assignment',
			'array',
			'destructuring',
			'decomposition',
			'composition',
			'rest',
			'tail'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			const [a, b, ...tail] = d; // NOSONAR
		},
		testDataType: 'array'
	};

	const assignArray = {
		name: 'assignArray',
		description: 'Assignment from array items',
		codeSample: 'const a = arr[i]',
		keywords: [
			'array',
			'assignment',
			'decomposition',
			'composition'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			const a = d[0]; // NOSONAR
			const b = d[1]; // NOSONAR
		},
		testDataType: 'array'
	};

	const assignArrayDefault = {
		name: 'assignArrayDefault',
		description: 'Assignment from array items with default',
		codeSample: 'const a = arr[i] || j',
		keywords: [
			'array',
			'assignment',
			'decomposition',
			'composition',
			'default',
			'values'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			const a = d[0] || 5; // NOSONAR
			const b = d[1]; // NOSONAR
		},
		testDataType: 'array'
	};

	const assignObject = {
		name: 'assignObject',
		description: 'Assignment from object properties',
		codeSample: 'const a = obj.b',
		keywords: [
			'object',
			'assignment',
			'decomposition',
			'composition'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			const str = d.obj.str; // NOSONAR
		},
		testDataType: 'object'
	};

	const assignObjectDefault = {
		name: 'assignObjectDefault',
		description: 'Assignment from object properties with default',
		codeSample: 'const a = obj.b || i',
		keywords: [
			'object',
			'assignment',
			'decomposition',
			'composition',
			'default',
			'values'
		].sort((a, b) => a.localeCompare(b)),
		f: (d) => {
			const str = d.obj.foo || 'bar'; // NOSONAR
		},
		testDataType: 'object'
	};

	const destructureSwapArray = {
		name: 'destructureSwapArray',
		description: 'Swapping variables via Array destructuring',
		codeSample: 'const [a, b] = [b, a]',
		keywords: [
			'array',
			'destructuring',
			'swap',
			'variables',
			'composition',
			'decomposition'
		],
		f: (d) => {
			let a = d[0];
			let b = d[1];
			[a, b] = [b, a]; // NOSONAR
		},
		testDataType: 'array'
	};

	const assignSwapArray = {
		name: 'assignSwapArray',
		description: 'Swapping variables via assignment',
		codeSample: 'const c = b; b = a; a = c;',
		keywords: [
			'swap',
			'variables',
			'composition',
			'decomposition'
		],
		f: (d) => {
			let a = d[0];
			let b = d[1];
			const c = b;
			b = a; // NOSONAR
			a = c; // NOSONAR
		},
		testDataType: 'array'
	};

	const functions = [
		destructureArray,
		destructureArrayDefault,
		destructureArrayTail,
		destructureObject,
		destructureObjectDefault,
		destructureSwapArray,
		assignArray,
		assignArrayDefault,
		assignObject,
		assignObjectDefault,
		assignSwapArray
	];

	module.exports = {
		name: '(de-)composition',
		description: {
			short: '(De-)composing objects, variables and arrays.',
			long: '(De-)composing objects, variables and arrays from each other.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords)
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a, b) => a.localeCompare(b)),
		functions,
		waitBetweenRuns: 50,
		defaultOptions: {
			'iterations': 1000,
			'magnitude': 100000
		}
	};
}
/* eslint-enable no-unused-vars */