const mongoose = require("mongoose");
const { chat } = require("@pinecone-database/pinecone/dist/assistant/data/chat");
const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");
const { deleteUserFromPinecone } = require("../services/vector.service");


async function createChat(req, res) {
    const { title } = req.body;
    const user = req.user;

    // 1️⃣ Create chat
    const chat = await chatModel.create({
        user: user._id,
        title
    });

    // 2️⃣ Create first AI/system message for this chat
    const firstMessage = await messageModel.create({
        user: user._id,          // or use a system user ID if you have one
        chat: chat._id,
        content: "New chat started. How can I help?",
        role: "model"             // AI/system message
    });

    // 3️⃣ Send response including first message
    res.status(201).json({
        message: "Chat created successfully",
        chat: {
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user,
            messages: [firstMessage]  // include the first message
        }
    });
}


async function getChats(req,res)
{
    const user = req.user;
    const chats = await chatModel.find({user:user._id});
    res.status(200).json({
        chats:chats
    })
}

async function deleteChat(req, res) {
  const user = req.user; 
  const { id } = req.params; 

  // 1️⃣ Delete the chat
  const chat = await chatModel.findOneAndDelete({ _id: id, user: user._id });
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  // 2️⃣ Delete all messages related to this chat
  await messageModel.deleteMany({ chat: id });

    // Delete user’s embeddings from Pinecone
    await deleteUserFromPinecone(id);

  res.status(200).json({
    message: "Chat and its messages deleted successfully"
  });
}



async function getMessagesByChatId(req, res) {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid chat ID" });
  }

  try {
    const messages = await messageModel
      .find({ chat: id })
      .populate("user", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
}


module.exports = {
    createChat,
    getChats,
    deleteChat,
    getMessagesByChatId
};