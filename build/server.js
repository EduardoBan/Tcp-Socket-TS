"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
// example-tcp.ts
//
// Run: npx ts-node ./example/example-tcp.ts
//
// Expected output:
//   pocket-sockets: TCP example
//   Server: listening...
//
require('dotenv').config();
const pocket_sockets_1 = require("pocket-sockets");
console.log("pocket-sockets: TCP example");
const serverOptions = {
    host: "localhost",
    //const port: Number = parseInt(process.env.PORT as string, 10) || 3000
    port: parseInt(process.env.App_Port, 10) || 3000
};
const server = new pocket_sockets_1.TCPServer(serverOptions);
server.listen();
console.log("Server: puerto .env: ", process.env.App_Port);
console.log("Servidor escuchando puerto: " + serverOptions.port);
server.onConnection((client) => {
    var _a;
    console.log("Servidor conexion aceptada IP: " + ((_a = client.getRemoteAddress()) === null || _a === void 0 ? void 0 : _a.toString()));
    client.onData((data) => {
        console.log("Server: incoming client data", data.toString());
        client.sendString("This is server: received!");
    });
    client.onClose(() => {
        console.log("Server: client connection closed");
        server.close();
    });
});
//# sourceMappingURL=server.js.map