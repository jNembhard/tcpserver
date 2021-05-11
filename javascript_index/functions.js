//CLIENT AND SERVER COMMANDS
function test(words) {
  var n = words.split(" ");
  return n[1];
}

//CLIENT COMMANDS ONLY --------------------------------------------------------------------------->
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

function enterCommand(client) { //Get user input and send data to the Server
  readline.question("Please enter a command: ", (word) => {
    if (word == "right " + test(word) && parseInt(test(word)) > 8) {
      console.log("Too High! Enter a number from 1 to 8");
      enterCommand();
    } else if (word == "left " + test(word) && parseInt(test(word)) > 8) {
      console.log("Too High! Enter a number from 1 to 8");
      enterCommand();

    } else {
      client.write(word);
    }
  });
}

//SERVER COMMANDS ONLY----------------------------------------------------------------------------->
function clear() {
  var str = screen.str2;
  screen.str1 = str
  return str;
}

function compass() {
  direction = target.direction;
  var facing = "";

  switch (direction) {
    case 1:
      facing = "North";
      break;
    case 2:
      facing = "North East"
      break;
    case 3:
      facing = "East"
      break;
    case 4:
      facing = "South East"
      break;
    case 5:
      facing = "South"
      break;
    case 6:
      facing = "South West"
      break;
    case 7:
      facing = "West"
      break;
    case 8:
      facing = "North West"
      break;
  }
  return facing;
}

function direction(current, turns) {
  var newDirection = current + turns;
  let compass = [1, 2, 3, 4, 5, 6, 7, 8];

  if (turns == 8 || turns == -8) {
    return current;
  }

  if (turns >= 1) {
    if (newDirection > 8) {
      newDirection = newDirection - 8;
    }
    current = newDirection;
    target.direction = current;
    return current;
  }

  if (-turns) {
    compass.reverse();
    if (newDirection < -8) {
      newDirection = compass[(8 - current)] + turns;
    } else {
      newDirection = compass[(8 - current)] + turns;
      if (newDirection <= 0) {
        newDirection = compass[Math.abs(newDirection)];
      }
    }
    current = newDirection;
    target.direction = current;
    return current;
  }
}

function hasWhiteSpace(words) {
  if (words.indexOf(" ") > 0) {
    n = words.split(" ");
    return parseInt(n[1]);
  } else {
    return words;
  }
}

function updateCoordinates(x, y, steps) {
  var coordinate = [x, y];
  console.log(coordinate);
  direction = target.direction;
  var reset = [x, y];

  switch (direction) {
    case 1:
      coordinate = [x, y + steps];
      break;

    case 2:
      coordinate = [x + steps, y + steps];
      break;

    case 3:
      coordinate = [x + steps, y];
      break;

    case 4:
      coordinate = [x + steps, y - steps];
      break;

    case 5:
      coordinate = [x, y - steps];
      break;
    case 6:
      coordinate = [x - steps, y - steps];
      break;
    case 7:
      coordinate = [x - steps, y];
      break;

    case 8:
      coordinate = [x - steps, y + steps];
      break;
  }
  if (coordinate[0] < 0 || coordinate[0] > 30 || coordinate[1] < 0 || coordinate[1] > 30) {
    coordinate = reset;
    console.log("Number is out of bounds!");
    return coordinate;
  } else {
    target.x = coordinate[0];
    target.y = coordinate[1];
    return coordinate;
  }
}

//TARGET AND PROXY HANDLER---------------------------------------------------------------------------->

var target = {
  x: 15,
  y: 15,
  direction: 1,
  array: []
};

var proxy = new Proxy(target, {//proxy accesses target and handles based on property constraints
  get: function(target, property, receiver) {
    console.log(target + "'s " + property + " property has been accessed");
    const value = target[property];
    if (property === 'x') {
      return value.x;
    } else if (property === 'y') {
      return value.y;
    }
  },

  set: function(target, property, value, receiver) {
    console.log(target + "'s " + property + " property has been modified");
    target[property] = value;
  },
  has: function(target, property) {
    console.log(target + "'s " + property + " property has been checked");
    return Reflect.has(target, property);
  }
}, );

//GAME SCREEN-------------------------------------------------------------------------------------------->
var screen = {
  str1: `THE STARTING SCREEN
              ╔═════════════════════════════════════════════════════════════════════════════════════╗
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                            *                                        ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ╚═════════════════════════════════════════════════════════════════════════════════════╝`,
  str2: `NEW CLEARED SCREEN
              ╔═════════════════════════════════════════════════════════════════════════════════════╗
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                            *                                        ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ║                                                                                     ║
              ╚═════════════════════════════════════════════════════════════════════════════════════╝`
};

var drawScreen = new Proxy(target, { // this proxy is used to handle screen object
  get: function(target, property, receiver) {
    console.log(target + "'s " + property + " property has been accessed");
    const value = target[property];
    if (property === 'str1') {
      return value.str1;
    } else if (property === 'str2') {
      return value.str2;
    }
  },

  set: function(target, property, value, receiver) {
    console.log(target + "'s " + property + " property has been modified");
    target[property] = value;
  }
}, );


module.exports = {
  clear,
  compass,
  direction,
  drawScreen,
  enterCommand,
  hasWhiteSpace,
  proxy,
  readline,
  screen,
  test,
  target,
  updateCoordinates
};
