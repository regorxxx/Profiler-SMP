'use strict';
//20/10/22
const module = {exports: {}};
include('smp_profiler_data.js');
include('..\\helpers-external\\easy-table-1.2.0\\table.js'); const Table = module.exports;

const popup = {ok : 0, yes_no : 4, yes : 6, no : 7, stop : 16, question : 32, info : 64};
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
	if (!utils.IsDirectory(folderPath)) {return [];}
	return utils.Glob(folderPath + '*.*').filter((item) => {
		return extensionSet.has('.' + item.split('.').pop().toLowerCase());
	});
}

function setProfilesPath(def = fb.ProfilePath + 'scripts\\SMP\\xxx-scripts\\helpers\\profiler\\') {
	try {
		const input = utils.InputBox(window.ID, 'Edit profiles path:\n(Don\'t try to load other JS files!)\n\nNot changing the path will reload the profiles from folder.', 'SMP Profiler', settings.path || def, true);
		if (!utils.IsDirectory(input)) {
			fb.ShowPopupMessage('Folder not found:\n' + input, 'Folder error');
			return null;
		}
		return input;
	} catch (e) {
		if (e.message.indexOf('Dialog window was closed') === -1) {
			fb.ShowPopupMessage(e, 'JSON error');
		}
		return null;
	}
	return null;
}

// Profiler
const profiler = async (options) => {
	const profile = async (fn, data) => {
		let time = 0, heap = 0;
		const t = new FbProfiler('test');
		await new Promise((resolve) => {
			setTimeout(() => {
				t.Reset();
				const heapUsedStart = window.JsMemoryStats.MemoryUsage;
				fn(data);
				time = t.Time;
				heap = window.JsMemoryStats.MemoryUsage - heapUsedStart;
				resolve();
			}, 2);
		});
		return {
			time,
			heap
		};
	};
	const result = await profile(options.fn, options.data);
	return (options.memory ? result : {time: result.time});
};

function ProfileRunner({profiles, iterations, magnitude, memory, parent = null, bRepaint = false}) {
	this.profiles = profiles.slice();
	this.iterations = iterations;
	this.magnitude = magnitude;
	this.memory = memory;
	this.results = [];
	
	const fnLen = this.profiles.reduce((total, profile) => {return total + profile.functions.length;}, 0);
	let currFn = null;
	
	this.updateProgress = async (val) => {
		if (parent) {
			parent.progress = val !== null ? Math.round(val) : null;
			if (bRepaint) {window.Repaint();}
		}
	}
	
	this.run = async () => {
		this.updateProgress(0);
		try {
			const results = [];
			currFn = 0;
			for (const profile of this.profiles) {
				results.push(await this.runProfile(profile));
				// await new Promise(resolve => setTimeout(resolve, 500));
			}
			this.updateProgress(null);
			currFn = null;
			return results;
		} catch (e) {
			this.updateProgress(null);
			currFn = null;
		}
	};
	
	this.runProfile = async (profile) => {
		const testResults = [];
		for (const fn of profile.functions) {
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
		let d = data;
		if (!d) {
			if (func.testDataType) {
				d = testdata(func.testDataType, this.magnitude);
			} else {
				d = testdata(profile.testDataType, this.magnitude);
			}
		}

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
		
		for (let i = 0, duration, profile; i < this.iterations; i++) {
			profile = await profiler({
				fn: func.f,
				data: d,
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
		}
		
		result.time.average = result.time.total / this.iterations;
		if (this.memory) {
			result.memory.average = result.memory.total / this.iterations;
		}
		return result;
	}
}

const smpProfiler = {
	progress: null,
	profiles: [],
	tests: [],
	loadProfiles: function loadProfiles(folder, excludeNames = []) { // Will also clean all previous test results
		const tests = getFiles(folder, new Set(['.js']));
		this.profiles = tests.map((file) => {
			include(file);
			module.exports.functions = module.exports.functions.filter((fn) => {return !excludeNames.includes(fn.name);});
			return {...module.exports};
		});
		this.progress = null;
		this.tests = [];
	},
	list: function list() {
		return this.profiles.map((profile) => ({
			name: profile.name,
			description: profile.description,
			functions: profile.functions.map((f) => f.description)
		}));
	},
	getResults: function getResults(i = -1) {
		if (i >= this.getResultsNum()) {i = this.getResultsNum() - 1;}
		if (i < -1) {return null;}
		return (i === -1 ? this.tests : this.tests[i]);
	},
	getResultsNum: function getResultsNum() {
		return this.tests.length;
	},
	run: function run(opts) {
		this.tests = [];
		const options = {
			... {
				iterations: 1000,
				magnitude: 1000,
				memory: false,
				bRepaint: false,
				profiles: []  // All
			},
			...opts
		};
		let p = this.profiles.slice();
		if (options.profiles && Array.isArray(options.profiles) && options.profiles.length) {
			p = p.filter((profile) => {return options.profiles.includes(profile.name);});
		}
		// Check for dangerous options
		if (options.magnitude > 5000 && p.some((profile) => {return profile.name === 'recursion';})) {
			const WshShellUI = new ActiveXObject('WScript.Shell');
			const answer = WshShellUI.Popup('Warning: \'recursion\' profile requires a lot of memory.\nMagnitude settings greater than 5000 may produce crashes.\nDo you want to continue?', 0, window.ScriptInfo.Name, popup.question + popup.yes_no);
			if (answer === popup.no) {
				return new Promise((resolve) => { // Output empty test
					return this.tests[this.tests.push({results: [], options}) - 1];
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
			return this.tests[this.tests.push({results: resolve, options}) - 1];
		});
	},
	reportTest: function reportTest(test = this.tests.slice(-1)[0], type = 'json') { // Single test report
		const bMemory = test.options.memory;
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
					if (bMemory) {t.cell('Memory (MB)', val.memory.maximum / 1000, Table.number(2));}
					t.newRow();
				});
				const summaryData = [
					{Name: 'Profile name', 				Value: profName},
					{Name: 'Data type', 				Value: result.profile.testDataType},
					{Name: 'Data size', 				Value: test.options.magnitude},
					{Name: 'Iterations', 				Value: test.options.iterations},
					{Name: 'Fastest method',			Value: sortTime[0].func.name},
					{Name: 'Time (ms)',					Value: sortTime[0].time.average},
					{Name: 'Slowest method',			Value: sortTime.slice(-1)[0].func.name},
					{Name: 'Time (ms)',					Value: sortTime.slice(-1)[0].time.average},
				];
				if (bMemory) {
					summaryData.push(
						{Name: 'Highest mem. usage method',	Value: sortMem[0].func.name},
						{Name: 'Memory (bytes)',			Value: sortMem[0].memory.maximum},
						{Name: 'Lowest mem. usage method',	Value: sortMem.slice(-1)[0].func.name},
						{Name: 'Memory (bytes)',			Value: sortMem.slice(-1)[0].memory.maximum}
					);
				}
				const tables = [
					{name: 'Method list: ' + profName, value: t.toString()},
					{name: 'Summary: ' + profName, value: Table.print(summaryData)}
				];
				tables.forEach((report) => fb.ShowPopupMessage(report.value, report.name));
				return tables;
			} else if (type.startsWith('json')) {
				const fastest = sortTime.filter((a, i, arr) => a.time.average === arr[0].time.average);
				const smallest = bMemory ? sortTime.filter((a, i, arr) => a.memory.maximum === arr[0].memory.maximum) : null;
				const summaryData = [
					{name: 'Raw report: ' + profName, value: sortTime},
					{name: 'Fastest method: ' + profName, value: fastest},
				];
				if (bMemory) {
					summaryData.push(
						{name: 'Less memory usage method: ' + profName, value: smallest}
					);
				}
				if (type === 'json-popup') {summaryData.forEach((report) => fb.ShowPopupMessage(JSON.stringify(report.value, null, '\t'), report.name));}
				return summaryData;
			} else {
				fb.ShowPopupMessage('Report type not recognized: ' + type, profName); 
				return [];
			}
		});
	},
	report: function report(tests = this.tests.slice(-1), type = 'json') { // Report for all tests done on session
		return tests.map((test) => {return this.reportTest(test, type);});
	},
	runAndReport: function runAndReport(opts, type = opts.type || 'json') { // Run one test and report immediately
		return this.run(opts).then((test) => {
			this.reportTest(test, type);
		});
	}
};