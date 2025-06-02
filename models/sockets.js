class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // Manejar conexiones de Socket.IO
    this.io.on("connection", (socket) => {
      console.log("Un usuario se conectó:", socket.id);

      // Manejar mensajes del chat
      socket.on("chat message", (msg) => {
        console.log("Mensaje recibido:", msg);
        // Enviar el mensaje a todos los clientes conectados
        this.io.emit("chat message", {
          id: socket.id,
          message: msg,
          timestamp: new Date().toLocaleTimeString(),
        });
      });

      // Manejar cuando un usuario se desconecta
      socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
      });

      // Notificar a otros usuarios cuando alguien se conecta
      socket.broadcast.emit("user connected", {
        id: socket.id,
        timestamp: new Date().toLocaleTimeString(),
      });
    });
  }
}

module.exports = Sockets;
