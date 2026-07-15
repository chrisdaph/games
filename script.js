/* =========================================================
   BIBLE SCENE ILLUSTRATIONS (original flat-style SVG art)
   All scenes share a 800x600 viewBox for consistent slicing.
   ========================================================= */
const SVG_HEAD = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"';

function sky(topColor, botColor){
  return `<defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${topColor}"/><stop offset="1" stop-color="${botColor}"/>
  </linearGradient></defs><rect width="800" height="600" fill="url(#skyg)"/>`;
}
function sun(cx,cy,r){
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffd93c"/><circle cx="${cx}" cy="${cy}" r="${r+10}" fill="#ffd93c" opacity="0.35"/>`;
}
function cloud(x,y,s){
  return `<g fill="#ffffff" opacity="0.9">
    <ellipse cx="${x}" cy="${y}" rx="${34*s}" ry="${18*s}"/>
    <ellipse cx="${x+28*s}" cy="${y+6*s}" rx="${26*s}" ry="${15*s}"/>
    <ellipse cx="${x-28*s}" cy="${y+6*s}" rx="${24*s}" ry="${14*s}"/>
  </g>`;
}
function star(cx,cy,r,fill){
  let pts=[];
  for(let i=0;i<10;i++){
    const ang = Math.PI/2 + i*Math.PI/5;
    const rad = i%2===0? r : r*0.42;
    pts.push((cx+rad*Math.cos(ang)).toFixed(1)+","+(cy-rad*Math.sin(ang)).toFixed(1));
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
}

/* 1. Noah's Ark (toddler) */
const svgArk = `<svg ${SVG_HEAD}>
  ${sky('#8fd3f4','#c9f7d8')}
  ${sun(680,90,46)}
  <path d="M120 130 A180 180 0 0 1 480 130" stroke="#e8594f" stroke-width="16" fill="none"/>
  <path d="M140 145 A160 160 0 0 1 460 145" stroke="#ffd93c" stroke-width="16" fill="none"/>
  <path d="M160 160 A140 140 0 0 1 440 160" stroke="#5cb85c" stroke-width="16" fill="none"/>
  ${cloud(650,200,1)} ${cloud(90,150,0.8)}
  <rect x="0" y="430" width="800" height="170" fill="#5bb8e0"/>
  <path d="M0 430 Q200 410 400 430 T800 430 V600 H0 Z" fill="#4aa8d6"/>
  <g>
    <path d="M180 430 Q400 340 620 430 L600 400 Q400 320 200 400 Z" fill="#8a5a3c"/>
    <rect x="220" y="380" width="360" height="90" rx="18" fill="#a9713f"/>
    <path d="M200 380 Q400 320 600 380 L580 350 Q400 300 220 350 Z" fill="#6b3f26"/>
    <rect x="330" y="410" width="60" height="60" rx="8" fill="#5a3821"/>
    <circle cx="380" cy="440" r="4" fill="#f0d9b5"/>
    <rect x="255" y="392" width="40" height="30" rx="6" fill="#cfe8f5"/>
    <rect x="505" y="392" width="40" height="30" rx="6" fill="#cfe8f5"/>
  </g>
  <g>
    <ellipse cx="270" cy="392" rx="16" ry="12" fill="#e8c07d"/>
    <path d="M262 385 L250 350 L272 380 Z" fill="#e8c07d"/>
    <circle cx="278" cy="390" r="2.5" fill="#3a2e2e"/>
  </g>
  <g>
    <ellipse cx="525" cy="392" rx="18" ry="13" fill="#9aa0a6"/>
    <path d="M540 392 q16 -2 16 10 q-16 4 -16 -10" fill="#9aa0a6"/>
    <circle cx="532" cy="390" r="2.5" fill="#3a2e2e"/>
  </g>
  <g transform="translate(430,180)">
    <path d="M0 10 Q20 -10 40 10 Q30 6 20 10 Q10 6 0 10 Z" fill="#fff"/>
    <circle cx="34" cy="8" r="1.6" fill="#3a2e2e"/>
    <path d="M20 10 L14 22 L26 20 Z" fill="#5cb85c"/>
  </g>
</svg>`;

/* 2. Baby Moses in the basket (toddler) */
const svgMoses = `<svg ${SVG_HEAD}>
  ${sky('#bfe9ff','#eaf9ff')}
  ${sun(120,90,44)}
  ${cloud(600,120,1)} ${cloud(700,180,0.7)}
  <rect x="0" y="360" width="800" height="240" fill="#5cc2e0"/>
  <path d="M0 360 Q200 335 400 360 T800 360 V600 H0 Z" fill="#3fa9cc"/>
  <path d="M0 400 Q200 380 400 400 T800 400" stroke="#bfe9ff" stroke-width="6" fill="none" opacity="0.6"/>
  <path d="M0 440 Q200 420 400 440 T800 440" stroke="#bfe9ff" stroke-width="6" fill="none" opacity="0.5"/>
  <g fill="#5cb85c">
    <path d="M40 400 Q30 300 46 380 Q56 300 62 385 Q75 310 80 395 L90 400Z"/>
    <path d="M700 400 Q710 300 726 380 Q736 300 742 385 Q755 310 760 395 L770 400Z"/>
  </g>
  <ellipse cx="660" cy="330" rx="14" ry="70" fill="#8a5a3c"/>
  <g fill="#5cb85c">
    <ellipse cx="620" cy="270" rx="60" ry="20" transform="rotate(-20 620 270)"/>
    <ellipse cx="700" cy="270" rx="60" ry="20" transform="rotate(20 700 270)"/>
    <ellipse cx="660" cy="250" rx="55" ry="18"/>
  </g>
  <g transform="translate(360,380)">
    <path d="M-70 20 Q-70 55 0 55 Q70 55 70 20 L60 0 Q0 -14 -60 0 Z" fill="#c99a5b"/>
    <path d="M-60 0 Q0 -14 60 0" stroke="#a9773f" stroke-width="4" fill="none"/>
    <path d="M-50 10 Q0 -4 50 10" stroke="#a9773f" stroke-width="4" fill="none"/>
    <ellipse cx="0" cy="8" rx="34" ry="14" fill="#f4e3c1"/>
    <circle cx="0" cy="-6" r="16" fill="#f0c49c"/>
    <path d="M-16 -10 Q0 -26 16 -10" fill="#7b4b2a"/>
    <path d="M-20 4 Q0 22 20 4 Z" fill="#7bc8f6"/>
  </g>
</svg>`;

/* 3. The Good Shepherd (toddler) */
const svgShepherd = `<svg ${SVG_HEAD}>
  ${sky('#a6ddff','#ecfff2')}
  ${sun(700,90,46)}
  ${cloud(150,110,1)}
  <path d="M0 380 Q400 300 800 380 V600 H0 Z" fill="#7fc97f"/>
  <path d="M0 420 Q400 350 800 420 V600 H0 Z" fill="#6ab86a"/>
  <g fill="#fff08a">
    <circle cx="120" cy="470" r="6"/><circle cx="180" cy="500" r="6"/><circle cx="640" cy="480" r="6"/><circle cx="700" cy="520" r="6"/>
  </g>
  <g transform="translate(400,300)">
    <path d="M-30 260 Q-40 140 -10 60 Q0 30 10 60 Q40 140 30 260 Z" fill="#f5efe0"/>
    <path d="M-30 150 Q0 130 30 150 L26 190 Q0 175 -26 190 Z" fill="#a83240"/>
    <circle cx="0" cy="20" r="30" fill="#f0c49c"/>
    <path d="M-30 10 Q0 -20 30 10 Q30 -6 0 -8 Q-30 -6 -30 10" fill="#6b3f26"/>
    <path d="M40 40 L100 -60" stroke="#8a5a3c" stroke-width="8" stroke-linecap="round"/>
    <path d="M100 -60 Q112 -74 100 -84" stroke="#8a5a3c" stroke-width="8" fill="none" stroke-linecap="round"/>
  </g>
  <g>
    <g transform="translate(190,470)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="#fff"/>
      <circle cx="-24" cy="-14" r="16" fill="#fff"/>
      <circle cx="-30" cy="-16" r="9" fill="#eee"/>
      <rect x="-40" y="16" width="6" height="16" fill="#3a2e2e"/>
      <rect x="20" y="16" width="6" height="16" fill="#3a2e2e"/>
    </g>
    <g transform="translate(270,500) scale(0.85)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="#fff"/>
      <circle cx="-24" cy="-14" r="16" fill="#fff"/>
      <circle cx="-30" cy="-16" r="9" fill="#eee"/>
      <rect x="-40" y="16" width="6" height="16" fill="#3a2e2e"/>
      <rect x="20" y="16" width="6" height="16" fill="#3a2e2e"/>
    </g>
    <g transform="translate(560,480) scale(1.1)">
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="#fff"/>
      <circle cx="24" cy="-14" r="16" fill="#fff"/>
      <circle cx="30" cy="-16" r="9" fill="#eee"/>
      <rect x="-20" y="16" width="6" height="16" fill="#3a2e2e"/>
      <rect x="34" y="16" width="6" height="16" fill="#3a2e2e"/>
    </g>
  </g>
</svg>`;

/* 4. David and Goliath (early elementary) */
const svgDavid = `<svg ${SVG_HEAD}>
  ${sky('#ffe1a8','#fff6e6')}
  ${sun(690,90,44)}
  <path d="M0 420 Q200 370 400 410 T800 400 V600 H0 Z" fill="#d8c08a"/>
  <path d="M0 460 Q200 430 400 450 T800 440 V600 H0 Z" fill="#c7a96b"/>
  <g transform="translate(560,300)">
    <rect x="-40" y="60" width="80" height="120" rx="10" fill="#9aa0a6"/>
    <rect x="-46" y="40" width="92" height="30" rx="8" fill="#7d8388"/>
    <circle cx="0" cy="10" r="34" fill="#e0a97a"/>
    <path d="M-34 -6 Q0 -46 34 -6 Q34 -20 0 -24 Q-34 -20 -34 -6" fill="#7d8388"/>
    <rect x="-8" y="-40" width="16" height="20" fill="#a83240"/>
    <rect x="-56" y="70" width="18" height="90" rx="6" fill="#8a5a3c"/>
    <rect x="38" y="70" width="18" height="90" rx="6" fill="#8a5a3c"/>
    <line x1="70" y1="0" x2="70" y2="-160" stroke="#6b3f26" stroke-width="8"/>
    <polygon points="70,-160 58,-130 82,-130" fill="#c9c9c9"/>
  </g>
  <g transform="translate(230,420)">
    <path d="M-16 90 Q-20 30 0 -10 Q20 30 16 90 Z" fill="#c99a5b"/>
    <rect x="-16" y="86" width="32" height="14" fill="#8a5a3c"/>
    <circle cx="0" cy="-24" r="18" fill="#f0c49c"/>
    <path d="M-18 -30 Q0 -50 18 -30 Q18 -40 0 -42 Q-18 -40 -18 -30" fill="#4a2e18"/>
    <path d="M18 -6 Q60 -30 70 -60" stroke="#8a5a3c" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="72" cy="-62" rx="3" ry="10" fill="#3a2e2e" transform="rotate(30 72 -62)"/>
    <path d="M-18 -6 Q-40 10 -46 30" stroke="#f0c49c" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>
  <circle cx="330" cy="360" r="6" fill="#7d7d7d"/>
</svg>`;

/* 5. Jonah and the big fish (early elementary) */
const svgJonah = `<svg ${SVG_HEAD}>
  ${sky('#bfe6ff','#e6f7ff')}
  ${sun(120,90,40)}
  ${cloud(600,110,1)}
  <g transform="translate(220,140) scale(0.6)">
    <path d="M-40 40 L40 40 L20 0 L-20 0 Z" fill="#8a5a3c"/>
    <path d="M0 0 L0 -70" stroke="#6b3f26" stroke-width="6"/>
    <path d="M0 -70 L-45 -10 Z" fill="#fff"/>
    <path d="M0 -70 L40 -14 Z" fill="#f1eee6"/>
  </g>
  <rect x="0" y="260" width="800" height="340" fill="#2f8fc9"/>
  <path d="M0 260 Q200 235 400 260 T800 260 V600 H0 Z" fill="#3aa0d8"/>
  <path d="M0 300 Q200 280 400 300 T800 300" stroke="#bfe6ff" stroke-width="6" fill="none" opacity="0.5"/>
  <path d="M0 340 Q200 320 400 340 T800 340" stroke="#bfe6ff" stroke-width="6" fill="none" opacity="0.4"/>
  <g transform="translate(420,420)">
    <path d="M-260 0 Q-200 -110 20 -100 Q220 -95 260 -20 Q220 40 20 60 Q-200 80 -260 0 Z" fill="#5c7fa6"/>
    <path d="M240 -10 Q300 -40 320 0 Q300 40 240 20 Z" fill="#4d6d92"/>
    <circle cx="-140" cy="-40" r="10" fill="#fff"/>
    <circle cx="-140" cy="-40" r="5" fill="#222"/>
    <path d="M-40 -70 Q0 -30 -40 20 Q-110 30 -160 -10 Q-120 -60 -40 -70 Z" fill="#3f5b7a"/>
    <path d="M-160 -10 Q-200 -30 -230 -10 Q-200 10 -160 20 Z" fill="#e8594f"/>
  </g>
  <g transform="translate(300,340)">
    <ellipse cx="0" cy="0" rx="15" ry="20" fill="#e0a97a"/>
    <path d="M-15 -6 Q0 -22 15 -6 Q15 -14 0 -16 Q-15 -14 -15 -6" fill="#3a2e2e"/>
    <path d="M-14 10 Q-30 -10 -34 -30" stroke="#e0a97a" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M14 10 Q30 -10 34 -30" stroke="#e0a97a" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M0 18 Q-10 40 -6 60" stroke="#7bc8f6" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M0 18 Q10 40 6 60" stroke="#7bc8f6" stroke-width="10" stroke-linecap="round" fill="none"/>
  </g>
</svg>`;

/* 6. Daniel in the lion's den (early elementary) */
const svgDaniel = `<svg ${SVG_HEAD}>
  <rect width="800" height="600" fill="#4a3f52"/>
  <g stroke="#3a3143" stroke-width="2" opacity="0.5">
    ${Array.from({length:8}).map((_,r)=>`<line x1="0" y1="${r*75}" x2="800" y2="${r*75}"/>`).join('')}
    ${Array.from({length:11}).map((_,c)=>`<line x1="${c*80}" y1="0" x2="${c*80}" y2="600"/>`).join('')}
  </g>
  <polygon points="620,0 800,0 800,160 700,90" fill="#fff6cc" opacity="0.5"/>
  <polygon points="650,0 760,0 720,120 680,80" fill="#fff6cc" opacity="0.7"/>
  <ellipse cx="400" cy="590" rx="420" ry="60" fill="#6b5a45"/>
  <g transform="translate(400,420)">
    <path d="M-24 150 Q-30 60 0 -20 Q30 60 24 150 Z" fill="#5c4a9e"/>
    <path d="M-24 60 Q0 44 24 60 L20 90 Q0 78 -20 90 Z" fill="#7b5ea7"/>
    <circle cx="0" cy="-42" r="26" fill="#e0a97a"/>
    <path d="M-26 -50 Q0 -76 26 -50 Q26 -62 0 -64 Q-26 -62 -26 -50" fill="#4a2e18"/>
    <path d="M-14 -6 Q-30 10 -30 30" stroke="#e0a97a" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M14 -6 Q30 10 30 30" stroke="#e0a97a" stroke-width="7" stroke-linecap="round" fill="none"/>
  </g>
  <g transform="translate(190,470)">
    <ellipse cx="0" cy="0" rx="70" ry="34" fill="#d4a24c"/>
    <circle cx="60" cy="-20" r="30" fill="#c68f3c"/>
    <circle cx="60" cy="-20" r="42" fill="none" stroke="#a9773f" stroke-width="14"/>
    <circle cx="70" cy="-24" r="3" fill="#222"/>
    <path d="M100 -18 Q120 -14 118 0 Q100 -2 96 -12 Z" fill="#c68f3c"/>
  </g>
  <g transform="translate(600,490) scale(1.05)">
    <ellipse cx="0" cy="0" rx="70" ry="34" fill="#e0b05c"/>
    <circle cx="-60" cy="-20" r="30" fill="#d4a24c"/>
    <circle cx="-60" cy="-20" r="42" fill="none" stroke="#b8863f" stroke-width="14"/>
    <circle cx="-70" cy="-24" r="3" fill="#222"/>
    <path d="M-95 0 Q-70 30 -40 20" stroke="#d4a24c" stroke-width="10" fill="none" stroke-linecap="round"/>
  </g>
  <g transform="translate(420,540) scale(0.9)">
    <ellipse cx="0" cy="0" rx="70" ry="30" fill="#c68f3c"/>
    <circle cx="55" cy="-18" r="27" fill="#b8863f"/>
    <circle cx="55" cy="-18" r="38" fill="none" stroke="#9c7236" stroke-width="12"/>
    <path d="M40 -8 Q55 6 70 -8" stroke="#3a2e2e" stroke-width="3" fill="none"/>
  </g>
</svg>`;

/* 7. Moses parting the Red Sea (older) */
const svgRedSea = `<svg ${SVG_HEAD}>
  ${sky('#bfe9ff','#eafcf0')}
  ${sun(400,70,40)}
  ${cloud(650,110,0.8)}
  <path d="M0 0 H230 Q120 250 240 600 H0 Z" fill="#1f6fa8"/>
  <path d="M0 0 H190 Q100 250 200 600 H0 Z" fill="#2c86c4"/>
  <path d="M0 0 H150 Q90 250 170 600 H0 Z" fill="#3aa0d8" opacity="0.8"/>
  <path d="M800 0 H570 Q680 250 560 600 H800 Z" fill="#1f6fa8"/>
  <path d="M800 0 H610 Q700 250 600 600 H800 Z" fill="#2c86c4"/>
  <path d="M800 0 H650 Q710 250 630 600 H800 Z" fill="#3aa0d8" opacity="0.8"/>
  <path d="M230 600 Q400 560 570 600 L560 400 Q400 380 240 400 Z" fill="#e8d9a8"/>
  <path d="M240 400 Q400 385 560 400 L555 300 Q400 288 245 300 Z" fill="#ecdfae"/>
  <g fill="#fff" opacity="0.85">
    <path d="M0 30 Q30 10 60 30 T120 30" stroke="#fff" stroke-width="4" fill="none"/>
    <path d="M0 90 Q30 70 60 90 T120 90" stroke="#fff" stroke-width="4" fill="none"/>
    <path d="M680 30 Q710 10 740 30 T800 30" stroke="#fff" stroke-width="4" fill="none"/>
    <path d="M680 90 Q710 70 740 90 T800 90" stroke="#fff" stroke-width="4" fill="none"/>
  </g>
  <g transform="translate(400,350)">
    <path d="M-8 90 Q-12 30 0 -30 Q12 30 8 90 Z" fill="#e8d9a8"/>
    <path d="M-8 20 Q0 8 8 20 L6 40 Q0 34 -6 40 Z" fill="#7b5ea7"/>
    <circle cx="0" cy="-40" r="15" fill="#e0a97a"/>
    <path d="M0 -25 L36 -95" stroke="#6b3f26" stroke-width="5" stroke-linecap="round"/>
  </g>
  <g fill="#a83240">
    <circle cx="330" cy="470" r="10"/><rect x="322" y="478" width="16" height="26" rx="4"/>
  </g>
  <g fill="#5cb85c">
    <circle cx="365" cy="480" r="9"/><rect x="357" y="487" width="16" height="24" rx="4"/>
  </g>
  <g fill="#e8a13c">
    <circle cx="440" cy="478" r="9"/><rect x="432" y="485" width="16" height="24" rx="4"/>
  </g>
  <g fill="#3aa0d8">
    <circle cx="470" cy="468" r="10"/><rect x="462" y="476" width="16" height="26" rx="4"/>
  </g>
  <g fill="#7b5ea7">
    <circle cx="400" cy="500" r="8"/><rect x="393" y="506" width="14" height="22" rx="4"/>
  </g>
</svg>`;

/* 8. The Nativity (older) */
const svgNativity = `<svg ${SVG_HEAD}>
  ${sky('#1b2450','#3c3f78')}
  ${star(430,90,10,'#fff')}${star(120,60,7,'#fff')}${star(690,50,6,'#fff')}${star(260,40,5,'#fff')}${star(600,140,5,'#fff')}
  <g>${star(400,150,34,'#ffe98a')}<circle cx="400" cy="150" r="50" fill="#ffe98a" opacity="0.3"/></g>
  <ellipse cx="400" cy="590" rx="420" ry="50" fill="#7a5c3e"/>
  <path d="M120 380 L400 200 L680 380 L680 560 L120 560 Z" fill="#8a5a3c"/>
  <path d="M120 380 L400 200 L680 380 L620 380 L400 250 L180 380 Z" fill="#6b3f26"/>
  <rect x="150" y="380" width="500" height="180" fill="#a9713f"/>
  <rect x="150" y="380" width="500" height="16" fill="#8a5a3c"/>
  <g transform="translate(300,470)">
    <path d="M-40 60 Q-46 10 -20 -30 Q0 -55 20 -30 Q46 10 40 60 Z" fill="#3aa0d8"/>
    <path d="M-40 20 Q0 6 40 20 L36 44 Q0 32 -36 44 Z" fill="#2c86c4"/>
    <circle cx="0" cy="-46" r="20" fill="#e0a97a"/>
    <path d="M-20 -52 Q0 -74 20 -52 Q20 -62 0 -64 Q-20 -62 -20 -52" fill="#8a5a3c"/>
  </g>
  <g transform="translate(500,470)">
    <path d="M-40 60 Q-46 10 -20 -30 Q0 -55 20 -30 Q46 10 40 60 Z" fill="#8a5a3c"/>
    <circle cx="0" cy="-46" r="20" fill="#e0a97a"/>
    <path d="M-20 -52 Q0 -80 20 -52 Q20 -66 0 -68 Q-20 -66 -20 -52" fill="#4a2e18"/>
    <path d="M18 -30 L60 -70" stroke="#6b3f26" stroke-width="6" stroke-linecap="round"/>
  </g>
  <g transform="translate(400,510)">
    <rect x="-50" y="-10" width="100" height="30" rx="8" fill="#a9713f"/>
    <rect x="-50" y="-10" width="100" height="8" fill="#8a5a3c"/>
    <ellipse cx="0" cy="-14" rx="34" ry="12" fill="#fff6e6"/>
    <circle cx="0" cy="-20" r="12" fill="#f0c49c"/>
  </g>
  <g transform="translate(180,540)" fill="#c9c9c9">
    <ellipse cx="0" cy="0" rx="36" ry="22"/>
    <path d="M30 -6 Q46 -16 50 0 Q40 8 30 4" fill="#c9c9c9"/>
    <circle cx="34" cy="-4" r="2" fill="#222"/>
  </g>
  <g transform="translate(630,540)" fill="#8a5a3c">
    <ellipse cx="0" cy="0" rx="34" ry="20"/>
    <path d="M28 -18 L36 -34 M20 -20 L24 -38" stroke="#8a5a3c" stroke-width="5"/>
    <circle cx="30" cy="-2" r="2" fill="#222"/>
  </g>
</svg>`;

/* 9. Feeding the 5000 (older) */
const svgFeeding = `<svg ${SVG_HEAD}>
  ${sky('#bfe6ff','#eafcea')}
  ${sun(700,80,44)}
  ${cloud(150,110,1)}
  <path d="M0 340 Q200 300 400 330 T800 320 V600 H0 Z" fill="#8fd18f"/>
  <path d="M0 400 Q200 370 400 390 T800 380 V600 H0 Z" fill="#6ab86a"/>
  <g transform="translate(400,260)">
    <path d="M-26 130 Q-32 40 0 -40 Q32 40 26 130 Z" fill="#3aa0d8"/>
    <path d="M-26 40 Q0 24 26 40 L22 66 Q0 52 -22 66 Z" fill="#2c86c4"/>
    <circle cx="0" cy="-56" r="22" fill="#e0a97a"/>
    <path d="M-22 -62 Q0 -88 22 -62 Q22 -74 0 -76 Q-22 -74 -22 -62" fill="#6b3f26"/>
    <ellipse cx="46" cy="18" rx="26" ry="18" fill="#c99a5b"/>
    <path d="M22 4 Q35 6 46 10" stroke="#e0a97a" stroke-width="7" fill="none" stroke-linecap="round"/>
    <circle cx="34" cy="8" r="6" fill="#f4e3c1"/>
    <circle cx="46" cy="6" r="6" fill="#f4e3c1"/>
    <path d="M52 6 l14 -4 l2 6 l-14 5 Z" fill="#c9c060"/>
  </g>
  <g fill="#c99a5b">
    <ellipse cx="230" cy="420" rx="28" ry="16"/>
    <ellipse cx="560" cy="440" rx="28" ry="16"/>
  </g>
  ${(()=>{
    const colors=['#e8594f','#5cb85c','#e8a13c','#7b5ea7','#3aa0d8','#c9578a'];
    let g='';
    let seed=0;
    for(let row=0; row<4; row++){
      for(let col=0; col<9; col++){
        const x = 90 + col*78 + (row%2===0?0:36);
        const y = 460 + row*34;
        if (x>760) continue;
        const c = colors[(row*9+col)%colors.length];
        g += `<g transform="translate(${x},${y})" fill="${c}">
          <ellipse cx="0" cy="4" rx="14" ry="10"/>
          <circle cx="0" cy="-10" r="9"/>
        </g>`;
      }
    }
    return g;
  })()}
</svg>`;

/* 10. Jesus Blesses the Children (toddler, NT) */
const svgBlessChildren = `<svg ${SVG_HEAD}>
  ${sky('#a6ddff','#ecfff2')}
  ${sun(680,90,44)}
  ${cloud(140,110,1)}
  <path d="M0 380 Q400 320 800 380 V600 H0 Z" fill="#7fc97f"/>
  <path d="M0 420 Q400 370 800 420 V600 H0 Z" fill="#6ab86a"/>
  <g fill="#fff08a"><circle cx="120" cy="470" r="6"/><circle cx="640" cy="480" r="6"/><circle cx="700" cy="520" r="6"/></g>
  <g transform="translate(400,340)">
    <path d="M-34 240 Q-44 120 -12 40 Q0 10 12 40 Q44 120 34 240 Z" fill="#f5efe0"/>
    <path d="M-34 130 Q0 112 34 130 L30 168 Q0 154 -30 168 Z" fill="#a83240"/>
    <circle cx="0" cy="10" r="30" fill="#f0c49c"/>
    <path d="M-30 0 Q0 -28 30 0 Q30 -14 0 -16 Q-30 -14 -30 0" fill="#6b3f26"/>
    <path d="M-30 40 Q-70 60 -80 100" stroke="#f5efe0" stroke-width="14" stroke-linecap="round" fill="none"/>
    <path d="M30 40 Q70 60 80 100" stroke="#f5efe0" stroke-width="14" stroke-linecap="round" fill="none"/>
  </g>
  <g transform="translate(300,520) scale(0.6)">
    <ellipse cx="0" cy="20" rx="26" ry="34" fill="#e8594f"/>
    <circle cx="0" cy="-20" r="22" fill="#f0c49c"/>
    <path d="M-20 -30 Q0 -46 20 -30" fill="#4a2e18"/>
  </g>
  <g transform="translate(480,530) scale(0.55)">
    <ellipse cx="0" cy="20" rx="26" ry="34" fill="#3aa0d8"/>
    <circle cx="0" cy="-20" r="22" fill="#e0a97a"/>
    <path d="M-20 -30 Q0 -46 20 -30" fill="#2a1c10"/>
  </g>
  <g transform="translate(400,560) scale(0.5)">
    <ellipse cx="0" cy="20" rx="26" ry="34" fill="#e8a13c"/>
    <circle cx="0" cy="-20" r="22" fill="#f0c49c"/>
    <path d="M-20 -30 Q0 -46 20 -30" fill="#6b3f26"/>
  </g>
</svg>`;

/* 11. Jesus Calms the Storm (toddler, NT) */
const svgCalmsStorm = `<svg ${SVG_HEAD}>
  <defs>
    <linearGradient id="stormsky" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4a4a5a"/>
      <stop offset="0.55" stop-color="#7bc8f6"/>
      <stop offset="1" stop-color="#bfe9ff"/>
    </linearGradient>
  </defs>
  <rect width="800" height="380" fill="url(#stormsky)"/>
  ${sun(650,90,42)}
  <g fill="#3a3a48" opacity="0.8">
    <ellipse cx="130" cy="90" rx="70" ry="30"/>
    <ellipse cx="200" cy="80" rx="60" ry="26"/>
    <ellipse cx="70" cy="110" rx="50" ry="22"/>
  </g>
  <path d="M120 140 L100 180 L140 170 L110 210" stroke="#ffe98a" stroke-width="6" fill="none" stroke-linecap="round"/>
  <rect x="0" y="380" width="800" height="220" fill="#2f8fc9"/>
  <path d="M0 380 Q200 350 400 380 T800 370 V600 H0 Z" fill="#3aa0d8"/>
  <path d="M0 420 Q200 400 400 420 T800 410" stroke="#bfe9ff" stroke-width="6" fill="none" opacity="0.5"/>
  <g transform="translate(400,400)">
    <path d="M-110 30 L110 30 L80 70 L-80 70 Z" fill="#8a5a3c"/>
    <rect x="-6" y="-90" width="12" height="120" fill="#6b3f26"/>
    <path d="M6 -90 L70 -50 L6 -20 Z" fill="#f1eee6"/>
  </g>
  <g transform="translate(400,340)">
    <path d="M-14 70 Q-18 30 0 -10 Q18 30 14 70 Z" fill="#f5efe0"/>
    <circle cx="0" cy="-22" r="14" fill="#f0c49c"/>
    <path d="M-30 -10 L0 -30 L30 -10" stroke="#f0c49c" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>
  <g transform="translate(340,410) scale(0.6)"><ellipse cx="0" cy="10" rx="20" ry="26" fill="#e8594f"/><circle cx="0" cy="-16" r="16" fill="#e0a97a"/></g>
  <g transform="translate(460,415) scale(0.6)"><ellipse cx="0" cy="10" rx="20" ry="26" fill="#7b5ea7"/><circle cx="0" cy="-16" r="16" fill="#f0c49c"/></g>
</svg>`;

/* 12. The Good Samaritan (early elementary, NT) */
const svgGoodSamaritan = `<svg ${SVG_HEAD}>
  ${sky('#ffe1a8','#fff6e6')}
  ${sun(700,90,42)}
  <path d="M0 400 Q200 360 400 390 T800 380 V600 H0 Z" fill="#d8c08a"/>
  <path d="M0 440 Q200 410 400 430 T800 420 V600 H0 Z" fill="#c7a96b"/>
  <path d="M0 500 L800 480 L800 600 L0 600 Z" fill="#b89660"/>
  <g transform="translate(560,430) scale(0.7)">
    <ellipse cx="0" cy="30" rx="46" ry="26" fill="#9c7a52"/>
    <ellipse cx="-40" cy="0" rx="20" ry="26" fill="#9c7a52"/>
    <rect x="-46" y="46" width="10" height="26" fill="#6b3f26"/>
    <rect x="30" y="46" width="10" height="26" fill="#6b3f26"/>
    <path d="M-56 -8 L-64 -30 M-30 -8 L-24 -32" stroke="#6b3f26" stroke-width="5"/>
  </g>
  <g transform="translate(330,504)">
    <ellipse cx="0" cy="0" rx="70" ry="18" fill="#c99a5b"/>
    <circle cx="-55" cy="-10" r="16" fill="#e0a97a"/>
    <path d="M-70 -8 Q-55 -24 -40 -8" fill="#4a2e18"/>
  </g>
  <g transform="translate(300,470)">
    <ellipse cx="0" cy="30" rx="26" ry="34" fill="#3aa0d8"/>
    <circle cx="0" cy="-8" r="20" fill="#e0a97a"/>
    <path d="M-20 -18 Q0 -40 20 -18" fill="#4a2e18"/>
    <path d="M-14 20 Q-40 6 -46 -14" stroke="#e0a97a" stroke-width="8" stroke-linecap="round" fill="none"/>
  </g>
</svg>`;

/* 13. Zacchaeus in the Tree (early elementary, NT) */
const svgZacchaeus = `<svg ${SVG_HEAD}>
  ${sky('#bfe6ff','#eafcea')}
  ${sun(700,80,42)}
  <path d="M0 420 Q400 380 800 420 V600 H0 Z" fill="#8fd18f"/>
  <path d="M0 460 Q400 430 800 460 V600 H0 Z" fill="#6ab86a"/>
  <g transform="translate(250,320)">
    <ellipse cx="0" cy="-40" rx="120" ry="90" fill="#5cb85c"/>
    <ellipse cx="-60" cy="0" rx="70" ry="60" fill="#4ea34e"/>
    <ellipse cx="70" cy="-10" rx="70" ry="60" fill="#4ea34e"/>
    <rect x="-16" y="10" width="32" height="180" fill="#8a5a3c"/>
    <path d="M-16 60 L-60 90 M16 80 L60 100" stroke="#8a5a3c" stroke-width="10" stroke-linecap="round"/>
  </g>
  <g transform="translate(255,240) scale(0.55)">
    <ellipse cx="0" cy="20" rx="24" ry="30" fill="#e8a13c"/>
    <circle cx="0" cy="-14" r="18" fill="#f0c49c"/>
    <path d="M-18 -22 Q0 -40 18 -22" fill="#4a2e18"/>
  </g>
  <g transform="translate(430,470)">
    <path d="M-16 90 Q-20 30 0 -10 Q20 30 16 90 Z" fill="#f5efe0"/>
    <path d="M-16 20 Q0 8 16 20 L14 40 Q0 34 -14 40 Z" fill="#a83240"/>
    <circle cx="0" cy="-22" r="16" fill="#f0c49c"/>
    <path d="M-16 -30 Q0 -52 16 -30 Q16 -42 0 -44 Q-16 -42 -16 -30" fill="#6b3f26"/>
    <path d="M14 4 Q40 -30 40 -60" stroke="#f0c49c" stroke-width="6" stroke-linecap="round" fill="none"/>
  </g>
  <g fill="#c99a5b">
    <circle cx="560" cy="500" r="14"/><rect x="550" y="512" width="20" height="30" rx="4"/>
    <circle cx="610" cy="510" r="12"/><rect x="601" y="520" width="18" height="26" rx="4"/>
  </g>
</svg>`;

/* 14. The Last Supper (older, NT) */
const svgLastSupper = `<svg ${SVG_HEAD}>
  <rect x="0" y="0" width="800" height="600" fill="#4a3f52"/>
  <rect x="560" y="60" width="160" height="200" rx="6" fill="#2a2440"/>
  ${star(640,120,10,'#ffe98a')}
  <ellipse cx="400" cy="590" rx="420" ry="50" fill="#6b5a45"/>
  <rect x="120" y="380" width="560" height="30" rx="8" fill="#8a5a3c"/>
  <rect x="140" y="410" width="16" height="130" fill="#6b3f26"/>
  <rect x="644" y="410" width="16" height="130" fill="#6b3f26"/>
  <rect x="150" y="360" width="500" height="24" rx="6" fill="#c99a5b"/>
  <ellipse cx="400" cy="368" rx="30" ry="10" fill="#f5efe0"/>
  <rect x="380" y="350" width="14" height="18" fill="#a83240"/>
  ${(()=>{
    const colors=['#e8594f','#5cb85c','#e8a13c','#7b5ea7','#3aa0d8','#c9578a'];
    const seatX=[180,240,300,500,560,620];
    let g='';
    for(let i=0;i<6;i++){
      const x = seatX[i];
      const c = colors[i%colors.length];
      g += `<g transform="translate(${x},350)"><ellipse cx="0" cy="20" rx="20" ry="26" fill="${c}"/><circle cx="0" cy="-6" r="15" fill="#e0a97a"/></g>`;
    }
    return g;
  })()}
  <g transform="translate(400,330)">
    <path d="M-20 70 Q-26 20 0 -30 Q26 20 20 70 Z" fill="#f5efe0"/>
    <circle cx="0" cy="-40" r="18" fill="#e0a97a"/>
    <circle cx="0" cy="-64" r="20" fill="#ffe98a" opacity="0.5"/>
    <path d="M-18 -48 Q0 -68 18 -48" fill="#6b3f26"/>
  </g>
</svg>`;

/* 15. The Resurrection / Empty Tomb (older, NT) */
const svgResurrection = `<svg ${SVG_HEAD}>
  <defs><linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffb677"/><stop offset="0.5" stop-color="#ffe0a3"/><stop offset="1" stop-color="#eafcf0"/>
  </linearGradient></defs>
  <rect width="800" height="600" fill="url(#dawn)"/>
  ${sun(400,220,70)}
  <path d="M0 460 Q400 420 800 460 V600 H0 Z" fill="#8fd18f"/>
  <path d="M0 500 Q400 470 800 500 V600 H0 Z" fill="#6ab86a"/>
  <path d="M260 460 Q260 300 400 260 Q540 300 540 460 Z" fill="#7d8388"/>
  <path d="M300 460 Q300 330 400 300 Q500 330 500 460 Z" fill="#3a2e2e"/>
  <circle cx="600" cy="440" r="46" fill="#9aa0a6"/>
  <circle cx="600" cy="440" r="46" fill="none" stroke="#7d8388" stroke-width="6"/>
  <g transform="translate(430,360)">
    <path d="M-20 90 Q-26 30 0 -30 Q26 30 20 90 Z" fill="#fff"/>
    <circle cx="0" cy="-46" r="18" fill="#f0e6d2"/>
    <path d="M-30 -30 Q0 -70 30 -30 L26 -10 Q0 -30 -26 -10 Z" fill="#ffe98a" opacity="0.6"/>
  </g>
  <g transform="translate(180,500) scale(0.7)"><ellipse cx="0" cy="20" rx="24" ry="30" fill="#3aa0d8"/><circle cx="0" cy="-14" r="18" fill="#e0a97a"/></g>
  <g transform="translate(240,510) scale(0.65)"><ellipse cx="0" cy="20" rx="24" ry="30" fill="#c9578a"/><circle cx="0" cy="-14" r="18" fill="#f0c49c"/></g>
</svg>`;

/* =========================================================
   PUZZLE DEFINITIONS
   ========================================================= */
const PUZZLES = [
  // Toddlers 2-5
  { id:'ark', group:'toddler', title:"Noah's Ark", verse:'Genesis 6–9', cols:2, rows:2, svg:svgArk },
  { id:'moses-basket', group:'toddler', title:'Baby Moses in the Basket', verse:'Exodus 2:1–10', cols:3, rows:2, svg:svgMoses },
  { id:'shepherd', group:'toddler', title:'The Good Shepherd', verse:'John 10:11', cols:3, rows:2, svg:svgShepherd },
  { id:'bless-children', group:'toddler', title:'Jesus Blesses the Children', verse:'Mark 10:13–16', cols:3, rows:2, svg:svgBlessChildren },
  { id:'calms-storm', group:'toddler', title:'Jesus Calms the Storm', verse:'Mark 4:35–41', cols:2, rows:2, svg:svgCalmsStorm },

  // Early elementary 6-8
  { id:'david-goliath', group:'early', title:'David and Goliath', verse:'1 Samuel 17', cols:3, rows:3, svg:svgDavid },
  { id:'jonah', group:'early', title:'Jonah and the Big Fish', verse:'Jonah 1–2', cols:4, rows:3, svg:svgJonah },
  { id:'daniel', group:'early', title:"Daniel in the Lions' Den", verse:'Daniel 6', cols:4, rows:4, svg:svgDaniel },
  { id:'good-samaritan', group:'early', title:'The Good Samaritan', verse:'Luke 10:25–37', cols:4, rows:3, svg:svgGoodSamaritan },
  { id:'zacchaeus', group:'early', title:'Zacchaeus in the Tree', verse:'Luke 19:1–10', cols:3, rows:3, svg:svgZacchaeus },

  // Older kids 9-12
  { id:'red-sea', group:'older', title:'Crossing the Red Sea', verse:'Exodus 14', cols:5, rows:5, svg:svgRedSea },
  { id:'nativity', group:'older', title:'The First Christmas', verse:'Luke 2:1–20', cols:6, rows:5, svg:svgNativity },
  { id:'feeding5000', group:'older', title:'Feeding the 5,000', verse:'John 6:1–14', cols:7, rows:5, svg:svgFeeding },
  { id:'last-supper', group:'older', title:'The Last Supper', verse:'Matthew 26:17–30', cols:6, rows:5, svg:svgLastSupper },
  { id:'resurrection', group:'older', title:'The Empty Tomb', verse:'Matthew 28:1–10', cols:5, rows:5, svg:svgResurrection },
];

const GROUP_META = {
  toddler:{ label:'Little Explorers (Ages 2–5)' },
  early:{ label:'Story Adventurers (Ages 6–8)' },
  older:{ label:'Faith Builders (Ages 9–12)' },
};

function svgToDataUrl(svgString){
  const base64 = btoa(unescape(encodeURIComponent(svgString)));
  return 'data:image/svg+xml;base64,' + base64;
}

/* =========================================================
   NAVIGATION
   ========================================================= */
const screens = {
  home: document.getElementById('screen-home'),
  picker: document.getElementById('screen-picker'),
  play: document.getElementById('screen-play'),
  commandments: document.getElementById('screen-commandments'),
};
function showScreen(name){
  Object.values(screens).forEach(s=>s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

document.querySelectorAll('.age-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    openPicker(card.dataset.group);
  });
});
document.getElementById('back-to-home').addEventListener('click', ()=> showScreen('home'));
document.getElementById('back-to-picker').addEventListener('click', ()=>{
  teardownPuzzle();
  showScreen('picker');
});
document.getElementById('open-commandments').addEventListener('click', openCommandments);
document.getElementById('back-from-commandments').addEventListener('click', ()=> showScreen('home'));

let currentGroup = null;
function openPicker(group){
  currentGroup = group;
  document.getElementById('picker-title').textContent = GROUP_META[group].label;
  const grid = document.getElementById('puzzle-grid');
  grid.innerHTML = '';
  PUZZLES.filter(p=>p.group===group).forEach(p=>{
    const card = document.createElement('div');
    card.className = 'puzzle-card';
    card.innerHTML = `
      <img class="thumb" src="${svgToDataUrl(p.svg)}" alt="${p.title}">
      <div class="info">
        <h3>${p.title}</h3>
        <p class="verse">${p.verse}</p>
        <span class="pieces-tag">${p.cols*p.rows} pieces</span>
      </div>`;
    card.addEventListener('click', ()=> openPuzzle(p));
    grid.appendChild(card);
  });
  showScreen('picker');
}

/* =========================================================
   JIGSAW ENGINE
   ========================================================= */
let activePuzzle = null;
let placedCount = 0;
let dragState = null;

function openPuzzle(puzzle){
  activePuzzle = puzzle;
  placedCount = 0;
  document.getElementById('play-title').textContent = puzzle.title;
  document.getElementById('play-verse').textContent = puzzle.verse;
  // Show the screen before measuring layout so computeDisplaySize can read
  // real, on-screen positions (the screen must be visible/laid out first).
  showScreen('play');
  buildPuzzleDom(puzzle);
}

function teardownPuzzle(){
  document.getElementById('grid-zone').innerHTML = '';
  document.getElementById('tray-left').innerHTML = '';
  document.getElementById('tray-right').innerHTML = '';
  document.getElementById('tray-bottom').innerHTML = '';
  activePuzzle = null;
}

function computeDisplaySize(){
  // Leave room on both sides for the side trays on wider screens.
  const maxW = Math.min(560, window.innerWidth - 60);
  let w = Math.max(260, maxW);
  let h = w * 0.75; // 4:3 to match 800x600 viewBox

  // Also shrink to fit the viewport's height, so the header + grid + footer
  // never need a page scroll on shorter windows (laptops, landscape phones).
  const stage = document.querySelector('.puzzle-stage');
  const mainEl = document.querySelector('main');
  const footer = document.querySelector('footer');
  if (stage && mainEl){
    const stageTop = stage.getBoundingClientRect().top;
    const mainPaddingBottom = parseFloat(getComputedStyle(mainEl).paddingBottom) || 0;
    const footerH = footer ? footer.offsetHeight : 0;
    const availableH = window.innerHeight - stageTop - mainPaddingBottom - footerH - 16;
    if (availableH > 0 && h > availableH){
      h = Math.max(180, availableH);
      w = h / 0.75;
    }
  }
  return { w, h };
}

function buildPuzzleDom(puzzle){
  const { cols, rows } = puzzle;
  const { w: displayW, h: displayH } = computeDisplaySize();
  const pieceW = displayW / cols;
  const pieceH = displayH / rows;
  const dataUrl = svgToDataUrl(puzzle.svg);

  const gridZone = document.getElementById('grid-zone');
  const trayLeft = document.getElementById('tray-left');
  const trayRight = document.getElementById('tray-right');
  const trayBottom = document.getElementById('tray-bottom');
  gridZone.innerHTML = '';
  trayLeft.innerHTML = '';
  trayRight.innerHTML = '';
  trayBottom.innerHTML = '';
  gridZone.style.width = displayW + 'px';
  gridZone.style.height = displayH + 'px';

  // Side trays: try to fit every piece within the grid's height so nothing
  // overflows into a scrolling bottom tray. Pick whichever column count
  // (2-6) yields the largest thumbnail scale while still fitting both the
  // vertical space (grid height) and the horizontal space actually left
  // next to the grid on screen. If pieces are already few/large enough that
  // shrinking would make them uncomfortably tiny, keep them full-size and
  // let the small remainder spill into the bottom tray instead.
  const trayGap = 8;
  const trayPad = 16;
  const stageGap = 14;
  const totalPieces = cols * rows;
  const halfPieces = Math.ceil(totalPieces / 2);
  const containerW = Math.min(1000, window.innerWidth) - 32;
  const maxSideWidth = Math.max(70, (containerW - displayW - stageGap * 2) / 2);
  const MIN_USABLE_SCALE = 0.5;

  let bestCols = 2, bestScale = 0;
  for (let tc = 2; tc <= 6; tc++){
    const rowsNeeded = Math.ceil(halfPieces / tc);
    const heightScale = Math.min(1, displayH / (rowsNeeded * (pieceH + trayGap)));
    const widthScale = Math.min(1, (maxSideWidth - trayPad - (tc - 1) * trayGap) / (pieceW * tc));
    const scale = Math.min(heightScale, widthScale);
    if (scale > bestScale){
      bestScale = scale;
      bestCols = tc;
    }
  }

  let trayCols, trayScale, allowOverflow;
  if (bestScale >= MIN_USABLE_SCALE){
    trayCols = bestCols;
    trayScale = bestScale;
    allowOverflow = false;
  } else {
    // Pieces are few enough that shrinking to avoid overflow isn't worth
    // it — keep them as large as the available width allows (never wider
    // than the space actually next to the grid) and let any remainder
    // spill into the bottom tray.
    trayCols = 2;
    // Width is a hard cap (violating it wraps the layout) — never floor it
    // back up, even if that means a smaller-than-ideal thumbnail.
    trayScale = Math.min(1, (maxSideWidth - trayPad - trayGap) / (pieceW * 2));
    allowOverflow = true;
  }

  const trayPieceW = pieceW * trayScale;
  const sideWidth = (trayPieceW * trayCols) + ((trayCols - 1) * trayGap) + trayPad;
  [trayLeft, trayRight].forEach(t=>{
    t.style.width = sideWidth + 'px';
    t.style.height = displayH + 'px';
  });

  // Build dropzones
  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      const dz = document.createElement('div');
      dz.className = 'dropzone';
      dz.dataset.row = r;
      dz.dataset.col = c;
      dz.style.left = (c*pieceW) + 'px';
      dz.style.top = (r*pieceH) + 'px';
      dz.style.width = pieceW + 'px';
      dz.style.height = pieceH + 'px';
      gridZone.appendChild(dz);
    }
  }

  // Shuffle all piece positions
  const cells = [];
  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      cells.push({r,c});
    }
  }
  for(let i=cells.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  // Distribute pieces between the left and right trays. When the trays were
  // sized to hold everyone, split evenly with no overflow; otherwise fall
  // back to filling both sides at full size and spilling any remainder into
  // the bottom tray.
  let leftCells, rightCells, bottomCells;
  if (!allowOverflow){
    leftCells = cells.slice(0, halfPieces);
    rightCells = cells.slice(halfPieces);
    bottomCells = [];
  } else {
    const rowsFit = Math.max(1, Math.floor(displayH / (pieceH * trayScale + trayGap)));
    const sideCapacityEach = rowsFit * trayCols;
    leftCells = []; rightCells = []; bottomCells = [];
    cells.forEach(cell=>{
      if (leftCells.length <= rightCells.length && leftCells.length < sideCapacityEach){
        leftCells.push(cell);
      } else if (rightCells.length < sideCapacityEach){
        rightCells.push(cell);
      } else {
        bottomCells.push(cell);
      }
    });
  }

  function makePiece(r, c, homeTrayId, scale=1){
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.dataset.row = r;
    piece.dataset.col = c;
    piece.dataset.homeTray = homeTrayId;
    piece.style.width = (pieceW * scale) + 'px';
    piece.style.height = (pieceH * scale) + 'px';
    piece.style.backgroundImage = `url(${dataUrl})`;
    piece.style.backgroundSize = `${displayW * scale}px ${displayH * scale}px`;
    piece.style.backgroundPosition = `-${c*pieceW*scale}px -${r*pieceH*scale}px`;
    piece.addEventListener('pointerdown', onPointerDown);
    return piece;
  }

  leftCells.forEach(({r,c})=> trayLeft.appendChild(makePiece(r,c,'tray-left',trayScale)));
  rightCells.forEach(({r,c})=> trayRight.appendChild(makePiece(r,c,'tray-right',trayScale)));
  bottomCells.forEach(({r,c})=> trayBottom.appendChild(makePiece(r,c,'tray-bottom',1)));

  trayLeft.classList.toggle('empty', leftCells.length===0);
  trayRight.classList.toggle('empty', rightCells.length===0);
  trayBottom.classList.toggle('empty', bottomCells.length===0);

  updateProgress(cols*rows);
}

function updateProgress(total){
  document.getElementById('play-progress').textContent = `${placedCount} / ${total}`;
}

function onPointerDown(e){
  const piece = e.currentTarget;
  if (piece.classList.contains('locked')) return;
  e.preventDefault();
  const rect = piece.getBoundingClientRect();
  const stage = document.querySelector('.puzzle-stage');

  dragState = {
    piece,
    offsetX: e.clientX - rect.left,
    offsetY: e.clientY - rect.top,
    width: rect.width,
    height: rect.height,
  };

  piece.setPointerCapture(e.pointerId);
  piece.classList.add('dragging');
  piece.style.position = 'fixed';
  piece.style.left = rect.left + 'px';
  piece.style.top = rect.top + 'px';
  piece.style.width = dragState.width + 'px';
  piece.style.height = dragState.height + 'px';
  piece.style.margin = '0';
  document.body.appendChild(piece);

  piece.addEventListener('pointermove', onPointerMove);
  piece.addEventListener('pointerup', onPointerUp);
  piece.addEventListener('pointercancel', onPointerUp);
}

function onPointerMove(e){
  if (!dragState) return;
  const { piece, offsetX, offsetY } = dragState;
  piece.style.left = (e.clientX - offsetX) + 'px';
  piece.style.top = (e.clientY - offsetY) + 'px';
}

function onPointerUp(e){
  if (!dragState) return;
  const { piece } = dragState;
  piece.classList.remove('dragging');
  piece.removeEventListener('pointermove', onPointerMove);
  piece.removeEventListener('pointerup', onPointerUp);
  piece.removeEventListener('pointercancel', onPointerUp);

  // temporarily hide piece to find element underneath
  piece.style.visibility = 'hidden';
  const target = document.elementFromPoint(e.clientX, e.clientY);
  piece.style.visibility = 'visible';

  const dropzone = target ? target.closest('.dropzone') : null;

  if (dropzone && dropzone.dataset.row === piece.dataset.row && dropzone.dataset.col === piece.dataset.col && !dropzone.classList.contains('filled')) {
    // correct placement -> lock into grid at full resolution
    // (tray pieces may have been rendered as smaller thumbnails)
    const gridZone = document.getElementById('grid-zone');
    const fullW = parseFloat(gridZone.style.width);
    const fullH = parseFloat(gridZone.style.height);
    const dzW = parseFloat(dropzone.style.width);
    const dzH = parseFloat(dropzone.style.height);
    piece.style.position = 'absolute';
    piece.style.left = (parseFloat(dropzone.style.left)) + 'px';
    piece.style.top = (parseFloat(dropzone.style.top)) + 'px';
    piece.style.width = dropzone.style.width;
    piece.style.height = dropzone.style.height;
    piece.style.backgroundSize = `${fullW}px ${fullH}px`;
    piece.style.backgroundPosition = `-${parseFloat(piece.dataset.col)*dzW}px -${parseFloat(piece.dataset.row)*dzH}px`;
    piece.style.margin = '0';
    piece.classList.add('locked');
    piece.removeEventListener('pointerdown', onPointerDown);
    gridZone.appendChild(piece);
    dropzone.classList.add('filled');
    placedCount++;
    updateProgress(activePuzzle.cols * activePuzzle.rows);
    if (placedCount === activePuzzle.cols * activePuzzle.rows){
      setTimeout(showCelebration, 250);
    }
  } else {
    // return to its home tray (left/right/bottom)
    const homeTray = document.getElementById(piece.dataset.homeTray) || document.getElementById('tray-bottom');
    piece.style.position = 'relative';
    piece.style.left = '';
    piece.style.top = '';
    piece.style.margin = '';
    homeTray.appendChild(piece);
  }

  dragState = null;
}

function showCelebration(){
  document.getElementById('overlay-verse').textContent =
    `You finished "${activePuzzle.title}" — ${activePuzzle.verse}`;
  document.getElementById('overlay').classList.add('active');
}

document.getElementById('play-again').addEventListener('click', ()=>{
  document.getElementById('overlay').classList.remove('active');
  openPuzzle(activePuzzle);
});
document.getElementById('pick-another').addEventListener('click', ()=>{
  document.getElementById('overlay').classList.remove('active');
  teardownPuzzle();
  openPicker(currentGroup);
});

// Rebuild layout responsively if window resizes while playing
let resizeTimer;
window.addEventListener('resize', ()=>{
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(()=>{
    if (activePuzzle && screens.play.classList.contains('active')){
      // Only rebuild if not mid-drag to avoid losing placed pieces
      buildPuzzleDom(activePuzzle);
      placedCount = 0;
    }
  }, 300);
});

/* =========================================================
   TEN COMMANDMENTS MATCHING GAME
   ========================================================= */
const COMMANDMENTS = [
  { n:1,  text:'Love God above everything else',        verse:'Exodus 20:3',   icon:'🙏' },
  { n:2,  text:"Don't worship idols or statues",         verse:'Exodus 20:4–5', icon:'🗿' },
  { n:3,  text:"Use God's name with respect",            verse:'Exodus 20:7',   icon:'🗣️' },
  { n:4,  text:'Rest and remember God on the Sabbath',   verse:'Exodus 20:8–11', icon:'😴' },
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
  showScreen('commandments');
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
document.getElementById('cmd-back-home').addEventListener('click', ()=>{
  document.getElementById('overlay-cmd').classList.remove('active');
  showScreen('home');
});
