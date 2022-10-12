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
import { prototype } from "events";
import {TCPServer, Client} from "pocket-sockets";
 
console.log("pocket-sockets: TCP example");
const serverOptions = {
    host: "localhost",
    //const port: Number = parseInt(process.env.PORT as string, 10) || 3000
    port: parseInt(<string>process.env.App_Port, 10) || 3000 
};
const server = new TCPServer(serverOptions);
server.listen();
console.log("Server: puerto .env: ",process.env.App_Port );
console.log("Servidor escuchando puerto: "+ serverOptions.port);

server.onConnection( (client: Client) => {
    console.log("Servidor conexion aceptada IP: " + client.getRemoteAddress()?.toString());
    client.onData( (data: Buffer) => {
        console.log("Server: incoming client data", data.toString());
        client.sendString("This is server: received!");
    });
    client.onClose( () => {
        console.log("Server: client connection closed");
        server.close();
    });
});