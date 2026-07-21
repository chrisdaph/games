/* =========================================================
   TODDLER GAMES (ages 2-5): behavior, impulse control,
   emotional regulation. Dispatches on <body data-game="...">.
   ========================================================= */

const FEELINGS = [
  { id:1, face:'😊', label:'Happy',     desc:'You feel good and smiley inside.' },
  { id:2, face:'😢', label:'Sad',       desc:'You feel like crying, and that is okay.' },
  { id:3, face:'😠', label:'Mad',       desc:'You feel like stomping, try a big breath.' },
  { id:4, face:'😨', label:'Scared',    desc:'You feel like hiding, but you are safe.' },
  { id:5, face:'😲', label:'Surprised', desc:'Something happened that you did not expect.' },
  { id:6, face:'😌', label:'Calm',      desc:'You feel quiet and peaceful.' },
  { id:7, face:'🤩', label:'Excited',   desc:'You can hardly wait, it is so much fun.' },
  { id:8, face:'😟', label:'Worried',   desc:'You keep thinking about something.' },
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
  else if (game === 'feelings') initFeelings();
  else if (game === 'breathing') initBreathing();
  else if (game === 'goodchoice') initGoodChoice();
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

/* ---------- Feelings Match (emotional vocabulary) ---------- */
function initFeelings(){
  const faceCol = document.getElementById('match-faces');
  const descCol = document.getElementById('match-descs');
  let selectedFace = null, selectedDesc = null, matched = 0;

  function build(){
    matched = 0; selectedFace = null; selectedDesc = null;
    faceCol.innerHTML = ''; descCol.innerHTML = '';

    shuffleArray(FEELINGS.slice()).forEach(f=>{
      const el = document.createElement('div');
      el.className = 'match-tile face';
      el.textContent = f.face;
      el.addEventListener('click', ()=> onFaceClick(el, f));
      faceCol.appendChild(el);
    });
    shuffleArray(FEELINGS.slice()).forEach(f=>{
      const el = document.createElement('div');
      el.className = 'match-tile desc';
      el.textContent = f.desc;
      el.addEventListener('click', ()=> onDescClick(el, f));
      descCol.appendChild(el);
    });
    updateProgress();
  }

  function onFaceClick(el, f){
    if (el.classList.contains('matched') || el.classList.contains('wrong')) return;
    if (selectedFace) selectedFace.el.classList.remove('selected');
    selectedFace = { el, f };
    el.classList.add('selected');
    tryMatch();
  }
  function onDescClick(el, f){
    if (el.classList.contains('matched') || el.classList.contains('wrong')) return;
    if (selectedDesc) selectedDesc.el.classList.remove('selected');
    selectedDesc = { el, f };
    el.classList.add('selected');
    tryMatch();
  }
  function tryMatch(){
    if (!selectedFace || !selectedDesc) return;
    const a = selectedFace, b = selectedDesc;
    if (a.f.id === b.f.id){
      a.el.classList.remove('selected'); b.el.classList.remove('selected');
      a.el.classList.add('matched'); b.el.classList.add('matched');
      matched++;
      updateProgress();
      if (matched === FEELINGS.length) setTimeout(showCelebration, 300);
    } else {
      a.el.classList.add('wrong'); b.el.classList.add('wrong');
      setTimeout(()=>{
        a.el.classList.remove('wrong','selected');
        b.el.classList.remove('wrong','selected');
      }, 500);
    }
    selectedFace = null; selectedDesc = null;
  }
  function updateProgress(){
    document.getElementById('match-progress').textContent = `${matched} / ${FEELINGS.length}`;
    document.getElementById('match-progress-fill').style.width = `${(matched / FEELINGS.length) * 100}%`;
  }
  function showCelebration(){
    document.getElementById('match-recap').innerHTML = FEELINGS
      .map(f => `<div class="row">${f.face} <b>${f.label}:</b> ${f.desc}</div>`)
      .join('');
    document.getElementById('overlay-feelings').classList.add('active');
  }

  document.getElementById('feelings-play-again').addEventListener('click', ()=>{
    document.getElementById('overlay-feelings').classList.remove('active');
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
