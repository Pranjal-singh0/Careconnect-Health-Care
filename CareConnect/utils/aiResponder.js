// aiResponder.js - Improved supportive responses with variations

function getResponse(message) {
  const userMessage = message.toLowerCase();

  // Helper to pick a random response
  function pickResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  if (userMessage.includes("stress") || userMessage.includes("anxiety") || userMessage.includes("irritate")) {
    return pickResponse([
      "I'm sorry you're going through this. Taking slow, deep breaths or a short walk might help calm your mind.",
      "Stress can feel overwhelming. Sometimes writing down your thoughts or talking to someone you trust helps.",
      "Anxiety is tough, but remember it doesn’t define you. Small grounding exercises may help."
    ]);
  } 
  else if (userMessage.includes("depressed") || userMessage.includes("sad")) {
    return pickResponse([
      "I'm really sorry you're feeling this way. Remember, it's okay to ask for help and talk to someone you trust.",
      "Sadness can feel heavy. You’re not alone — reaching out to a counselor could bring relief.",
      "It’s completely valid to feel this way. Sometimes sharing your feelings lightens the burden."
    ]);
  } 
  else if (userMessage.includes("happy") || userMessage.includes("good")) {
    return pickResponse([
      "That’s wonderful to hear! Keep focusing on the things that make you feel this way. 😊",
      "I’m glad you’re feeling positive. Celebrate these moments — they really matter.",
      "Happiness is precious. Keep nurturing it by doing what you enjoy."
    ]);
  } 
  else if (userMessage.includes("help") || userMessage.includes("support")) {
    return pickResponse([
      "Of course — I’m here to listen. If you need professional resources, I can suggest some too.",
      "You’re not alone. Talking about what you need is already a strong first step.",
      "I’d be glad to support you. Would you like some strategies to cope, or professional contacts?"
    ]);
  } 
  else if (userMessage.includes("sleep")) {
    return pickResponse([
      "Good sleep is very important for your well-being. Do you find it hard to fall asleep or stay asleep?",
      "Sleep troubles are common with stress. A bedtime routine and avoiding screens might help.",
      "Your mind and body need rest. Relaxation techniques before bed may improve sleep quality."
    ]);
  } 
  else if (userMessage.includes("alone")) {
    return pickResponse([
      "You’re not alone in this journey. It’s always okay to reach out to loved ones or professionals.",
      "Feeling alone can be tough. I’m here with you — would you like to talk more about it?",
      "Sometimes loneliness feels heavy. Even small connections, like a chat, can help lighten it."
    ]);
  } 
  else {
    return pickResponse([
      "Tell me more about what’s on your mind. I’m here to listen.",
      "I’d like to understand better — how have you been feeling lately?",
      "Thanks for sharing. Can you explain a bit more about your situation?"
    ]);
  }
}

module.exports = { getResponse };
