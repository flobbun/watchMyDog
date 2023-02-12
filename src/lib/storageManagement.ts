import { StorageVars } from '../constants/StorageVars';

export const setObject = (key: StorageVars, value: any, stringify = false) => {
  if (typeof localStorage !== 'undefined') {
    return stringify ? localStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, value);
  }

  return null;
};

export const getObject = (key: any, parse = false) => {
  if (typeof localStorage !== 'undefined') {
    const value = localStorage.getItem(key);

    return parse ? JSON.parse(value as string) : value;
  }

  return null;
};

export const clearStorage = (target: string[] | string) => {
  if (typeof localStorage !== 'undefined') {
    if (Array.isArray(target)) {
      target.forEach((key) => localStorage.removeItem(key));
    } else {
      localStorage.removeItem(target);
    }
  }
};