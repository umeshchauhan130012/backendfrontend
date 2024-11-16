const express = require("express");
require("./db/conn");
const loginRoute = require("./routers/login")
const tagData = require("./routers/tag");
const storyData = require("./routers/story");
const socialData = require("./routers/social");
const categoryData = require("./routers/category");
const gallery = require("./routers/gallery");
const chat = require("./routers/chat");
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { handleSocketConnection } = require('./sockets/socketHandler');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(loginRoute);
app.use(tagData);
app.use(storyData);
app.use(socialData);
app.use(categoryData);
app.use(gallery);
app.use(chat);

const server = createServer(app);
const wss = new WebSocketServer({ server });
wss.on('connection', handleSocketConnection);

server.listen(port, ()=>{console.log(`connection setup at ${port}`);}) 
  