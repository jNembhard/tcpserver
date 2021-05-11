const net = require("net");
const {test, enterCommand, readline} = require("./javascript_index/functions");
const personalClient = new net.Socket();
const HOST = "127.0.0.1";
const PORT = 8124;

personalClient.connect(PORT, HOST, async function() {
  console.log('Connected at ' + HOST + " " + PORT + "\n");
  enterCommand(personalClient);
});

personalClient.on('data', function(data) {
  console.log(data.toString());

  if (data.toString() == "Bye! Come draw again sometime!\r\n") {
    personalClient.end();
    return false;
  } else {
    enterCommand(personalClient);
  }
});

personalClient.on('error', function(err) {
  console.log(`Error: ${err}`);
});

personalClient.on('end', function() {
  readline.close();
});
