const net = require('net');
const _ = require('underscore');
const async = require('async');
const readline = require('readline');

const {
  clear,
  compass,
  direction,
  drawScreen,
  hasWhiteSpace,
  proxy,
  screen,
  target,
  test,
  updateCoordinates
} = require("./javascript_index/functions");

const HOST = '127.0.0.1';
const PORT = 8124;

const server = net.createServer();

server.listen(PORT, () => {
  console.log(`Server is listening for requests on socket ${HOST}:${PORT}`);
});

let sockets = [];

server.on('connection', function(sock) { //creates server connection
  console.log('CONNECTED: ' + HOST + ':' + PORT);
  sockets.push(sock);



  sock.on("data", data => {
    if (data == undefined || data == null) {
      return;
    }

    const dataArgs = data.toString();
    if (dataArgs.length === 0) {
      sock.write("ERROR data not found");
      return;
    }

    const command = dataArgs;

    if (Number.isInteger(hasWhiteSpace(command))) { //Checks if value has number in command and performs a function
      movement = hasWhiteSpace(command);

      position = target.direction;
      target.array.push(command);

      const x = Reflect.get(target, 'x');
      const y = Reflect.get(target, 'y');
      const check_x = movement + target.x;
      const check_y = movement + target.y


      if (command === "steps " + test(dataArgs)) {
        updateCoordinates(x, y, movement);
        if (check_x < 0 || check_x > 30 || check_y < 0 || check_y > 30) {
          sock.write(`Out of bounds! Current position is: (${target.x},${target.y}) facing ${compass()}`);
        } else {
          sock.write(`Move cursor forward ${movement} units.
            \r\nCurrent position is: (${target.x},${target.y}) facing ${compass()}.\r\n`);
        }
      } else if (command === "left " + test(dataArgs)) {
        LEFT = direction(position, -movement);

        sock.write("Turn cursor left " + movement + " units.\r\n" +
          "Current Direction is: " + LEFT + " facing " + compass() +
          ".\r\n");
        target.direction = LEFT;

      } else if (command === "right " + test(dataArgs)) {
        RIGHT = direction(position, movement);

        sock.write("Turn cursor right " + movement + " units.\r\n" +
          "Current Direction is: " + RIGHT + " facing " + compass() +
          ".\r\n");
        target.direction = RIGHT;
      }

    } else if (command === "hover") {
      sock.write("Brush mode is set to hover.\r\n");
    } else if (command === "draw") {
      sock.write("Brush mode is set to draw. *\r\n");
    } else if (command === "eraser") {
      sock.write("Brush mode is set to eraser.\r\n");
    } else if (command === "coord") {
      sock.write(`Coordinates are: (${target.x},${target.y})`);
    } else if (command === "render") {
      sock.write(Reflect.get(screen, 'str1'));
    } else if (command === "clear") {
      sock.write("Screen cleared\r\n" + clear());
    } else if (command === "quit") {
      sock.write("Bye! Come draw again sometime!\r\n");
    } else {
      sock.write("ERROR invalid command\r\n");
      return;
    }
    console.log(target);
  });

  // Event handler performed on close
  sock.on('close', function(data) {
    let index = sockets.findIndex(function(o) {
      return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
    })
    if (index !== -1) sockets.splice(index, 1);
    console.log('CLOSED: ' + HOST + ":" + PORT);
  });
});
