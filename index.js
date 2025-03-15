const express = require("express");
const app = express();
const cors = require("cors");

// const path = require("path");
const routes = require("./routes.js");
const config = require("./config.json");

const fs = require("fs");
const https = require("https");

app.use(cors());
app.use(express.static("./public/"));
app.use("/", routes.router);

app.use(function (req, res) {
  res.send({ error: "EINVALIDROUTE" });
});

const GEN = require("./gen.js");

routes.DBH.init(config.DB, {}, GEN).then(() => {
  if (config.web.ssl) {
    https
      .createServer(
        {
          key: fs.readFileSync("./SSL/key.pem"),
          cert: fs.readFileSync("./SSL/cert.pem"),
        },
        app
      )
      .listen(config.web.port, () => {
        startLog();
      });
  } else {
    app.listen(config.web.port, () => {
      startLog();
    });
  }
});

function startLog() {
  console.log(
    `started web api on port ${config.web.port}, ssl: ${config.web.ssl}`
  );
}

process.on("uncaughtException", error => {
  console.log(error);
});
