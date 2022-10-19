'use strict';

{
	const recursiveSum = {
		name: 'recursiveSum',
		description: 'recursive sum',
		keywords: [
			'recursion',
			'sum'
		].sort(),
		codeSample: 'const f = (d) => (d && d.length && (d[0] + f(d.slice(1)))) || 0',
		f: (d) => (d && d.length && (d[0] + recursiveSum.f(d.slice(1)))) || 0
	};

	const tailRecursiveSum = {
		name: 'tailRecursiveSum',
		description: 'tail recursive sum',
		keywords: [
			'recursion',
			'sum',
			'tail',
			'tailrecursion'
		].sort(),
		codeSample: 'const f = (d, i = 0) => (!d.length && i) || f(d.slice(1), i + d[0])',
		f: (d, i = 0) => (!d.length && i) || tailRecursiveSum.f(d.slice(1), i + d[0])
	};

	const forReferenceSum = {
		name: 'forReferenceSum',
		description: 'for loop sum for reference',
		keywords: [
			'for',
			'loop',
			'sum'
		].sort(),
		codeSample: 'for (...) { sum += d[i] }',
		f: (d) => {
			let sum = 0;
			for (let i = 0; i < d.length; i++) {
				sum += d[i];
			}
			return sum;
		}
	};

	const functions = [
		forReferenceSum,
		recursiveSum,
		tailRecursiveSum
	];

	module.exports = {
		name: 'recursion',
		description: {
			long: 'Recursion variations: Calculating sum of array of integers. Profile contains a simple for-loop for reference.',
			short: 'Recursion.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords)
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
			)].sort(),
		functions,
		testDataType: 'array'
	};
}