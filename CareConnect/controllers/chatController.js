const { getResponse } = require('../utils/aiResponder');
const { saveChatMessage, getChatHistory } = require('../models/chatSession');

// Render chat page
exports.getChatPage = (req, res) => {
  const userId = req.session?.userId || 'guest';
  const chatHistory = getChatHistory(userId);
  res.render('chat', { chatHistory });
};

// Handle message (AJAX -> JSON)
exports.postChatMessage = (req, res) => {
  console.log("📩 Incoming POST to /mentalHealth/chat");
  console.log("🔹 Headers:", req.headers);
  console.log("🔹 Body:", req.body);

  const userId = req.session?.userId || 'guest';
  const userMsg = req.body.message;

  if (!userMsg) {
    console.log("❌ No message received in body!");
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const aiReply = getResponse(userMsg);

    saveChatMessage(userId, { user: userMsg, bot: aiReply });

    console.log("🤖 Reply sent:", aiReply);

    // ✅ Respond with JSON
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("🔥 Error in postChatMessage:", err);
    res.status(500).json({ error: "Server error" });
  }
};
