# TCP Server

I've created a personalClient.js and tcp.js file. The purpose of the files is to show communication between the TCP server and the client. It outputs commands for the cursor position and drawing instructions on a 30 x 30 canvas.

## Setup

1. Download the latest version of node.js for your Operating System.
2. Next, download the latest version of nodemon.
    * This can be used to auto restart the server and client.
3. Run npm install inside the TCP Server Canvas folder from the command line.
4. Open two separate command line terminals and run the following script:
    * Terminal 1:

      ```bash
      npm run server
      ```

    * Terminal 2:

      ```bash
      npm run client
      ```

## How To Enter Commands

You will be presented with a "Enter a command: " prompt on the client side. The functions receive a response from the server based on the command criteria from the client. After each command, press enter to execute.

NOTE: The default starting position is (x = 15, y = 15).


### Commands Include:

  * steps (n): moves the cursor n number of steps forward in a specified direction.

  * left (n) and right (n): turns you to a specified direction.
    * You can move in 8 different directions:
      1. North
      2. North East
      3. East
      4. South East
      5. South
      6. South West
      7. West
      8. North West

    Examples:

    * Typing "steps 10" will move you 10 paces forward from the current direction.

      ```bash
      Move cursor forward 10 units.
      Current position is: (15,5) facing South.
      ```

    * Starting at direction 1 (North), and typing "right 4"

      ```bash
      Turn the cursor right 4 units.
      Current Direction is: 5 facing South.
      ```

  * hover, draw, eraser: This changes the drawing mode of the canvas brush.

  * coord: returns Coordinates (x, y) to the Client.

  * render: prints the most up to date canvas in the Command Line Interface (CLI).

  * clear: sets the canvas back to its original state.

  * quit: closes the connection to the server.

## Functions

Additional functions and created variables needed for both the server and the client are presented in the javascript_index folder as the functions.js file and exported to their associated spaces.

## Additional Information

If you would like to watch the updates on the server side, I've included a console.log() to do just that!

```bash
{ x: 15, y: 5, direction: 5, array: ['right 4', 'steps 10'] }
```

The client can retrieve all this information themselves if they wish, but it helps to keep track of that information on the
server side as well.

## Roadmap

* Future updates for a project like this could include a more sophisticated auto-drawing feature directly in the CLI.
