async function sendMessage() {
  const input = document.getElementById("messageInput");
  const chatBox = document.getElementById("chatBox");

  const userMsg = input.value.trim();
  if (!userMsg) return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.textContent = userMsg;
  chatBox.appendChild(userDiv);
  input.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;

  // Send to n8n webhook
  try {
    const response = await fetch("https://n8n.bmvsi.in/webhook/airbnb-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_name: "Website Guest",
        message: userMsg,
        channel: "web"
      })
    });

    const data = await response.json();

    // Show bot reply
    const botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.textContent = data.reply || "Sorry, I didn’t get that.";
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    const botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.textContent = "⚠️ Error connecting to server.";
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
