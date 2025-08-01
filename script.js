document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('high-score').innerText = `High Score: ${highScore}`;
});

//below are the tutorial code
const closeTutorial = document.getElementById("tutorial-close");
const tutorialBackground = document.getElementById("tutorial-background");
const questionMain = document.getElementById("question-form");

closeTutorial.addEventListener("click", async (e) => {
  e.preventDefault();
  tutorialBackground.classList.add("closeElement");
  await new Promise(resolve => setTimeout(resolve, 1000));
  tutorialBackground.style.display = "none";
});

//below are the form code
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const amount = document.getElementById("amount");

let data;
let quizAPI;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

const submitButton = document.getElementById("submit-form");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const userAmount = amount.value;
  if (userAmount <= 30 && userAmount >= 1) {
    const userCategory = category.value;
    const userDifficulty = difficulty.value;
    console.log(userAmount, userDifficulty, userCategory);
    quizAPI = `https://opentdb.com/api.php?amount=${userAmount}&category=${userCategory}&difficulty=${userDifficulty}&type=multiple`;

    const form = document.getElementById("form-container");
    form.classList.add("closeElement");
    setTimeout(() => {
      form.style.display = "none";
      form.classList.remove('closeElement');
    }, 500);
    setQuestion();
  } else {
    amount.style.borderColor = "red";
  }
});

//url format: https://opentdb.com/api.php?amount=10&category=24&difficulty=easy&type=multiple
/*
generalknowledge: category=9
animals: category=27
computers: category=18
anime: category=31

amount: amount=10
difficulty: difficulty=easy
type=multiple
*/

const setQuestion = async () => {
  try {
    const res = await fetch(quizAPI);
    data = await res.json();
    console.log(quizAPI);
    getQuestion();
  } catch (e) {
    console.log(e);
  }
};

const getQuestion = () => {
  data.results.forEach((item, i) => {
    const randomNumber = Math.floor(Math.random() * 4);
    const answers = [...item.incorrect_answers];
    answers.splice(randomNumber, 0, item.correct_answer);

    const choices = answers.map(answer => 
      `<label><input type="radio" name="question${i}" value="${answer}">${answer}</label>`
    ).join('');

    const questionContainer = document.createElement("section");
    questionContainer.innerHTML = `
      <p>Question no. ${i + 1}</p>
      <div class="question-container bg-secondary p-4 text-light rounded mb-4">
        ${item.question}
      </div>
      <div class="choice-container d-flex flex-column w-100 gap-2 mb-4">
        ${choices}
      </div>
      <hr>
    `;
    console.log(`Question ${i + 1}: Random number is ${randomNumber + 1}`);
    questionMain.appendChild(questionContainer);
  });

  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-primary", "align-self-center", "mb-5");
  submitButton.id = "submit-quiz";
  submitButton.innerText = "Submit";
  questionMain.appendChild(submitButton);

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    let score = 0;

    data.results.forEach((item, i) => {
      const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
      if (selectedOption && selectedOption.value === item.correct_answer) {
        score += 1;
      }
    });

    alert(`You scored ${score} out of ${data.results.length}`);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      document.getElementById('high-score').innerText = `High Score: ${highScore}`;
    }
    deleteQuestion();
  });
};

const deleteQuestion = () => {
  questionMain.innerHTML = '';
  document.getElementById('form-container').style.display = 'block';
};
