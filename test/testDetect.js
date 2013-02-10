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

console.dir(test)
var test = require("../lib/detect");

/*test.detect(["rdjpgcom", "imagemagick", "imgcheck"]);
function PackageManager() {
	this.available = [];
}
PackageManager.prototype.recieve = function(name, exist) {
	if(exist) this.available.push(name)
	console.dir(pm);	// { available: [ 'rdjpgcom' ] }
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
							  rdjpgcom: true,
							  imagemagick: false,
							  imgcheck: false }*/
/*}
var pm = new PackageManager();
console.dir(pm)
test.on("detect", pm.recieve, pm);
*/

/*var test = require("../lib/detect");
test.detect(["cluster", "os", "http", "punycode"]);
console.dir(test)
*/