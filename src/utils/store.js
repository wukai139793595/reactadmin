import store from 'store';
import memory from './memory.js';

export function setStore(key, value) {
    store.set(key, value)
}

export function getStore(key) {
    return store.get(key) || {}
}

export function removeStore(key) {
    return store.remove(key)
}

export function setUserStore(value) {
    setStore('user', value);
    memory.user = value;
}

export function getUserStore() {
    return getStore('user')
}

export function removeUserStore() {
    removeStore('user');
    memory.user = {};
}