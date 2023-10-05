export function getTabsWithPrimaryFirst(rows: {tab: string}[]) {
	let PRIMARY = "Primary";
	const primaryInfo = rows?.find((x) => x.tab === PRIMARY);
	let tabs = [
		{ tab: PRIMARY, ...primaryInfo, count: primaryInfo?.count ?? 0 },
		...rows?.filter((x) => x.tab !== PRIMARY),
	];
	return tabs;
}

export function uniqueStrings(strList: string[]) {
	return strList.reduce((a, x) => (a.includes(x) ? a : [...a, x]), []);
}

export function uniqueObjectByKey(objList: any[], key = "id") {
	return objList.reduce(
		(a, x) => (a.includes(x[key]) ? a : [...a, x[key]]),
		[],
	);
}

export const sortParts = (a, b) => {
	for (let i in a) {
		let aPart = a[i];
		let bPart = b[i];
		const cmpPart = aPart.localeCompare(bPart, undefined, { numeric: true });
		// console.log(aPart, "<=>", bPart, ":", cmpPart);
		if (cmpPart) {
			return cmpPart;
		}
	}
	return 0;
};

export function array_same(a1, a2) {
	return a1.every((x) => a2.includes(x)) && a2.every((x) => a1.includes(x));
}

export const range = function* (from = 0, total = 0, step = 1) {
	for (let i = 0; i < total; yield from + i++ * step) {}
};

export function rangeBetween(from, till, step = 1) {
	return range(from, till - from + 1, step);
}

export function arraySum(list = [], selector) {
	return list.reduce((a, x) => a + selector(x), 0);
}

export function arraySort(items, selector) {
	items = items?.sort(sortBy(selector));
	return items;
}

export function arraySorBToA(items, selector) {
	items = items.sort(sortBy(selector));
	items = items.reverse();
	return items;
}

export function sortBy(selector: (row: any) => number) {
	return (a, b) => {
		a = selector(a);
		b = selector(b);
		if (typeof a === "number" && typeof b === "number") {
			return a - b;
		}
		if (a instanceof Date && b instanceof Date) {
			return a.getTime() - b.getTime();
		}
		a = String(a);
		b = String(b);
		return a.localeCompare(b);
	};
}

export function arrayWithout(array, selector) {
	return array.filter((x) => !selector(x));
}

export function arrayUnique(array, selector) {
	const uniqSet = [...new Set(array.map(selector))];
	return uniqSet.map((uniqItem) => {
		return array.find((x) => selector(x) === uniqItem);
	});
}

export function groupBy(array = [], selector) {
	const uniqSet = [...new Set(array.map(selector))];
	const pairs = uniqSet.map((uniqItem) => {
		let items = array.filter((x) => selector(x) === uniqItem);
		return [uniqItem, items];
	});
	return Object.fromEntries(pairs);
}
