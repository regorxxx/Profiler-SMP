'use strict';
//28/05/25
/* global module:readable */
{
	const tags = ['TITLE', 'ARTIST', 'ALBUM'];

	const getFileInfoHandle = {
		name: 'getFileInfoHandle',
		description: 'Handle\'s getFileInfo() method',
		keywords: [
			'handle',
			'FbFileInfo',
			'method',
			'for',
			'loop',
			'concat',
			'array'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'd.GetFileInfo().MetaValue(tagIdx, n)',
		f: (d) => {
			const tagsLen = tags.length;
			const handleInfo = d.GetFileInfo();
			let outputArray = [];
			for (let i = 0; i < tagsLen; i++) {
				let tagValues = [];
				const tagIdx = handleInfo.MetaFind(tags[i]);
				const tagNumber = (tagIdx !== -1) ? handleInfo.MetaValueCount(tagIdx) : 0;
				for (let j = 0; j < tagNumber; j++) {
					tagValues[j] = handleInfo.MetaValue(tagIdx, j);
				}
				outputArray = outputArray.concat([tagValues]);
			}
		},
		testDataType: 'handleCached'
	};

	const getFileInfoHandleList = {
		name: 'getFileInfoHandleList',
		description: 'Handle List iterating getFileInfo() method',
		keywords: [
			'handleList',
			'FbFileInfo',
			'method',
			'for',
			'loop',
			'concat',
			'array',
			'iteration'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'dArr = d.Convert(); for(let i = 0; i < d.Count; i++) {dArr[i].GetFileInfo().MetaValue(tagIdx, n)}',
		f: (d) => {
			const tagsLen = tags.length;
			const handleCount = d.Count;
			const handleArr = d.Convert();
			let outputListArray = [];
			for (let k = 0; k < handleCount; k++) {
				const handleInfo = handleArr[k].GetFileInfo();
				let outputArray = [];
				for (let i = 0; i < tagsLen; i++) {
					let tagValues = [];
					const tagIdx = handleInfo.MetaFind(tags[i]);
					const tagNumber = (tagIdx !== -1) ? handleInfo.MetaValueCount(tagIdx) : 0;
					for (let j = 0; j < tagNumber; j++) {
						tagValues[j] = handleInfo.MetaValue(tagIdx, j);
					}
					outputArray = outputArray.concat([tagValues]);
				}
				outputListArray = outputListArray.concat([outputArray]);
			}
		},
		testDataType: 'handleListCached'
	};

	const getFileInfoHandleListArray = {
		name: 'getFileInfoHandleListArray',
		description: 'Handle List iterating getFileInfo() method',
		keywords: [
			'handle',
			'FbFileInfo',
			'method',
			'for',
			'loop',
			'concat',
			'array',
			'iteration'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'for(let i = 0; i < d.length; i++) {d[i].GetFileInfo().MetaValue(tagIdx, n)}',
		f: (d) => {
			const tagsLen = tags.length;
			const handleLen = d.length;
			let outputListArray = [];
			for (let k = 0; k < handleLen; k++) {
				const handleInfo = d[k].GetFileInfo();
				let outputArray = [];
				for (let i = 0; i < tagsLen; i++) {
					let tagValues = [];
					const tagIdx = handleInfo.MetaFind(tags[i]);
					const tagNumber = (tagIdx !== -1) ? handleInfo.MetaValueCount(tagIdx) : 0;
					for (let j = 0; j < tagNumber; j++) {
						tagValues[j] = handleInfo.MetaValue(tagIdx, j);
					}
					outputArray = outputArray.concat([tagValues]);
				}
				outputListArray = outputListArray.concat([outputArray]);
			}
		},
		testDataType: 'handleListArrayCached'
	};

	const functions = [
		getFileInfoHandle,
		getFileInfoHandleList,
		getFileInfoHandleListArray,
	];

	module.exports = {
		name: 'tags:retrieval:info',
		description: {
			long: 'Tags retrieval variations: Getting tag values using different FbFileInfo techniques.',
			short: 'Tags retrieval FbFileInfo variations.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords || [])
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a,b) => a.localeCompare(b)),
		functions,
		waitBetweenRuns: 10,
		defaultOptions: {
			'iterations': 200,
			'magnitude': 2000
		}
	};
}