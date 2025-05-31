'use strict';
//30/05/25
/* global module:readable */
{
	const sort = {
		name: 'sortByPath',
		description: 'Sorts a handle list.',
		keywords: [
			'handleList',
			'library',
			'sort',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'd.Sort()',
		f: (d) => {
			d.Sort();
			return d;
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const sortByPath = {
		name: 'sortByPath',
		description: 'Sorts a handle list by path.',
		keywords: [
			'handleList',
			'library',
			'sort',
			'method',
			'path'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'd.OrderByPath()',
		f: (d) => {
			d.OrderByPath();
			return d;
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const sortByRelativePath = {
		name: 'sortByRelativePath',
		description: 'Sorts a handle list by relative path.',
		keywords: [
			'handleList',
			'library',
			'sort',
			'method',
			'path'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'd.OrderByRelativePath()',
		f: (d) => {
			d.OrderByRelativePath();
			return d;
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const getLibraryPaths = {
		name: 'sortByRelativePath',
		description: 'Retrieves handle list relative paths.',
		keywords: [
			'handleList',
			'library',
			'path',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'd.GetLibraryRelativePaths()',
		f: (d) => {
			return d.GetLibraryRelativePaths();
		},
		testDataType: 'libraryCached',
		copyData: true
	};


	const calcDuration = {
		name: 'calcDuration',
		description: 'Calculates duration of handle list.',
		keywords: [
			'handleList',
			'library',
			'method',
			'duration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'd.CalcTotalDuration()',
		f: (d) => {
			return d.CalcTotalDuration();
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const calcSize= {
		name: 'calcSize',
		description: 'Calculates file size of handle list.',
		keywords: [
			'handleList',
			'library',
			'method',
			'file'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'd.CalcTotalSize()',
		f: (d) => {
			return d.CalcTotalSize();
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const convert = {
		name: 'convert',
		description: 'Transforms handle list on array.',
		keywords: [
			'handleList',
			'library',
			'method',
			'array'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'd.Convert()',
		f: (d) => {
			const arr = d.Convert();
			if (!Array.isArray(arr)) { throw new Error('Not array'); }
			return arr;
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const functions = [
		sort,
		sortByPath,
		sortByRelativePath,
		getLibraryPaths,
		calcDuration,
		calcSize,
		convert
	];

	module.exports = {
		name: 'handlelist',
		description: {
			long: 'Tags retrieval: Getting tag values for different-sized tags.',
			short: 'Tags retrieval TF tags.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords)
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