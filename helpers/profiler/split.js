'use strict';

{
	const re = /,/;
	
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
		description: 'String\'s split() method into SubArrays',
		keywords: [
			'string',
			'method',
			'array'
		].sort(),
		codeSample: 'd.split(\',\').map((arr) => {return arr.split(\'|\');})',
		f: (d) => {
			d.split(',').map((arr) => {return arr.split('|');});
		}
	};
	
	const functions = [
		splitString,
		splitStringRegExp,
		splitStringRegExpCached
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
		testDataType: 'string'
	};
}