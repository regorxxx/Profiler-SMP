﻿'use strict';
//20/10/22
include('helpers\\callbacks_xxx.js');
include('helpers\\smp_profiler_helper.js');
include(fb.ComponentPath + 'docs\\Flags.js');

window.DefineScript('Profiler-SMP', {author: 'XXX', version: '1.0.0'});

// Default settings
const settings = {
	path: window.GetProperty('Profiles path'),
	font: gdi.Font('Segoe UI', 50),
	options: [
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
			magnitude: 20000,
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
			magnitude: 20000,
			memory: false,
			profiles: [
				'split'
			],
			bRepaint: true,
			type: 'table'
		},
		{
			iterations: 10,
			magnitude: 20000,
			memory: true,
			profiles: [
				'tags:retrieval:info'
			],
			bRepaint: true,
			type: 'table'
		},
		{
			iterations: 100,
			magnitude: 20000,
			memory: true,
			profiles: [
				'tags:retrieval:tf'
			],
			bRepaint: true,
			type: 'table'
		}
	]
};

settings.options = JSON.parse(window.GetProperty('Test options', JSON.stringify(settings.options)));
if (!settings.path) {
	setTimeout(() => {
		settings.path = setProfilesPath();
		if (settings.path) {
			window.SetProperty('Profiles path', settings.path); 
			window.Repaint();
			smpProfiler.loadProfiles(settings.path, skipProfiles);
		}
	}, 100);
} else {smpProfiler.loadProfiles(settings.path, skipProfiles);}

// UI
addEventListener('on_paint', (gr) => {
	const w = window.Width / 2;
	const h = window.Height;
	const center = DT_VCENTER | DT_CENTER | DT_END_ELLIPSIS | DT_CALCRECT | DT_NOPREFIX;
	gr.FillSolidRect(0, 0, w, h, 0xFFF0F8FF) // AliceBlue
	gr.FillSolidRect(w, 0, w * 2, h, 0xFFFFF8DC) // Cornsilk
	gr.FillSolidRect(w, h/ 2, w * 2, h / 2, 0xFFDDA0DD) // Plum
	gr.GdiDrawText(smpProfiler.progress !== null ? smpProfiler.progress + '%' : 'Run' + (!settings.path ? '\n(set profiles path first)' : ''), settings.font, 0xFF000000, 0, 0, w, h, center);
	gr.GdiDrawText('Profiles path', settings.font, 0xFF000000, w, 0, w, h / 2, center);
	gr.GdiDrawText('Test Settings', settings.font, 0xFF000000, w,  h / 2, w,  h / 2, center);
});

addEventListener('on_mouse_lbtn_up', (x, y, mask) => {
	const w = window.Width / 2;
	const h = window.Height;
	if (x <= w) {
		if (!settings.path || !utils.IsDirectory(settings.path)) { 
			on_mouse_lbtn_up(w + 1, 0);
		} else {
			fb.ShowPopupMessage('Total tests: ' + settings.options.length + '\n\nProfiles: ' + settings.options.map((o) => o.profiles.join(', ')).join(', ') + '\n\nOptions:\n' + JSON.stringify(settings.options, null, '\t'), 'Tests list');
			const WshShellUI = new ActiveXObject('WScript.Shell');
			const answer = WshShellUI.Popup('Tests will be run during some minutes.\nWindow will appear to be blocked.\nCheck popup for full list, do you want to continue?', 0, window.ScriptInfo.Name, popup.question + popup.yes_no);
			if (answer === popup.yes) {
				settings.options.forEach((opt) => {smpProfiler.runAndReport(opt);});
			};
		}
	} else {
		if (y >= h/2) {
			let input = {};
			try {
				input = JSON.parse(utils.InputBox(window.ID, 'Edit options:\n(multiple tests may be added to the array)', 'SMP Profiler', JSON.stringify(settings.options), true));
				for (let key in input) {settings.options[key] = input[key];}
				window.SetProperty('Test options', JSON.stringify(settings.options));
			} catch (e) {
				if (e.message.indexOf('Dialog window was closed') === -1) {
					fb.ShowPopupMessage(e, 'JSON error');
				}
			}
		} else {
			const input = setProfilesPath();
			if (input && input !== settings.path) {
				smpProfiler.loadProfiles(input, smpProfiler.loadProfiles(settings.path, skipProfiles));
				settings.path = input;
				window.SetProperty('Profiles path', settings.path);
				window.Repaint();
			}
		}
	}
});