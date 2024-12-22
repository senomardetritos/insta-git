export function setStorage(key: string, data: object) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
		return true;
	} catch (e) {
		deleteStorage(key);
		return false;
	}
}

export function getStorage(key: string) {
	try {
		const item = localStorage.getItem(key);
		if (!item) return null;
		return JSON.parse(item);
	} catch (e) {
		return null;
	}
}

export function deleteStorage(key: string) {
	delete localStorage[key];
	return true;
}
