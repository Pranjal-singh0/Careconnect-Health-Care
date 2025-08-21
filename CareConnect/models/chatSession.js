// For now using in-memory store
const chatData = {};

function saveChatMessage(userId, messagePair) {
  if (!chatData[userId]) {
    chatData[userId] = [];
  }
  chatData[userId].push(messagePair);
}

function getChatHistory(userId) {
  return chatData[userId] || [];
}

module.exports = { saveChatMessage, getChatHistory };
