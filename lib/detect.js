/*
 * detectionizr
 * https://github.com/dotnetCarpenter/npm-detectionizr
 * @author  dotnetCarpenter
 * @version 13.2.2
 * Licensed under the WTFPL license.
 */

function Detect(config) {
	var events = [];
	var p = {};
	config.use.forEach(r, p);

	process.on("exit", function cleanup() {
		events.forEach(function(e,i,all) {
			all[i] = null;	// explicitly de-reference
		})
		events.splice(0, events.length);	// empty array
	});

	// public API
	p.require = r;
	p.detect = function(tests) {
  		tests.forEach(detect, p);
	}
	p.on = function(event, fn, scope) {
		events.push([event, fn, scope]);
	}
	p.overwrite = function(event, fn, scope) {
		events.forEach(function(e,i,all) {
			if(event === e)
				all.splice(i,1);
		});
		p.on(event, fn, scope);
	}

	return p;

	function detect(package) {
		var test = r.call(this, package);
		//console.log(test);
		if(!test) {
			if(p.child_process) {
				exec.call(this, p.child_process, package);
			} else {
				console.warn("Weird butt nodejs distro - can not test non NPM packages.");
			}
		}
	}

	function exec(process, package) {
		var self = this;
		var command = process.spawn("command", ["-v", package]);
		command.stdout.setEncoding("utf8");
		command.stdout.on("data", childDetect);

		function childDetect(data) {
			//console.log(data);
			if(data.indexOf("/") > -1 || data.length > 0) self[package] = true;
			else self[package] = false;
			events.forEach(function(event) {
				if(event[0] === "detect")
					event[1].call(event[2], package, self[package]);
			})
		}
	}

	function r(package) {
		var module;
		try {
			module = this[package] = require(package);
		} catch(err) {
			//console.warn(err.toString());
			module = this[package] = false;
		} finally {
			events.forEach(function(event) {
				if(event[0] === "detect")
					event[1].call(event[2], package, !!module);
			})
		}
	}
}

module.exports = new Detect({
    use: ['child_process']
});
