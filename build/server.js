"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const pocket_sockets_1 = require("pocket-sockets");
const serverOptions = {
    host: "localhost",
    port: parseInt(process.env.App_Port, 10) || 3000
};
const server = new pocket_sockets_1.TCPServer(serverOptions);
server.listen();
console.log("Servidor escuchando puerto: " + serverOptions.port);
server.onConnection((client) => {
    var _a;
    console.log("Conexion aceptada IP: " + ((_a = client.getRemoteAddress()) === null || _a === void 0 ? void 0 : _a.toString()));
    client.onData((data) => {
        console.log("Recibiendo datos: ", data.toString());
        client.sendString("Datos resividos");
    });
    client.onClose(() => {
        console.log("Servidor: cerrado por el cliente");
        server.close();
    });
});
//# sourceMappingURL=server.js.map