const chatForm = document.getElementById("chat-form");
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  addMessage("user", input);

  setTimeout(() => {
    const fakeReply = generatePlan(input);
    addMessage("bot", fakeReply);
  }, 500);

  userInput.value = "";
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = `${sender === "user" ? "You" : "PlanGen"}: ${text}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function generatePlan(input) {
  input = input.toLowerCase();
  if (input.includes("skip")) {
    return "Slide into the library with a fake hall pass or use a chrome extension that mimics attendance 🤫";
  } else if (input.includes("money")) {
    return "Sell snacks under desk level or flip limiteds on Roblox 💵";
  } else {
    return "Let's see... you could fake a club meeting or act like you got tutoring 👀";
  }
}
