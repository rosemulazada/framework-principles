import express from 'express';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const activeConnections = [];

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Client connected');
    activeConnections.push(ws);

    if (activeConnections.length > 3) {
        ws.close();
        console.log('Connection closed because the limit of 3 was exceeded');
        return;
    }

    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        ws.send('Hello from server');
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        const index = activeConnections.indexOf(ws);
        if (index !== -1) {
            activeConnections.splice(index, 1);
        }
    });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});