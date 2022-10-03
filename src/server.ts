//
// example-tcp.ts
//
// Run: npx ts-node ./example/example-tcp.ts
//
// Expected output:
//   pocket-sockets: TCP example
//   Server: listening...
//

import {TCPServer, Client} from "pocket-sockets";
 
console.log("pocket-sockets: TCP example");
const serverOptions = {
    host: "localhost",
    port: 8181
};
const server = new TCPServer(serverOptions);
server.listen();
console.log("Server: listening...");

server.onConnection( (client: Client) => {
    console.log("Server: socket accepted");
    client.onData( (data: Buffer) => {
        console.log("Server: incoming client data", data);
        client.sendString("This is server: received!");
    });
    client.onClose( () => {
        console.log("Server: client connection closed");
        server.close();
    });
});