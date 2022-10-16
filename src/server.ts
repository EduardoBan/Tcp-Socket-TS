require('dotenv').config();
import {TCPServer, Client} from "pocket-sockets";

import {separarStr  } from './strings';   


 
const serverOptions = {
    host: "localhost",
    port: parseInt(<string>process.env.App_Port, 10) || 3000 
};

const server = new TCPServer(serverOptions);
server.listen();
console.log("Servidor escuchando puerto: "+ serverOptions.port);



server.onConnection( (client: Client) => {
    console.log("Conexion aceptada IP: " + client.getRemoteAddress()?.toString());
    
    client.onData( (data: Buffer) => {
        console.log("Recibiendo datos: ", data.toString());
        console.log(separarStr(data.toString()));
        client.sendString("Datos recividos");
    });
    client.onClose( () => {
        console.log("Servidor: cerrado por el cliente");
        server.close();
    });


});