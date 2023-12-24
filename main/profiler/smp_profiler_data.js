'use strict';
//24/12/23

/* exported testData, copyData, shuffleData */

const libItems = fb.GetLibraryItems();
const libItemsArr = fb.GetLibraryItems().Convert();

const intArray = (len) => {
	let i = len;
	const data = [];
	while (i--) {
		data.push(i);
	}
	return data;
};

const definedObject = () => ({
	num: 1,
	obj: {
		str: 'd'
	},
	str: 'f',
	arr: [],
	bool: true
});

const objectMap = (len) => {
	let i = len;
	const m = {};
	while (i--) {
		m[i] = i;
	}
	m.size = len;
	return m;
};

const map = (len) => {
	let i = len;
	const m = new Map();
	while (i--) {
		m.set(i, i);
	}
	return m;
};

const string = (len) => {
	return 'ab|c,'.repeat(len);
};

const handle = (bCached = true) => {
	return (bCached ? libItems[0] : fb.GetLibraryItems()[0]);
};

const handleList = (len, bCached = true) => {
	return new FbMetadbHandleList((bCached ? libItemsArr : fb.GetLibraryItems().Convert()).slice(0, len));
};

const handleListArray = (len, bCached = true) => {
	return (bCached ? libItemsArr : fb.GetLibraryItems().Convert()).slice(0, len);
};

const randFloat = (min = Number.MIN_VALUE, max = Number.MAX_VALUE) => { return Math.random() * (max - min) + min; };

const testData = (type = 'array', len = 1000, min = 0, max  = 1) => {
	switch (type) {
		case 'object':
			return definedObject();
		case 'objectMap':
			return objectMap(len);
		case 'map':
			return map(len);
		case 'number':
			return randFloat(min, max);
		case 'string':
			return string(len);
		case 'arrays':
			return [intArray(len), intArray(len)];
		case 'handle':
			return handle(false);
		case 'handleList':
			return handleList(len, false);
		case 'handleCached':
			return handle(true);
		case 'handleListCached':
			return handleList(len, true);
		case 'handleListArray':
			return handleListArray(len, false);
		case 'handleListArrayCached':
			return handleListArray(len, true);
		default:
			return intArray(len);
	}
};

const copyData = (data, type = 'array') => {
	let temp;
	switch (type) {
		case 'object':
			temp = objectMap(definedObject);
			for (let key of data) { temp[key] = data[key]; }
			return temp;
		case 'objectMap':
			temp = objectMap(data.size);
			for (let key of data) { temp[key] = data[key]; }
			return temp;
		case 'map':
			return new Map(data);
		case 'number':
			return data;
		case 'string':
			return data;
		case 'arrays':
			return data.map((arr) => [...arr]);
		case 'handle':
			return data;
		case 'handleList':
			return data.Clone();
		case 'handleCached':
			return data;
		case 'handleListCached':
			return data.Clone();
		case 'handleListArray':
			return [...data];
		case 'handleListArrayCached':
			return [...data];
		default:
			return [...data];
	}
};

const shuffleData = (data, type = 'array') => {
	let temp;
	switch (type) {
		case 'object':
			temp = objectMap(definedObject);
			Object.keys(data).shuffle().forEach((key) => { temp[key] = data[key]; });
			return temp;
		case 'objectMap':
			temp = objectMap(data.size);
			Object.keys(data).shuffle().forEach((key) => { temp[key] = data[key]; });
			return temp;
		case 'map':
			return new Map(data.entries().shuffle());
		case 'number':
			return data;
		case 'string':
			return data;
		case 'arrays':
			return data.shuffle();
		case 'handle':
			return data;
		case 'handleList':
			return data.OrderByFormat(fb.TitleFormat('$rand()'));
		case 'handleCached':
			return data.OrderByFormat(fb.TitleFormat('$rand()'));
		case 'handleListCached':
			return data.OrderByFormat(fb.TitleFormat('$rand()'));
		case 'handleListArray':
			return data.shuffle();
		case 'handleListArrayCached':
			return data.shuffle();
		default:
			return data.shuffle();
	}
};