const express = require("express");
const router = express.Router();
const Chats = require("../models/chats");
const cors = require('cors');

router.use(cors());

// You can create REST endpoints here if needed.
router.get('/messages', async (req, res) => {
  try {
    const messages = await Chats.find();
    res.json(messages);
  } catch (error) {
    res.status(500).send('Error retrieving messages');
  }
});

//Chat user
router.get("/chatUser", async (req, res) => {
  try {
    const uniqueSenders = await Chats.distinct("sender");
    res.status(200).json({ users: uniqueSenders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch unique senders" });
  }
});

//  all Get by recipient messages
router.get("/messages/:currentUser/:otherUser", async (req, res) => {
  const { currentUser, otherUser } = req.params;
  try {
    const messages = await Chats.find({
      $or: [
        { sender: currentUser, recipient: otherUser },
        { recipient: currentUser, sender: otherUser }
      ]
    }).sort({ timestamp: 1 });
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
});


module.exports = router;
