'use strict';

var OpStream = require('../opstream');

describe('opstream', function () {

  before(function() {

    var that = this;

    that.server = new OpStream;
    that.client = new OpStream;

    that.client.send = function (data) {
      setTimeout(function () {
        that.server.recv(data)
      }, 0);
    };

  });

  it('should send and receive a packet', function (done) {

    var that = this;

    that.client.push('PACKET');

    that.server.onReadable = function () {
      var op = that.server.pop();
      op.should.equal('PACKET');
      done();
    };
  });
});

