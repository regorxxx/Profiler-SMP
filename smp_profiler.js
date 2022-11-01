'use strict';
//01/11/22
include('helpers\\callbacks_xxx.js');
include('helpers\\smp_profiler_helper.js');
include(fb.ComponentPath + 'docs\\Flags.js');

window.DefineScript('Profiler-SMP', {author: 'XXX', version: '1.0.0'});

// Default settings forr all tests and memory for Foobar2000 ones
const defaultOptions = [
		'array concatenation', 'array copying',
		'loops', 'comparison operators',
		'comparison statements', '(de-)composition',
		'guards', 'map:access', 'map:creation',
		'object iteration', 'recursion', 'split'
	].map((profile) => {return {profiles: [profile], memory: false, type: 'table'};})
	.concat([
		{profiles: ['tags:retrieval:info'], memory: true, type: 'table'}, 
		{profiles: ['tags:retrieval:tf'], memory: true, type: 'table'}
	]);
const settings = {
	path: window.GetProperty('Profiles path'),
	font: gdi.Font('Segoe UI', 50),
	options: JSON.parse(JSON.stringify(defaultOptions))
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
	gr.FillSolidRect(w * 3/2, h/ 2, w * 2, h / 2, 0xFFBC8F8F) // RosyBrown
	gr.GdiDrawText(smpProfiler.progress !== null ? smpProfiler.progress + '%' : 'Run' + (!settings.path ? '\n(set profiles path first)' : ''), settings.font, 0xFF000000, 0, 0, w, h, center);
	gr.GdiDrawText('Profiles path', settings.font, 0xFF000000, w, 0, w, h / 2, center);
	gr.GdiDrawText('Test Settings', settings.font, 0xFF000000, w,  h / 2, w/2,  h / 2, center);
	gr.GdiDrawText('Reset Settings', settings.font, 0xFF000000, w * 3/2,  h / 2, w/2,  h / 2, center);
});

addEventListener('on_mouse_lbtn_up', (x, y, mask) => {
	const w = window.Width / 2;
	const h = window.Height;
	if (x <= w) {
		if (!settings.path || !utils.IsDirectory(settings.path)) { 
			on_mouse_lbtn_up(w + 1, 0);
		} else {
			// Retrieve default settings to also inform the user about inherited ones
			smpProfiler.reportSettings(settings.options);
			const WshShellUI = new ActiveXObject('WScript.Shell');
			const answer = WshShellUI.Popup('Tests will be run during some minutes.\nWindow will appear to be blocked.\nCheck popup for full list, do you want to continue?', 0, window.ScriptInfo.Name, popup.question + popup.yes_no);
			if (answer === popup.yes) {
				settings.options.forEach((opt) => {smpProfiler.runAndReport(opt);});
			};
		}
	} else {
		if (y >= h/2) {
			if (x >= w * 3/2) {
				const WshShellUI = new ActiveXObject('WScript.Shell');
				const answer = WshShellUI.Popup('Restore default tests?\n(Profiles path will not be changed)', 0, window.ScriptInfo.Name, popup.question + popup.yes_no);
				if (answer === popup.yes) {
					settings.options = JSON.parse(JSON.stringify(defaultOptions));
					window.SetProperty('Test options', JSON.stringify(settings.options));
				};
			} else {
				let input = {};
				try {
					input = JSON.parse(utils.InputBox(window.ID, 'Edit options:\n(multiple tests may be added to the array)', 'SMP Profiler', JSON.stringify(settings.options), true));
					settings.options = input;
					window.SetProperty('Test options', JSON.stringify(settings.options));
				} catch (e) {
					if (e.message.indexOf('Dialog window was closed') === -1) {
						fb.ShowPopupMessage(e, 'JSON error');
					}
				}
			}
		} else {
			const input = setProfilesPath();
			if (input) {
				smpProfiler.loadProfiles(input, smpProfiler.loadProfiles(settings.path, skipProfiles));
				settings.path = input;
				window.SetProperty('Profiles path', settings.path);
				window.Repaint();
			}
		}
	}
});