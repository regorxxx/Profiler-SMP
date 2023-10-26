'use strict';
//01/11/22
{
	const sortRadix = {
		name: 'sortRadix',
		description: 'Array\'s radix sort method for numbers',
		codeSample: '[].sortRadix()',
		keywords: [
			'array',
			'sort',
			'push',
			'spread',
			'method'
		].sort(),
		f: (d) => {
			function getDigit(num, place) {
				return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
			}
			const maxDigitCount = d.reduce((acc, num) => {
				return Math.max(acc,
					num === 0 
						? 1 
						: Math.floor(Math.log10(Math.abs(num))) + 1
				);
			}, 0);
			const len = d.length;
			for (let k = 0; k < maxDigitCount; k++) {
				let digitBuckets = Array.from({length: 10}, () => []) // [[], [], [],...]
				for (let i = 0; i < d.length; i++) {
					let digit = getDigit(d[i], k);
					digitBuckets[digit].push(d[i]);
				}
				// New order after each loop
				d.length = 0;
				digitBuckets.forEach((arr) => d.push.apply(d, arr));
			}
			return d;
		}
	};

	const sort = {
		name: 'sort',
		description: 'sort using standard js method for numbers',
		keywords: [
			'array',
			'sort',
			'method'
		],
		codeSample: '[].sort((a,b) => a - b)',
		f: (d) => {
			return d.sort((a,b) => a - b);
		}
	};

	const functions = [
		sortRadix,
		sort
	];

	module.exports = {
		name: 'array sorting',
		description: {
			long: 'Array sorting variations: sorting an array in place.',
			short: 'Array sorting variations.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords)
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
		)].sort(),
		functions,
		testDataType: 'array',
		shuffleData: true,
		copyData: true,
		defaultOptions: {
			"iterations": 100,
			"magnitude": 10000
		}
	};
}