#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    Stream = require('stream');
require("./Array.iterators");

var procedures = {
	path: function path() {
		;
	}
}

function main(tests) {
	"use strict"
	var log = console.log,
		dir = console.dir;
	//log("arguments",tests);
	tests.forEach(resolver);
}

function resolver(testname) {
	"use strict"
	//console.log(arguments);
	// procedures[testname]();
}

if(process.argv.length > 0)
	main(process.argv);

module.exports = main;
