'use strict';
//16/06/25

/* exported smpProfiler, skipProfiles, setProfilesPath */

var module = { exports: {} }; // NOSONAR
include('smp_profiler_data.js');
/* global testData:readable, copyData:readable, shuffleData:readable, initData:readable */
/* global settings:readable */
include('..\\..\\helpers-external\\easy-table-1.2.0\\table.js'); const Table = module.exports;

// Add ES2022 method
// https://github.com/tc39/proposal-accessible-object-hasownproperty
if (!Object.hasOwn) {
	Object.defineProperty(Object, 'hasOwn', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: function (object, property) {
			if (object === null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}
			return Object.prototype.hasOwnProperty.call(Object(object), property); // NOSONAR
		}
	});
}

if (!Promise.wait) {
	Object.defineProperty(Promise, 'wait', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: (ms) => {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
	});
}

function getRoot(bRelative = true) {
	if (window.ScriptInfo.PackageId) {
		return utils.GetPackageInfo(window.ScriptInfo.PackageId).Directories.Root.replace((bRelative ? fb.ProfilePath : ''), '');
	} else {
		try { include(''); }
		catch (e) {
			return e.message.replace('include failed:\nPath does not point to a valid file: ', '')
				.replace((bRelative ? fb.ProfilePath : ''), '')
				.replace(/(helpers|main\\profiler)\\$/, ''); // Required since include() points to this file (not the main one)
		}
	}
};

const popup = { ok: 0, yes_no: 4, yes: 6, no: 7, stop: 16, question: 32, info: 64 };
const skipProfiles = [	// Skip these methods (too slow), don't bring new info...
	'concatForUnshift',
	'concatReduceRight',
	'concatApplyUnshift',
	'concatReduce',
	'copyAppendLiteral',
	'copyNewArray',
	'getFileInfoHandle'
].filter(Boolean);

// File helpers
function getFiles(folderPath, extensionSet) {
	if (!utils.IsDirectory(folderPath)) { return []; }
	return utils.Glob(folderPath + '*.*').filter((item) => {
		return extensionSet.has('.' + item.split('.').pop().toLowerCase());
	});
}

function setProfilesPath(def = getRoot(false) + 'helpers\\profiler\\') {
	try {
		const input = utils.InputBox(window.ID, 'Edit profiles path:\n(Don\'t try to load other JS files!)\n\nNot changing the path will reload the profiles from folder.', 'SMP Profiler', settings.path || def, true);
		if (!utils.IsDirectory(input)) {
			fb.ShowPopupMessage('Folder not found:\n' + input, 'Folder error');
			return null;
		}
		return input;
	} catch (e) {
		if (!e.message.includes('Dialog window was closed')) {
			fb.ShowPopupMessage(e, 'JSON error');
		}
		return null;
	}
}

// Object helpers
Set.prototype.difference = function (setB) { // NOSONAR
	let difference = new Set(this);
	for (let elem of setB) {
		difference.delete(elem);
	}
	return difference;
};

function compareKeys(a, b) {
	const aKeys = Object.keys(a).sort((a, b) => a.localeCompare(b));
	const bKeys = Object.keys(b).sort((a, b) => a.localeCompare(b));
	return [...new Set(aKeys).difference(new Set(bKeys))];
}

// Profiler
const profiler = async (options) => {
	const profile = async (fn, data, toBe = void (0)) => {
		let time = 0, heap = 0, now = 0, bSucess = true, temp, out = [];
		await new Promise((resolve) => {
			if (typeof toBe !== 'undefined') {
				setTimeout(async () => {
					try {
						now = Date.now();
						const heapUsedStart = window.JsMemoryStats.MemoryUsage;
						temp = await fn(data);
						time = Date.now() - now;
						heap = window.JsMemoryStats.MemoryUsage - heapUsedStart;
						out.push(temp);
						bSucess = bSucess && (typeof toBe === 'function' ? toBe(temp, data) : toBe === temp);
					} catch (e) { // eslint-disable-line no-unused-vars
						bSucess = false;
						out.push(e.message);
					}
					resolve();
				}, 2);
			} else {
				setTimeout(() => {
					now = Date.now();
					const heapUsedStart = window.JsMemoryStats.MemoryUsage;
					fn(data);
					time = Date.now() - now;
					heap = window.JsMemoryStats.MemoryUsage - heapUsedStart;
					resolve();
				}, 2);
			}
		});
		return {
			time,
			heap,
			bSucess,
			out
		};
	};
	const result = await profile(options.fn, options.data, options.toBe);
	return (options.memory ? result : { time: result.time, bSucess: result.bSucess, output: result.out });
};

function ProfileRunner({ profiles, iterations, magnitude, memory, parent = null, bRepaint = false }) {
	this.profiles = profiles.slice();
	this.iterations = iterations;
	this.magnitude = magnitude;
	this.memory = memory;
	this.results = [];

	const fnLen = this.profiles.reduce((total, profile) => total + profile.functions.length, 0);
	let currFn = null;

	this.updateProgress = async (val) => {
		if (parent) {
			parent.progress = val !== null ? Math.round(val) : null;
			if (bRepaint) { window.Repaint(); }
		}
	};

	this.run = async () => {
		this.updateProgress(0);
		try {
			const results = [];
			currFn = 0;
			for (const profile of this.profiles) {
				results.push(await this.runProfile(profile));
			}
			this.updateProgress(null);
			currFn = null;
			return results;
		} catch (e) { // eslint-disable-line no-unused-vars
			this.updateProgress(null);
			currFn = null;
		}
	};

	this.runProfile = async (profile) => {
		const testResults = [];
		for (const fn of profile.functions) {
			await Promise.wait(500); // Let GC do its work
			testResults.push(await this.runFunction(profile, fn));
			this.updateProgress(++currFn / fnLen * 100);
		}
		const result = {
			profile,
			testResults
		};
		return result;
	};

	this.runFunction = async (profile, func, data) => {
		const type = func.testDataType || profile.testDataType;
		const d = profile.shuffleData
			? shuffleData(data || testData(type, this.magnitude, void (0), void (0), parent ? parent.path : fb.ProfilePath), type)
			: data || testData(type, this.magnitude, void (0), void (0), parent ? parent.path : fb.ProfilePath);

		const result = {
			time: {
				average: 0.0,
				maximum: -Infinity,
				minimum: Infinity,
				total: 0.0
			},
			func
		};

		if (this.memory) {
			result.memory = {
				total: 0.0,
				average: 0.0,
				minimum: Infinity,
				maximum: -Infinity
			};
		}

		const bHasAssert = Object.hasOwn(func, 'toBe');
		if (bHasAssert) {
			result.bSucess = true;
		}

		const bCopyData = profile.copyData;
		const wait = profile.waitBetweenRuns || 0;
		for (let i = 0, duration, profile; i < this.iterations; i++) {
			if (wait && i % wait === 0) { await Promise.wait(100); } // Let GC do its work
			profile = await profiler({
				fn: func.f,
				data: bCopyData ? copyData(d, type) : d,
				toBe: bHasAssert ? func.toBe : void (0),
				memory: this.memory
			});
			duration = profile.time;
			result.time.total += duration;
			if (this.memory) {
				result.memory.total += profile.heap;
				if (profile.heap < result.memory.minimum) {
					result.memory.minimum = profile.heap;
				}
				if (profile.heap > result.memory.maximum) {
					result.memory.maximum = profile.heap;
				}
			}
			if (duration < result.time.minimum) {
				result.time.minimum = duration;
			}
			if (duration > result.time.maximum) {
				result.time.maximum = duration;
			}
			if (bHasAssert && !profile.bSucess) {
				result.bSucess = false;
				fb.ShowPopupMessage(
					'Name:\t\t' + func.name +
					'\nDescription:\t' + func.description +
					'\nExpected:\t' + func.toBe +
					'\n\nOutput: ' + profile.out.toString(),
					'Test failed: ' + func.name
				);
			}
		}

		result.time.average = result.time.total / this.iterations;
		if (this.memory) {
			result.memory.average = result.memory.total / this.iterations;
		}
		return result;
	};
}

const smpProfiler = {
	progress: null,
	path: '',
	profiles: [],
	tests: [],
	loadProfiles: function loadProfiles(folder, excludeNames = []) { // Will also clean all previous test
		const tests = getFiles(folder, new Set(['.js']));
		this.profiles = tests.map((file) => {
			include(file);
			module.exports.functions = module.exports.functions.filter((fn) => !excludeNames.includes(fn.name));
			return { ...module.exports };
		});
		this.progress = null;
		this.tests = [];
		this.path = folder;
	},
	list: function list() {
		return this.profiles.map((profile) => ({
			name: profile.name,
			description: profile.description,
			functions: profile.functions.map((f) => f.description)
		}));
	},
	getResults: function getResults(i = -1) {
		if (i >= this.getResultsNum()) { i = this.getResultsNum() - 1; }
		if (i < -1) { return null; }
		return (i === -1 ? this.tests : this.tests[i]);
	},
	getResultsNum: function getResultsNum() {
		return this.tests.length;
	},
	getDefaultOptions: function getDefaultOptions(profileName) {
		if (Array.isArray(profileName)) { return profileName.map((p) => this.getDefaultOptions(p)); }
		let defaultProfileOptions = {};
		const currProfile = this.profiles.find((profile) => profile.name === profileName);
		if (Object.hasOwn(currProfile, 'defaultOptions')) { defaultProfileOptions = currProfile.defaultOptions || {}; }
		return defaultProfileOptions;
	},
	hasDefaultOptions: function hasDefaultOptions(profileName) {
		if (Array.isArray(profileName)) { return profileName.map((p) => this.hasDefaultOptions(p)); }
		const currProfile = this.profiles.find((profile) => profile.name === profileName);
		return Object.hasOwn(currProfile, 'defaultOptions') && currProfile.defaultOptions;
	},
	// Merge single profile tests options with defaults if available. Adds an inherited flag in such case
	mergeOptions: function mergeOptions(options) {
		return options.map((oldOpt) => {
			const hasDefault = oldOpt.profiles.length === 1 && this.hasDefaultOptions(oldOpt.profiles[0]);
			let newOpt = hasDefault ? { ...this.getDefaultOptions(oldOpt.profiles[0]), ...oldOpt } : oldOpt;
			if (!Object.hasOwn(newOpt, 'memory')) { newOpt.memory = false; }
			if (!Object.hasOwn(newOpt, 'bRepaint')) { newOpt.bRepaint = true; }
			if (!Object.hasOwn(newOpt, 'type')) { newOpt.type = 'json'; }
			const different = compareKeys(newOpt, oldOpt);
			if (newOpt !== oldOpt && different.length) { newOpt = { inherited: different.join(', '), ...newOpt }; }
			return newOpt;
		});
	},
	reportSettings: function reportSettings(options, bPopup = true) {
		const currSettings = this.mergeOptions(options.slice());
		const profiles = new Set(currSettings.map((o) => o.profiles).flat(Infinity));
		const currSettingsStr = JSON.stringify(currSettings, null, '\t').replace(/"inherited": (.*),/g, '// Inherited $1 from default settings');
		const message = 'Total tests: ' + currSettings.length +
			'\n\nProfiles: ' + currSettings.map((o) => o.profiles).flat(Infinity).join(', ') +
			'\n\nFunctions: ' + this.profiles.filter((p) => profiles.has(p.name)).map((p) => p.functions.map((f) => f.name)).flat(Infinity).join(', ') +
			'\n\nOptions:\n' + currSettingsStr;
		if (bPopup) { fb.ShowPopupMessage(message, 'Tests list'); }
		return message;
	},
	run: function run(opts) {
		initData();
		this.tests = [];
		// Check if there is a recommended setup
		let defaultProfileOptions = {};
		if (opts.profiles && Array.isArray(opts.profiles) && opts.profiles.length === 1) {
			defaultProfileOptions = this.getDefaultOptions(opts.profiles[0]) || {};
		}
		// Set options
		const options = {
			... {
				iterations: 1000,
				magnitude: 1000,
				memory: false,
				bRepaint: true,
				profiles: [],  // All,
				type: 'json'
			},
			...defaultProfileOptions,
			...opts
		};
		let p = this.profiles.slice();
		if (options.profiles && Array.isArray(options.profiles) && options.profiles.length) {
			p = p.filter((profile) => options.profiles.includes(profile.name));
		}
		// Check for dangerous options
		if (options.magnitude > 5000 && p.some((profile) => profile.name === 'recursion')) {
			const WshShellUI = new ActiveXObject('WScript.Shell');
			const answer = WshShellUI.Popup('Warning: \'recursion\' profile requires a lot of memory.\nMagnitude settings greater than 5000 may produce crashes.\nDo you want to continue?', 0, window.ScriptInfo.Name, popup.question + popup.yes_no);
			if (answer === popup.no) {
				return new Promise(() => { // Output empty test
					return this.tests[this.tests.push({ results: [], options }) - 1];
				});
			}
		}
		// Run
		const profileRunner = new ProfileRunner({
			iterations: options.iterations,
			magnitude: options.magnitude,
			memory: options.memory,
			profiles: p,
			parent: this,
			bRepaint: options.bRepaint
		});
		return profileRunner.run().then((resolve) => { // Output the last test
			return this.tests[this.tests.push({ results: resolve, options }) - 1];
		});
	},
	reportTest: function reportTest(test = this.tests.slice(-1)[0], type = 'json') { // Single test report
		const bMemory = test.options.memory;
		const bHasAssert = test.results.some((result) => result.testResults.some((val) => Object.hasOwn(val, 'bSucess')));
		return test.results.map((result) => {
			const profName = result.profile.name;
			const data = result.testResults;
			const sortTime = data.slice().sort((a, b) => a.time.average - b.time.average);
			const sortMem = bMemory ? data.slice().sort((a, b) => a.memory.maximum - b.memory.maximum) : null;
			if (type === 'table') {
				const t = new Table;
				sortTime.forEach((val) => {
					t.cell('Method Name', val.func.name);
					t.cell('Avg (ms)', val.time.average, Table.number(2));
					t.cell('Max (ms)', val.time.maximum, Table.number(2));
					t.cell('Total (ms)', val.time.total, Table.number(2));
					if (bMemory) { t.cell('Memory (MB)', val.memory.maximum / 1000, Table.number(2)); }
					if (bMemory) { t.cell('Memory (MB)', val.memory.maximum / 1000, Table.number(2)); }
					if (bHasAssert) { t.cell('Passed', val.bSucess); }
					t.newRow();
				});
				const summaryData = [
					{ Name: 'Profile name', Value: profName },
					{ Name: 'Data type', Value: result.profile.testDataType },
					{ Name: 'Data size', Value: test.options.magnitude },
					{ Name: 'Iterations', Value: test.options.iterations },
					{ Name: 'Fastest method', Value: sortTime[0].func.name },
					{ Name: 'Time (ms)', Value: sortTime[0].time.average },
					{ Name: 'Slowest method', Value: sortTime.slice(-1)[0].func.name },
					{ Name: 'Time (ms)', Value: sortTime.slice(-1)[0].time.average },
				];
				if (bMemory) {
					summaryData.push(
						{ Name: 'Highest mem. usage method', Value: sortMem[0].func.name },
						{ Name: 'Memory (bytes)', Value: sortMem[0].memory.maximum },
						{ Name: 'Lowest mem. usage method', Value: sortMem.slice(-1)[0].func.name },
						{ Name: 'Memory (bytes)', Value: sortMem.slice(-1)[0].memory.maximum }
					);
				}
				if (bHasAssert) {
					summaryData.push(
						{ Name: 'All passed', Value: sortTime.every((val) => val.bSucess) }
					);
				}
				const tables = [
					{ name: 'Method list: ' + profName, value: t.toString() },
					{ name: 'Summary: ' + profName, value: Table.print(summaryData) }
				];
				tables.forEach((report) => fb.ShowPopupMessage(report.value, report.name));
				return tables;
			} else if (type.startsWith('json')) {
				const fastest = sortTime.filter((a, i, arr) => a.time.average === arr[0].time.average);
				const smallest = bMemory ? sortTime.filter((a, i, arr) => a.memory.maximum === arr[0].memory.maximum) : null;
				const summaryData = [
					{ name: 'Raw report: ' + profName, value: sortTime },
					{ name: 'Fastest method: ' + profName, value: fastest },
				];
				if (bMemory) {
					summaryData.push(
						{ name: 'Less memory usage method: ' + profName, value: smallest }
					);
				}
				if (type === 'json-popup') { summaryData.forEach((report) => fb.ShowPopupMessage(JSON.stringify(report.value, null, '\t'), report.name)); }
				return summaryData;
			} else if (type.startsWith('csv')) {
				let t = [];
				t.push('Method Name,Avg (ms),Max (ms),Total (ms)' + (bMemory ? ',Memory (MB)' : ''));
				sortTime.forEach((val) =>
					t.push(val.func.name + ',' + val.time.average + ',' + val.time.maximum + ',' + val.time.total + (bMemory ? ',' + val.memory.maximum / 1000 : ''))
				);
				const summaryData = [
					{ name: 'Raw report: ' + profName, value: t.join('\n') },
				];
				if (type === 'csv-popup') { summaryData.forEach((report) => fb.ShowPopupMessage(report.value, report.name)); }
				return summaryData;
			} else {
				fb.ShowPopupMessage('Report type not recognized: ' + type, profName);
				return [];
			}
		});
	},
	report: function report(tests = this.tests.slice(-1), type = 'json') { // Report for all tests done on session
		return tests.map((test) => this.reportTest(test, type));
	},
	runAndReport: function runAndReport(opts, type = opts.type || 'json') { // Run one test and report immediately
		return this.run(opts).then((test) =>
			this.reportTest(test, type)
		);
	}
};