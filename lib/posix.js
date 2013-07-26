#!/usr/bin/env node


console.log("posix.js");

function sysProcess(library, cmd) {
	var proc = api.child_process.spawn(cmd[0], cmd[1] ? [cmd[1], library] : [library]);
	proc.stdout.setEncoding("utf8");
	proc.stdout.on("data", sysHandler);
//		proc.stderr.on("data", sysHandler);
	proc.stdout.on('end', sysCounter);

	function sysHandler(input) {
		console.log(input);
		if(input.length > 0) api[library] = true;
	}

	function sysCounter() {
		systemLibraries.some(function find(systemlibrary) {
			if( systemlibrary[0] === library ) {
				systemlibrary[1]++;
console.dir(systemLibraries)
console.log("%s has been tested %d times out of %d", library, systemlibrary[1], numSysCmds);
				if( numSysCmds === systemlibrary[1] ) {
					api.trigger("detect", library, api[library]);
					numTests--;	// reduce test counter
					return true;	// stop loop
				}
			}
		});
	}
}