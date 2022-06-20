const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const express = require("express");
const router = require("./routes/main-router.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

app.use(router);

app.listen(8000, () => console.log("App is starting."));
