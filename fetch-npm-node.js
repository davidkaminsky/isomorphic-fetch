"use strict";

var realFetch = require('node-fetch');

var cookie = '';
var res = null;

module.exports = function(url, options) {
	if (/^\/\//.test(url)) {
		url = 'https:' + url;
	}
	options = options || {};
	options.headers = options.headers || {};
	options.headers.cookie = cookie;
	return realFetch.call(this, url, options)
		.then(function (response) {
			// If we see a 401, then redirect on the server to root.
			if (response.status == 401 && res) {
				res.redirect('/');
			}
			
			return response;
		});
};

module.exports.setCookie = function(c) {
	cookie = c;
};

module.exports.setResponse = function(r) {
	res = r;
};

if (!global.fetch) {
	global.fetch = module.exports;
	global.Response = realFetch.Response;
	global.Headers = realFetch.Headers;
	global.Request = realFetch.Request;
}

