/*
 * detectionizr
 * https://github.com/dotnetCarpenter/npm-detectionizr
 * @author  dotnetCarpenter
 * @version 13.7.1
 * Licensed under the WTFPL license.
 */ 
function TestObject(platform) {
	"use strict"
	var isWin = platform === "win32";
	this.path = {
		win: './lib/win',
		posix: './lib/posix'
	}
	this.use = isWin ? "win" : "posix";
	this.tests = isWin ? ["path"] : [["command", "-v"], ["which"]];
}
module.exports = new TestObject(process.platform);
