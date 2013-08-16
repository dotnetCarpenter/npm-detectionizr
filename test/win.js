var Win = require("../lib/win");

win = new Win();
try {
	win.on("path", function(path) {
		console.log(win.path)
		console.log(win.paths)
	});
} catch (e) {
	console.debug(e);
}