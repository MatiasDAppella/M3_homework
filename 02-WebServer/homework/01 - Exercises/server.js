var fs = require("fs");
var http = require("http");
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001;
const server = http.createServer((req, res) => {
    console.log(`Server raised in port ${PORT}`)

    if (req.url === "/api"){
        return fs.readFile('./utils/dogsData.json', (err, data) => {
            return (err)
                ? res.writeHead(404, { "content-type": "text/plain" }).end("json not found")
                : res.writeHead(200, { "content-type": "application/json" }).end(data.toString())
        })
    };

    if (req.url === "/allDogs"){
        return fs.readFile('./utils/allDogs.html', 'utf8', (err, data) => {
            return (err)
                ? res.writeHead(404, { "content-type": "text/plain" }).end("html not found")
                : res.writeHead(200, { "content-type": "text/html" }).end(data)
        })
    };

    return res.writeHead(404, { "content-type": "text/plain" }).end("Route not found")

}).listen(PORT)
/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports =
  /* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */
  server;