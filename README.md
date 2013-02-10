detectionizr
============

Detect npm modules and system libraries with the same ease as Modernizr. Never has feature detection in Node.js been so easy!

## Getting Started
Install the module with: `npm install detectionizr`

```javascript
var detectionizr = require('detectionizr');
detectionizr.detect(["imagemagick", "ls", "punycode"]);	// array of commands you want to test for

if(detectionizr.punycode)
	console.log("We can use detectionizr.punycode!");
if(detectionizr.imagemagick)
	console.log("We can use detectionizr.imagemagick!");

detectionizr.on("detect", function(name, exist) {
	if(detectionizr.ls)
		console.log("We can use ls on this computer!");
});
```

## Documentation
When I write command, I also mean nodejs modules.

detectionizr has 4 methods:
+ **require** ({String}) - works like the normal require, except false is returned if the module can not be found
+ **detect** ({Array}) - takes a list of command names to test and *grows* your detectionizr variable with references to the commands. Note, that command line commands will not be available right away. See below.
+ **on** ({String}, {Function}, [{Object}]) - If a command is not a node module, then the test run asynchronously, and you have to attach an event listener. In the current version, only "detect" is accepted as event name. The second argument is your callback function and the third (optional) the scope you want your callback to run in.
The listener will be called with 2 arguments, the name {String} and if it could be found {Boolean}. Multiple event listeners can be attached. And all listeners are called for each test.
+ **overwrite** ({String}, {Function}, [{Object}]) - The same as **on** but will delete all previous attached "detect" listeners.

### Eat your own dog food
detectionizr uses ```child_process``` from native nodejs modules and also checks in the same manner as it will test your library dependecies. That is why, detectionizr will always have a reference to ```child_process```.

### How this works
detectionizr will first try and ```require``` the commands. If that fails, it will run the command as a process with: ```command -v [command name]``` and look for a **"/"**(slash) in the return value. The command ```command```should be available on all [POSIX](https://en.wikipedia.org/wiki/POSIX#POSIX-oriented_operating_systems) compliant systems (OS X, Linux, Unix ect.).

## Examples
```javascript
var test = require("detectionizr");
function PackageManager() {
    this.available = [];
}
PackageManager.prototype.recieve = function(name, exist) {
    if(exist) this.available.push(name)
    console.dir(pm);    // { available: [ 'imagemagick', 'rdjpgcom' ] }
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
```

## TODO
+ Better documentation...
+ Better tests...

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Test your code using [grunt](https://github.com/cowboy/grunt).

## Release History
+ 0.1.1 - Fix for event listeners not being called for nodejs modules.
+ 0.1.0 - Initial release

## License
Copyright (c) 2013 [dotnetCarpenter](https://www.google.com/search?q=dotnetCarpenter)
Licensed under the [WTFPL](http://www.wtfpl.net/about/) license.
