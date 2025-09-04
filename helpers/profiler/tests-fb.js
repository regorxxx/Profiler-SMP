'use strict';
//04/09/25
/* global module:readable */
{
	const toType = (a) => {
		// Get fine type (object, array, function, null, error, date ...)
		return ({}).toString.call(a).match(/([a-z]+)(:?\])/i)[1];
	};

	const testPlaylist = (d) => {
		const idx = plman.CreatePlaylist(plman.PlaylistCount, 'test');
		plman.InsertPlaylistItems(idx, 0, d);
		return plman.ActivePlaylist = idx; // NOSONAR
	};

	const dropEffect = {
		none: 0,
		copy: 1,
		move: 2,
		link: 4,
		scroll: 0x80000000
	};

	const AlwaysOnTop = {
		name: 'AlwaysOnTop',
		description: 'Checks property matches menu',
		f: () => fb.AlwaysOnTop,
		toBe: (o) => o === fb.IsMainMenuCommandChecked('View/Always on Top'),
		testDataType: 'void'
	};

	const ComponentPath = {
		name: 'ComponentPath',
		description: 'Returns path to foo_spider_monkey_panel or foo_uie_jsplitter',
		f: () => fb.ComponentPath,
		toBe: (o) => o.endsWith('foo_spider_monkey_panel\\') || o.endsWith('foo_uie_jsplitter\\'),
		testDataType: 'void'
	};

	const CursorFollowPlayback = {
		name: 'CursorFollowPlayback',
		description: 'Checks property matches menu',
		f: () => fb.CursorFollowPlayback,
		toBe: (o) => o === fb.IsMainMenuCommandChecked('Playback/Cursor follows playback'),
		testDataType: 'void'
	};

	const FoobarPath = {
		name: 'FoobarPath',
		description: 'Checks property matches menu',
		f: () => fb.FoobarPath,
		toBe: (o) => o && o.length,
		testDataType: 'void'
	};

	const IsPaused = {
		name: 'IsPaused',
		description: 'Checks property matches menu',
		f: () => fb.IsPaused,
		toBe: (o) => o === fb.IsMainMenuCommandChecked('Playback/Pause'),
		testDataType: 'void'
	};

	const IsPlaying = {
		name: 'IsPlaying',
		description: 'Checks property matches menu',
		f: () => fb.IsPlaying,
		toBe: (o) => o === fb.IsMainMenuCommandChecked('Playback/Play'),
		testDataType: 'void'
	};

	const PlaybackFollowCursor = {
		name: 'PlaybackFollowCursor',
		description: 'Checks property matches menu',
		f: () => fb.PlaybackFollowCursor,
		toBe: (o) => o === fb.IsMainMenuCommandChecked('Playback/Playback follows cursor'),
		testDataType: 'void'
	};

	const PlaybackLength = {
		name: 'PlaybackLength',
		description: 'Checks playback length',
		f: () => fb.PlaybackLength,
		toBe: (o) => fb.IsPlaying ? o > 0 : true,
		testDataType: 'void'
	};

	const PlaybackTime = {
		name: 'PlaybackTime',
		description: 'Checks playback time',
		f: () => fb.PlaybackTime,
		toBe: (o) => fb.IsPlaying ? o > 0 : true,
		testDataType: 'void'
	};

	const ProfilePath = {
		name: 'ProfilePath',
		description: 'Checks playback time',
		f: () => fb.ProfilePath,
		toBe: (o) => o && o.length,
		testDataType: 'void'
	};

	const ReplaygainMode = {
		name: 'ReplaygainMode',
		description: 'Checks replaygain mode',
		f: () => fb.ReplaygainMode,
		toBe: (o) => o >= 0 && o <= 3,
		testDataType: 'void'
	};

	const StopAfterCurrent = {
		name: 'StopAfterCurrent',
		description: 'Checks property matches menu',
		f: () => fb.StopAfterCurrent,
		toBe: (o) => o === fb.IsMainMenuCommandChecked('Playback/Stop after current'),
		testDataType: 'void'
	};

	const Version = {
		name: 'Version',
		description: 'Checks property matches menu',
		f: () => fb.Version,
		toBe: (o) => utils.ReadTextFile(fb.ProfilePath + 'version.txt').endsWith(o),
		testDataType: 'void'
	};

	const Volume = {
		name: 'Volume',
		description: 'Checks property matches menu',
		f: () => fb.Volume = -100,
		toBe: (o) => o === fb.Volume,
		testDataType: 'void'
	};

	const AcquireUiSelectionHolder = {
		name: 'AcquireUiSelectionHolder',
		description: 'Checks property matches menu',
		f: () => fb.AcquireUiSelectionHolder(),
		toBe: (o) => o && toType(o) === 'FbUiSelectionHolder',
		testDataType: 'void'
	};

	const AddDirectory = {
		name: 'AddDirectory',
		description: 'Open modal window',
		f: () => fb.AddDirectory(),
		toBe: (o) => !o,
		testDataType: 'void'
	};

	const AddFiles = {
		name: 'AddFiles',
		description: 'Open modal window',
		f: () => fb.AddFiles(),
		toBe: (o) => !o,
		testDataType: 'void'
	};

	const CheckClipboardContents = {
		name: 'CheckClipboardContents',
		description: 'Checks if clipboard contents are handles',
		f: (d) => fb.CopyHandleListToClipboard(d) && fb.CheckClipboardContents(),
		toBe: true,
		testDataType: 'handleList'
	};

	const ClearPlaylist = {
		name: 'ClearPlaylist',
		description: 'Clears active playlist',
		f: (d) => {
			const idx = testPlaylist(d);
			fb.ClearPlaylist(idx);
			const count = plman.PlaylistItemCount(idx);
			plman.RemovePlaylistSwitch(idx);
			return count;
		},
		toBe: 0,
		testDataType: 'handleList'
	};

	const CopyHandleListToClipboard = {
		...CheckClipboardContents,
		name: 'CopyHandleListToClipboard'
	};

	const CreateContextMenuManager = {
		name: 'CreateContextMenuManager',
		description: 'Executes contextual menu on a handle list',
		f: (d) => {
			const menu = fb.CreateContextMenuManager();
			menu.InitContext(d);
			return menu.ExecuteByID(0);
		},
		toBe: true,
		testDataType: 'handleList'
	};

	const CreateHandleList = {
		name: 'CreateHandleList',
		description: 'Returns a handle list',
		f: () => fb.CreateHandleList(), // NOSONAR
		toBe: (o) => o instanceof FbMetadbHandleList && o.Count === 0,
		testDataType: 'void'
	};

	const CreateMainMenuManager = {
		name: 'CreateMainMenuManager',
		description: 'Returns a main menu manager instance',
		f: () => {
			const parent = window.CreatePopupMenu();
			const menu = fb.CreateMainMenuManager();
			menu.Init('view');
			menu.BuildMenu(parent, 0, 500);
			menu.ExecuteByID(0);
			return menu.ExecuteByID(0);
		},
		toBe: true,
		testDataType: 'void'
	};

	const CreateProfiler = {
		name: 'CreateProfiler',
		description: 'Returns a profiler instance',
		f: () => fb.CreateProfiler(),
		toBe: (o) => o instanceof FbProfiler,
		testDataType: 'void'
	};

	// DoDragDrop

	// Exit

	const GetClipboardContents = {
		name: 'GetClipboardContents',
		description: 'Returns a handle list',
		f: (d) => fb.CopyHandleListToClipboard(d) && fb.CheckClipboardContents()
			? fb.GetClipboardContents()
			: void (0),
		toBe: (o) => o && o instanceof FbMetadbHandleList && o.Count !== 0,
		testDataType: 'handleList'
	};

	const GetDSPPresets = {
		name: 'GetDSPPresets',
		description: 'Returns a JSON string',
		f: () => fb.GetDSPPresets(),
		toBe: (o) => o && o.length !== 0 && !!JSON.parse(o),
		testDataType: 'void'
	};

	const GetFocusItem = {
		name: 'GetFocusItem',
		description: 'Returns a handle',
		f: (d) => {
			const idx = testPlaylist(d);
			const o = fb.GetFocusItem(true);
			plman.RemovePlaylistSwitch(idx);
			return o;
		},
		toBe: (o) => o && toType(o) === 'FbMetadbHandle',
		testDataType: 'handleList'
	};

	const GetLibraryItems = {
		name: 'GetLibraryItems',
		description: 'Returns library items',
		f: () => fb.GetLibraryItems(),
		toBe: (o) => o && o instanceof FbMetadbHandleList && (o.Count !== 0 || !fb.IsLibraryEnabled()),
		testDataType: 'void'
	};

	const GetLibraryRelativePath = {
		name: 'GetLibraryRelativePath',
		description: 'Returns handle relative path',
		f: (d) => fb.GetLibraryRelativePath(d),
		toBe: (o) => o && (o.length !== 0 || !fb.IsLibraryEnabled()),
		testDataType: 'handle'
	};

	const GetNowPlaying = {
		name: 'GetNowPlaying',
		description: 'Returns handle',
		f: (d) => {
			plman.FlushPlaybackQueue();
			if (!fb.IsPlaying) {
				plman.AddItemToPlaybackQueue(d);
				fb.Play();
			};
			return new Promise((resolve) => setTimeout(() => resolve(fb.GetNowPlaying()), 1000))
				.finally(() => {
					plman.FlushPlaybackQueue();
					fb.Stop();
				});
		},
		toBe: (o) => o && toType(o) === 'FbMetadbHandle',
		testDataType: 'handle'
	};

	const GetOutputDevices = {
		name: 'GetOutputDevices',
		description: 'Returns a JSON string',
		f: () => fb.GetOutputDevices(),
		toBe: (o) => o && o.length !== 0 && !!JSON.parse(o),
		testDataType: 'void'
	};

	const GetQueryItems = {
		name: 'GetQueryItems',
		description: 'Returns handle list',
		f: (d) => fb.GetQueryItems(d, 'ALL'),
		toBe: (o) => o && o instanceof FbMetadbHandleList && o.Count !== 0,
		testDataType: 'library'
	};

	const GetSelection = {
		name: 'GetSelection',
		description: 'Returns handle',
		f: (d) => {
			const idx = testPlaylist(d);
			plman.SetPlaylistFocusItem(idx, 0);
			plman.SetPlaylistSelection(idx, d.Convert().map((h, i) => i), true);
			const out = fb.GetSelection();
			plman.RemovePlaylistSwitch(idx);
			return out;
		},
		toBe: (o) => o && toType(o) === 'FbMetadbHandle',
		testDataType: 'handleList'
	};

	const GetSelections = {
		name: 'GetSelections',
		description: 'Returns handle list',
		f: (d) => {
			const idx = testPlaylist(d);
			plman.SetPlaylistFocusItem(idx, 0);
			plman.SetPlaylistSelection(idx, d.Convert().map((h, i) => i), true);
			const out = fb.GetSelections();
			plman.RemovePlaylistSwitch(idx);
			return out;
		},
		toBe: (o) => o && o instanceof FbMetadbHandleList && (o.Count !== 0 || fb.GetSelectionType() === 0),
		testDataType: 'handleList'
	};

	const GetSelectionType = {
		name: 'GetSelectionType',
		description: 'Returns handle list',
		f: (d) => {
			const idx = testPlaylist(d);
			plman.SetPlaylistFocusItem(idx, 0);
			plman.SetPlaylistSelection(idx, d.Convert().map((h, i) => i), true);
			const out = fb.GetSelectionType();
			plman.RemovePlaylistSwitch(idx);
			return out;
		},
		toBe: (o) => o === 1,
		testDataType: 'handleList'
	};


	const IsLibraryEnabled = {
		name: 'IsLibraryEnabled',
		description: 'Returns boolean',
		f: () => fb.IsLibraryEnabled(),
		toBe: true,
		testDataType: 'void'
	};

	const IsMainMenuCommandChecked = {
		name: 'IsMainMenuCommandChecked',
		description: 'Returns boolean',
		f: () => fb.IsPlaying ? fb.IsMainMenuCommandChecked('Playback/Play') : fb.IsMainMenuCommandChecked('Playback/Stop'),
		toBe: true,
		testDataType: 'void'
	};

	const IsMetadbInMediaLibrary = {
		name: 'IsMetadbInMediaLibrary',
		description: 'Returns boolean',
		f: (d) => fb.IsMetadbInMediaLibrary(d),
		toBe: true,
		testDataType: 'handle'
	};

	const LoadPlaylist = {
		name: 'LoadPlaylist',
		description: 'Returns boolean',
		f: () => fb.LoadPlaylist(),
		toBe: (o) => !o,
		testDataType: 'void'
	};

	const Next = {
		name: 'Next',
		description: 'Forces next track',
		f: (d) => {
			plman.FlushPlaybackQueue();
			plman.AddItemToPlaybackQueue(d);
			fb.Next();
			return new Promise((resolve) => setTimeout(() => resolve(fb.GetNowPlaying().Compare(d)), 1000))
				.finally(() => {
					plman.FlushPlaybackQueue();
					fb.Stop();
				});
		},
		toBe: true,
		testDataType: 'handle'
	};

	const Pause = {
		name: 'Pause',
		description: 'Pauses playback',
		f: (d) => {
			plman.FlushPlaybackQueue();
			if (!fb.IsPlaying) {
				plman.AddItemToPlaybackQueue(d);
				fb.Play();
			}
			return new Promise((resolve) => setTimeout(() => resolve(fb.IsPlaying), 1000))
				.then((bPlaying) => {
					if (bPlaying) {
						fb.Pause();
						return new Promise((resolve) => setTimeout(() => resolve(fb.IsPlaying && fb.IsPaused), 1000));
					}
					return false;
				})
				.finally(() => {
					plman.FlushPlaybackQueue();
					fb.Stop();
				});
		},
		toBe: true,
		testDataType: 'handle'
	};

	const Play = {
		name: 'Play',
		description: 'Inits playback',
		f: (d) => {
			plman.FlushPlaybackQueue();
			if (!fb.IsPlaying) {
				plman.AddItemToPlaybackQueue(d);
				fb.Play();
			}
			return new Promise((resolve) => setTimeout(() => resolve(fb.IsPlaying), 1000))
				.finally(() => {
					plman.FlushPlaybackQueue();
					fb.Stop();
				});
		},
		toBe: true,
		testDataType: 'handle'
	};

	const PlayOrPause = {
		name: 'PlayOrPause',
		description: 'Inits and pauses playback',
		f: (d) => {
			plman.FlushPlaybackQueue();
			return new Promise((resolve) => {
				const prev = fb.IsPlaying && !fb.IsPaused;
				if (!prev) { plman.AddItemToPlaybackQueue(d); fb.PlayOrPause(); }
				setTimeout(() => resolve(fb.IsPlaying && !fb.IsPaused), 1000);
			})
				.then((bPlaying) => {
					if (bPlaying) {
						fb.PlayOrPause();
						return new Promise((resolve) => setTimeout(() => resolve(fb.IsPlaying && fb.IsPaused), 1000));
					}
					return false;
				})
				.then((bPaused) => {
					if (bPaused) {
						fb.PlayOrPause();
						return new Promise((resolve) => setTimeout(() => resolve(fb.IsPlaying && !fb.IsPaused), 1000));
					}
					return false;
				})
				.finally(() => {
					plman.FlushPlaybackQueue();
					fb.Stop();
				});
		},
		toBe: true,
		testDataType: 'handle'
	};

	const Prev = {
		name: 'Prev',
		description: 'Plays prev track',
		f: (d) => {
			const idx = testPlaylist(d);
			plman.ActivePlaylist = plman.PlayingPlaylist = idx;
			plman.FlushPlaybackQueue();
			plman.SetPlaylistFocusItem(plman.ActivePlaylist, 1);
			fb.Play();
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(fb.IsPlaying);
				}, 1000);
			})
				.then((bPlaying) => {
					if (bPlaying) {
						fb.Prev();
						return new Promise((resolve) => setTimeout(() => {
							resolve(fb.IsPlaying && fb.GetNowPlaying().Compare(d[0]));
						}, 1000));
					}
					return false;
				})
				.finally(() => plman.RemovePlaylistSwitch(idx));
		},
		toBe: true,
		testDataType: 'handleList'
	};

	const Random = {
		name: 'Random',
		description: 'Inits random playback',
		f: (d) => {
			const idx = testPlaylist(d);
			fb.Random();
			return new Promise((resolve) => setTimeout(() => {
				resolve(fb.IsPlaying);
			}, 1000))
				.finally(() => plman.RemovePlaylistSwitch(idx));
		},
		toBe: true,
		testDataType: 'handleList'
	};

	const RegisterMainMenuCommand = {
		name: 'RegisterMainMenuCommand',
		description: 'Registers main menu',
		f: () => {
			return fb.RegisterMainMenuCommand(1, 'Test', 'Test');
		},
		toBe: (o) => !o,
		testDataType: 'void'
	};

	// Restart

	const RunContextCommand = {
		name: 'RunContextCommand',
		description: 'Add to playback queue',
		f: (d) => {
			plman.FlushPlaybackQueue();
			fb.Stop();
			plman.AddItemToPlaybackQueue(d);
			fb.Play();
			return new Promise((resolve) => setTimeout(() => {
				let out = fb.RunContextCommand('Add to playback queue', 8);
				out = out && plman.GetPlaybackQueueHandles().Count === 1 && plman.GetPlaybackQueueHandles()[0].Compare(d);
				resolve(out);
			}, 1000))
				.finally(() => {
					plman.FlushPlaybackQueue();
					fb.Stop();
				});
		},
		toBe: true,
		testDataType: 'handle'
	};

	const RunContextCommandWithMetadb = {
		name: 'RunContextCommandWithMetadb',
		description: 'Add to playback queue',
		f: (d) => {
			fb.Stop();
			plman.FlushPlaybackQueue();
			let out = fb.RunContextCommandWithMetadb('Add to playback queue', d, 8);
			out = out && plman.GetPlaybackQueueHandles().Count === 1 && plman.GetPlaybackQueueHandles()[0].Compare(d);
			plman.FlushPlaybackQueue();
			return out;
		},
		toBe: true,
		testDataType: 'handle'
	};

	const RunMainMenuCommand = {
		name: 'RunMainMenuCommand',
		description: 'Run Always on Top',
		f: () => {
			return fb.RunMainMenuCommand('View/Always on Top') && fb.RunMainMenuCommand('View/Always on Top'); //NOSONAR
		},
		toBe: true,
		testDataType: 'void'
	};

	const SavePlaylist = {
		name: 'SavePlaylist',
		description: 'Open modal window',
		f: (d) => {
			const idx = testPlaylist(d);
			const out = fb.SavePlaylist();
			plman.RemovePlaylistSwitch(idx);
			return out;
		},
		toBe: (o) => !o,
		testDataType: 'handleList'
	};

	const SetDSPPreset = {
		name: 'SetDSPPreset',
		description: 'Sets first dsp',
		f: () => {
			const presets = JSON.parse(fb.GetDSPPresets());
			const idx = presets.findIndex((p) => !p.active);
			const curr = presets.findIndex((p) => p.active);
			fb.SetDSPPreset(idx);
			return fb.SetDSPPreset(curr);
		},
		toBe: (o) => !o,
		testDataType: 'void'
	};

	const SetOutputDevice = {
		name: 'SetOutputDevice',
		description: 'Changes output to null',
		f: () => {
			const dev = JSON.parse(fb.GetOutputDevices()).find((d) => d.name === 'Null Output');
			return fb.SetOutputDevice(dev.output_id, dev.device_id);
		},
		toBe: (o) => !o,
		testDataType: 'void'
	};

	const ShowConsole = {
		name: 'ShowConsole',
		description: 'Open non-modal window',
		f: () => fb.ShowConsole(),
		toBe: (o) => !o,
		testDataType: 'void'
	};

	const ShowLibrarySearchUI = {
		name: 'ShowLibrarySearchUI',
		description: 'Open non-modal window',
		f: () => fb.ShowLibrarySearchUI('ALL'),
		toBe: (o) => !o,
		testDataType: 'void'
	};

	const ShowPopupMessage = {
		name: 'ShowPopupMessage',
		description: 'Open non-modal window',
		f: (d) => fb.ShowPopupMessage(d, d),
		toBe: (o) => !o,
		testDataType: 'string'
	};

	const ShowPreferences = {
		name: 'ShowPreferences',
		description: 'Open non-modal window',
		f: () => fb.ShowPreferences(),
		toBe: (o) => !o,
		testDataType: 'void'
	};

	const Stop = {
		name: 'Stop',
		description: 'Stops playback',
		f: (d) => {
			plman.FlushPlaybackQueue();
			if (!fb.IsPlaying) {
				plman.AddItemToPlaybackQueue(d);
				fb.Play();
			}
			return new Promise((resolve) => setTimeout(() => resolve(fb.IsPlaying), 1000))
				.then((bPlaying) => {
					if (bPlaying) { fb.Stop(); return true; }
					return false;
				})
				.finally(() => {
					plman.FlushPlaybackQueue();
				});
		},
		toBe: true,
		testDataType: 'handle'
	};

	const TitleFormat = {
		name: 'TitleFormat',
		description: 'Inits playback',
		f: () => fb.TitleFormat('%GENRE%'),
		toBe: (o) => o && o instanceof FbTitleFormat,
		testDataType: 'void'
	};

	const UnregisterMainMenuCommand = {
		name: 'UnregisterMainMenuCommand',
		description: 'Unregisters main menu',
		f: () => {
			try {
				fb.RegisterMainMenuCommand(1, 'Test', 'Test');
				return fb.UnregisterMainMenuCommand(1);
			} catch (e) { // eslint-disable-line no-unused-vars
				return fb.UnregisterMainMenuCommand(1);
			}
		},
		toBe: (o) => !o,
		testDataType: 'void'
	};

	const VolumeDown = {
		name: 'VolumeDown',
		description: 'Reduces volume',
		f: () => {
			fb.Volume = 0;
			fb.VolumeDown();
			return fb.Volume;
		},
		toBe: (o) => o !== 0,
		testDataType: 'void'
	};

	const VolumeMute = {
		name: 'VolumeMute',
		description: 'Mutes volume',
		f: () => {
			if (fb.Volume === -100) { fb.Volume = 0; }
			fb.VolumeMute();
			return fb.Volume;
		},
		toBe: (o) => o === -100,
		testDataType: 'void'
	};

	const VolumeUp = {
		name: 'VolumeUp',
		description: 'Increases volume',
		f: () => {
			fb.Volume = -100;
			fb.VolumeUp();
			return fb.Volume;
		},
		toBe: (o) => o !== -100,
		testDataType: 'void'
	};

	const functions = [
		/* Members */
		AlwaysOnTop,
		ComponentPath,
		CursorFollowPlayback,
		FoobarPath,
		IsPaused,
		IsPlaying,
		PlaybackFollowCursor,
		PlaybackLength,
		PlaybackTime,
		ProfilePath,
		ReplaygainMode,
		StopAfterCurrent,
		Version,
		Volume,
		/* Methods */
		AcquireUiSelectionHolder,
		CheckClipboardContents,
		ClearPlaylist,
		CopyHandleListToClipboard,
		CreateContextMenuManager,
		CreateHandleList,
		CreateMainMenuManager,
		CreateProfiler,
		// DoDragDrop
		// Exit
		GetClipboardContents,
		GetDSPPresets,
		GetFocusItem,
		GetLibraryItems,
		GetLibraryRelativePath,
		GetNowPlaying,
		GetOutputDevices,
		GetQueryItems,
		GetSelection,
		GetSelections,
		GetSelectionType,
		IsLibraryEnabled,
		IsMainMenuCommandChecked,
		IsMetadbInMediaLibrary,
		Next,
		Pause,
		Play,
		PlayOrPause,
		Prev,
		Random,
		RegisterMainMenuCommand,
		// Restart
		RunContextCommand,
		RunContextCommandWithMetadb,
		RunMainMenuCommand,
		SetDSPPreset,
		SetOutputDevice,
		ShowPopupMessage,
		Stop,
		TitleFormat,
		UnregisterMainMenuCommand,
		VolumeDown,
		VolumeMute,
		VolumeUp,
		/* Modal */
		AddDirectory,
		AddFiles,
		LoadPlaylist,
		SavePlaylist,
		ShowConsole,
		ShowLibrarySearchUI,
		ShowPreferences
	];

	const coverage = (parent, tests) => {
		const keys = new Set(Object.keys(parent));
		const covered = new Set(tests.map((f) => f.name));
		return (1 - keys.difference(covered).size / (keys.size || 1)) * 100;
	};

	module.exports = {
		name: 'tests:fb',
		description: {
			long: 'Tests for built-in SMP methods: fb namespace.',
			short: 'Tests for built-in SMP methods: fb namespace.'
		},
		keywords: [...new Set(
			functions.map((fn) => fn.keywords || [])
				.reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords], ['fb', 'test'])
		)].sort((a, b) => a.localeCompare(b)),
		functions,
		waitBetweenRuns: 10,
		defaultOptions: {
			iterations: 1,
			magnitude: 100,
			coverage: coverage(fb, functions).toFixed(2) + '%'
		}
	};
}