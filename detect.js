/*
 * detectionizr
 * https://github.com/dotnetCarpenter/npm-detectionizr
 * @author  dotnetCarpenter
 * @version 13.7.1
 * Licensed under the WTFPL license.
 */

var Event = require("./lib/Event");

function Detect(config) {
	"use strict"
	var systemLibraries = [];
	var numSysCmds = config.tests.length;
	var numTests = 0;	// test counter
	var api = new Event();

	// require detectionizr module(s)
	r(config.path[config.use]);
	// clean up upon exit
	process.on("exit", api.destroy);

	api.detect = function(tests) {
		numTests = tests.length;
		tests.forEach(detect, this);
		return this;
	}

	api.require = r;

	api.on("detect", function() {
		if(numTests === 1)
			api.trigger("finally", api);
	});

	return api;

	function detect(library) {
		// console.log("library::", library);
		var c = config;
		if(!r(library)) {
			systemLibraries.push([library, 0]);
			//console.dir(systemLibraries, api);
			this[c.path[c.use]](c.tests, library);
		} else {
			numTests--;	// reduce test counter
			this.trigger("detect", library, true);
		}
	}

	function r(library) {
		try {
			api[library] = require(library);
		} catch(err) {
			//console.warn(err.toString());
			api[library] = false;
		} finally {
			return api[library];
		}
	}
}


module.exports = new Detect(
	require("./testObject")
);
