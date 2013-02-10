/* MANUAL TEST

var test = require("../lib/detect");
test.detect(["imagemagick", "ls", "punycode"]);

if(test.punycode)
	console.log("We can use test.punycode");
if(test.imagemagick)
	console.log("We can use test.imagemagick");

test.on("detect", function(name, exist) {
	if(test.ls)
		console.log("We can use test.ls");
});

console.dir(test)*/
var test = require("../lib/detect");
function PackageManager() {
    this.available = [];
}
PackageManager.prototype.recieve = function(name, exist) {
    if(exist) this.available.push(name)
    console.dir(pm);    // { available: [ 'rdjpgcom' ] }
    console.dir(test);  /* { child_process: 
                               { fork: [Function],
                                 _forkChild: [Function],
                                 exec: [Function],
                                 execFile: [Function],
                                 spawn: [Function] },
                              require: [Function: r],
                              detect: [Function],
                              on: [Function],
                              overwrite: [Function],
                              rdjpgcom: true, <- command line libraries can not be referenced
                              imagemagick: <- but nodejs modules are referenced
                               { identify: { [Function] path: 'identify' },
                                 readMetadata: [Function],
                                 convert: { [Function] path: 'convert' },
                                 resize: [Function],
                                 crop: [Function],
                                 resizeArgs: [Function] },
                              imgcheck: false }*/
}
var pm = new PackageManager();
test.on("detect", pm.recieve, pm);
test.detect(["rdjpgcom", "imagemagick", "imgcheck"]);


/*var test = require("../lib/detect");
test.detect(["cluster", "os", "http", "punycode"]);
console.dir(test)
*/