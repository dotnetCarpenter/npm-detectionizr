"use strict"

/*
 * detectionizr
 * https://github.com/dotnetCarpenter/npm-detectionizr
 * @author  dotnetCarpenter
 * @version 13.7.1
 * Licensed under the WTFPL license.
 */
function Detect(config) {
	var events = [];
	var api = {};
	var systemLibraries = [];
	var numSysCmds = config.sysCmds.length;
	var numTests = 0;	// test counter

	// require detectionizr module(s)
	config.use.forEach(r, api);

	process.on("exit", function cleanup() {
		events.forEach(function(e,i,all) {
			all[i] = null;	// explicitly de-reference
		})
		events.splice(0, events.length);	// empty array
	});

	// public api
	api.require = r;
	api.detect = function(tests) {
		numTests = tests.length;
		tests.forEach(detect, api);
		return api;
	}
	api.on = function(event, fn, scope) {
		events.push([event, fn, scope]);
		return api;
	}
	api.off = function(event) {
		events.forEach(function(e,i,all) {
			if(event === e)
				all.splice(i,1);
		});
	}
	api.overwrite = function(event, fn, scope) {
		api.off(event);
		return api.on(event, fn, scope);
	}

	api.on("detect", function() {
		if(numTests === 1)
			events.forEach(function(event) {
				if(event[0] === "finally")
					event[1].call(event[2], api);
			});
	});

	return api;

	function detect(library) {
		console.log("library::", library);
		if(!r(library)) {
			systemLibraries.push([library, 0]);
			console.dir(systemLibraries, api);
			config.sysCmds.forEach(function(cmd) {
				console.log("detect::", cmd);
				// sysProcess(library, cmd);
			});
		} else {
			numTests--;	// reduce test counter
			events.forEach(function(event) {
				if(event[0] === "detect")
					event[1].call(event[2], library, true);
			});
		}
	}

	function sysProcess(library, cmd) {
		var proc = api.child_process.spawn(cmd[0], cmd[1] ? [cmd[1], library] : [library]);
		proc.stdout.setEncoding("utf8");
		proc.stdout.on("data", sysHandler);
//		proc.stderr.on("data", sysHandler);
		proc.stdout.on('end', sysCounter);

		function sysHandler(input) {
			console.log(input);
			if(input.length > 0) api[library] = true;
		}

		function sysCounter() {
			systemLibraries.some(function find(systemlibrary) {
				if( systemlibrary[0] === library ) {
					systemlibrary[1]++;
console.dir(systemLibraries)
console.log("%s has been tested %d times out of %d", library, systemlibrary[1], numSysCmds);
					if( numSysCmds === systemlibrary[1] ) {
						events.forEach(function(event) {
							if(event[0] === "detect")
								event[1].call(event[2], library, api[library]);
						});
						numTests--;	// reduce test counter
						return true;	// stop loop
					}
				}
			});
		}
	}

	function r(library) {
		try {
			api[library] = require(library);
		} catch(err) {
			console.warn(err.toString());
			api[library] = false;
		} finally {
			return api[library];
		}
	}
}

module.exports = new Detect(
	require("./testObject")
);
