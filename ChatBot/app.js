const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-upload");

// Function to match user input and provide a response
const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Checking if message contains any question-like phrases
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
        return "Hello! How can I assist you today?";
    }

    if (lowerMessage.includes("your name") || lowerMessage.includes("who are you")) {
        return "I am your friendly chatbot created to help you out!";
    }

    if (lowerMessage.includes("time")) {
        return "I don't have the ability to check the time, but you can easily check it on your device.";
    }

    if (lowerMessage.includes("weather")) {
        return "I can’t check the weather, but I recommend using a weather app for the latest updates!";
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("assist") || lowerMessage.includes("support")) {
        return "How can I assist you today? Feel free to ask me anything!";
    }

    if (lowerMessage.includes("how are you")) {
        return "I'm doing great, thanks for asking! How can I help you today?";
    }

    if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
        return "You're welcome! I'm here to help!";
    }

    // If no matches found, return null (no response)
    return null;
};

// Create a new message element
const createMessageElement = (content, ...classes) => {
    const div = document.createElement('div');
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

// Handle outgoing user message
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;  // Don't send empty messages

    // Display user message
    messageInput.value = "";
    const outgoingMessageDiv = createMessageElement(`<div class="message-text">${userMessage}</div>`, "user-message");
    chatBody.appendChild(outgoingMessageDiv);

    // Show bot "thinking" animation
    const thinkingDiv = createMessageElement(`
        <div class="bot-avatar">
            <i class="fa-regular fa-message"></i>
        </div>
        <div class="thinking-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>`, "bot-message", "thinking");
    chatBody.appendChild(thinkingDiv);

    // After a short delay, show the bot's response
    setTimeout(() => {
        thinkingDiv.remove();
        const botResponse = getBotResponse(userMessage);  // Get bot response based on user message

        // Only show bot message if there's a valid response
        if (botResponse) {
            const botMessageDiv = createMessageElement(`<div class="message-text">${botResponse}</div>`, "bot-message");
            chatBody.appendChild(botMessageDiv);
        }

        // Scroll to the latest message
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1500);  // Delay for "thinking" effect
};

// Handle the enter key to send messages
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage) {
        handleOutgoingMessage(e);
    }
});

// Handle the send button click event
sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector("#file-upload").addEventListener("click" , () => fileInput.click());