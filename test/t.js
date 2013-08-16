#!/usr/bin/env node
var s = require("child_process").spawn;
var p = s("cmd", ["/C", "path"]);
p.stdout.on("data", function(d) { console.log(String(d)); });
p.on("close", function (code) {
	if (code !== 0) {
		console.log('cmd process exited with code ' + code);
	}
	p.stdin.end();
});
