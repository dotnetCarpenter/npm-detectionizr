#!/usr/bin/env node

"use strict";

var spawn 	= require("child_process").spawn,
		Scan = require("scanfs"),
		Event		= require("../lib/Event"),
		stream	= require("stream");

// helper functions //

function update(object, property) {
	return function updater(value) {
		return object[property] = value;
	}
}

function invoke(watch, fn) {
	return function(/* arguments */) {
		fn(watch.apply(undefined, arguments));
	}
}

function readPath(data) {
	return String(data).replace("PATH=","");
}

function split(seperator) {
	return function(string) {
		return String(string).split(seperator);
	}
}

function Win(api) {
	var self = this,
			path = spawn("cmd", ["/C", "path"]);
	path.stdout.on("data",
		invoke(
			readPath,
			invoke(
				update(self, "path"),
				invoke(
					split(";"),
					update(self, "paths")
				)
			)
		)
	);
	path.on("close", function() {
		self.trigger("path", self.path);
	});
	path.stderr.on('data', function (data) {
		console.warn('stderr: ' + data);
	});
}
// inherite from Event
Win.prototype = new Event();

Win.prototype.detect = function(tests) {
	var scan = new Scan([//]);
	tests.forEach(function(library) {
		;
	});
}

module.exports = Win;
