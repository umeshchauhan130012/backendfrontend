const Chats = require('../models/chats');
const clients = new Set();
const onlineUsers = new Map();


const handleSocketConnection = (ws, sender) => {
  ws.sender = sender; 
  clients.add(ws);
  onlineUsers.set(sender, ws);

  Chats.updateMany(
      { sender: sender },
      { online: true }
    ).catch(() => {
      console.error('Error updating user online status:');
  });
  sendUniqueSenders(ws);
  
  ws.on('message', async (data) => {
    try {
      const messageData = JSON.parse(data);
      if (messageData.type === 'getChatHistory') {
        await sendChatHistory(ws, messageData.sender, messageData.recipient);
      }

      if (messageData.type === 'newMessage') {
      const newMessage = new Chats({
        sender: messageData.sender,
        recipient: messageData.recipient,
        message: messageData.message,
        timestamp: Date.now() // Set to current date and time
      });

      const savedMessage = await newMessage.save();
      console.log('Message saved to database:', savedMessage);
      // Broadcast the new message to all connected clients
      clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ status: 'Message saved successfully', savedMessage }));
        }
      });
      await sendChatHistory(ws, messageData.sender, messageData.recipient);
    }
    } catch (err) {
      console.error('Error processing message', err);
    }
  });
  ws.on('close', async () => {
    clients.delete(ws);
    console.log('WebSocket connection closed');
    await Chats.updateMany(
      { sender: sender },
      { online: false }
     ).catch(() => console.error('Error: user offline sockets close:'));
  });
};

// Function to fetch and send unique senders
const sendUniqueSenders = async (ws) => {
  try {
    const uniqueSenders = await Chats.distinct("sender");
    const usersWithStatus = await Promise.all(uniqueSenders.map(async (sender) => {
      const isOnline = onlineUsers.has(sender); // Check online status in the map
      await Chats.updateMany({ sender }, { online: isOnline }); // Update online status in DB
      return { sender, online: isOnline };
    })); 
    //console.log("lllllllllllllllll----------------",usersWithStatus);
    // ws.send(JSON.stringify({ type: 'uniqueSenders', users: uniqueSenders }));
    ws.send(JSON.stringify({ type: 'uniqueSenders', users: usersWithStatus }));
  } catch (error) {
    console.error('Error fetching unique user', error);
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
    console.error('Error to find history', error);
  }
};


module.exports = { handleSocketConnection };
