const express = require("express");
require("./db/conn");
const loginRoute = require("./routers/login");
const tagData = require("./routers/tag");
const storyData = require("./routers/story");
const photostoryData = require("./routers/photostory");
const socialData = require("./routers/social");
const copyData = require("./routers/copyright");
const menuData = require("./routers/menuitem");
const footermenudata = require("./routers/footermenuitem");
const networkmenudata = require("./routers/networkmenu");
const categoryData = require("./routers/category");
const gallery = require("./routers/gallery");
const chat = require("./routers/chat");
const email = require("./routers/email");
const headerlogo = require("./routers/logoheader");
const footerlogo = require("./routers/logofooter");
const youtubedata = require("./routers/youtube");
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { handleSocketConnection } = require('./sockets/socketHandler');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(loginRoute);
app.use(tagData);
app.use(storyData);
app.use(photostoryData);
app.use(socialData);
app.use(copyData);
app.use(menuData);
app.use(footermenudata);
app.use(networkmenudata);
app.use(categoryData);
app.use(gallery);
app.use(chat);
app.use(email);
app.use(headerlogo);
app.use(footerlogo);
app.use(youtubedata);

const server = createServer(app);
const wss = new WebSocketServer({ server });
wss.on('connection', handleSocketConnection);

server.listen(port, ()=>{console.log(`connection setup at ${port}`);}) 
  