const chatForm = document.getElementById("chat-form");
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  addMessage("user", input);

  const reply = await generatePlan(input);
  addMessage("bot", reply);

  userInput.value = "";
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = `${sender === "user" ? "You" : "PlanGen"}: ${text}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function generatePlan(input) {
  try {
    const response = await fetch('https://openai80.p.rapidapi.com/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'demo-key-1234567890', // demo key, low limit
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return "AI is taking a break, try again later";
  }
}
