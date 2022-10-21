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
var timeout:  number | NodeJS.Timeout | undefined;

server.onConnection( (client: Client) => {
    console.log("Conexion aceptada IP: " + client.getRemoteAddress()?.toString()+' puerto:'+ client.getRemotePort()?.toString());
  
    //Al recibir una conexion, iniciamos el timer para cerrar el cliente por TimeOut en 1 minuto 60.000 mseg
    timeout = setTimeout(function () {
        let puerto=client.getRemotePort()?.toString();
        client.close();
        console.log("\x1b[34m",'Cerrado por TimeOut'+ ' puerto;'+puerto,"\x1b[34m");
    }, 60000);

    client.onData((data: Buffer) => {

       // si recibimos datos, reseteamos el timer, calcelamos el timer y lo volvemos a iniciar 
        clearTimeout(timeout);  //
        timeout = setTimeout(function () {
          //  let puerto=client.getRemotePort()?.toString();
            let puerto= client.getRemotePort()?.toString();
            client.close();
            console.log("\x1b[31m",'Cerrado por TimeOut'+ ' puerto: '+puerto,"\x1b[31m");
        }, 60000);

        //-------------------------------------------------
        console.log("\x1b[33m","Recibiendo datos: ", data.toString(),"\x1b[33m");
        console.log(separarStr(data.toString()));
        console.log(data.length.toString());
        client.sendString("Datos recividos");
    });
    client.onClose(() => {
        console.log('\x1b[36m',"Puerto cerrado con el cliente",'\x1b[0m');
        clearTimeout(timeout);
    });

});