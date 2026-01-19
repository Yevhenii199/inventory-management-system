const io = require('socket.io')(3001, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST"]
  }
});

let activeSessions = 0;

console.log('\x1b[32m%s\x1b[0m', '📡 Socket.io server starting on port 3001...');

io.on('connection', (socket) => {
  activeSessions++;
  console.log(`\x1b[36m[CONN]\x1b[0m New session. Total: ${activeSessions}`);
  
  // Надсилаємо оновлення всім
  io.emit('sessionCount', activeSessions);

  socket.on('disconnect', () => {
    activeSessions = Math.max(0, activeSessions - 1);
    console.log(`\x1b[33m[DISC]\x1b[0m Session closed. Total: ${activeSessions}`);
    io.emit('sessionCount', activeSessions);
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Обробка системних помилок (наприклад, порт зайнятий)
process.on('uncaughtException', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: Port 3001 is already in use!');
  } else {
    console.error(err);
  }
  process.exit(1);
});