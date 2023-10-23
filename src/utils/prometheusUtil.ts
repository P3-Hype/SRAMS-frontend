/* eslint-disable @typescript-eslint/no-explicit-any */
export function shiftPush(arr: any[], newEntry: any) {
    arr.shift();
    arr.push(newEntry);
    return arr;
}