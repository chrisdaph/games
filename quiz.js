/* =========================================================
   BIBLE QUIZ (Matthew)
   ========================================================= */
const MATTHEW_QUIZ = [
  { emoji: '⭐', question: "Who came from far away to see baby Jesus, following a bright star?", verse: 'Matthew 2:1-2',
    options: [
      { label: 'Wise Men', emoji: '👑', correct: true },
      { label: 'Shepherds', emoji: '🐑', correct: false },
      { label: 'Soldiers', emoji: '🛡️', correct: false },
    ] },
  { emoji: '🌟', question: 'What did the wise men follow in the sky to find Jesus?', verse: 'Matthew 2:2',
    options: [
      { label: 'A star', emoji: '⭐', correct: true },
      { label: 'A rainbow', emoji: '🌈', correct: false },
      { label: 'A bird', emoji: '🐦', correct: false },
    ] },
  { emoji: '💧', question: 'Who baptized Jesus in the river?', verse: 'Matthew 3:13-17',
    options: [
      { label: 'John the Baptist', emoji: '🧔', correct: true },
      { label: 'A king', emoji: '👑', correct: false },
      { label: 'A fisherman', emoji: '🎣', correct: false },
    ] },
  { emoji: '👬', question: 'How many special helpers, called disciples, did Jesus choose?', verse: 'Matthew 10:1-4',
    options: [
      { label: '12', emoji: '🔟', correct: true },
      { label: '5', emoji: '✋', correct: false },
      { label: '100', emoji: '💯', correct: false },
    ] },
  { emoji: '🙏', question: "In the Lord's Prayer, Jesus said, Give us this day our daily...", verse: 'Matthew 6:11',
    options: [
      { label: 'Bread', emoji: '🍞', correct: true },
      { label: 'Candy', emoji: '🍬', correct: false },
      { label: 'Toys', emoji: '🧸', correct: false },
    ] },
  { emoji: '🌱', question: "Jesus said God's kingdom starts small, like a tiny seed that grows into a big...", verse: 'Matthew 13:31-32',
    options: [
      { label: 'Tree', emoji: '🌳', correct: true },
      { label: 'Rock', emoji: '🪨', correct: false },
      { label: 'Cloud', emoji: '☁️', correct: false },
    ] },
  { emoji: '🍞', question: 'Jesus fed a huge crowd with just 5 loaves of bread and 2 fish. About how many people did he feed?', verse: 'Matthew 14:13-21',
    options: [
      { label: '5,000', emoji: '🧑‍🤝‍🧑', correct: true },
      { label: '5', emoji: '✋', correct: false },
      { label: '50', emoji: '🔢', correct: false },
    ] },
  { emoji: '🌿', question: 'On Palm Sunday, what did people wave as Jesus rode into Jerusalem?', verse: 'Matthew 21:8-9',
    options: [
      { label: 'Palm branches', emoji: '🌿', correct: true },
      { label: 'Balloons', emoji: '🎈', correct: false },
      { label: 'Flags', emoji: '🏳️', correct: false },
    ] },
  { emoji: '🍽️', question: 'At the Last Supper, Jesus shared bread and a cup with his...', verse: 'Matthew 26:26-28',
    options: [
      { label: 'Friends', emoji: '👬', correct: true },
      { label: 'Sheep', emoji: '🐑', correct: false },
      { label: 'Birds', emoji: '🐦', correct: false },
    ] },
  { emoji: '🌍', question: 'After Jesus rose from the dead, what did he tell his friends to do?', verse: 'Matthew 28:19-20',
    options: [
      { label: 'Go tell everyone about him', emoji: '📣', correct: true },
      { label: 'Keep it a secret', emoji: '🤫', correct: false },
      { label: 'Stay home forever', emoji: '🏠', correct: false },
    ] },
];

const QUIZ_RIGHT_MESSAGES = ['Yay, that is right! 🎉', 'Super job! ⭐', 'You got it! 🙌', 'Wonderful! 💛'];
const QUIZ_WRONG_MESSAGES = ['Not quite, try again! 😊', 'Almost, give it another guess! 💭', 'Keep trying, you can do it! 🌟'];

let quizIndex = 0;
let quizStars = 0;
let quizMissedFirst = false;

function shuffleQuizArray(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderQuizQuestion(){
  const q = MATTHEW_QUIZ[quizIndex];
  quizMissedFirst = false;

  document.getElementById('quiz-progress').textContent = `Question ${quizIndex + 1} / ${MATTHEW_QUIZ.length}`;
  document.getElementById('quiz-progress-fill').style.width = `${(quizIndex / MATTHEW_QUIZ.length) * 100}%`;
  document.getElementById('quiz-scene').textContent = q.emoji;
  document.getElementById('quiz-question').textContent = q.question;
  document.getElementById('quiz-feedback').textContent = '';

  const wrap = document.getElementById('quiz-options');
  wrap.innerHTML = '';
  shuffleQuizArray(q.options.slice()).forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `<span class="quiz-option-emoji">${opt.emoji}</span><span class="quiz-option-label">${opt.label}</span>`;
    btn.addEventListener('click', () => onQuizAnswer(btn, opt));
    wrap.appendChild(btn);
  });
}

function onQuizAnswer(btn, opt){
  if (btn.disabled) return;
  const feedback = document.getElementById('quiz-feedback');

  if (opt.correct){
    document.querySelectorAll('.quiz-option-btn').forEach(b => { b.disabled = true; });
    btn.classList.add('correct');
    feedback.textContent = QUIZ_RIGHT_MESSAGES[Math.floor(Math.random() * QUIZ_RIGHT_MESSAGES.length)];
    if (!quizMissedFirst) quizStars++;
    setTimeout(() => {
      quizIndex++;
      if (quizIndex >= MATTHEW_QUIZ.length) showQuizCelebration();
      else renderQuizQuestion();
    }, 1300);
  } else {
    quizMissedFirst = true;
    btn.classList.add('wrong');
    btn.disabled = true;
    feedback.textContent = QUIZ_WRONG_MESSAGES[Math.floor(Math.random() * QUIZ_WRONG_MESSAGES.length)];
    setTimeout(() => btn.classList.remove('wrong'), 500);
  }
}

function showQuizCelebration(){
  document.getElementById('quiz-progress').textContent = `Question ${MATTHEW_QUIZ.length} / ${MATTHEW_QUIZ.length}`;
  document.getElementById('quiz-progress-fill').style.width = '100%';
  document.getElementById('quiz-star-rating').textContent =
    '⭐'.repeat(quizStars) + '☆'.repeat(MATTHEW_QUIZ.length - quizStars);
  document.getElementById('quiz-score-text').textContent =
    `You got ${quizStars} out of ${MATTHEW_QUIZ.length} right on the first try!`;
  document.getElementById('quiz-recap').innerHTML = MATTHEW_QUIZ.map(q => {
    const correct = q.options.find(o => o.correct);
    return `<div class="row">${q.emoji} <b>${correct.label}</b>. ${q.question} <em>(${q.verse})</em></div>`;
  }).join('');
  document.getElementById('overlay-quiz').classList.add('active');
}

document.getElementById('quiz-play-again').addEventListener('click', () => {
  document.getElementById('overlay-quiz').classList.remove('active');
  quizIndex = 0;
  quizStars = 0;
  renderQuizQuestion();
});

renderQuizQuestion();
