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
      0: ["imagemagick", "command", "punycode", "rdjpgcom", "imagemagick", "imgcheck"],
      1: ["cluster", "os", "http", "punycode"],
      2: ["which", "command", "whereis"]
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
    test.expect(3);
    var fn = function(){};
    var expectedObject = {
      0: {
        child_process: fn,
        require:fn,
        detect:fn,
        on:fn,
        overwrite:fn,
        imagemagick:false,
        command:fn,
        punycode:fn,
        rdjpgcom:true,
        imgcheck:false
      },
      1: {
        child_process: fn,
        require:fn,
        detect:fn,
        on:fn,
        overwrite:fn,
        cluster:fn,
        os:fn,
        http:fn,
        punycode:fn
      },
      2: {
        child_process: fn,
        require:fn,
        detect:fn,
        on:fn,
        overwrite:fn,
        which:fn,
        command:fn,
        whereis:fn
      }
    }
    for (var detectSerie in this.commands) {
      test.notDeepEqual(
        detectionizr.detect(this.commands[detectSerie])
      , expectedObject[detectSerie]
      , this.commands[detectSerie].toString()
      );
    }    
    test.done();
  }
};
