'use strict';
//26/05/25
/* global module:readable */
{
	const setMap = {
		name: 'setMap',
		description: 'Map.set() in a forEach loop',
		keywords: [
			'map',
			'creation',
			'set'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'Map.set()',
		f: (d) => {
			const m = new Map();
			d.forEach((dp, i) => m.set(i, dp));
			return m;
		}
	};

	const createMap = {
		name: 'createMap',
		description: 'passing key-value pairs to the Map constructor',
		keywords: [
			'map',
			'creation',
			'construtor',
			'key-value',
			'pairs'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'new Map([props])',
		f: (d) => new Map(d.map((dp, i) => [i, dp]))
	};

	const setObject = {
		name: 'setObject',
		description: 'setting properties on an Object literal',
		keywords: [
			'map',
			'creation',
			'object',
			'literal',
			'properties'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: '{}.prop = val',
		f: (d) => {
			const m = {};
			d.forEach((dp, i) => m[i] = dp);
			return m;
		}
	};

	const defineProperty = {
		name: 'defineProperty',
		description: 'Object\'s definePropety() method on an Object literal',
		keywords: [
			'map',
			'creation',
			'object',
			'literal',
			'defineProperty',
			'properties'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'Object.defineProperty({}, prop, desc)',
		f: (d) => {
			const m = {};
			d.forEach((dp, i) =>
				Object.defineProperty(m, i, {
					value: dp,
					enumerable: true
				})
			);
			return m;
		}
	};

	const defineProperties = {
		name: 'defineProperties',
		description: 'Object\'s defineProperties method on an Object literal',
		keywords: [
			'map',
			'creation',
			'object',
			'literal',
			'defineProperties',
			'properties'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: 'Object.defineProperties({}, props)',
		f: (d) => {
			const m = {};
			Object.defineProperties(m, d.reduce((props, dp, i) =>
				Object.assign(props, {
					[i]: {
						value: dp,
						enumerable: true
					}
				}), {}));
			return m;
		}
	};

	const spread = {
		name: 'spread',
		description: 'object spread syntax',
		keywords: [
			'map',
			'creation',
			'object',
			'literal',
			'spread',
			'syntax',
			'properties'
		].sort((a,b) => a.localeCompare(b)),
		codeSample: '{ ...props }',
		f: (d) => ({
			...d
		})
	};

	const functions = [
		createMap,
		defineProperty,
		defineProperties,
		setMap,
		setObject,
		spread
	];

	module.exports = {
		name: 'map:creation',
		description: {
			long: 'Object literal vs. Map: creating a map.',
			short: 'Object literal vs. Map creation.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords)
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a,b) => a.localeCompare(b)),
		functions,
		testDataType: 'array',
		waitBetweenRuns: 50,
		defaultOptions: {
			'iterations': 1000,
			'magnitude': 100000
		}
	};
}