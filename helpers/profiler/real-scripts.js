'use strict';
//28/05/25
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

	const gFont = gdi.Font('Arial', 10);

	const tagMatching = {
		name: 'tagMatching',
		description: 'Gets tags from a handle list and finds matches by tag.',
		keywords: [
			'handleList',
			'TF',
			'method',
			'for',
			'loop',
			'array',
			'iteration',
			'map'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: (d) => {
			const tags = ['GENRE', 'STYLE', 'DATE'];
			const idx = new Map();
			getTFHandleListArray(d, tags).forEach((tag) => {
				tag.forEach((val, i) => {
					const len = val.length;
					if (len && val.some((v) => v.startsWith('H'))) {
						let arr = idx.get(tag);
						if (!arr) { arr = []; idx.set(tag, arr); }
						arr.push(i);
					}
				});
			});
		},
		testDataType: 'handleListCached'
	};

	const getTimestamps = {
		name: 'getTimestamps',
		description: 'Gets listen timestamps from a handle list.',
		keywords: [
			'handleList',
			'TF',
			'method',
			'loop',
			'array',
			'iteration'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: (d) => {
			const tags = ['PLAYED_TIMES', '2003_TIMESTAMPS'];
			const listens = getTFHandleListArray(d, tags).map((tag) => tag.map((val) => new Date(val)));
			return listens;
		},
		testDataType: 'handleListCached'
	};

	const retrieveLibrary = {
		name: 'retrieveLibrary',
		description: 'Gets library items.',
		keywords: [
			'handleList',
			'library',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'fb.GetLibraryItems()',
		f: () => {
			return fb.GetLibraryItems();
		},
		testDataType: 'void'
	};

	const searchLibraryHandle = {
		name: 'searchLibraryHandle',
		description: 'Gets library items and makes an search of a handle.',
		keywords: [
			'handleList',
			'library',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'library.BSearch(d)',
		f: (d) => {
			const library = fb.GetLibraryItems();
			library.Sort();
			return library.BSearch(d);
		},
		testDataType: 'handleRandCached'
	};

	const intersectLibrary = {
		name: 'intersectLibrary',
		description: 'Gets library items and makes an intersection with a handle list.',
		keywords: [
			'handleList',
			'library',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'fb.GetLibraryItems().MakeIntersection(d)',
		f: (d) => {
			const library = fb.GetLibraryItems();
			library.Sort();
			d.Sort();
			return library.MakeIntersection(d);
		},
		testDataType: 'handleListRandCached',
		magnitude: 10000
	};

	const sortLibraryByPath = {
		name: 'sortLibraryByPath',
		description: 'Gets library items and sort them by path.',
		keywords: [
			'handleList',
			'library',
			'sort',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'library.OrderByPath()',
		f: (d) => {
			d.OrderByPath();
			return d;
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const sortLibraryByRand = {
		name: 'sortLibraryByRand',
		description: 'Gets library items and sort them randomly.',
		keywords: [
			'handleList',
			'library',
			'sort',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'libray.OrderByFormat(fb.TitleFormat(\'$rand()\'), 0)',
		f: (d) => {
			d.OrderByFormat(fb.TitleFormat('$rand()'), 0);
			return d;
		},
		testDataType: 'libraryCached',
		copyData: true
	};

	const queryLibraryAll = {
		name: 'queryLibraryAll',
		description: 'Gets library items by query and sorted randomly.',
		keywords: [
			'handleList',
			'library',
			'sort',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'fb.GetQueryItems(fb.GetLibraryItems(), \'ALL\')',
		f: () => {
			const hl = fb.GetQueryItems(fb.GetLibraryItems(), 'ALL');
			hl.OrderByFormat(fb.TitleFormat('$rand()'), 0);
			return hl;
		},
		testDataType: 'void'
	};

	const queryLibrarySemiRand = {
		name: 'queryLibrarySemiRand',
		description: 'Gets library items by a static semi-random query and sorted randomly.',
		keywords: [
			'handleList',
			'library',
			'sort',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: () => {
			const query = '"$ifgreater($crc32(%TITLE%),2147483647,1,0)" IS 1';
			const hl = fb.GetQueryItems(fb.GetLibraryItems(), query);
			hl.OrderByFormat(fb.TitleFormat('$rand()'), 0);
			return hl;
		},
		testDataType: 'void'
	};

	const queryLibraryRand = {
		name: 'queryLibraryRand',
		description: 'Gets library items by a random query and sorted randomly.',
		keywords: [
			'handleList',
			'library',
			'sort',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: () => {
			const rand = Math.round(Math.random() * (2 ** 32 - 1));
			const query = '"$ifgreater($crc32(%TITLE%),' + rand + ',1,0)" IS 1';
			const hl = fb.GetQueryItems(fb.GetLibraryItems(), query);
			hl.OrderByFormat(fb.TitleFormat('$rand()'), 0);
			return hl;
		},
		testDataType: 'void'
	};

	const queryLibraryComplex = {
		name: 'queryLibraryComplex',
		description: 'Gets library items by complex query and sorted randomly.',
		keywords: [
			'handleList',
			'library',
			'sort',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'fb.GetQueryItems(fb.GetLibraryItems(), ...)',
		f: () => {
			const query = '((((GENRE IS shoegaze OR GENRE IS sadcore OR GENRE IS post-punk OR GENRE IS emo rock OR GENRE IS darkwave OR GENRE IS gothic rock) OR (STYLE IS shoegaze OR STYLE IS sadcore OR STYLE IS post-punk OR STYLE IS emo rock OR STYLE IS darkwave OR STYLE IS gothic rock)) AND ((GENRE IS instrumental) OR (STYLE IS instrumental))) AND (%RATING% GREATER 2)) OR (((GENRE IS andro OR GENRE IS bourree OR GENRE IS bresse OR GENRE IS chapelloise OR GENRE IS circle OR GENRE IS farelquesh OR GENRE IS gavotte OR GENRE IS hanterdro OR GENRE IS kost ar c\'hoad OR GENRE IS laride OR GENRE IS mazurka OR GENRE IS jig OR GENRE IS plinn OR GENRE IS polka OR GENRE IS rond OR GENRE IS scottish OR GENRE IS tarantella OR GENRE IS tricot OR GENRE IS vals OR GENRE IS bal folk OR GENRE IS traditional european folk) OR (STYLE IS andro OR STYLE IS bourree OR STYLE IS bresse OR STYLE IS chapelloise OR STYLE IS circle OR STYLE IS farelquesh OR STYLE IS gavotte OR STYLE IS hanterdro OR STYLE IS kost ar c\'hoad OR STYLE IS laride OR STYLE IS mazurka OR STYLE IS jig OR STYLE IS plinn OR STYLE IS polka OR STYLE IS rond OR STYLE IS scottish OR STYLE IS tarantella OR STYLE IS tricot OR STYLE IS vals OR STYLE IS bal folk OR STYLE IS traditional european folk)) AND ((GENRE IS folk) OR (STYLE IS folk)) AND (((FEEDBACK IS 1) OR (%RATING% EQUAL 5))))';
			const hl = fb.GetQueryItems(fb.GetLibraryItems(), query);
			hl.OrderByFormat(fb.TitleFormat('$rand()'), 0);
			return hl;
		},
		testDataType: 'void'
	};

	const paintCover = {
		name: 'paintCover',
		description: 'Retrieves and draws a random track\'s cover',
		keywords: [
			'handle',
			'art',
			'gr',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: (d) => {
			const img = utils.GetAlbumArtV2(d);
			const bg = gdi.CreateImage(400, 400);
			const gr = bg.GetGraphics();
			gr.DrawImage(img, 0, 0, bg.Width, bg.Height, 0, 0, img.Width, img.Height, 0, 200);
			bg.ReleaseGraphics(gr);
			return bg;
		},
		testDataType: 'handleRandCached'
	};

	const paintGeometry = {
		name: 'paintGeometry',
		description: 'Draws text and elements on an image.',
		keywords: [
			'draw',
			'text',
			'gr',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: () => {
			const bg = gdi.CreateImage(400, 400);
			const art = gdi.CreateImage(200, 200);
			const gr = bg.GetGraphics();
			const text = 'Lorem ipsum dolor sit amet';
			const w = gr.CalcTextWidth(text, gFont);
			const h = gr.CalcTextHeight(text, gFont);
			gr.SetInterpolationMode(6); // HighQualityBilinear
			gr.DrawEllipse(0, 0, w, h, 5, 0xFFFFFFFF);
			gr.DrawEllipse(0, 0, bg.Width, bg.Height, 10, 0xFFFFFFFF);
			gr.DrawLine(0, 0, w, h, 5, 0xFFFFFFFF);
			gr.DrawLine(0, h, w, 0, 5, 0xFFFFFFFF);
			gr.GdiDrawText(text, gFont, 0xFFFFFFFF, 0, 0, w, h);
			gr.DrawImage(art, bg.Width - art.Width, bg.Height - art.Height, bg.Width, bg.Height, 0, 0, art.Width, art.Height, 5, 200);
			bg.ReleaseGraphics(gr);
			return bg;
		},
		testDataType: 'void'
	};

	const manipulateImage = {
		name: 'manipulateImage',
		description: 'Manipulates an image file.',
		keywords: [
			'handle',
			'art',
			'gr',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: (d) => {
			const img = gdi.Image(d);
			img.StackBlur(5);
			img.InvertColours();
			img.InvertColours();
			img.RotateFlip(6); // Rotate180FlipX
			img.GetColourSchemeJSON(4);
			return img;
		},
		testDataType: 'imagePath'
	};

	const fileAccess = {
		name: 'fileAccess',
		description: 'Retrieves text from a txt file.',
		keywords: [
			'file',
			'text',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: () => {
			const folder = fb.ProfilePath;
			const file = folder + 'version.txt';
			const files = utils.Glob(folder + '*.txt');
			if (!utils.IsFile(folder) && utils.IsDirectory(folder)) {
				if (utils.FileExists(file) && utils.IsFile(file) && !utils.IsDirectory(file)) {
					if (files.includes(file)) {
						const text = utils.ReadTextFile(file, 65001);
						return text;
					}
				}
			};
			return '';
		},
		testDataType: 'void'
	};

	const plsAccess = {
		name: 'plsAccess',
		description: 'Retrieves data and handles from playlists.',
		keywords: [
			'playlist',
			'handleList',
			'method'
		].sort((a, b) => a.localeCompare(b)),
		codeSample: 'See file',
		f: () => {
			const data = [];
			for (let i = 0; i < plman.PlaylistCount; i++) {
				data.push({
					handleList: plman.GetPlaylistItems(i),
					count: plman.PlaylistItemCount(i),
					name: plman.GetPlaylistName(i),
					locks: plman.GetPlaylistLockedActions(i),
					bLocked: plman.IsPlaylistLocked(i),
					bIsAutoPls: plman.IsAutoPlaylist(i)
				});
				data[i].fileSize = data[i].handleList.CalcTotalSize();
				data[i].duration = data[i].handleList.CalcTotalDuration();
			}
			return data;
		},
		testDataType: 'void'
	};

	const functions = [
		tagMatching,
		getTimestamps,
		retrieveLibrary,
		searchLibraryHandle,
		intersectLibrary,
		sortLibraryByRand,
		sortLibraryByPath,
		queryLibraryAll,
		queryLibraryComplex,
		queryLibrarySemiRand,
		queryLibraryRand,
		paintCover,
		paintGeometry,
		fileAccess,
		manipulateImage,
		plsAccess
	];

	module.exports = {
		name: 'real scripts',
		description: {
			long: 'Real scripts: Usual processing found on real-life scripts.',
			short: 'Real scripts.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords || [])
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], [])
		)].sort((a, b) => a.localeCompare(b)),
		functions,
		waitBetweenRuns: 20,
		defaultOptions: {
			'iterations': 200,
			'magnitude': 100000
		}
	};
}