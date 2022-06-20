const express = require("express");
const routes = require("./routes/main-router.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(8000, () => console.log("App is starting."));
