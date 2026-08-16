const answers = [
    "The stars say yes...",
    "The path ahead is unclear...",
    "Trust your instincts...",
    "Something unexpected is approaching...",
    "The answer will reveal itself soon...",
    "Not everything is meant to be known yet..."
];
const questionInput = document.getElementById("question-Input");
const consultButton = document.getElementById("consult-Button");
const crystalBall = document.getElementById("crystalBall");
const answer = document.getElementById("answer");

consultButton.addEventListener("click", async function(){

  const question = questionInput.value.trim();
  
  if(question===""){
    answer.innerText = "The ball awaits your question...";
    return;//Stop running this function here.So the ball won't shake for an empty question.
  }
  
  crystalBall.classList.remove("ball-shake");
  void crystalBall.offsetWidth; // force reflow
  crystalBall.classList.add("ball-shake");

  answer.innerText = "The ball is consulting the unknown...";

  try{
  const response = await fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    } ,
    body: JSON.stringify({
      question: question
    })
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error("Server error");
    }
    answer.innerText = data.answer;
  } catch(error){
    console.log("Error", error);
    const randomIndex = Math.floor(Math.random() * answers.length);
    const randomAnswer = answers[randomIndex];
    answer.innerText = randomAnswer;
  }
});

