import express from 'express';
import { createServer } from 'http';
import { join } from 'path';
import { Server } from 'socket.io';
import {
  getKeyByValue,
  getUsername,
  getTextFromPrivateMessage,
} from './utils.js';

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;
const rootDir = process.cwd();
const users = new Map();

app.use(
  [/^\/client\/pages($|\/)/, '/client'],
  express.static(join(`${rootDir}/client`))
);

app.get('/', (req, res) => {
  res.sendFile(join(`${rootDir}/client`, '/pages/index.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(join(`${rootDir}/client`, '/pages/chat.html'));
});

app.get('/*', (req, res) => {
  res.send('404 - PAGE NOT FOUND');
});

// Socket.io
io.on('connection', (socket) => {
  socket.on('set-user', (user) => {
    users.set(socket.id, user.username);

    io.emit('get-users', Array.from(users.entries()));

    socket.broadcast.emit('user-connect', {
      className: '',
      text: 'has joined the chat...',
      username: user.username,
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnect', {
      className: '',
      text: 'has left the chat...',
      username: users.get(socket.id),
    });
    users.delete(socket.id);
    socket.broadcast.emit('get-users', Array.from(users.entries()));
  });

  socket.on('general-message', (message) => {
    socket.broadcast.emit('general-message', message);
  });

  socket.on('private-message', (message) => {
    const username = getUsername(message.text);
    const userId = getKeyByValue(users, username);

    if (!username || !userId) {
      socket.emit('incorrect-private-message');
      return;
    }

    // The text after removing the @username
    const actualText = getTextFromPrivateMessage(message.text);

    socket.emit('correct-private-message', {
      className: 'private-message',
      text: actualText,
      username: users.get(socket.id),
    });

    socket.to(userId).emit('private-message', {
      className: 'private-message',
      text: actualText,
      username: users.get(socket.id),
    });
  });

  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('new-ice-candidate', (icecandidate) => {
    socket.broadcast.emit('icecandidate', icecandidate);
  });
});

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
