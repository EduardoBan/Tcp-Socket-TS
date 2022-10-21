"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const pocket_sockets_1 = require("pocket-sockets");
const strings_1 = require("./strings");
const serverOptions = {
    host: "localhost",
    port: parseInt(process.env.App_Port, 10) || 3000
};
const server = new pocket_sockets_1.TCPServer(serverOptions);
server.listen();
console.log("Servidor escuchando puerto: " + serverOptions.port);
var timeout;
server.onConnection((client) => {
    var _a, _b;
    console.log("Conexion aceptada IP: " + ((_a = client.getRemoteAddress()) === null || _a === void 0 ? void 0 : _a.toString()) + ' puerto:' + ((_b = client.getRemotePort()) === null || _b === void 0 ? void 0 : _b.toString()));
    //Al recibir una conexion, iniciamos el timer para cerrar el cliente por TimeOut en 1 minuto 60.000 mseg
    timeout = setTimeout(function () {
        var _a;
        let puerto = (_a = client.getRemotePort()) === null || _a === void 0 ? void 0 : _a.toString();
        client.close();
        console.log("\x1b[34m", 'Cerrado por TimeOut' + ' puerto;' + puerto, "\x1b[34m");
    }, 60000);
    client.onData((data) => {
        // si recibimos datos, reseteamos el timer, calcelamos el timer y lo volvemos a iniciar 
        clearTimeout(timeout); //
        timeout = setTimeout(function () {
            var _a;
            //  let puerto=client.getRemotePort()?.toString();
            let puerto = (_a = client.getRemotePort()) === null || _a === void 0 ? void 0 : _a.toString();
            client.close();
            console.log("\x1b[31m", 'Cerrado por TimeOut' + ' puerto: ' + puerto, "\x1b[31m");
        }, 60000);
        //-------------------------------------------------
        console.log("\x1b[33m", "Recibiendo datos: ", data.toString(), "\x1b[33m");
        console.log((0, strings_1.separarStr)(data.toString()));
        console.log(data.length.toString());
        client.sendString("Datos recividos");
    });
    client.onClose(() => {
        console.log('\x1b[36m', "Puerto cerrado con el cliente", '\x1b[0m');
        clearTimeout(timeout);
    });
});
//# sourceMappingURL=server.js.map