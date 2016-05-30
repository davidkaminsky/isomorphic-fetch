"use strict";

var realFetch = require('node-fetch');

var cookie = '';

module.exports = function(url, options) {
	if (/^\/\//.test(url)) {
		url = 'https:' + url;
	}
	options = options || {};
	options.headers = options.headers || {};
	options.headers.cookie = cookie;
	return realFetch.call(this, url, options);
};

module.exports.setCookie = function(c) {
	cookie = c;
};

if (!global.fetch) {
	global.fetch = module.exports;
	global.Response = realFetch.Response;
	global.Headers = realFetch.Headers;
	global.Request = realFetch.Request;
}

