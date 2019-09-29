require("dotenv").config();
const express = require("express");
const config = require("./config/config");
// const path = require("path");
// const next = require("next");
// const chalk = require("chalk");

require("./server/lib/cron");

const createServer = require("./server/server");
const connectToDB = require("./config/mongodb");

const PORT = config.PORT;
const DATABASE_URL = config.mongoURL;
// const isdev = process.env.NODE_ENV !== "production";

// const nextjs = next({ isdev });
// const handle = nextjs.getRequestHandler();

const app = express();

createServer(app, PORT);
connectToDB(DATABASE_URL);

