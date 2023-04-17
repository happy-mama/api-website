const express = require("express");
const app = express();
const cors = require("cors")

const path = require("path");
const routes = require("./routes.js");
const config = require("./config.json");

const fs = require("fs");
const https = require("https");

app.set("views", path.join(__dirname + "/views/", ""));
app.set("view engine", "ejs");

app.use(cors())
app.use("/", routes.router);
app.use(express.static("./public/"));
app.use(function(req, res, next) {
	next();
});

app.use(function(req, res) {
	res.send({"error": "EINVALIDROUTE"});
});

routes.DBH.init().then(() => {
	if (config.web.ssl) {
		https.createServer(
			{
				key: fs.readFileSync("./SSL/key.pem"),
				cert: fs.readFileSync("./SSL/cert.pem")
			},
			app
		).listen(config.web.port, () => { startLog(); });
	} else {
		app.listen(config.web.port, () => { startLog(); });
	}
});

function startLog() {
	console.log(`started web api on port ${config.web.port}, ssl: ${config.web.ssl}`);
}

process.on("uncaughtException", error => {
	console.log(error)
})