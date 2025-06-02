const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }

  middlewares() {
    // Configurar CORS para permitir cualquier dominio
    this.app.use(
      cors({
        origin: "*",
      })
    );
    // Servir archivos estáticos desde el directorio actual
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configurationSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar middlewares
    this.middlewares();

    // Configurar sockets
    this.configurationSockets();

    // Iniciar servidor
    this.server.listen(this.port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
