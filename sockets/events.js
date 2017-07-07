// SOCKET.IO EVENTS

module.exports = (socket, db) => {

  socket.on('hello', data => {
    console.log(`Hello ${data.name}`);
  });

};