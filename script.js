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
  await setTimeout(() => {
    tutorialBackground.style.display = "none";
  }, 1000);
});

//below are the form code

const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const amount = document.getElementById("amount");

let data; //for the json
let quizAPI; //for the url
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

const submitButton = document.getElementById("submit-form");

submitButton.addEventListener("click", (e) => {
  //this might be submit || click
  e.preventDefault();
  //the code to set the value for each user input

  const userAmount = amount.value;
  if (userAmount <= 10 && userAmount >= 1) {
    const userCategory = category.value;
    const userDifficulty = difficulty.value;
    console.log(userAmount, userDifficulty, userCategory);
    quizAPI = `https://opentdb.com/api.php?amount=${userAmount}&category=${userCategory}&difficulty=${userDifficulty}&type=multiple`;

    //closing form
    const form = document.getElementById("form-container");
    form.classList.add("closeElement");
    setTimeout(() => {
      form.style.display = "none";
    }, 500);
    form.classList.remove('closeElement')
    setQuestion();
  } else {
    amount.style.borderColor = "red";
    return;
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
  for (let i = 0; i < data.results.length; i++) {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    const questionContainer = document.createElement("section");
    if (randomNumber === 1) {
      questionContainer.innerHTML = `
    <p>Question no. ${i + 1}
    <div class="question-container bg-secondary p-4 text-light rounded mb-4">
      ${data.results[i].question}
    </div>
    <div class="choice-container d-flex flex-column w-100 gap-2 mb-4">
      <label><input type="radio" name="question${i}" value="${
        data.results[i].correct_answer
      }">${data.results[i].correct_answer}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[0]
      }">${data.results[i].incorrect_answers[0]}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[1]
      }">${data.results[i].incorrect_answers[1]}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[2]
      }">${data.results[i].incorrect_answers[2]}</label>
    </div>
    <hr>
  `;
    } else if (randomNumber === 2) {
      questionContainer.innerHTML = `
    <p>Question no. ${i + 1}
    <div class="question-container bg-secondary p-4 text-light rounded mb-4">
      ${data.results[i].question}
    </div>
    <div class="choice-container d-flex flex-column w-100 gap-2 mb-4">
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[0]
      }">${data.results[i].incorrect_answers[0]}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].correct_answer
      }">${data.results[i].correct_answer}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[1]
      }">${data.results[i].incorrect_answers[1]}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[2]
      }">${data.results[i].incorrect_answers[2]}</label>
    </div>
    <hr>
  `;
    } else if (randomNumber === 3) {
      questionContainer.innerHTML = `
    <p>Question no. ${i + 1}
    <div class="question-container bg-secondary p-4 text-light rounded mb-4">
      ${data.results[i].question}
    </div>
    <div class="choice-container d-flex flex-column w-100 gap-2 mb-4">
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[0]
      }">${data.results[i].incorrect_answers[0]}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[1]
      }">${data.results[i].incorrect_answers[1]}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].correct_answer
      }">${data.results[i].correct_answer}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[2]
      }">${data.results[i].incorrect_answers[2]}</label>
    </div>
    <hr>
  `;
    } else if (randomNumber === 4) {
      questionContainer.innerHTML = `
    <p>Question no. ${i + 1}
    <div class="question-container bg-secondary p-4 text-light rounded mb-4">
      ${data.results[i].question}
    </div>
    <div class="choice-container d-flex flex-column w-100 gap-2 mb-4">
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[0]
      }">${data.results[i].incorrect_answers[0]}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[1]
      }">${data.results[i].incorrect_answers[1]}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].incorrect_answers[2]
      }">${data.results[i].incorrect_answers[2]}</label>
      <label><input type="radio" name="question${i}" value="${
        data.results[i].correct_answer
      }">${data.results[i].correct_answer}</label>
    </div>
    <hr>
  `;
    }
    console.log(`Question ${i + 1}: Random number is ${randomNumber}`);
    questionMain.appendChild(questionContainer);
  }
  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-primary", "align-self-center", "mb-5");
  submitButton.id = "submit-quiz";
  submitButton.innerText = "Submit";
  questionMain.appendChild(submitButton);

  submitButton.addEventListener("click", function (e) {
    e.preventDefault()
    let score = 0;

    for (let i = 0; i < data.results.length; i++) {
      const selectedOption = document.querySelector(
        `input[name="question${i}"]:checked`
      );
      if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = data.results[i].correct_answer;

        if (userAnswer === correctAnswer) {
          score += 1;
        }
      }
    }
    alert(`You scored ${score} out of ${data.results.length}`);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      document.getElementById('high-score').innerText = `High Score: ${highScore}`
    }
    deleteQuestion()
  });
};

const deleteQuestion = () => {
  questionMain.innerHTML = '';
  const form = document.getElementById('form-container')
  form.style.display = 'block';
}