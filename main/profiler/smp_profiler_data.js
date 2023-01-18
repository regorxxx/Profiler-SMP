'use strict';
//19/10/22

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

const randFloat = (min = Number.MIN_VALUE, max = Number.MAX_VALUE) => {return Math.random() * (max - min) + min;};

const testdata = (type = 'array', len = 1000, min, max) => {
	switch(type) {
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