const WebSocket = require('ws');
const http = require('http');
const hostname = '127.0.0.1';
const port = 8001;

// HTTP server setup
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>WebSocket Test</title>
    </head>
    <body>
      <script>
        let client = new WebSocket("ws://localhost:8001");

        client.onopen = () => {
          console.log("Connected");
          console.log("Sending message");
          client.send("soy goku");
        };

        client.onmessage = (event) => {
          console.log("Message received: " + event.data);
        };

        client.onclose = () => {
          console.log("Connection closed");
        };
      </script>
    </body>
    </html>
  `);
});

// WebSocket server setup
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // Broadcast to all clients when a new client connects
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('A new user has joined the chat');
    }
  });

  ws.on('message', (message) => {
    console.log('Received:', message);
    // Broadcast the received message to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('echo a message: ' + message);
      }
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
