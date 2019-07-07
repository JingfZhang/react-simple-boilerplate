const express = require('express');
const WebSocket = require('ws');
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

const broadcast = (message) =>{
 wss.clients.forEach(function each(client){
   if (client.readyState === WebSocket.OPEN){
     client.send(message)
   }
 });
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  const numberOfUser = {type: "numberOfUser", number: wss.clients.size , systemMessage: {id: uuid(), type: "postNotification", content: "New user joined the chat"}};
  broadcast(JSON.stringify(numberOfUser));

  ws.on("message", (message) => {
    console.log('server recieved message', message);

    let incomingMessage = JSON.parse(message);

    // if (incomingMessage.type === "postMessage") {
      let outgoingMessage = Object.assign({id: uuid()}, incomingMessage);
      console.log(outgoingMessage);
      broadcast(JSON.stringify(outgoingMessage));
    // } else if (incomingMessage.type === "postNotification") {
    //   let outgoingMessage = Object.assign({id: uuid()}, incomingMessage);
    //   broadcast(JSON.stringify(outgoingMessage));
    // }


  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    const numberOfUser = {type: "numberOfUser", number: wss.clients.size, systemMessage: {id: uuid(), type: "postNotification", content: "User left the chat"}};
    broadcast(JSON.stringify(numberOfUser));
    console.log('Client disconnected');
  });
});

