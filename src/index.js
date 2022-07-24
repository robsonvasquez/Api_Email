const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const body_parser = require('body-parser');
require('dotenv').config();

const app = express();

const config_email = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    port: 587, // true for 465, false for other ports
    secure: false,
    auth: {
        user: process.env.SEND_EMAIL, // generated ethereal user
        pass: process.env.PASS_SEND_EMAIL, // generated ethereal password
    },
});

app.use(body_parser.json());

app.use(cors({
    origin: process.env.REQUIRE_URL
}));

app.post("/send-email", (req, res) => {

    let message = {
        from: "",
        to: process.env.SEND_EMAIL,
        subject: `${req.body.assunto} - Portifólio`,
        text: `Email de Contato: ${req.body.email}\n 
                Mensagem: ${req.body.mensagem}`,
        html: `<h4>Nome de Contato: ${req.body.nome}</h4>
                <h4>Email de Contato: ${req.body.email}</h4> 
                <h4>Mensagem: ${req.body.mensagem}</h4>`
    };

    config_email.sendMail(message);
    //console.log(message)
    res.send()
});

app.listen(process.env.PORT);