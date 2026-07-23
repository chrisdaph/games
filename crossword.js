/* =========================================================
   BIBLE CROSSWORD
   ========================================================= */
const CROSSWORDS = {
  jesus: {
    label: 'Jesus', emoji: '👶',
    words: [
      { answer:'JESUS', row:0, col:0, dir:'across', clue:"God's Son, born in Bethlehem", emoji:'👶' },
      { answer:'JOY',   row:0, col:0, dir:'down',   clue:'A very happy feeling',          emoji:'😊' },
      { answer:'STAR',  row:0, col:2, dir:'down',   clue:'It led the wise men to Jesus',  emoji:'⭐' },
      { answer:'SON',   row:0, col:4, dir:'down',   clue:"Jesus is God's ___",            emoji:'👦' },
    ],
  },
  noah: {
    label: 'Noah', emoji: '🚢',
    words: [
      { answer:'NOAH', row:0, col:0, dir:'across', clue:'He built a big boat before the flood', emoji:'🚢' },
      { answer:'NET',  row:0, col:0, dir:'down',   clue:'Fishermen use it to catch fish',       emoji:'🐟' },
      { answer:'HOPE', row:0, col:3, dir:'down',   clue:"A rainbow is a sign of God's ___",     emoji:'🌈' },
    ],
  },
  moses: {
    label: 'Moses', emoji: '🧔',
    words: [
      { answer:'MOSES', row:0, col:0, dir:'across', clue:"He led God's people out of Egypt", emoji:'🧔' },
      { answer:'MAN',   row:0, col:0, dir:'down',   clue:'A grown-up boy',                   emoji:'👨' },
      { answer:'SEA',   row:0, col:2, dir:'down',   clue:'Moses parted the Red ___',          emoji:'🌊' },
      { answer:'SUN',   row:0, col:4, dir:'down',   clue:'It shines in the sky all day',      emoji:'☀️' },
    ],
  },
};

const CW_KEYBOARD_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

let cwPuzzleKey = null;
let cwGrid = [];
let cwWords = [];
let cwActiveWord = null;
let cwCurrentCell = null;
let cwSolvedCount = 0;

function cwWordCells(word){
  const cells = [];
  for (let i = 0; i < word.answer.length; i++){
    const r = word.dir === 'down' ? word.row + i : word.row;
    const c = word.dir === 'across' ? word.col + i : word.col;
    cells.push({ r, c, idx: i });
  }
  return cells;
}

function buildCrossword(key){
  const puzzle = CROSSWORDS[key];
  cwPuzzleKey = key;
  cwWords = puzzle.words.map(w => ({ ...w, answer: w.answer.toUpperCase(), solved: false }));

  // Number words in reading order; words that start on the same cell share a number.
  const sorted = [...cwWords].sort((a, b) => a.row - b.row || a.col - b.col);
  const numbers = new Map();
  let n = 1;
  sorted.forEach(w => {
    const startKey = `${w.row},${w.col}`;
    if (!numbers.has(startKey)) numbers.set(startKey, n++);
  });
  cwWords.forEach(w => { w.number = numbers.get(`${w.row},${w.col}`); });

  // Build the cell grid from the word list.
  let maxRow = 0, maxCol = 0;
  cwWords.forEach(w => {
    cwWordCells(w).forEach(({ r, c }) => { maxRow = Math.max(maxRow, r); maxCol = Math.max(maxCol, c); });
  });
  cwGrid = Array.from({ length: maxRow + 1 }, () => Array.from({ length: maxCol + 1 }, () => null));
  cwWords.forEach(w => {
    cwWordCells(w).forEach(({ r, c, idx }) => {
      if (!cwGrid[r][c]) cwGrid[r][c] = { letter: w.answer[idx], solved: false, words: [], number: null };
      cwGrid[r][c].words.push(w);
      const startKey = `${r},${c}`;
      if (numbers.has(startKey)) cwGrid[r][c].number = numbers.get(startKey);
    });
  });

  cwSolvedCount = 0;
  cwActiveWord = null;
  cwCurrentCell = null;

  renderCwPicker();
  renderCwClues();
  renderCwGrid();
  renderCwKeyboard();
  updateCwProgress();
  selectCwWord(cwWords[0]);
}

function renderCwPicker(){
  const wrap = document.getElementById('cw-picker');
  wrap.innerHTML = '';
  Object.keys(CROSSWORDS).forEach(key => {
    const p = CROSSWORDS[key];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cw-pick-btn' + (key === cwPuzzleKey ? ' active' : '');
    btn.innerHTML = `${p.emoji} ${p.label}`;
    btn.addEventListener('click', () => buildCrossword(key));
    wrap.appendChild(btn);
  });
}

function renderCwClues(){
  const wrap = document.getElementById('cw-clues');
  wrap.innerHTML = '';
  ['across', 'down'].forEach(dir => {
    const list = cwWords.filter(w => w.dir === dir).sort((a, b) => a.number - b.number);
    if (!list.length) return;
    const label = document.createElement('div');
    label.className = 'cw-clue-label';
    label.textContent = dir === 'across' ? '➡️ Across' : '⬇️ Down';
    wrap.appendChild(label);
    list.forEach(w => {
      const item = document.createElement('div');
      item.className = 'cw-clue';
      item.dataset.number = w.number;
      item.dataset.dir = w.dir;
      item.innerHTML = `<span class="cw-clue-emoji">${w.emoji}</span><span class="cw-clue-text"><b>${w.number}.</b> ${w.clue}</span>`;
      item.addEventListener('click', () => selectCwWord(w));
      wrap.appendChild(item);
    });
  });
}

function renderCwGrid(){
  const wrap = document.getElementById('cw-grid');
  wrap.innerHTML = '';
  wrap.style.gridTemplateColumns = `repeat(${cwGrid[0].length}, 1fr)`;
  cwGrid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const el = document.createElement('div');
      if (!cell){
        el.className = 'cw-cell blocked';
      } else {
        el.className = 'cw-cell';
        el.dataset.row = r;
        el.dataset.col = c;
        el.innerHTML = (cell.number ? `<span class="cw-num">${cell.number}</span>` : '') + `<span class="cw-letter"></span>`;
        el.addEventListener('click', () => onCwCellClick(r, c));
      }
      wrap.appendChild(el);
    });
  });
}

function renderCwKeyboard(){
  const wrap = document.getElementById('cw-keyboard');
  wrap.innerHTML = '';
  CW_KEYBOARD_ROWS.forEach(rowStr => {
    const row = document.createElement('div');
    row.className = 'cw-key-row';
    rowStr.split('').forEach(ch => {
      const key = document.createElement('button');
      key.type = 'button';
      key.className = 'cw-key';
      key.textContent = ch;
      key.addEventListener('click', () => handleCwLetter(ch));
      row.appendChild(key);
    });
    wrap.appendChild(row);
  });
  const backRow = document.createElement('div');
  backRow.className = 'cw-key-row';
  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'cw-key cw-key-back';
  back.textContent = '⬅ Back';
  back.addEventListener('click', handleCwBack);
  backRow.appendChild(back);
  wrap.appendChild(backRow);
}

function cwCellEl(r, c){
  return document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"]`);
}

function onCwCellClick(r, c){
  const cell = cwGrid[r][c];
  if (!cell) return;
  let word;
  if (cell.words.length === 1){
    word = cell.words[0];
  } else if (cwActiveWord && cell.words.includes(cwActiveWord)){
    word = cell.words.find(w => w !== cwActiveWord);
  } else {
    word = cell.words.find(w => w.dir === 'across') || cell.words[0];
  }
  selectCwWord(word, r, c);
}

function selectCwWord(word, r, c){
  cwActiveWord = word;

  document.querySelectorAll('.cw-cell.active, .cw-cell.current').forEach(el => el.classList.remove('active', 'current'));
  document.querySelectorAll('.cw-clue.active').forEach(el => el.classList.remove('active'));

  const cells = cwWordCells(word);
  cells.forEach(({ r: cr, c: cc }) => {
    const el = cwCellEl(cr, cc);
    if (el) el.classList.add('active');
  });

  const clueEl = document.querySelector(`.cw-clue[data-number="${word.number}"][data-dir="${word.dir}"]`);
  if (clueEl){ clueEl.classList.add('active'); clueEl.scrollIntoView({ block: 'nearest' }); }

  let target = cells.find(({ r: cr, c: cc }) => cr === r && cc === c);
  if (!target) target = cells.find(({ r: cr, c: cc }) => !cwGrid[cr][cc].solved) || cells[0];

  setCwCurrentCell(target.r, target.c);
}

function setCwCurrentCell(r, c){
  const prev = document.querySelector('.cw-cell.current');
  if (prev) prev.classList.remove('current');
  cwCurrentCell = { r, c };
  const el = cwCellEl(r, c);
  if (el) el.classList.add('current');
}

function advanceCwCursor(){
  if (!cwActiveWord) return;
  const cells = cwWordCells(cwActiveWord);
  const i = cells.findIndex(({ r, c }) => r === cwCurrentCell.r && c === cwCurrentCell.c);
  for (let k = i + 1; k < cells.length; k++){
    if (!cwGrid[cells[k].r][cells[k].c].solved){ setCwCurrentCell(cells[k].r, cells[k].c); return; }
  }
}

function handleCwLetter(ch){
  if (!cwCurrentCell) return;
  const { r, c } = cwCurrentCell;
  const cell = cwGrid[r][c];
  if (cell.solved){ advanceCwCursor(); return; }
  const el = cwCellEl(r, c);
  if (ch === cell.letter){
    cell.solved = true;
    el.querySelector('.cw-letter').textContent = ch;
    el.classList.add('solved');
    checkCwWordsComplete();
    advanceCwCursor();
  } else {
    el.classList.add('wrong');
    setTimeout(() => el.classList.remove('wrong'), 500);
  }
}

function handleCwBack(){
  if (!cwActiveWord || !cwCurrentCell) return;
  const cells = cwWordCells(cwActiveWord);
  const i = cells.findIndex(({ r, c }) => r === cwCurrentCell.r && c === cwCurrentCell.c);
  if (i > 0) setCwCurrentCell(cells[i - 1].r, cells[i - 1].c);
}

function checkCwWordsComplete(){
  let solvedNow = 0;
  let justSolved = null;
  cwWords.forEach(w => {
    if (w.solved){ solvedNow++; return; }
    const done = cwWordCells(w).every(({ r, c }) => cwGrid[r][c].solved);
    if (done){
      w.solved = true;
      solvedNow++;
      justSolved = w;
      const clueEl = document.querySelector(`.cw-clue[data-number="${w.number}"][data-dir="${w.dir}"]`);
      if (clueEl) clueEl.classList.add('solved');
    }
  });
  cwSolvedCount = solvedNow;
  updateCwProgress();

  if (cwSolvedCount === cwWords.length){
    setTimeout(showCwCelebration, 300);
  } else if (justSolved && cwActiveWord === justSolved){
    const next = cwWords.find(w => !w.solved);
    if (next) setTimeout(() => selectCwWord(next), 400);
  }
}

function updateCwProgress(){
  document.getElementById('cw-progress').textContent = `${cwSolvedCount} / ${cwWords.length}`;
  document.getElementById('cw-progress-fill').style.width = `${(cwSolvedCount / cwWords.length) * 100}%`;
}

function showCwCelebration(){
  const recap = document.getElementById('cw-recap');
  recap.innerHTML = cwWords
    .slice().sort((a, b) => a.number - b.number)
    .map(w => `<div class="row">${w.emoji} <b>${w.answer}</b> — ${w.clue}</div>`)
    .join('');
  document.getElementById('overlay-cw').classList.add('active');
}

document.addEventListener('keydown', e => {
  if (!cwCurrentCell) return;
  if (/^[a-zA-Z]$/.test(e.key)){ handleCwLetter(e.key.toUpperCase()); }
  else if (e.key === 'Backspace'){ handleCwBack(); }
});

document.getElementById('cw-play-again').addEventListener('click', () => {
  document.getElementById('overlay-cw').classList.remove('active');
  buildCrossword(cwPuzzleKey);
});

document.getElementById('cw-next-puzzle').addEventListener('click', () => {
  document.getElementById('overlay-cw').classList.remove('active');
  const keys = Object.keys(CROSSWORDS);
  const next = keys[(keys.indexOf(cwPuzzleKey) + 1) % keys.length];
  buildCrossword(next);
});

buildCrossword('jesus');
