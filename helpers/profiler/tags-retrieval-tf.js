'use strict';
//26/05/25
/* global module:readable */
{
	const tags = ['GENRE', 'STYLE', 'DATE'];

	const getTFHandleListArray = {
		name: 'getTFHandleListArray',
		description: 'Handle List\'s EvalWithMetadbs() method',
		keywords: [
			'handleList',
			'TF',
			'method',
			'for',
			'loop',
			'concat',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'tfo.EvalWithMetadbs(d)',
		f: (d) => {
			const tagsLen = tags.length;
			let tagString = '';
			for (let i = 0; i < tagsLen; i++) {
				const tagStr = !tags[i].includes('$') ? '%' + tags[i] + '%' : tags[i];
				tagString += (i === 0 ? '' : '|‎|') + '[' + tagStr + ']';
			}
			let tfo = fb.TitleFormat(tagString);
			return tfo.EvalWithMetadbs(d).map((arr) => {
				return arr.split('|‎|').map((subArr) => {
					return subArr.split(', ');
				});
			});
		},
		testDataType: 'handleListCached'
	};

	const getTFHandleListArrayMemoize = {
		name: 'getTFHandleListArrayMemoize',
		description: 'Handle List\'s EvalWithMetadbs() method with memoization; faster for repetitive tags',
		keywords: [
			'handleList',
			'TF',
			'method',
			'for',
			'loop',
			'concat',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'tfo.EvalWithMetadbs(d)',
		f: (d) => {
			const tagsLen = tags.length;
			let tagString = '';
			const dic = { _: {} };
			for (let i = 0; i < tagsLen; i++) {
				const tagStr = !tags[i].includes('$') ? '%' + tags[i] + '%' : tags[i];
				tagString += (i === 0 ? '' : '|‎|') + '[' + tagStr + ']';
				dic[i] = {};
			}
			let tfo = fb.TitleFormat(tagString);
			return tfo.EvalWithMetadbs(d).map((arr) => {
				return dic._[arr] ? dic._[arr].slice() : dic._[arr] = arr.split('|‎|').map((subArr, i) => { // NOSONAR
					return (dic[i][subArr] ? dic[i][subArr].slice() : dic[i][subArr] = subArr.split(', ')); // NOSONAR
				});
			});
		},
		testDataType: 'handleListCached'
	};

	const functions = [
		getTFHandleListArray,
		getTFHandleListArrayMemoize
	];

	module.exports = {
		name: 'tags:retrieval:tf',
		description: {
			long: 'Tags retrieval variations: Getting tag values using different TF techniques.',
			short: 'Tags retrieval TF variations.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords || [])
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a, b) => a.localeCompare(b)),
		functions,
		waitBetweenRuns: 10,
		defaultOptions: {
			'iterations': 200,
			'magnitude': 100000
		}
	};
}