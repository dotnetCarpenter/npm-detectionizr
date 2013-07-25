function TestObject() {}
TestObject.prototype.use = ["child_process"];
TestObject.prototype.sysCmds =  [ process.platform === "win32" ? ["cmd"] :  (["command", "-v"], ["which"]) ];

