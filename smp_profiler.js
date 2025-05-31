'use strict';
//30/05/25

include('main\\profiler\\smp_profiler_helper.js');
/* global setProfilesPath:readable, smpProfiler:readable, skipProfiles:readable */
include('helpers\\callbacks_xxx.js');
include(fb.ComponentPath + 'docs\\Flags.js');
/* global DT_VCENTER:readable, DT_CENTER:readable, DT_END_ELLIPSIS:readable, DT_CALCRECT:readable, DT_NOPREFIX:readable, popup:readable, MK_SHIFT:readable */

if (!window.ScriptInfo.PackageId) { window.DefineScript('Profiler-SMP', { author: 'XXX', version: '1.1.0' }); }

// Default settings for all tests and memory for Foobar2000 ones
const settings = {
	path: window.GetProperty('Profiles path'),
	font: gdi.Font('Segoe UI', 35),
	options: JSON.parse(JSON.stringify(
		[
			'array concatenation', 'array copying',
			'array sorting', 'loops', 'comparison operators',
			'comparison statements', '(de-)composition',
			'guards', 'map:access', 'map:creation',
			'object iteration', 'recursion', 'split', 'handlelist'
		].map((profile) => { return { profiles: [profile], memory: false, type: 'table' }; })
			.concat([
				{ profiles: ['real scripts'], memory: true, type: 'table' },
				{ profiles: ['tags:retrieval:info'], memory: true, type: 'table' },
				{ profiles: ['tags:retrieval:tf'], memory: true, type: 'table' },
				{ profiles: ['tags:retrieval:tf:full'], memory: true, type: 'table' }
			])
	))
};
const defaultOptions = JSON.stringify(settings.options);

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
} else { smpProfiler.loadProfiles(settings.path, skipProfiles); }

// UI
addEventListener('on_paint', (gr) => {
	const w = window.Width / 2;
	const h = window.Height;
	const center = DT_VCENTER | DT_CENTER | DT_END_ELLIPSIS | DT_CALCRECT | DT_NOPREFIX;
	gr.FillSolidRect(0, 0, w, h, 0xFFF0F8FF); // AliceBlue
	gr.FillSolidRect(w, 0, w * 2, h, 0xFFFFF8DC); // Cornsilk
	gr.FillSolidRect(w, h / 2, w * 2, h / 2, 0xFFDDA0DD); // Plum
	gr.FillSolidRect(w * 3 / 2, h / 2, w * 2, h / 2, 0xFFBC8F8F); // RosyBrown
	gr.GdiDrawText(
		smpProfiler.bIsRunning
			? (smpProfiler.progress || 0) + '%'
			: 'Run' + (!settings.path ? '\n(set profiles path first)' : ''), settings.font, 0xFF000000, 0, 0, w, h, center
	);
	gr.GdiDrawText('Profiles path', settings.font, 0xFF000000, w, 0, w, h / 2, center);
	gr.GdiDrawText('Test Settings', settings.font, 0xFF000000, w, h / 2, w / 2, h / 2, center);
	gr.GdiDrawText('Reset Settings', settings.font, 0xFF000000, w * 3 / 2, h / 2, w / 2, h / 2, center);
});

// Buttons
addEventListener('on_mouse_lbtn_up', (x, y, mask) => { // eslint-disable-line no-unused-vars
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
				smpProfiler.bIsRunning = true;
				if (mask === MK_SHIFT) {
					Promise.all(settings.options.map((opt) => smpProfiler.runAndReport(opt, 'csv')).flat(Infinity))
						.then((results) => {
							const report = 'Method Name,Avg (ms),Max (ms),Total (ms),Memory (MB)\n' +
								results.flat(Infinity)
									.map((report) => report.value
										.replace('Method Name,Avg (ms),Max (ms),Total (ms),Memory (MB)\n', '')
										.replace('Method Name,Avg (ms),Max (ms),Total (ms)\n', '')
									).join('\n');
							console.log(report);
							fb.ShowPopupMessage(report, 'Merged report');
						})
						.finally(() => smpProfiler.bIsRunning = false);;
				} else {
					Promise.all(settings.options.map((opt) => smpProfiler.runAndReport(opt)))
						.finally(() => smpProfiler.bIsRunning = false);
				}
			}
		}
	} else if (y >= h / 2) {
		if (x >= w * 3 / 2) {
			const WshShellUI = new ActiveXObject('WScript.Shell');
			const answer = WshShellUI.Popup('Restore default tests?\n(Profiles path will not be changed)', 0, window.ScriptInfo.Name, popup.question + popup.yes_no);
			if (answer === popup.yes) {
				settings.options = JSON.parse(defaultOptions);
				window.SetProperty('Test options', JSON.stringify(settings.options));
			}
		} else {
			let input = {};
			try {
				input = JSON.parse(utils.InputBox(window.ID, 'Edit options:\n(multiple tests may be added to the array)', 'SMP Profiler', JSON.stringify(settings.options), true));
				settings.options = input;
				window.SetProperty('Test options', JSON.stringify(settings.options));
			} catch (e) {
				if (!e.message.includes('Dialog window was closed')) {
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
});

// Tooltip
window.Tooltip.SetMaxWidth(500);
window.Tooltip.time = Date.now();
window.Tooltip.lastX = 0;
window.Tooltip.lastY = 0;
addEventListener('on_mouse_move', (x, y) => {
	const w = window.Width / 2;
	const h = window.Height;
	let text = '';
	if (x <= w) {
		text += smpProfiler.progress !== null
			? smpProfiler.progress + '%'
			: 'Run:' + (!settings.path ? '\n(set profiles path first)' : '');
		text += '\n--------------------------------------------------------------------------------------------------' +
			'\nTotal tests: ' + settings.options.length +
			'\nProfiles: ' + settings.options.map((o) => o.profiles.join(', ')).join(', ');
		text += '\n\n(L. click to run tests with current settings)';
		text += '\n(Shift + L. click to run tests and create CSV report)';
	} else if (y >= h / 2) {
		if (x >= w * 3 / 2) { text += 'Reset Settings'; }
		else { text = 'Test Settings'; }
	} else {
		text += 'Profiles path:';
		text += '\n--------------------------------------------------------------------------------------------------' +
			'\n' + settings.path;
	}
	if (text !== window.Tooltip.Text) { window.Tooltip.Text = text; window.Tooltip.Activate(); }
	setTimeout(() => { // Update tooltip without flickering
		const time = Date.now() - window.Tooltip.time;
		if (time > 250 && (Math.abs(window.Tooltip.lastX - x) >= 10 || Math.abs(window.Tooltip.lastY - y) >= 10)) {
			window.Tooltip.time = Date.now();
			window.Tooltip.TrackPosition(x, y);
			window.Tooltip.lastX = x;
			window.Tooltip.lastY = y;
			window.Tooltip.TrackActivate = true;
		}
	}, 100);
});

addEventListener('on_mouse_leave', () => {
	window.Tooltip.Text = '';
	window.Tooltip.Deactivate();
});

addEventListener('on_script_unload', () => {
	window.Tooltip.Deactivate();
});