"use strict";
//
// example-tcp.ts
//
// Run: npx ts-node ./example/example-tcp.ts
//
// Expected output:
//   pocket-sockets: TCP example
//   Server: listening...
//
Object.defineProperty(exports, "__esModule", { value: true });
const pocket_sockets_1 = require("pocket-sockets");
console.log("pocket-sockets: TCP example");
const serverOptions = {
    host: "localhost",
    port: 8181
};
const server = new pocket_sockets_1.TCPServer(serverOptions);
server.listen();
console.log("Server: listening...");
server.onConnection((client) => {
    console.log("Server: socket accepted");
    client.onData((data) => {
        console.log("Server: incoming client data", data);
        client.sendString("This is server: received!");
    });
    client.onClose(() => {
        console.log("Server: client connection closed");
        server.close();
    });
});
