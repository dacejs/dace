export const isFunction = obj => typeof obj === 'function';
export const isObject = obj => obj !== null && typeof obj === 'object';
export const isPromise = value => isObject(value) && isFunction(value.then);
