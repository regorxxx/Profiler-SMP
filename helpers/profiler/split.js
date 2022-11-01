'use strict';
//01/11/22
{
	const re = /,/;
	const reArr = /(,)|\|/;
	
	const splitString = {
		name: 'splitString',
		description: 'String\'s split() method',
		keywords: [
			'string',
			'method'
		].sort(),
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
		].sort(),
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
		].sort(),
		codeSample: 'const re = \'/,/\'; d.split(re)',
		f: (d) => {
			d.split(re);
		}
	};
	
	const splitStringArray = {
		name: 'splitStringArray',
		description: 'String\'s split() method into SubArrays with map()',
		keywords: [
			'string',
			'method',
			'array'
		].sort(),
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
		].sort(),
		codeSample: 'd.split(/(,)|\|/).reduce((arr, s) => {s !== \',\' && arr.push(s)})',
		f: (d) => {
			let len = 0;
			return d.split(reArr).reduce((arr, s) => {
				if (',' === s) {len = arr.push([]) - 1;}
				else if (s !== void(0) && s !== "") {arr[len].push(s);}
				return arr;
			}, [[]]);
		}
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
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
			)].sort(),
		functions,
		testDataType: 'string',
		defaultOptions: {
			"iterations": 100,
			"magnitude": 20000
		}
	};
}