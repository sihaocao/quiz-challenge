let questionNumber = 0;
let score = 0;

// Generating a new question
function newQuestion() {
    if (questionNumber < questionBank.length) {    
        return `<div class="question-${questionNumber}">
        <h2>${questionBank[questionNumber].question}</h2>
        <form>
            <fieldset>
                <label class="answerOption">
                    <input type="radio" value="${questionBank[questionNumber].answers[0]}" name="answer" required>
                    <span>${questionBank[questionNumber].answers[0]}</span>
                </label>
                <label class="answerOption">
                    <input type="radio" value="${questionBank[questionNumber].answers[1]}" name="answer" required>
                    <span>${questionBank[questionNumber].answers[1]}</span>
                </label>
                <label class="answerOption">
                    <input type="radio" value="${questionBank[questionNumber].answers[2]}" name="answer" required>
                    <span>${questionBank[questionNumber].answers[2]}</span>
                </label>
                <label class="answerOption">
                    <input type="radio" value="${questionBank[questionNumber].answers[3]}" name="answer" required>
                    <span>${questionBank[questionNumber].answers[3]}</span>
                </label>
                <button type="submit" class="submitButton">Submit</button>
            </fieldset>
        </form>
        </div>`
    } else {
        $(".questionNumber").text(10);
        renderResults();
        restartQuiz();
    };
}

// Changing the question number
function changeQuestionNumber() {
    questionNumber++;
    $(".questionNumber").text(questionNumber + 1);
}

// Updating the score
function changeScore() {
    score++;
}

// Starting the quiz with Question 1
function startQuiz() {
    $(".startQuiz").on("click", ".startButton", function(event) {
        $(".startQuiz").remove();
        $("body").css({"background-image": "none"});
        $(".eachQuestionAnswerForm").css("display", "block");
        $(".questionNumber").text(1);
    });
}

// Rendering the question to the page
function renderQuestion() {
    $(".eachQuestionAnswerForm").html(newQuestion());
}

// When user makes a selection
function userSelection() {
    $("form").on("submit", function(event) {
        event.preventDefault();
        let selection = $("input:checked");
        let userAnswer = selection.val();
        let correctAnswer = `${questionBank[questionNumber].correctAnswer}`;
        if (userAnswer === correctAnswer) {
            whenAnswerIsCorrect();
        } else {
            whenAnswerIsWrong();
        }
    });
}

// What happens when the user answer is correct
function whenAnswerIsCorrect() {
    correctAnswerSubmitted();
    scoreUpdate();
}

// What happens when the user answer is wrong
function whenAnswerIsWrong() {
    wrongAnswerSubmitted();
}

// When user gets the correct answer
function correctAnswerSubmitted() {
    let correctAnswer = `${questionBank[questionNumber].correctAnswer}`;
    $(".eachQuestionAnswerForm").html(`
        <div class="correctSolution">
            <p>Nice Job!</p>
            <div class="icon">
                <img src="${questionBank[questionNumber].icon} alt="${questionBank[questionNumber].alt}"/>
            </div>
            <p><a href="${questionBank[questionNumber].description}" target="_blank"><span>${correctAnswer}</span></a> is the correct Answer!</p>
            <button type=button class="nextQuestionButton">Next Question</button>
        </div>
        `);
}

// When user get the wrong answer
function wrongAnswerSubmitted() {
    let correctAnswer = `${questionBank[questionNumber].correctAnswer}`;
    $(".eachQuestionAnswerForm").html(`
        <div class="correctSolution">
            <p>Incorrect</p>
            <div class="icon">
                <img src="${questionBank[questionNumber].icon} alt="${questionBank[questionNumber].alt}"/>
            </div>
            <p>The correct answer is: <a href="${questionBank[questionNumber].description}" target="_blank"><span>${correctAnswer}</span></a></p>
            <button type=button class="nextQuestionButton">Next Question</button>
        </div>
        `);
}

// Update the score
function scoreUpdate() {
    changeScore();
    $(".score").text(score);
}

// When the Next Question Button is clicked
function ontoNextQuestion() {
    $("main").on("click", ".nextQuestionButton", function(event) {
        changeQuestionNumber();
        renderQuestion();
        userSelection();
    });
}

// When the entire quiz is done. the user will see one of the following result screens
function renderResults() {
    if (score >= 8) {
        $(".eachQuestionAnswerForm").html(`
        <div class="correctSolution highScore">
            <h2>You got <span class="yourTotalScore">${score}</span> out of 10!</h2>
            <div class="medals">
                <img src="https://i.imgur.com/simAtQU.png" alt="smiling emoji">
            </div>
            <p>Way to go!!</p><br>
            <p>You are certainly a world foodie!!!</p>
            <button class="restartQuiz">Play Again?</button>
        </div>`);
    } else if (score < 8 && score >= 5) {
        $(".eachQuestionAnswerForm").html(`
        <div class="correctSolution mediumScore">
            <h2>You got <span class="yourTotalScore">${score}</span> out of 10!</h2>
            <div class="medals">
                <img src="https://i.imgur.com/g09qbpB.png" alt="happy emoji">
            </div>
            <p>Almost there!!</p><br>
            <p>Get out there and try more foods!!!</p>
            <button class="restartQuiz">Play Again?</button>
        </div>`);
    } else {
        $(".eachQuestionAnswerForm").html(`
        <div class="correctSolution lowScore">
            <h2>You got <span class="yourTotalScore">${score}</span> out of 10!</h2>
            <div class="medals">
                <img src="https://i.imgur.com/OJPJM8U.png" alt="confused emoji">
            </div>
            <p>It's Okay!!</p><br>
            <p>Go out there and try new foods!!!</p>
            <button class="restartQuiz">Play Again?</button>
        </div>`);
    }
}

// Restart the Quiz
function restartQuiz() {
    $("main").on("click", ".restartQuiz", function(event) {
        location.reload();
    })
}

// All executable functions in one place
function runQuiz() {
    startQuiz();
    renderQuestion();
    userSelection();
    ontoNextQuestion();
}

// Run the quiz
$(runQuiz);