const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

module.exports = {
  sendMessage: async (req, res) => {
    const number = `${req.body.number}@c.us`;
    const message = req.body.message;
    try {
      await client.sendMessage(number, message);
      res.json({ number, message });
    } catch (err) {
      res.json(err);
    }
  },
};
