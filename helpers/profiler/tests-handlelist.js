'use strict';
//04/09/25
/* global module:readable */
{

	const BSearch = {
		name: 'BSearch',
		description: 'Performs a handle search',
		f: (d) => {
			const handleList = new FbMetadbHandleList();
			return handleList.BSearch(d);
		},
		toBe: (o) => o === -1,
		testDataType: 'handle'
	};


	const functions = [
		/* Methods */
		BSearch,
	];

	const coverage = (parent, tests) => {
		const keys = new Set(Object.keys(parent));
		const covered = new Set(tests.map((f) => f.name));
		return (1 - keys.difference(covered).size / (keys.size || 1)) * 100;
	};

	module.exports = {
		name: 'tests:fbmetahandlelist',
		description: {
			long: 'Tests for built-in SMP methods: fb namespace.',
			short: 'Tests for built-in SMP methods: fb namespace.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords || [])
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], ['fbmetahandlelist', 'test'])
		)].sort((a, b) => a.localeCompare(b)),
		functions,
		waitBetweenRuns: 10,
		defaultOptions: {
			iterations: 1,
			magnitude: 100,
			coverage: coverage(FbMetadbHandleList, functions).toFixed(2) + '%'
		}
	};
}