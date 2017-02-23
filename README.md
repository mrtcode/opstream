
# OpStream - wrap other transports to have a reliable packet stream

* Guarantees that packets are delivered in the right sequence
* Guarantees that each packet is delivered only one time
* Buffers packets if connection is lost
* Resends packets when connection is restored
* Pauses sending new packets if other endpoint is busy and don't acknowledge them

opstream.push() => opstream.send => socket.io(client) => socket.io(server) => opstream.recv => opstream.pop() 

## Install

Browser

```html
<script src="opstream.js">
```

Node.js or Browserify

```
npm install opstream
```

```js
var OpStream = require('opstream');
```

## Send and receive packets

```js
//A simple example how OpStreams are connected
var OpStream = require('./opstream');

var server = new OpStream;
var client = new OpStream;

// connect server and client op streams
server.send = function (data) {
  setTimeout(function () {
    client.recv(data)
  }, 0);
};

client.send = function (data) {
  setTimeout(function () {
    server.recv(data)
  }, 0);
};

//imitate client side
function clientThread() {
  for (var i = 0; i < 100; i++) {
    client.push('packet' + i);
  }
}

//imitate server side
function serverThread() {
  server.onReadable = function () {
    var op;
    while (op = server.pop()) {
      console.log('server.pop()', op);
    }
  };
}

serverThread();
clientThread();

```

## Examples

[OpStream + Socket.io example](https://github.com/mrtcode/opstream-example-socket.io)











