document.addEventListener('DOMContentLoaded', function(){
  const currentDate = new Date().toLocaleDateString();
  document.getElementById('current-date').textContent = "Date: " + currentDate;
  
  const startQuizButton = document.getElementById('start-quiz');
  const nextQuestionButton = document.getElementById('next-question');
  const quitQuizButton = document.getElementById('quit-quiz');
  const submitAnswerButton = document.getElementById('submit-answer');
  const questionText = document.getElementById('question-text');
  const answerForm = document.getElementById('answer-form');
  const correctAnswersSpan = document.getElementById('correct-answers');
  const incorrectAnswersSpan = document.getElementById('incorrect-answers');
  const timerDisplay = document.getElementById('timer'); // timer display element
  
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let timeLeft = 300; // 5 minutes in seconds
  let timerInterval; // timer interval variable
  
  const questions = [
      {
          "question": "Which Pixar film features a clownfish named Marlin searching for his son Nemo?",
          "type": 1,
          "choices": ["Toy Story", "Finding Nemo", "Up", "The Incredibles"],
          "correctIndex": 1,
          "score": 5
        },
        {
          "question": "What is the name of the young girl who befriends a monster named Sulley in Pixar's 'Monsters, Inc.'?",
          "type": 2,
          "correctAnswer": "Boo",
          "score": 10
        },
        {
          "question": "Which Pixar film follows the adventures of an old man named Carl and a young Wilderness Explorer named Russell?",
          "type": 1,
          "choices": ["Inside Out", "Coco", "Finding Dory", "Up"],
          "correctIndex": 3,
          "score": 5
        },
        {
          "question": "In Pixar's 'Toy Story', what is the name of the cowboy doll who is the leader of the toys?",
          "type": 2,
          "correctAnswer": "Woody",
          "score": 10
        },
        {
          "question": "Which Pixar film features a rat named Remy who dreams of becoming a chef?",
          "type": 1,
          "choices": ["Brave", "Cars", "Ratatouille", "WALL-E"],
          "correctIndex": 2,
          "score": 5
        },
        {
          "question": "What is the name of the space ranger action figure in Pixar's 'Toy Story'?",
          "type": 2,
          "correctAnswer": "Buzz Lightyear",
          "score": 10
        },
        {
          "question": "Which Pixar film tells the story of a robot named WALL-E who falls in love with another robot named EVE?",
          "type": 1,
          "choices": ["Monsters University", "The Good Dinosaur", "Inside Out", "WALL-E"],
          "correctIndex": 3,
          "score": 5
        },
        {
          "question": "In Pixar's 'Finding Dory', what type of fish is Dory?",
          "type": 2,
          "correctAnswer": "Blue Tang",
          "score": 10
        },
        {
          "question": "Which Pixar film features a family of superheroes?",
          "type": 1,
          "choices": ["The Incredibles", "Cars", "Toy Story 3", "Coco"],
          "correctIndex": 0,
          "score": 5
        },
        {
          "question": "In the movie Monsters University, what is the name of the fraternity that Mike and Sulley join in their quest to become scarers?",
          "type": 2,
          "correctAnswer": "Oozma Kappa",
          "score": 10
        }
  ];

  // shuffling questions
  shuffleArray(questions);

  function shuffleArray(array){
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  // shows current questions -> render
  function renderQuestion(){
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answerForm.innerHTML = ''; // clear previous options/inputs
    
    if (currentQuestion.type === 1){
      currentQuestion.choices.forEach(choice =>{
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = choice;
        const label = document.createElement('label');
        label.textContent = choice;
        answerForm.appendChild(input);
        answerForm.appendChild(label);
      });
    }else if (currentQuestion.type === 2){
      const input = document.createElement('input');
      input.type = 'text';
      input.name = 'answer';
      input.placeholder = 'Your answer';
      answerForm.appendChild(input);
    }
  }
  
  // scores
  function checkAnswer(){
      const currentQuestion = questions[currentQuestionIndex];
      const userAnswer = answerForm.elements['answer'].value.trim().toLowerCase();
      
      if (currentQuestion.type === 1){
          const correctChoice = currentQuestion.choices[currentQuestion.correctIndex];
          if (userAnswer === correctChoice.toLowerCase()){
              correctAnswers++;
              correctAnswersSpan.textContent = correctAnswers;
          } else {
              incorrectAnswers++;
              incorrectAnswersSpan.textContent = incorrectAnswers;
          }
      } else if (currentQuestion.type === 2){
          if (userAnswer === currentQuestion.correctAnswer.toLowerCase()){
              correctAnswers++;
              correctAnswersSpan.textContent = correctAnswers;
          } else {
              incorrectAnswers++;
              incorrectAnswersSpan.textContent = incorrectAnswers;
          }
      }
      
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length){
          renderQuestion();
      } else {
          clearInterval(timerInterval); // stop the timer
          alert('Quiz finished!');
      }
  }
  
  // event listener - buttons
  startQuizButton.addEventListener('click', function(){
    startQuizButton.disabled = true;
    nextQuestionButton.disabled = false;
    quitQuizButton.disabled = false;
    renderQuestion();
    startTimer(); // starts timer when you start quiz
    alert('You have 5 minutes to finish the quiz.'); // display time limit
  });
  
  nextQuestionButton.addEventListener('click', function(){
    checkAnswer();
  });
  
  quitQuizButton.addEventListener('click', function(){
    clearInterval(timerInterval); // stopping the timer
    alert(`Quiz ended!\nCorrect Answers: ${correctAnswers}\nIncorrect Answers: ${incorrectAnswers}`);
    location.reload(); // reloads page to start over
  });
  
  submitAnswerButton.addEventListener('click', function(event){
    event.preventDefault(); // prevents form submission
    checkAnswer();
  });
  
  // timer
  function startTimer(){
      timerInterval = setInterval(() =>{
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;
          timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          
          if (timeLeft === 0){
              clearInterval(timerInterval);
              alert('Time up! Quiz finished.');
              endQuiz();
          }timeLeft--;
      }, 1000);
  }
});
