'use strict';
//28/05/25

/* exported testData, copyData, shuffleData */

Array.prototype.shuffle = function () { // NOSONAR
	let last = this.length, n;
	while (last > 0) {
		n = Math.floor(Math.random() * last--);
		[this[n], this[last]] = [this[last], this[n]];
	}
	return this;
};

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

const handleRand = (bCached = true) => {
	return (bCached ? libItems : fb.GetLibraryItems())[Math.floor(libItems.Count * Math.random())];
};

const handle = (bCached = true) => {
	return (bCached ? libItems : fb.GetLibraryItems())[0];
};

const handleList = (len, bCached = true) => {
	return new FbMetadbHandleList((bCached ? libItemsArr : fb.GetLibraryItems().Convert()).slice(0, len));
};

const handleListRand = (len, bCached = true) => {
	const indexes = intArray(libItems.Count).shuffle().slice(0, len);
	const lib = bCached ? libItemsArr : fb.GetLibraryItems().Convert();
	return new FbMetadbHandleList(indexes.map((idx) => lib[idx]));
};

const handleListArray = (len, bCached = true) => {
	return (bCached ? libItemsArr : fb.GetLibraryItems().Convert()).slice(0, len);
};

const imagePath = (root = '') => {
	return root + 'image.jpg';
};

const library = (bCached = true) => {
	return (bCached ? libItems : fb.GetLibraryItems()); // NOSONAR
};

const randFloat = (min = Number.MIN_VALUE, max = Number.MAX_VALUE) => { return Math.random() * (max - min) + min; };

const testData = (type = 'array', len = 1000, min = 0, max = 1, root = fb.ProfilePath) => {
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
		case 'handleRand':
			return handleRand(false);
		case 'handleList':
			return handleList(len, false);
		case 'handleListRand':
			return handleListRand(len, false);
		case 'handleCached':
			return handle(true);
		case 'handleRandCached':
			return handleRand(true);
		case 'handleListCached':
			return handleList(len, true);
		case 'handleListRandCached':
			return handleListRand(len, false);
		case 'handleListArray':
			return handleListArray(len, false);
		case 'handleListArrayCached':
			return handleListArray(len, true);
		case 'imagePath':
			return imagePath(root);
		case 'library':
			return library(false);
		case 'libraryCached':
			return library(true);
		case 'void':
			return;
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
		case 'string':
		case 'imagePath':
			return data;
		case 'arrays':
			return data.map((arr) => [...arr]);
		case 'handle':
		case 'handleRand':
		case 'handleCached':
		case 'handleRandCached':
			return data;
		case 'handleList':
		case 'handleListRand':
		case 'handleListCached':
		case 'handleListRandCached':
		case 'library':
		case 'libraryCached':
			return data.Clone();
		case 'handleListArray':
		case 'handleListArrayCached':
			return [...data];
		case 'void':
			return;
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
		case 'string':
		case 'handle':
		case 'handleRand':
		case 'handleCached':
		case 'handleRandCached':
		case 'imagePath':
			return data;
		case 'handleList':
		case 'handleListRand':
		case 'handleListCached':
		case 'handleListRandCached':
		case 'library':
		case 'libraryCached':
			return data.OrderByFormat(fb.TitleFormat('$rand()', 1));
		case 'arrays':
		case 'handleListArray':
		case 'handleListArrayCached':
			return data.shuffle();
		case 'void':
			return;
		default:
			return data.shuffle();
	}
};