//Requerimiento 1: importación del paquete nodemailer
const nodemailer = require("nodemailer");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { resolveContent } = require("nodemailer/lib/shared");
const fs = require("fs");
const { resolve } = require("path");

//Requerimiento 2: Crear una función que reciba la lista de correos, asunto y contenido a enviar. Esta función debe retornar una promesa.  
let enviar = (correos, asunto, contenido) => {
  return new Promise(async (resolve, reject) => {
    //Requerimiento 3: realizar una peticón a la api
    axios.get("https://mindicador.cl/api").then((data) => {
      const dolar = data.data.dolar.valor;
      const euro = data.data.euro.valor;
      const uf = data.data.uf.valor;
      const utm = data.data.utm.valor;
      //Requerimiento 3: Creación del template
      const plantilla = `
            <br>
            <p>el valor dolar el día de hoy es: ${dolar}</p>
            <p>el valor euro el día de hoy es: ${euro}</p>
            <p>el valor uf el día de hoy es: ${uf}</p>
            <p>el valor utm el día de hoy es: ${utm}</p>
            `;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "chileinfoclub@gmail.com",
          pass: "2022@infoclub",
        },
      });

      let mailOptions = {
        from: "chileinfoclub@gmail.com",
        to: correos,
        subject: asunto,
        html: contenido + plantilla,
      };

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          reject(err);
      } if (data) {
          resolve(data);
      }
      });
    });
  });
};

module.exports = enviar;
