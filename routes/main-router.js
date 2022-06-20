const express = require("express");
const router = express.Router();

router.post("/send-message", async (req, res) => {
  const number = `${req.body.number}@c.us`;
  const message = req.body.message;
  try {
    await client.sendMessage(number, message);
    res.json({ number, message });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
