'use strict';
//05/12/24
/* global module:readable */
{
	const copySlice = {
		name: 'copySlice',
		description: 'Array\'s slice() method',
		keywords: [
			'array',
			'clone',
			'copy',
			'slice',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a.slice()',
		f: (d) => d[0].slice()
	};

	const copySliceZero = {
		name: 'copySliceZero',
		description: 'Array\'s slice(0) method',
		keywords: [
			'array',
			'clone',
			'copy',
			'slice',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'a.slice(0)',
		f: (d) => d[0].slice(0)
	};

	const copySpread = {
		name: 'copySpread',
		description: 'copy using Array spread syntax',
		keywords: [
			'array',
			'clone',
			'copy',
			'spread',
			'syntax'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: '[...a]',
		f: (d) => [...d[0]]
	};

	const copyFrom = {
		name: 'copyFrom',
		description: 'copy using Array.from()',
		keywords: [
			'array',
			'clone',
			'copy',
			'from',
			'method'
		],
		codeSample: 'Array.from(a)',
		f: (d) => Array.from(d[0])
	};

	const copyNewArray = {
		name: 'copyNewArray',
		description: 'spread into Array constructor',
		keywords: [
			'array',
			'clone',
			'copy',
			'new',
			'constructor'
		],
		codeSample: 'new Array(...a)',
		f: (d) => new Array(...d[0])
	};

	const copyConcatAB = {
		name: 'copyConcatAB',
		description: 'concatenate empty Array literal',
		keywords: [
			'array',
			'clone',
			'copy',
			'concat',
			'method'
		],
		codeSample: 'a.concat([])',
		f: (d) => d[0].concat([])
	};

	const copyConcatBA = {
		name: 'copyConcatBA',
		description: 'concatenate onto empty Array literal',
		keywords: [
			'array',
			'clone',
			'copy',
			'concat',
			'method'
		],
		codeSample: '[].concat(a)',
		f: (d) => [].concat(d[0])
	};

	const copyPrependLiteral = {
		name: 'copyPrependLiteral',
		description: 'prepend to empty Array literal',
		codeSample: 'b = []; Array.prototype.unshift.apply(b, a)',
		keywords: [
			'array',
			'clone',
			'copy',
			'literal',
			'apply',
			'unshift',
			'prepend',
			'insert'
		],
		f: (d) => {
			const b = [];
			Array.prototype.unshift.apply(b, d[0]);
			return b;
		}
	};

	const copyPrependPreallocate = {
		name: 'copyPrependPreallocate',
		description: 'prepend to constructed Array',
		keywords: [
			'array',
			'clone',
			'copy',
			'preallocate',
			'apply',
			'unshift',
			'prepend',
			'insert',
			'constructor',
			'new'
		],
		codeSample: 'b = new Array(); Array.prototype.unshift.apply(b, a)',
		f: (d) => {
			const b = new Array();
			Array.prototype.unshift.apply(b, d[0]);
			return b;
		}
	};

	const copyAppendLiteral = {
		name: 'copyAppendLiteral',
		description: 'append to Array literal using spread',
		keywords: [
			'array',
			'clone',
			'copy',
			'literal',
			'apply',
			'push',
			'spread',
			'append',
			'insert'
		],
		codeSample: 'b = []; b.push(...a)',
		f: (d) => {
			const b = [];
			b.push(...d[0]);
			return b;
		}
	};

	const copyAppendSpreadPreallocate = {
		name: 'copyAppendSpreadPreallocate',
		description: 'append to constructed Array using spread',
		keywords: [
			'array',
			'clone',
			'copy',
			'preallocate',
			'constructor',
			'new',
			'push',
			'spread',
			'append',
			'insert'
		],
		codeSample: 'b = new Array(); b.push(...a)',
		f: (d) => {
			const b = new Array();
			b.push(...d[0]);
			return b;
		}
	};

	const copyAppendForPreallocate = {
		name: 'copyAppendForPreallocate',
		description: 'append to constructed Array in a for loop',
		keywords: [
			'array',
			'clone',
			'copy',
			'preallocate',
			'constructor',
			'new',
			'push',
			'append',
			'insert'
		],
		codeSample: 'b = new Array(); for (...) { b.push(a[i]) }',
		f: (d) => {
			const a = d[0];
			const b = new Array();
			const { length } = a;
			for (let i = 0; i < length; i++) {
				b.push(a[i]);
			}
			return b;
		}
	};

	const copyAppendForLiteral = {
		name: 'copyAppendForLiteral',
		description: 'append to Array literal in a for loop',
		keywords: [
			'array',
			'clone',
			'copy',
			'push',
			'for',
			'loop',
			'append',
			'insert',
			'literal'
		],
		codeSample: 'b = []; for (...) { b.push(a[i]) }',
		f: (d) => {
			const a = d[0];
			const b = [];
			const { length } = a;
			for (let i = 0; i < length; ++i) {
				b.push(a[i]);
			}
			return b;
		}
	};

	const copySetForPreallocate = {
		name: 'copySetForPreallocate',
		description: 'preallocate new Array and assign values in a for loop',
		keywords: [
			'array',
			'clone',
			'copy',
			'preallocate',
			'set',
			'for',
			'loop',
			'assign',
			'constructor',
			'new'
		],
		codeSample: 'b = new Array(a.length); for (...) { b[i] = a[i]; }',
		f: (d) => {
			const a = d[0];
			const { length } = a;
			const b = new Array(length);
			for (let i = 0; i < length; ++i) {
				b[i] = a[i];
			}
			return b;
		}
	};

	const functions = [
		copySlice,
		copySliceZero,
		copySpread,
		copyFrom,
		copyNewArray,
		copyConcatAB,
		copyConcatBA,
		copyPrependLiteral,
		copyPrependPreallocate,
		copyAppendLiteral,
		copyAppendForPreallocate,
		copyAppendSpreadPreallocate,
		copyAppendForLiteral,
		copySetForPreallocate
	];

	module.exports = {
		name: 'array copying',
		description: {
			long: 'Array copying/cloning variations: creating a new array with the same elements as an existing array.',
			short: 'Array copying/cloning variations.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords)
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a, b) => a.localeCompare(b)),
		functions,
		testDataType: 'arrays',
		waitBetweenRuns: 50,
		defaultOptions: {
			'iterations': 1000,
			'magnitude': 100000
		}
	};
}