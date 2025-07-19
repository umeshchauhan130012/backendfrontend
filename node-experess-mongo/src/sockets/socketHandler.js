const Chats = require('../models/chats');
const clients = new Set();
const onlineUsers = new Map();

const handleSocketConnection = (ws, sender) => {
  ws.sender = sender; 
  clients.add(ws);
  onlineUsers.set(sender, ws);

  sendUniqueSenders(ws);
  
  ws.on('message', async (data) => {
    try {
      const messageData = JSON.parse(data);
      if (messageData.type === 'getChatHistory') {
        await sendChatHistory(ws, messageData.sender, messageData.recipient);
        console.log(`✅ ${messageData.sender} is online`);
      }

      if (messageData.type === 'newMessage') {
      const newMessage = new Chats({
        sender: messageData.sender,
        recipient: messageData.recipient,
        message: messageData.message,
        timestamp: Date.now() 
      });

      const savedMessage = await newMessage.save();
      console.log('Message saved to database:', savedMessage);
      clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ status: 'Message saved successfully', savedMessage }));
        }
      });
      await sendChatHistory(ws, messageData.sender, messageData.recipient);
    }
    } catch (err) {
      console.error('catch block processing message', err);
    }
  });
  ws.on('close', async () => {
    clients.delete(ws);
    console.log('WebSocket connection closed');
  });
};

// Function to fetch and send unique senders
const sendUniqueSenders = async (ws) => {
  try {
    const uniqueSenders = await Chats.distinct("sender");
    const usersWithStatus = await Promise.all(uniqueSenders.map(async (sender) => {
      const isOnline = onlineUsers.has(sender); 
      await Chats.updateMany({ sender }, { online: isOnline }); 
      return { sender, online: isOnline };
    })); 
    //console.log("lllllllllllllllll----------------",usersWithStatus);
    // ws.send(JSON.stringify({ type: 'uniqueSenders', users: uniqueSenders }));
    ws.send(JSON.stringify({ type: 'uniqueSenders', users: usersWithStatus }));
  } catch (error) {
    console.error('Catch block fetching unique user', error);
  }
}; 
// Function to fetch and send unique senders all history
const sendChatHistory = async (ws, currentUser, otherUser) => {
  try {
    const chatHistory = await Chats.find({
      $or: [
        { sender: currentUser, recipient: otherUser },
        { recipient: currentUser, sender: otherUser }
      ]
    }).sort({ timestamp: 1 });
    ws.send(JSON.stringify({ type: 'getChatHistory', chatHistory }));
  } catch (error) {
    console.error('catch block to find history', error);
  }
};


module.exports = { handleSocketConnection };
