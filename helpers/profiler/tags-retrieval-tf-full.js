'use strict';
//01/06/25
/* global module:readable */
{
	const getTFHandleListArray = (d, tags) => {
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
	};

	const getTFTimestamps = {
		name: 'getTFTimestamps',
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
			return getTFHandleListArray(d, ['PLAYED_TIMES', '2003_TIMESTAMPS']);
		},
		testDataType: 'handleListCached'
	};

	const getTFGenres = {
		name: 'getTFGenres',
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
			return getTFHandleListArray(d, ['GENRE', 'STYLE']);
		},
		testDataType: 'handleListCached'
	};

	const getTFRating = {
		name: 'getTFRating',
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
			return getTFHandleListArray(d, ['RATING']);
		},
		testDataType: 'handleListCached'
	};

	const getTFArtist = {
		name: 'getTFArtist',
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
			return getTFHandleListArray(d, ['ALBUM ARTIST']);
		},
		testDataType: 'handleListCached'
	};

	const getTFFingerprint = {
		name: 'getTFFingerprint',
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
			return getTFHandleListArray(d, ['ACOUSTID_FINGERPRINT_RAW','FINGERPRINT_FOOID']);
		},
		testDataType: 'handleListCached'
	};

	const getTFMood = {
		name: 'getTFMood',
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
			return getTFHandleListArray(d, ['MOOD']);
		},
		testDataType: 'handleListCached'
	};

	const functions = [
		getTFTimestamps,
		getTFGenres,
		getTFRating,
		getTFArtist,
		// getTFFingerprint,
		getTFMood,
	];

	module.exports = {
		name: 'tags:retrieval:tf:full',
		description: {
			long: 'Tags retrieval: Getting tag values for different-sized tags.',
			short: 'Tags retrieval TF tags.'
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