const apiKey = "YOUR_OPENROUTER_API_KEY";

async function translate() {
  const input = document.getElementById("userInput").value;
  const tone = document.getElementById("tone").value;

  const prompt = `A user is overthinking. Here's their spiraling thought:\n\n"\${input}"\n\nPlease reframe their thought in \${tone} tone.\n\nRespond with a helpful, single-paragraph reframe using that tone. Do not restate their original thought. Focus on bringing them calm clarity.`;

  const responseBox = document.getElementById("response");
  responseBox.innerText = "Thinking...";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${apiKey}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openrouter/mixtral-8x7b-32768",
      messages: [
        { role: "system", content: "You are a calm, emotionally intelligent assistant who reframes anxious overthinking into clear, grounded thoughts." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await res.json();
  const output = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";
  responseBox.innerText = output;
}
