const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const express = require("express");

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

app.post("/send-message", async (req, res) => {
  const number = `${req.body.number}@c.us`;
  const message = req.body.message;
  try {
    await client.sendMessage(number, message);
    res.json({ number, message });
  } catch (err) {
    res.json(err);
  }
});

app.listen(8000, () => console.log("App is starting."));
