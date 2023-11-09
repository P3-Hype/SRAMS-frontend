/* eslint-disable @typescript-eslint/no-explicit-any */
export function shiftPush(arr: any[], newEntry: any) {
	arr.shift();
	arr.push(newEntry);
	return arr;
}

export function LabelToMetricType(label: string): string {
	if (!label) return '';
	const idRemoved = label.split('_');
	idRemoved.shift();
	const key = idRemoved.join('_').toUpperCase();
	return key;
}
