const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
}

const opotionList = document.querySelector('.opotion-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}.  ${questions[index].question}`;

    let optionTag = questions[index].options.map((option, idx) =>
        `<div class="option"><span>${option}</span></div>`
    ).join('');
    
    opotionList.innerHTML = optionTag;

    const opotion = document.querySelectorAll('.option');
    opotion.forEach(option => {
        option.setAttribute('onclick', 'opotionSelected(this)');
    });
} 

function opotionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOption = opotionList.children.length;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        for (let i = 0; i < allOption; i++) {
            if (opotionList.children[i].textContent === correctAnswer) {
                opotionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for (let i = 0; i < allOption; i++) {
        opotionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-totall');
    questionTotal.textContent = `${index} of ${questions.length} questions`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;
    let progressStartValue = 0;

    // Set the circular progress to match the score
    circularProgress.style.background = `conic-gradient(#4caf50 ${progressEndValue}%, #e0e0e0 ${progressEndValue}%)`;

    let progress = setInterval(() => {
        if (progressStartValue < progressEndValue) {
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`;
        } else {
            clearInterval(progress);
        }
    }, speed);
}

window.addEventListener('load', function () {
    // Add the blow-up animation class to the main container or body
    document.body.classList.add('blowup');
});
