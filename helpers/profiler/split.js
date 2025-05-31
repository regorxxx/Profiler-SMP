'use strict';
//26/05/25
/* global module:readable */
{
	const splitString = {
		name: 'splitString',
		description: 'String\'s split() method',
		keywords: [
			'string',
			'method'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'd.split(\',\')',
		f: (d) => {
			d.split(',');
		}
	};

	const splitStringRegExp = {
		name: 'splitStringRegExp',
		description: 'String\'s split() method with RegExp',
		keywords: [
			'string',
			'method',
			'RegExp'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'd.split(/,/)',
		f: (d) => {
			d.split(/,/);
		}
	};

	const splitStringRegExpCached = {
		name: 'splitStringRegExpCached',
		description: 'String\'s split() method with RegExp',
		keywords: [
			'string',
			'method',
			'RegExp'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'const re = \'/,/\'; d.split(re)',
		f: (() => {
			const re = /,/;
			return (d) => {
				d.split(re);
			};
		})()
	};

	const splitStringArray = {
		name: 'splitStringArray',
		description: 'String\'s split() method into SubArrays with map()',
		keywords: [
			'string',
			'method',
			'array'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'd.split(\',\').map((s) => {return s.split(\'|\');})',
		f: (d) => {
			d.split(',').map((s) => {return s.split('|');});
		}
	};

	const splitStringArrayReduce = {
		name: 'splitStringArrayReduce',
		description: 'String\'s split() method into SubArrays with reduce()',
		keywords: [
			'string',
			'method',
			'array'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'd.split(/(,)|\\|/).reduce((arr, s) => {s !== \',\' && arr.push(s)})',
		f: (() => {
			const re = /(,)|\|/;
			return (d) => {
				let len = 0;
				return d.split(re).reduce((arr, s) => {
					if (',' === s) {len = arr.push([]) - 1;}
					else if (s !== void(0) && s !== '') {arr[len].push(s);}
					return arr;
				}, [[]]);
			};
		})()
	};

	const functions = [
		splitString,
		splitStringRegExp,
		splitStringRegExpCached,
		splitStringArray,
		splitStringArrayReduce
	];

	module.exports = {
		name: 'split',
		description: {
			long: 'String splitting variations: Split string using different techniques.',
			short: 'String splitting variations.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords)
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a,b) => a.localeCompare(b)),
		functions,
		testDataType: 'string',
		defaultOptions: {
			'iterations': 1000,
			'magnitude': 10000
		}
	};
}