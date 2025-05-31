'use strict';
//26/05/25
/* global module:readable */
{
	const loopForEach = {
		name: 'loopForEach',
		description: 'forEach loop',
		keywords: [
			'foreach',
			'loop',
			'push',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: '[].forEach((d) => [].push(d)) => []',
		f: (d) => {
			const r = [];
			d.forEach((dp) => r.push(dp < 5 && dp > 3));
			return r;
		}
	};

	const loopFor = {
		name: 'loopFor',
		description: 'for loop',
		keywords: [
			'for',
			'loop',
			'push',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'for(i < d.length; i++) { [].push(d[i]) } => []',
		f: (d) => {
			const r = [];
			let dp;
			for (const element of d) {
				dp = element;
				r.push(dp < 5 && dp > 3);
			}
			return r;
		}
	};

	const loopForFixedLen = {
		name: 'loopForFixedLen',
		description: 'for loop with length variable',
		keywords: [
			'for',
			'loop',
			'push',
			'length',
			'variable',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'for(i < len; i++) { [].push(d[i]) } => []',
		f: (d) => {
			const r = [];
			const len = d.length;
			let dp;
			for (let i = 0; i < len; i++) {
				dp = d[i];
				r.push(dp < 5 && dp > 3);
			}
			return r;
		}
	};

	const loopInverseWhile = {
		name: 'loopInverseWhile',
		description: 'inverse while loop',
		keywords: [
			'while',
			'loop',
			'inverse',
			'push',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'while(i--) { [].push(d[i]) } => []',
		f: (d) => {
			const r = [];
			let i = d.length;
			let dp;
			while (i--) {
				dp = d[i];
				r.push(dp < 5 && dp > 3);
			}
			return r.reverse();
		}
	};

	const loopWhile = {
		name: 'loopWhile',
		description: 'while loop',
		keywords: [
			'while',
			'loop',
			'inverse',
			'push',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'while(i < d.length) { [].push(d[i]) } => []',
		f: (d) => {
			const r = [];
			let i = 0;
			let dp;
			while (i < d.length) {
				dp = d[i];
				r.push(dp < 5 && dp > 3);
				i++;
			}
			return r;
		}
	};

	const loopWhileFixedLen = {
		name: 'loopWhileFixedLen',
		description: 'while loop with length variable',
		keywords: [
			'while',
			'loop',
			'length',
			'variable',
			'push',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'while(i < len) { [].push(d[i]) } => []',
		f: (d) => {
			const r = [];
			const len = d.length;
			let i = 0;
			let dp;
			while (i < len) {
				dp = d[i];
				r.push(dp < 5 && dp > 3);
				i++;
			}
			return r;
		}
	};

	const loopWhileDo = {
		name: 'loopWhileDo',
		description: 'do while loop',
		keywords: [
			'do',
			'while',
			'loop',
			'push',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'do { [].push(d[i]) } while (i < d.length) => []',
		f: (d) => {
			const r = [];
			let i = 0;
			let dp;
			do {
				dp = d[i];
				r.push(dp < 5 && dp > 3);
				i++;
			} while (i < d.length);
			return r;
		}
	};

	const loopWhileDoFixedLen = {
		name: 'loopWhileDoFixedLen',
		description: 'do while loop with length variable',
		keywords: [
			'do',
			'while',
			'loop',
			'push',
			'length',
			'variable',
			'iteration',
			'array'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'do { [].push(d[i]) } while (i < len) => []',
		f: (d) => {
			const r = [];
			let i = 0;
			const len = d.length;
			let dp;
			do {
				dp = d[i];
				r.push(dp < 5 && dp > 3);
				i++;
			} while (i < len);
			return r;
		}
	};

	const loopMap = {
		name: 'loopMap',
		description: 'map',
		keywords: [
			'map',
			'loop',
			'iteration',
			'array'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: '[].map() => []',
		f: (d) => d.map((dp) => dp < 5 && dp > 3)
	};

	const loopForOf = {
		name: 'loopForOf',
		description: 'for of loop',
		keywords: [
			'for',
			'of',
			'property',
			'object',
			'push',
			'iteration',
			'array',
			'loop'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'for (prop of []) { [].push(prop) } => []',
		f: (d) => {
			const r = [];
			for (const p of d) {
				r.push(p < 5 && p > 3);
			}
			return r;
		}
	};

	const functions = [
		loopForEach,
		loopFor,
		loopForFixedLen,
		loopForOf,
		loopInverseWhile,
		loopMap,
		loopWhile,
		loopWhileFixedLen,
		loopWhileDo,
		loopWhileDoFixedLen
	];

	module.exports = {
		name: 'loops',
		description: {
			long: 'Loop variations: Converting an array of integers into an array of booleans satisfying a conjunction of two simple relational operations.',
			short: 'Loop variations.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords)
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a, b) => a.localeCompare(b)),
		functions,
		testDataType: 'array',
		defaultOptions: {
			'iterations': 1000,
			'magnitude': 100000
		}
	};
}