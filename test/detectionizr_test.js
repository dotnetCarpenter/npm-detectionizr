var detectionizr = require('../lib/detect.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

module.exports = {
  setUp: function(done) {
    this.commands = {
      0: ["imagemagick", "ls", "punycode", "rdjpgcom", "imagemagick", "imgcheck"],
      1: ["cluster", "os", "http", "punycode"],
      2: ["cd", "which", "grep", "find", "ls"]
    }
    done();
  },
  api: function(test) {
    test.expect(5);
    test.ok(detectionizr.child_process)
    test.ok(detectionizr.require)
    test.ok(detectionizr.detect)
    test.ok(detectionizr.on)
    test.ok(detectionizr.overwrite)
    test.done();
  },
  detect: function(test) {
    test.expect(1);
    var fn = function(){};
    var expectedObject = {
      child_process: fn,
      require:fn,
      detect:fn,
      on:fn,
      overwrite:fn,
      cluster:fn,
      os:fn,
      http:fn,
      punycode:fn
    }
    test.notDeepEqual(detectionizr.detect(this.commands[1]), expectedObject, this.commands[1].toString());
    test.done();

    function testProperty(name, number) {

    }
  }
};
