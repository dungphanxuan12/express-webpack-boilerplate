require("dotenv").config();

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";

import dbConfig from "./src/configs/db.config";

const rfs = require("rotating-file-stream");

const app = express();
dbConfig();

app.use(helmet());

//logging with morgan
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});
app.use(
  isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);

app.use(cors());
app.use(express.json());

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
console.log("MODE|", process.env.NODE_ENV);

app.get("*", (req, res) => {
  res.json({
    message: "hello",
  });
});

app.listen(PORT, HOST, () => {
  console.log(`server listening on ${HOST}:${PORT}`);
});
