/* =========================================================
   TEN COMMANDMENTS MATCHING GAME
   ========================================================= */
const COMMANDMENTS = [
  { n:1,  text:'Love God above everything else',        verse:'Exodus 20:3',   icon:'🙏' },
  { n:2,  text:"Don't worship idols or statues",         verse:'Exodus 20:4-5', icon:'🗿' },
  { n:3,  text:"Use God's name with respect",            verse:'Exodus 20:7',   icon:'🗣️' },
  { n:4,  text:'Rest and remember God on the Sabbath',   verse:'Exodus 20:8-11', icon:'😴' },
  { n:5,  text:'Honor your mother and father',           verse:'Exodus 20:12',  icon:'👪' },
  { n:6,  text:'Do not hurt or harm others',              verse:'Exodus 20:13', icon:'🤝' },
  { n:7,  text:'Be faithful and true in your family',    verse:'Exodus 20:14',  icon:'💍' },
  { n:8,  text:'Do not steal',                            verse:'Exodus 20:15', icon:'🙅' },
  { n:9,  text:'Always tell the truth',                   verse:'Exodus 20:16', icon:'✅' },
  { n:10, text:'Be happy with what you have',             verse:'Exodus 20:17', icon:'😊' },
];

let cmdSelectedTablet = null;
let cmdSelectedPhrase = null;
let cmdMatched = 0;

function shuffleArray(arr){
  for(let i=arr.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function openCommandments(){
  cmdMatched = 0;
  cmdSelectedTablet = null;
  cmdSelectedPhrase = null;
  buildCommandmentsDom();
}

function buildCommandmentsDom(){
  const tabletsCol = document.getElementById('cmd-tablets');
  const phrasesCol = document.getElementById('cmd-phrases');
  tabletsCol.innerHTML = '';
  phrasesCol.innerHTML = '';

  const tabletOrder = shuffleArray(COMMANDMENTS.slice());
  const phraseOrder = shuffleArray(COMMANDMENTS.slice());

  tabletOrder.forEach(cmd=>{
    const el = document.createElement('div');
    el.className = 'cmd-tile tablet';
    el.innerHTML = `<span class="cmd-num">${cmd.n}</span>`;
    el.addEventListener('click', ()=> onTabletClick(el, cmd));
    tabletsCol.appendChild(el);
  });

  phraseOrder.forEach(cmd=>{
    const el = document.createElement('div');
    el.className = 'cmd-tile phrase';
    el.innerHTML = `<span class="cmd-icon">${cmd.icon}</span><span class="cmd-text">${cmd.text}</span>`;
    el.addEventListener('click', ()=> onPhraseClick(el, cmd));
    phrasesCol.appendChild(el);
  });

  updateCmdProgress();
}

function onTabletClick(el, cmd){
  if (el.classList.contains('matched') || el.classList.contains('wrong')) return;
  if (cmdSelectedTablet) cmdSelectedTablet.el.classList.remove('selected');
  cmdSelectedTablet = { el, cmd };
  el.classList.add('selected');
  tryCmdMatch();
}

function onPhraseClick(el, cmd){
  if (el.classList.contains('matched') || el.classList.contains('wrong')) return;
  if (cmdSelectedPhrase) cmdSelectedPhrase.el.classList.remove('selected');
  cmdSelectedPhrase = { el, cmd };
  el.classList.add('selected');
  tryCmdMatch();
}

function tryCmdMatch(){
  if (!cmdSelectedTablet || !cmdSelectedPhrase) return;
  const tablet = cmdSelectedTablet;
  const phrase = cmdSelectedPhrase;

  if (tablet.cmd.n === phrase.cmd.n){
    tablet.el.classList.remove('selected');
    phrase.el.classList.remove('selected');
    tablet.el.classList.add('matched');
    phrase.el.classList.add('matched');
    cmdMatched++;
    updateCmdProgress();
    if (cmdMatched === COMMANDMENTS.length){
      setTimeout(showCommandmentsCelebration, 300);
    }
  } else {
    tablet.el.classList.add('wrong');
    phrase.el.classList.add('wrong');
    setTimeout(()=>{
      tablet.el.classList.remove('wrong','selected');
      phrase.el.classList.remove('wrong','selected');
    }, 500);
  }
  cmdSelectedTablet = null;
  cmdSelectedPhrase = null;
}

function updateCmdProgress(){
  document.getElementById('cmd-progress').textContent = `${cmdMatched} / ${COMMANDMENTS.length}`;
  document.getElementById('cmd-progress-fill').style.width = `${(cmdMatched / COMMANDMENTS.length) * 100}%`;
}

function showCommandmentsCelebration(){
  const recap = document.getElementById('cmd-recap');
  recap.innerHTML = COMMANDMENTS
    .map(c => `<div class="row">${c.icon} <b>${c.n}.</b> ${c.text} <em>(${c.verse})</em></div>`)
    .join('');
  document.getElementById('overlay-cmd').classList.add('active');
}

document.getElementById('cmd-play-again').addEventListener('click', ()=>{
  document.getElementById('overlay-cmd').classList.remove('active');
  openCommandments();
});
// "Back to Puzzles" is a plain <a href="index.html"> in the HTML -
// this is a single-page game, so no in-page screen switching is needed.

openCommandments();
