if (process.platform !== "win32")
	process.exit(0); // this test is strictly for the Windows platform

var spawn = require("child_process").spawn,
			Win = require("../lib/win"),
			win;

	beforeEach(function() {
		win = new Win();
	});

describe("The win module", function() {

	it("should contain the path string", function(done) {
		win.on("path", function(path) {
			expect(win.path).toMatch(path);
			expect(win.path).toMatch("Windows");
			done();
		});
	});

	it("have an array indice for each path", function(done) {
		win.on("path", function() {
			// last directory path doesn't have a ;
			expect(win.paths.length).toBeGreaterThan(win.path.match(/(;)/g).length);
			done();
		});
	});

	describe("win.detect should find .exe and .bat files in each path", function() {
		var search = ["explorer", "regedit", "notepad", "nodevars"],
				detections = 0,
				win = new Win();

		it("and should fire an event called 'detect'", function(done) {
			win.on("detect", function(name) {
				expect(search).toContain(name);
				detections++;
				if(detections === search.length)
					done(); // exit
				expect(search.length).toBeGreaterThan(detections);
			});
		});
		it("and should have a 'detect' method", function() {
			console.dir(win)
			expect(win.detect).toBeDefined();
			expect(win.detect(search)).not.toThrow();
		});
	});

});

xdescribe("The command line win module", function() {
	//TODO: test win-cli
	xit("should be callable from the command line", function(done) {
		spawn("node", ["../lib/win", "-p"]);
	});
});
