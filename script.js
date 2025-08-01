let data;
let quizAPI;
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"))
  : 0;

let timerInterval; // Global timer reference

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("high-score").innerText = `High Score: ${highScore}`;
});

// Tutorial logic
const closeTutorial = document.getElementById("tutorial-close");
const tutorialBackground = document.getElementById("tutorial-background");
const questionMain = document.getElementById("question-form");

closeTutorial.addEventListener("click", async (e) => {
  e.preventDefault();
  tutorialBackground.classList.add("closeElement");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  tutorialBackground.style.display = "none";
});

// Form elements
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const amount = document.getElementById("amount");

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
      form.classList.remove("closeElement");
    }, 500);
    setQuestion();
  } else {
    amount.style.borderColor = "red";
  }
});

// Fetch and Display Questions
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

    const choices = answers
      .map(
        (answer) =>
          `<label><input type="radio" name="question${i}" value="${answer}">${answer}</label>`
      )
      .join("");

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

  // Handle manual submit

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    submissionVerify();
  });

  // Start timer and auto-submit on time out
  startTimer(submitQuiz);
};

// Submission logic
const submitQuiz = () => {
  modal.style.display = "none";
  clearInterval(timerInterval); // Stop timer
  document.getElementById("timer-container").style.display = "none"; // Hide timer

  let score = 0;

  data.results.forEach((item, i) => {
    const selectedOption = document.querySelector(
      `input[name="question${i}"]:checked`
    );
    if (selectedOption && selectedOption.value === item.correct_answer) {
      score += 1;
    }
  });

  // alert(`You scored ${score} out of ${data.results.length}`);

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    document.getElementById(
      "high-score"
    ).innerText = `High Score: ${highScore}`;
  }
  const scoreModal = document.getElementById("score-modal");
  const scoreContainer = document.querySelector("#score-modal section");
  scoreContainer.innerHTML = `
        <h1 class="fs-2">Quiz ended!</h1>
        <p class="fs-5">You scored ${score} out of ${amount.value}</p>
        <p class="mt-2 fs-6">High Score: ${highScore}</p>
        <button class="btn btn-primary mt-3">Continue</button>
  `;
  scoreModal.style.display = "block";
  scoreModal.addEventListener("click", () => {
    scoreModal.style.display = "none";
  });
  deleteQuestion();
};

const deleteQuestion = () => {
  questionMain.innerHTML = "";
  document.getElementById("form-container").style.display = "block";
};

// Timer logic with onComplete callback
const startTimer = (onComplete) => {
  const timerContainer = document.getElementById("timer-container");
  let time = 30;
  timerContainer.style.display = "flex";
  timerContainer.innerHTML = time;

  timerInterval = setInterval(() => {
    time--;
    if (time >= 0) {
      timerContainer.innerHTML = time;
      console.log(time);
    } else {
      clearInterval(timerInterval);
      timerContainer.style.display = "none"; // Hide when timer is done
      console.log("done");
      if (typeof onComplete === "function") onComplete();
    }
  }, 1000);
};

//submit status
const modal = document.getElementById("modal-background");
const cancel = document.getElementById("cancelQuiz");
const submit = document.getElementById("submitQuiz");

const submissionVerify = () => {
  modal.style.display = "block";

  modal.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  cancel.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "none";
  });

  submit.addEventListener("click", (e) => {
    e.stopPropagation();
    submitQuiz();
  });
};
