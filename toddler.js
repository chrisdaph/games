/* =========================================================
   TODDLER GAMES (ages 2-5): behavior, impulse control,
   emotional regulation. Dispatches on <body data-game="...">.
   ========================================================= */

const THANKFUL_ITEMS = [
  { id:1, emoji:'👪', label:'My family', icon:'../images/thankful-icon-family.png' },
  { id:2, emoji:'☀️', label:'Sunshine', icon:'../images/thankful-icon-sunshine.png' },
  { id:3, emoji:'🐶', label:'My pet', icon:'../images/thankful-icon-pet.png' },
  { id:4, emoji:'🧸', label:'My toys', icon:'../images/thankful-icon-toys.png' },
  { id:5, emoji:'🍎', label:'Yummy food', icon:'../images/thankful-icon-food.png' },
  { id:6, emoji:'🏠', label:'My home' },
  { id:7, emoji:'📚', label:'Storybooks' },
  { id:8, emoji:'🛏️', label:'A cozy bed' },
];

const CHOICES = [
  { scene:'🧸', text:'Your friend is playing with your favorite toy.',
    a:{ emoji:'🤚', label:'Grab it back',  good:false, msg:'Grabbing can hurt feelings. Next time, try asking!' },
    b:{ emoji:'🙋', label:'Ask to take turns', good:true,  msg:'Great choice! Asking is kind and fair.' } },
  { scene:'🍪', text:'You feel mad because you cannot have a cookie right now.',
    a:{ emoji:'😡', label:'Yell and stomp', good:false, msg:'It is okay to feel mad. Try a big breath instead.' },
    b:{ emoji:'😮', label:'Take a deep breath', good:true,  msg:'Wonderful! A deep breath helps mad feelings shrink.' } },
  { scene:'🧱', text:'Your little brother knocked down your blocks by accident.',
    a:{ emoji:'😤', label:'Push him', good:false, msg:'Pushing can hurt. Try using your words instead.' },
    b:{ emoji:'🗣️', label:'Tell him how you feel', good:true, msg:'Nice! Using words helps everyone understand.' } },
  { scene:'🛝', text:'You want a turn on the swing, but someone is on it.',
    a:{ emoji:'🚫', label:'Push them off', good:false, msg:'Pushing is not safe. Waiting keeps everyone happy.' },
    b:{ emoji:'⏳', label:'Wait and count to ten', good:true, msg:'Great patience! Waiting your turn is kind.' } },
  { scene:'🧃', text:'You made a mistake and spilled your juice.',
    a:{ emoji:'🙈', label:'Hide it', good:false, msg:'Mistakes happen! It is braver to tell someone.' },
    b:{ emoji:'🧽', label:'Tell a grown-up and help clean', good:true, msg:'That is so responsible of you!' } },
  { scene:'🧑', text:'Your friend looks sad today.',
    a:{ emoji:'🧸', label:'Keep playing alone', good:false, msg:'A kind word can really help a sad friend.' },
    b:{ emoji:'🤗', label:'Give a hug or kind word', good:true, msg:'So kind! That will make your friend feel better.' } },
];

function shuffleArray(arr){
  for(let i=arr.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initToddlerPage(){
  const game = document.body.dataset.game;
  if (game === 'stopgo') initStopGo();
  else if (game === 'thankful') initThankfulJar();
  else if (game === 'breathing') initBreathing();
  else if (game === 'goodchoice') initGoodChoice();
  else if (game === 'jar') initGlitterJar();
}

/* ---------- Stop and Go (impulse control) ---------- */
function initStopGo(){
  const light = document.getElementById('stopgo-light');
  const msg = document.getElementById('stopgo-msg');
  const tapBtn = document.getElementById('stopgo-tap');
  const starsEl = document.getElementById('stopgo-stars');
  const GOAL = 6;
  let state, stars, timer;

  function updateStars(){
    starsEl.textContent = '⭐'.repeat(stars) + '☆'.repeat(GOAL - stars);
  }
  function pulse(){
    light.classList.remove('pulse');
    void light.offsetWidth;
    light.classList.add('pulse');
  }
  function setLight(next){
    state = next;
    light.textContent = state === 'green' ? '🟢' : '🔴';
    msg.textContent = state === 'green' ? 'GO! Tap now!' : 'Wait for green...';
    msg.classList.remove('warn');
    pulse();
  }
  function scheduleFlip(){
    timer = setTimeout(()=>{
      setLight(state === 'green' ? 'red' : 'green');
      scheduleFlip();
    }, 1200 + Math.random()*2200);
  }
  function start(){
    stars = 0;
    updateStars();
    clearTimeout(timer);
    setLight('red');
    scheduleFlip();
  }

  tapBtn.addEventListener('click', ()=>{
    if (stars >= GOAL) return;
    if (state === 'green'){
      stars++;
      updateStars();
      msg.textContent = 'Yes! Great waiting!';
      if (stars >= GOAL){
        clearTimeout(timer);
        setTimeout(()=> document.getElementById('overlay-stopgo').classList.add('active'), 400);
        return;
      }
      clearTimeout(timer);
      setLight('red');
      scheduleFlip();
    } else {
      msg.textContent = 'Oops, wait for green!';
      msg.classList.add('warn');
      pulse();
    }
  });

  document.getElementById('stopgo-play-again').addEventListener('click', ()=>{
    document.getElementById('overlay-stopgo').classList.remove('active');
    start();
  });

  start();
}

/* ---------- Thankful Jar (picture-only gratitude game) ---------- */
function initThankfulJar(){
  const picker = document.getElementById('thankful-picker');
  const itemsZone = document.getElementById('thankful-items');
  const instruction = document.getElementById('thankful-instruction');
  const progress = document.getElementById('thankful-progress');
  const GOAL = THANKFUL_ITEMS.length;
  let filled = 0;

  function build(){
    filled = 0;
    picker.innerHTML = '';
    itemsZone.innerHTML = '';

    shuffleArray(THANKFUL_ITEMS.slice()).forEach(item=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'thankful-btn';
      if (item.icon){
        const img = document.createElement('img');
        img.src = item.icon;
        img.alt = '';
        btn.appendChild(img);
      } else {
        btn.textContent = item.emoji;
      }
      btn.setAttribute('aria-label', item.label);
      btn.addEventListener('click', ()=> addItem(item, btn));
      picker.appendChild(btn);
    });

    updateProgress();
    instruction.textContent = "Tap something you're thankful for!";
  }

  function addItem(item, btn){
    if (btn.disabled) return;
    btn.disabled = true;

    const token = document.createElement('span');
    token.className = 'thankful-token';
    token.textContent = item.emoji;
    itemsZone.appendChild(token);
    requestAnimationFrame(()=> token.classList.add('pop'));

    filled++;
    updateProgress();
    if (filled >= GOAL){
      instruction.textContent = 'Look how much you have to be thankful for!';
      setTimeout(showCelebration, 500);
    }
  }

  function updateProgress(){
    progress.textContent = `${filled} / ${GOAL}`;
  }

  function showCelebration(){
    document.getElementById('thankful-recap').innerHTML = THANKFUL_ITEMS
      .map(i => `<div class="row">${i.emoji} <b>${i.label}</b></div>`)
      .join('');
    document.getElementById('overlay-thankful').classList.add('active');
  }

  document.getElementById('thankful-play-again').addEventListener('click', ()=>{
    document.getElementById('overlay-thankful').classList.remove('active');
    build();
  });

  build();
}

/* ---------- Balloon Breathing (self-calming) ---------- */
function initBreathing(){
  const balloon = document.getElementById('breathe-balloon');
  const instruction = document.getElementById('breathe-instruction');
  const btn = document.getElementById('breathe-btn');
  const starsEl = document.getElementById('breathe-stars');
  const GOAL = 5;
  let cycles = 0;

  function updateStars(){
    starsEl.textContent = '⭐'.repeat(cycles) + '☆'.repeat(GOAL - cycles);
  }

  function runCycle(){
    btn.disabled = true;
    instruction.textContent = 'Breathe in...';
    balloon.style.transform = 'scale(2.2)';
    setTimeout(()=>{
      instruction.textContent = 'Breathe out...';
      balloon.style.transform = 'scale(1)';
      setTimeout(()=>{
        cycles++;
        updateStars();
        if (cycles >= GOAL){
          setTimeout(()=> document.getElementById('overlay-breathing').classList.add('active'), 300);
        } else {
          instruction.textContent = 'Ready for another breath?';
          btn.disabled = false;
        }
      }, 4000);
    }, 4000);
  }

  btn.addEventListener('click', runCycle);

  document.getElementById('breathing-play-again').addEventListener('click', ()=>{
    document.getElementById('overlay-breathing').classList.remove('active');
    cycles = 0;
    updateStars();
    balloon.style.transform = 'scale(1)';
    instruction.textContent = 'Press the button to begin.';
    btn.disabled = false;
  });

  updateStars();
}

/* ---------- Glitter Jar (calm down) ---------- */
function initGlitterJar(){
  const jarGlitter = document.getElementById('jar-glitter');
  const instruction = document.getElementById('jar-instruction');
  const btn = document.getElementById('jar-btn');
  const starsEl = document.getElementById('jar-stars');
  const GOAL = 4;
  const PARTICLE_COUNT = 28;
  const SETTLE_MS = 5000;
  const DOT_COLORS = ['#ffd66b', '#e8594f', '#7bc8f6', '#7b5ea7', '#5cb85c', '#ff9ad9'];
  let shakes = 0;

  for (let i = 0; i < PARTICLE_COUNT; i++){
    const dot = document.createElement('span');
    dot.className = 'glitter-dot';
    const size = 4 + Math.random() * 4;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left = (4 + Math.random() * 88) + '%';
    dot.style.bottom = (2 + Math.random() * 14) + 'px';
    dot.style.background = DOT_COLORS[i % DOT_COLORS.length];
    jarGlitter.appendChild(dot);
  }

  function updateStars(){
    starsEl.textContent = '⭐'.repeat(shakes) + '☆'.repeat(GOAL - shakes);
  }

  function shakeJar(){
    btn.disabled = true;
    instruction.textContent = 'Watch it swirl...';

    jarGlitter.querySelectorAll('.glitter-dot').forEach(dot => {
      const rise = 40 + Math.random() * 70;
      const drift = Math.random() * 60 - 30;
      dot.style.setProperty('--rise', rise + 'px');
      dot.style.setProperty('--drift', drift + 'px');
      dot.style.animationDuration = (SETTLE_MS / 1000) + 's';
      dot.style.animationDelay = (Math.random() * 0.3) + 's';
      // Restart the animation even if it's already mid-run from a prior shake.
      dot.classList.remove('shaking');
      void dot.offsetWidth;
      dot.classList.add('shaking');
    });

    setTimeout(() => { instruction.textContent = 'Settling down, breathe slowly...'; }, 700);

    setTimeout(() => {
      shakes++;
      updateStars();
      if (shakes >= GOAL){
        setTimeout(showJarCelebration, 300);
      } else {
        instruction.textContent = 'Ready for another shake?';
        btn.disabled = false;
      }
    }, SETTLE_MS + 200);
  }

  function showJarCelebration(){
    document.getElementById('overlay-jar').classList.add('active');
  }

  btn.addEventListener('click', shakeJar);

  document.getElementById('jar-play-again').addEventListener('click', () => {
    document.getElementById('overlay-jar').classList.remove('active');
    shakes = 0;
    updateStars();
    instruction.textContent = 'Press the button to begin.';
    btn.disabled = false;
  });

  updateStars();
}

/* ---------- Good Choice (behavior scenarios) ---------- */
function initGoodChoice(){
  const sceneEl = document.getElementById('choice-scene');
  const textEl = document.getElementById('choice-text');
  const aBtn = document.getElementById('choice-a');
  const bBtn = document.getElementById('choice-b');
  const feedback = document.getElementById('choice-feedback');
  const progress = document.getElementById('choice-progress');
  let idx = 0, stars = 0;

  function render(){
    const c = CHOICES[idx];
    sceneEl.textContent = c.scene;
    textEl.textContent = c.text;
    aBtn.innerHTML = `<span class="emoji">${c.a.emoji}</span>${c.a.label}`;
    bBtn.innerHTML = `<span class="emoji">${c.b.emoji}</span>${c.b.label}`;
    aBtn.disabled = false; bBtn.disabled = false;
    feedback.textContent = '';
    progress.textContent = `Scenario ${idx + 1} / ${CHOICES.length}`;
  }

  function pick(choice){
    aBtn.disabled = true; bBtn.disabled = true;
    feedback.textContent = choice.msg;
    if (choice.good) stars++;
    setTimeout(()=>{
      idx++;
      if (idx >= CHOICES.length) showCelebration();
      else render();
    }, 1800);
  }

  function showCelebration(){
    document.getElementById('choice-recap').textContent =
      `You made ${stars} kind choice${stars === 1 ? '' : 's'} out of ${CHOICES.length}!`;
    document.getElementById('overlay-goodchoice').classList.add('active');
  }

  aBtn.addEventListener('click', ()=> pick(CHOICES[idx].a));
  bBtn.addEventListener('click', ()=> pick(CHOICES[idx].b));

  document.getElementById('goodchoice-play-again').addEventListener('click', ()=>{
    document.getElementById('overlay-goodchoice').classList.remove('active');
    idx = 0; stars = 0;
    render();
  });

  render();
}

initToddlerPage();
