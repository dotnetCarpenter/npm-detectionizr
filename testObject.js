function TestObject(platform) {
	var isWin = platform === "win32";
	this.use = isWin ? ["win"] : ["posix"];
	this.tests = isWin ? ["path"] : [["command", "-v"], ["which"]];
}
module.exports = new TestObject(process.platform);
