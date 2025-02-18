// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!DOCTYPE html><html><body><main id="app"></main></body></html>');

global.window = jsdom.window;
global.document = jsdom.window.document;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.FormData = window.FormData;
