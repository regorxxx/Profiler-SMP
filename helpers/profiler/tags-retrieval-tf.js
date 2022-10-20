'use strict';

{
	const tags = ['GENRE', 'STYLE'];
	
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
		].sort(),
		codeSample: 'tfo.EvalWithMetadbs(d)',
		f: (d) => {
			const tagsLen = tags.length;
			const handleLen = d.Count;
			let outputListArray = [];
			let tagString = '';
			for (let i = 0; i < tagsLen; i++) {
				const tagStr = tags[i].indexOf('$') === -1 ? '%' + tags[i] + '%' : tags[i];
				tagString += (i === 0 ? '' : '| ') + '[' + tagStr + ']';
			}
			let tfo = fb.TitleFormat(tagString);
			outputListArray = tfo.EvalWithMetadbs(d).map((arr) => {
				return arr.split('| ').map((subArr) => {
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
		].sort(),
		codeSample: 'tfo.EvalWithMetadbs(d)',
		f: (d) => {
			const tagsLen = tags.length;
			const handleLen = d.Count;
			let outputListArray = [];
			let tagString = '';
			const dic = {_:{}};
			for (let i = 0; i < tagsLen; i++) {
				const tagStr = tags[i].indexOf('$') === -1 ? '%' + tags[i] + '%' : tags[i];
				tagString += (i === 0 ? '' : '| ') + '[' + tagStr + ']';
				dic[i] = {};
			}
			let tfo = fb.TitleFormat(tagString);
			outputListArray = tfo.EvalWithMetadbs(d).map((arr) => {
				return dic._[arr] ? dic._[arr].slice() : dic._[arr] = arr.split('| ').map((subArr, i) => {
					return (dic[i][subArr] ? dic[i][subArr].slice() : dic[i][subArr] = subArr.split(', '));
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
			functions.map((fn) => fn.keywords)
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
			)].sort(),
		functions
	};
}