'use strict';
//15/06/25
/* global module:readable */
{
	const OrderByPath = {
		name: 'OrderByPath',
		description: 'Sorts a handle list by path using native SMP method.',
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

	const jsLocaleSortByPath = {
		name: 'jsLocaleSortByPath',
		description: 'Sorts a handle list by path using JS method localeCompare().',
		keywords: [
			'handleList',
			'library',
			'path',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: (d) => {
			const paths = d.GetLibraryRelativePaths();
			const arr = d.Convert();
			arr.forEach((handle, i) => handle.relPath = paths[i]);
			arr.sort((a, b) => a.relPath.localeCompare(b.relPath));
			return new FbMetadbHandleList(arr);
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const jsCodePointSortByPath = {
		name: 'jsCodePointSortByPath',
		description: 'Sorts a handle list by path using JS method localeCompare().',
		keywords: [
			'handleList',
			'library',
			'path',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: (d) => {
			const paths = d.GetLibraryRelativePaths();
			const arr = d.Convert();
			arr.forEach((handle, i) => handle.relPath = paths[i]);
			arr.sort((a, b) => (a.relPath > b.relPath) - (a.relPath < b.relPath));
			return new FbMetadbHandleList(arr);
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const collator = new Intl.Collator(void(0), {
		sensitivity: 'base',
		numeric: true
	});

	const specialChars = /[\u0027\u002C\u002D\u00AD\u058A\u2010\u2011\u2012\u2013\u2014\uFE58]/gi;

	const jsCollatorSortByPath = {
		name: 'jsCollatorSortByPath',
		description: 'Sorts a handle list by path using JS method Intl.Collator.',
		keywords: [
			'handleList',
			'library',
			'path',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: (d) => {
			const paths = d.GetLibraryRelativePaths();
			const arr = d.Convert();
			arr.forEach((handle, i) => handle.relPath = paths[i]);
			arr.sort((a, b) => collator.compare(a.relPath, b.relPath));
			return new FbMetadbHandleList(arr);
		},
		testDataType: 'libraryCached',
		copyData: true
	};


	const jsFoobarSortByPath = {
		name: 'jsFoobarSortByPath',
		description: 'Sorts a handle list by path using JS method Intl.Collator to mimic foobar2000 sorting.',
		keywords: [
			'handleList',
			'library',
			'path',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: (d) => {
			const paths = d.GetLibraryRelativePaths();
			const arr = d.Convert();
			arr.forEach((handle, i) => handle.relPath = paths[i].replace(specialChars, ''));
			arr.sort((a, b) => collator.compare(a.relPath, b.relPath));
			return new FbMetadbHandleList(arr);
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const functions = [
		OrderByPath,
		jsLocaleSortByPath,
		jsCodePointSortByPath,
		jsCollatorSortByPath,
		jsFoobarSortByPath
	];

	module.exports = {
		name: 'handlelist:algorithms',
		description: {
			long: 'Handlelists: built-in operations compared to JS approach.',
			short: 'handlelists operations comparison.'
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