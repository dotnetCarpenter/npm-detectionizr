var spawn = require("child_process").spawn,
			Win = require("../lib/win"),
			win;

	beforeEach(function() {
		win = new Win();
	});

describe("The win module", function() {
	xit("should be callable from the command line", function(done) {
		spawn("node", ["../lib/win", "-p"]);
	});

	it("should contain the path string", function(done) {
		win.on("path", function(path) {
			expect(win.path).toMatch(path);
			expect(win.path).toMatch("Windows");
			done();
		});
	});

	it("have an array indice for each path", function(done) {
		win.on("path", function() {
			expect(win.paths.length).toBeGreaterThan(win.path.match(/(;)/g).length);
			done();
		});
	});
});
