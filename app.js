const express = require("express");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { Client, LocalAuth } = require("whatsapp-web.js");
const app = express();

const clientId = "client-one";

const worker = `./.wwebjs_auth/session-${clientId}/Default/Service Worker`;
if (fs.existsSync(worker)) {
  fs.rmSync(worker, { recursive: true });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
  authStrategy: new LocalAuth({ clientId }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox"],
  },
});

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("auth_failure", (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
});

process.on("SIGINT", async () => {
  console.log("(SIGINT) Shutting down...");
  await client.destroy();
  process.exit(0);
});

client.on("ready", () => {
  console.log("READY");
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});

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
