require("dotenv").config();
const express = require("express");// Import the Express framework
const cors = require("cors");
const app = express();// Create an Express application
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000; // Define the port number

app.use(express.static(__dirname));
app.post("/ask", async function(req, res){
  const question = req.body.question;
  console.log("Question received:", question);
  try{
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "openrouter/free",
    messages: [
      {
        role: "system",
      content: "You are a mysterious magical oracle inside a crystal ball. Answer the user's question in 1 to 3 short sentences. Be mystical, poetic, intriguing, and slightly ambiguous, but still meaningful. Never claim that you can actually predict the future."
      },
      {
        role: "user",
        content: question
      }
        ]
      })
    });

    const data = await response.json();
        console.log(data);
        const answer = data.choices[0].message.content;
        res.json({
            answer: answer
        });
    } catch (error) {
        console.error("AI error:", error);
        res.status(500).json({
            answer: "The crystal ball is clouded... Try again."
        });
    }
});

app.listen(PORT, function(){
  console.log(`Magic Ball running on port ${PORT}`);
});
