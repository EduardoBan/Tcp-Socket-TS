"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separarStr = void 0;
/*
/dev/CavasPerdriel/save?sx0=180&sx1=180&sx2=900&sx3=0&sx4=-64&u=CavasPerdriel&p=12345&d=1512409551&z=p
*/
let pos = 0;
let long = 0;
let string = '';
// separo el string utilizando el separador '&'
function separarStr(palabra) {
    string = borrarStr(palabra);
    let datoStr = string.split('&');
    return datoStr;
}
exports.separarStr = separarStr;
//busco el simbolo ? y saco el sub string desde el simbolo hasta el final.
function borrarStr(palabra) {
    pos = palabra.indexOf('?');
    long = palabra.length;
    string = palabra.substring(pos + 1, long);
    return string;
}
//# sourceMappingURL=strings.js.map