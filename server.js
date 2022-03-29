//Requerimiento 1:
//Importación de las dependencias. No todas se usaron y algunas se instalaron solas: path y console

const enviar = require("./mailer");
const url = require("url");
const http = require("http");
const axios = require("axios");
const { Console } = require("console");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { parse } = require("path");

//Creación del servidor
http
  .createServer((req, res) => {
    let { correos, asunto, contenido } = url.parse(req.url, true).query;
    if (req.url == "/") {
      res.setHeader("content-type", "text/html");
      fs.readFile("index.html", "utf8", (err, data) => {
        res.end(data);
      });
    }
//Requerimiento 4: escribir mensaje de éxito o error al enviar el correo
    if (req.url.startsWith("/mailing")) {
      enviar(correos.split(","), asunto, contenido).then((response)=>{
        let shortid = uuidv4().slice(0, 6);
        console.log(correos);
        //Requerimiento 5: guardar los uuid de los correos enviados en la carpeta correos
        fs.writeFile(
          `./correos/${shortid}.txt`,
          correos,
          "utf8",
          (err, data) => {
          }
        );
        res.write(`<p class="alert alert-info w-25 m-auto text-center"> 
        Correos enviados exitosamente!</p>`)
        res.end() 
        console.log("Correo enviado con éxito");
      })
      .catch ((err) => {          
        res.write(`<p class="alert alert-info w-25 m-auto text-center"> 
        Algo salió mal</p>`)
        res.end()
      })
    }
  })
  .listen(3000, () => {
    console.log("Servidor encendido en el puerto 3000");
  });
