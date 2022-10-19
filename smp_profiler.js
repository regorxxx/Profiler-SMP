'use strict';
//18/10/22
include('helpers\\callbacks_xxx.js');
include('helpers\\smp_profiler_helper.js');
include(fb.ComponentPath + 'docs\\Flags.js');

// Load profiles
smpProfiler.loadProfiles(fb.ProfilePath + 'scripts\\SMP\\xxx-scripts\\helpers\\profiler\\', 
	[	// Skip these methods (too slow)
		'concatForUnshift', 
		'concatReduceRight', 
		'concatApplyUnshift', 
		'concatReduce',
		'copyAppendLiteral',
		'copyNewArray',
		'getFileInfoHandle'
	].filter(Boolean));

// Tests files
const options = [
	{
		iterations: 100,
		magnitude: 10000,
		memory: false,
		profiles: [
			'array concatenation',
			'array copying',
			'loops'
		],
		bRepaint: true,
		type: 'table'
	},
	{
		iterations: 100,
		magnitude: 50000,
		memory: false,
		profiles: [
			'comparison operators',
			'comparison statements',
			'(de-)composition',
			'guards',
			'map:access',
			'map:creation',
			'object iteration'
		],
		bRepaint: true,
		type: 'table'
	},
	{
		iterations: 100,
		magnitude: 200,
		memory: false,
		profiles: [
			'recursion'
		],
		bRepaint: true,
		type: 'table'
	},
	{
		iterations: 100,
		magnitude: 50000,
		memory: false,
		profiles: [
			'split'
		],
		bRepaint: true,
		type: 'table'
	},
	{
		iterations: 10,
		magnitude: 50000,
		memory: true,
		profiles: [
			'tags:retrieval:info'
		],
		bRepaint: true,
		type: 'table'
	},
	{
		iterations: 100,
		magnitude: 50000,
		memory: true,
		profiles: [
			'tags:retrieval:tf'
		],
		bRepaint: true,
		type: 'table'
	}
];

// UI
const font = gdi.Font('Segoe UI', 50);
addEventListener('on_paint', (gr) => {
	const w = window.Width / 2;
	const h = window.Height;
	const center = DT_VCENTER | DT_CENTER | DT_END_ELLIPSIS | DT_CALCRECT | DT_NOPREFIX;
	gr.FillSolidRect(0, 0, w, h, 0xFFF0F8FF) // AliceBlue
	gr.FillSolidRect(w, 0, w * 2, h, 0xFFFFF8DC) // Cornsilk
	gr.GdiDrawText(smpProfiler.progress !== null ? smpProfiler.progress + '%' : 'Run', font, 0xFF000000, 0, 0, w, h, center);
	gr.GdiDrawText('Settings', font, 0xFF000000, w, 0, w, h, center);
});

addEventListener('on_mouse_lbtn_up', (x, y, mask) => {
	const w = window.Width / 2;
	const h = window.Height;
	if (x <= w) {
		options.forEach((opt) => {smpProfiler.runAndReport(opt);});
	} else {
		let input = {};
		try {
			input = JSON.parse(utils.InputBox(window.ID, 'Edit options:\n(multiple tests may be added to the array)', 'SMP Profiler', JSON.stringify(options), true));
			for (let key in input) {options[key] = input[key];}
		} catch(e) {
			fb.ShowPopupMessage(e, 'JSON error'); 
		}
	}
});