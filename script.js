//below are the tutorial code
const closeTutorial = document.getElementById("tutorial-close");
const tutorialBackground = document.getElementById("tutorial-background");
closeTutorial.addEventListener("click", async (e) => {
  e.preventDefault();

  tutorialBackground.classList.add("closeElement");
  await setTimeout(() => {
    tutorialBackground.style.display = "none";
  }, 1000);
});

//below are the form code

const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty')
const amount = document.getElementById('amount');

let quizAPI; 

const submitButton = document.getElementById('submit-form');
submitButton.addEventListener('click', (e) => { //this might be submit || click
  e.preventDefault();
  //the code to set the value for each user input
  const userCategory = category.value;
  const userDifficulty = difficulty.value;
  const userAmount = amount.value;
  console.log(userAmount, userDifficulty, userCategory)
  quizAPI = `https://opentdb.com/api.php?amount=${userAmount}&category=${userCategory}&difficulty=${userDifficulty}&type=multiple`;

});

console.log(quizAPI)

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
let data;
const setQuestion = async () => {
  try {
    const res = await fetch(quizAPI)
    data = await res.json();
    console.log(data.results[0].question);
  } catch (e) {
    console.log(e)
  }
}


