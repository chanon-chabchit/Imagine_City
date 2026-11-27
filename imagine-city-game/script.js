/*
 * Imagine City — interactive quiz
 * Source: the user's Imagine City quiz brief and Final Code scene/character designs.
 * 11 scored scenes; 5 disciplines; one/two personalized districts; optional passport.
 * No network requests or submission of player data.
 */
'use strict';

const A = 'assets/';
const KEYS = ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'];
const BEFORE_DISTRICTS = ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3'];
const AFTER_DISTRICTS = ['gate', '4.1', '4.2', '5.1', '5.2'];
const TOTAL_SCORED = BEFORE_DISTRICTS.length + AFTER_DISTRICTS.length;

const TRACKS = {
  DGA: {
    short: 'จอมเวทแห่งจินตนาการ', en: 'Digital Arts',
    concept: 'The Dream Sketcher', character: 'character-dga.png',
    description: 'เป็ดนักวาดผู้ใช้พู่กันวิเศษ เปลี่ยนจินตนาการให้กลายเป็นภาพวาดและโลกที่มีชีวิต',
    jobs: 'Illustrator, Concept Artist, Character Designer, Webtoon / Comic Artist, Storyboard Artist'
  },
  DGD: {
    short: 'จอมเวทแห่งอัตลักษณ์', en: 'Digital Graphic Design',
    concept: 'The Design Wizard', character: 'character-dgd.png',
    description: 'เป็ดนักออกแบบผู้จัดระเบียบสีสัน ตัวอักษร และรูปทรง ให้สื่อสารได้อย่างมีเอกลักษณ์',
    jobs: 'Graphic Designer, Brand Identity Designer, UI Designer, Packaging Designer, Art Director'
  },
  IGD: {
    short: 'จอมเวทแห่งการเล่น', en: 'Interactive and Game Design',
    concept: 'The Game Explorer', character: 'character-igd.png',
    description: 'เป็ดนักผจญภัยผู้ถือลูกเต๋าวิเศษ สร้างด่าน ปริศนา และโลกเกมที่ผู้คนมีส่วนร่วมได้',
    jobs: 'Game Designer, Level Designer, Game Artist, VR / AR Designer, Game Producer'
  },
  AFX: {
    short: 'จอมเวทแห่งภาพเคลื่อนไหว', en: 'Computer Animation and Visual Effects',
    concept: 'The Motion Wizard', character: 'character-afx.png',
    description: 'เป็ดนักสร้างภาพที่ทำให้สิ่งนิ่งเคลื่อนไหวได้ด้วยม้วนฟิล์ม แคลปเปอร์บอร์ด และเวทมนตร์ภาพพิเศษ',
    jobs: '3D Animator, 3D Modeler, VFX Artist, Compositor, Rigging Artist'
  },
  DEN: {
    short: 'จอมเวทแห่งการแสดง', en: 'Digital Entertainment',
    concept: 'The Entertainment Magician', character: 'character-den.png',
    description: 'เป็ดนักแสดงผู้มีไมโครโฟนวิเศษ สร้างเสียงเพลง การแสดง และความสุขให้ผู้คนมารวมกัน',
    jobs: 'Content Creator, Event / Show Producer, Streaming Producer, Entertainment Marketer, Scriptwriter'
  }
};

// The score code is stored separately from the visible option, so the player never sees the answer mapping.
const SCENES = {
  '1.1': {
    chapter: 1, title: 'ตื่นขึ้นในเมืองไร้สี', caption: 'ฉาก 1.1 — ตื่นขึ้นมา', art: 'scene-1-1.png',
    text: 'เป็ดลืมตาตื่นขึ้นบนพื้นเมืองที่ไม่คุ้นเคย ลูกไฟลอยมาหาและกระซิบว่า “เหลือเวลาถึงคืนนี้เท่านั้น ช่วยเมืองนี้ด้วย!” สิ่งแรกที่เจ้าจะทำคือ…',
    options: {
      DGA: 'หยิบชอล์กขึ้นมา แล้วลงสีบนกำแพง',
      DGD: 'จัดป้ายที่ตัวอักษรซีดจางให้อ่านง่ายขึ้น',
      IGD: 'ถามลูกไฟถึงกติกาและวิธีผ่านด่านในเมืองนี้',
      AFX: 'ลองดันสิ่งของรอบตัว ว่าทำไมทุกอย่างถึงนิ่งสนิท',
      DEN: 'เรียกชาวเมืองให้มารวมตัวกันที่จัตุรัส'
    }
  },
  '1.2': {
    chapter: 1, title: 'อุปกรณ์เวทมนตร์ชิ้นแรก', caption: 'ฉาก 1.2 — ของติดตัว', art: 'scene-1-2.png',
    text: 'อุปกรณ์เวทมนตร์หลายชิ้นลอยอยู่ตรงหน้า ลูกไฟบอกว่าเป็ดพกติดตัวไปได้เพียงชิ้นเดียว เจ้าจะหยิบอะไร?',
    options: {
      DGA: 'สมุดสเก็ตช์ที่วาดได้ไม่มีวันหมดหน้า',
      DGD: 'ชุดสีกับตัวอักษรวิเศษที่ทำให้ทุกอย่างลงตัว',
      IGD: 'ตลับเกมเก่า ๆ ที่ยังไม่มีใครรู้วิธีเล่น',
      AFX: 'กล้องฟิล์มที่ถ่ายแล้วภาพเคลื่อนไหวได้',
      DEN: 'ไมโครโฟนที่ส่งเสียงได้ทั่วทั้งเมือง'
    }
  },
  '1.3': {
    chapter: 1, title: 'ทางแยกแห่งศาสตร์เวทมนตร์', caption: 'ฉาก 1.3 — ทางแยกห้าสาย', art: 'scene-1-3.png',
    text: 'เป็ดเดินมาพบป้ายที่ชี้ไปยังถนนห้าสาย แต่ละสายมีร่องรอยของเวทมนตร์ต่างกัน เจ้าจะเลือกเส้นทางใดก่อน?',
    options: {
      DGA: 'ทางที่ผนังทั้งสองข้างเต็มไปด้วยภาพวาด',
      DGD: 'ทางที่เต็มไปด้วยป้ายร้านและโลโก้',
      IGD: 'ทางที่มีเสียงเกมและแสงไฟหลากสีในอดีต',
      AFX: 'ทางที่มีเสียงเครื่องฉายหนังและควันเอฟเฟกต์',
      DEN: 'ทางที่เคยมีเสียงเพลงและผู้คนมารวมตัวกัน'
    }
  },
  '2.1': {
    chapter: 2, title: 'สะพานเวทมนตร์ที่พังครึ่งหนึ่ง', caption: 'ฉาก 2.1 — สะพานที่พังครึ่งหนึ่ง', art: 'scene-2-1.png',
    text: 'เป็ดพบสะพานข้ามแม่น้ำที่พังไปครึ่งทาง อีกฝั่งยังมีชาวเมืองรออยู่ เจ้าจะใช้เวทมนตร์ช่วยพวกเขาอย่างไร?',
    options: {
      DGA: 'วาดสะพานขึ้นมาใหม่ด้วยเส้นและสีในแบบตัวเอง',
      DGD: 'ทำป้ายเตือนและแผนที่ทางอ้อมให้ทุกคนเข้าใจ',
      IGD: 'ไขกลไกของสะพานให้กลับมาทำงานอีกครั้ง',
      AFX: 'ทำภาพจำลองสะพานที่ค่อย ๆ ประกอบขึ้นใหม่',
      DEN: 'ชวนชาวเมืองมาซ่อมสะพาน แล้วจัดฉลองเล็ก ๆ'
    }
  },
  '2.2': {
    chapter: 2, title: 'ความทรงจำของเด็กน้อย', caption: 'ฉาก 2.2 — เด็กน้อยร้องไห้', art: 'scene-2-2.png',
    text: 'เป็ดพบเด็กน้อยร้องไห้ข้างทาง เพราะตัวการ์ตูนที่รักหายไปพร้อมกับสีสันของเมือง เจ้าจะช่วยเด็กน้อยอย่างไร?',
    options: {
      DGA: 'วาดตัวการ์ตูนที่หายไปขึ้นมาใหม่ให้',
      DGD: 'ทำสติกเกอร์ โปสเตอร์ และของที่ระลึกให้เก็บไว้',
      IGD: 'สร้างเกมเล็ก ๆ ให้เด็กได้เล่นกับตัวการ์ตูนนั้น',
      AFX: 'ทำให้ตัวการ์ตูนเดินและพูดกับเด็กได้อีกครั้ง',
      DEN: 'ชวนเด็ก ๆ มาล้อมวงฟังเรื่องของตัวการ์ตูนนั้น'
    }
  },
  '2.3': {
    chapter: 2, title: 'ร้านค้าแห่งความทรงจำ', caption: 'ฉาก 2.3 — ร้านเก่าแก่ที่ใกล้ปิด', art: 'scene-2-3.png',
    text: 'ร้านเก่าแก่ตรงหน้าดูเงียบเหงา เจ้าของร้านเล่าว่าไม่มีใครรู้จักร้านของเขาแล้ว เจ้าจะตอบว่าอย่างไร?',
    options: {
      DGA: '“ข้าจะวาดภาพให้ร้านนี้มีเอกลักษณ์ไม่เหมือนใคร”',
      DGD: '“ข้าจะออกแบบแบรนด์ใหม่ ตั้งแต่โลโก้ไปจนถึงป้ายร้าน”',
      IGD: '“ข้าจะทำให้การเข้าร้านเหมือนการเล่นเกมสนุก ๆ”',
      AFX: '“ข้าจะทำคลิปแนะนำร้านที่คนดูแล้วต้องตะลึง”',
      DEN: '“ข้าจะจัดกิจกรรมและโปรโมตร้านให้คนกลับมา”'
    }
  },
  gate: {
    chapter: 3, title: 'ประตูหินแห่งการค้นหาตัวตน', caption: 'ด่านทดสอบ — ประตูหินผา', art: 'scene-gate.png',
    text: 'หลังสำรวจย่านเวทมนตร์ เป็ดพบประตูหินรูปดาว ประตูถามว่า “ศาสตร์ใดที่เจ้าพร้อมจะฝึกฝนทุกวัน?”',
    options: {
      DGA: 'วาดรูปและสังเกตโลกรอบตัวให้ละเอียดขึ้น',
      DGD: 'จัดองค์ประกอบ สี และตัวอักษรให้ลงตัว',
      IGD: 'คิดเป็นระบบ เป็นขั้นเป็นตอน',
      AFX: 'ฝึกทำภาพเคลื่อนไหวให้ดูสมจริง',
      DEN: 'ฝึกพูด เล่าเรื่อง และประสานผู้คนให้ไปด้วยกัน'
    }
  },
  '4.1': {
    chapter: 4, title: 'มิตรภาพระหว่างการเดินทาง', caption: 'ฉาก 4.1 — เจอเพื่อนสี่คน', art: 'scene-4-1.png',
    text: 'หลังประตูเปิด เป็ดได้พบเพื่อนนักเดินทางอีกสี่คน ทุกคนมีความสามารถต่างกัน แต่ยังมีบางสิ่งทำไม่ได้ เจ้าจะเป็นคนที่…',
    options: {
      DGA: 'ช่วยวาดภาพให้ทุกคนเห็นเป้าหมายตรงกัน',
      DGD: 'ทำไกด์ให้ทุกอย่างดูเป็นระเบียบและลงตัว',
      IGD: 'คิดวิธีให้ทุกคนทำงานร่วมกันอย่างสนุก',
      AFX: 'ทำภาพตัวอย่างให้เห็นว่าแผนจะออกมาอย่างไร',
      DEN: 'เป็นคนกลางที่ทำให้ทุกคนอยากเดินต่อด้วยกัน'
    }
  },
  '4.2': {
    chapter: 4, title: 'เมื่อเพื่อนเห็นต่างกัน', caption: 'ฉาก 4.2 — เพื่อนเห็นไม่ตรงกัน', art: 'scene-4-2.png',
    text: 'กลุ่มนักเวทยืนลังเลที่ทางแยก เพราะทุกคนมีความเห็นไม่ตรงกันว่าจะเลือกเส้นทางไหน เจ้าจะทำอย่างไร?',
    options: {
      DGA: 'วาดแผนที่ให้เห็นภาพว่าแต่ละทางไปไหน',
      DGD: 'ทำตารางเปรียบเทียบเพื่อให้ตัดสินใจง่าย',
      IGD: 'ลองสำรวจทั้งสองทาง แล้วเปรียบเทียบผล',
      AFX: 'ทำภาพจำลองให้เห็นปลายทางแต่ละเส้น',
      DEN: 'ฟังความเห็นทุกคนแล้วหาจุดร่วม'
    }
  },
  '5.1': {
    chapter: 5, title: 'เวทีแห่งการคืนสีสัน', caption: 'ฉาก 5.1 — ขึ้นเวที', art: 'scene-5-1.png',
    text: 'เป็ดก้าวขึ้นเวที Imagine Design Event ต่อหน้าชาวเมืองที่เฝ้ารอ เวทมนตร์แบบไหนที่เจ้าจะมอบให้ทุกคน?',
    options: {
      DGA: 'ภาพวาดขนาดยักษ์ให้คนทั้งเมืองเงยหน้ามอง',
      DGD: 'ภาพลักษณ์ใหม่ของเมืองที่มีเอกลักษณ์ทั้งเมือง',
      IGD: 'เกมที่คนทั้งเมืองเข้ามาเล่นพร้อมกันได้',
      AFX: 'โชว์ภาพเคลื่อนไหวและเอฟเฟกต์สุดตื่นตา',
      DEN: 'การแสดงสดที่ทุกคนมีส่วนร่วมได้'
    }
  },
  '5.2': {
    chapter: 5, title: 'สีสันกลับมาแล้ว', caption: 'ฉาก 5.2 — สีกลับมาแล้ว', art: 'scene-5-2.png',
    text: 'สายรุ้งปรากฏขึ้นเหนืออิมาจิน สีสันค่อย ๆ กลับคืนมาอีกครั้ง! เป็ดอยากให้ผู้คนจดจำตัวเองในฐานะนักเวทแบบใด?',
    options: {
      DGA: 'คนที่ให้กำเนิดตัวละครที่ทุกคนรัก',
      DGD: 'คนที่ทำให้เมืองนี้มีหน้าตาและเอกลักษณ์',
      IGD: 'คนที่สร้างโลกให้ทุกคนได้เข้ามาเล่น',
      AFX: 'คนที่ทำให้สิ่งที่ดูเป็นไปไม่ได้กลายเป็นจริง',
      DEN: 'คนที่ทำให้ทุกคนมารวมกันได้'
    }
  }
};

const DISTRICTS = {
  DGA: { title:'ตรอกจินตนาการ', chapter:'ย่านศิลป์', art:'district-dga.png',
    text:'เป็ดยืนมองภาพวาดและพู่กันในตรอกศิลป์ หากจินตนาการของเจ้าสามารถกลายเป็นผลงานได้ เจ้าสนใจเวทมนตร์แบบไหนมากที่สุด?',
    options:[
      ['สร้างตัวละครที่ทุกคนจดจำได้','Character Designer'],
      ['วาดโลกและฉากหลังให้เรื่องเล่ามีชีวิต','Concept Artist / Background Artist'],
      ['เล่าเรื่องผ่านภาพหลายช่อง','Webtoon / Comic / Storyboard Artist'],
      ['ทำให้ภาพกลายเป็นสินค้าหรือของสะสม','Illustrator / Art Toy / Sticker Creator']
    ]},
  DGD: { title:'ถนนเอกลักษณ์', chapter:'ย่านดีไซน์', art:'district-dgd.png',
    text:'เป็ดหยุดหน้าร้านที่ยังรอการออกแบบใหม่ หากได้ฝากผลงานไว้ในเมืองอิมาจิน เจ้าจะเลือกทำสิ่งใด?',
    options:[
      ['ออกแบบป้ายและโลโก้ให้ทุกคนจดจำ','Brand Identity Designer'],
      ['ออกแบบหน้าจอแอปและเว็บไซต์ของเมือง','UI Designer'],
      ['ออกแบบกล่องและแพ็กเกจให้น่าเก็บ','Packaging Designer'],
      ['สร้างโปสเตอร์ใหญ่กลางเมืองให้ผู้คนสะดุดตา','Art Director / Key Visual Designer']
    ]},
  IGD: { title:'สนามแห่งการเล่น', chapter:'ย่านเกม', art:'district-igd.png',
    text:'เป็ดพบอาคารที่มีจอยเกมขนาดใหญ่เป็นสัญลักษณ์ ถ้าเจ้าได้สร้างโลกแห่งเกม จะเริ่มจากอะไร?',
    options:[
      ['คิดกติกาและระบบให้ผู้เล่นสนุก','Game Designer / Level Designer'],
      ['ออกแบบฉากและตัวละครในเกม','Game Artist'],
      ['สร้างโลกเสมือนที่เดินเข้าไปได้จริง','VR / AR Designer'],
      ['ดูแลทีมให้เกมสำเร็จและถึงมือผู้เล่น','Game Producer']
    ]},
  AFX: { title:'กำแพงแห่งเรื่องราว', chapter:'ย่านภาพยนตร์', art:'district-afx.png',
    text:'เป็ดมาถึงอาคารที่มีแผ่นสเลตภาพยนตร์ เวทมนตร์ของที่นี่ปลุกภาพให้เคลื่อนไหวได้ เจ้าชอบงานแบบใด?',
    options:[
      ['ทำให้ตัวละครขยับอย่างมีชีวิต','3D Animator / Rigging Artist'],
      ['ปั้นสิ่งของและตัวละครจากความว่างเปล่า','3D Modeler / Texture Artist'],
      ['สร้างเอฟเฟกต์ไฟ น้ำ ควัน และระเบิด','VFX Artist'],
      ['รวมชั้นภาพให้กลมกลืนเหมือนถ่ายจริง','Compositor']
    ]},
  DEN: { title:'เวทีแห่งตัวตน', chapter:'ย่านบันเทิง', art:'district-den.png',
    text:'เป็ดยืนหน้าเวทีม่านดาวที่เคยเต็มไปด้วยเสียงเพลง หากมีโอกาสสร้างความสุขให้ผู้คน เจ้าจะเลือกบทบาทใด?',
    options:[
      ['คิดรายการและคอนเทนต์ที่คนรอดู','Content Creator / Scriptwriter'],
      ['จัดงานที่ทำให้ผู้คนนับพันมีประสบการณ์ร่วมกัน','Event / Show Producer'],
      ['ทำงานเบื้องหลังตัวตนเสมือนและสตรีมเมอร์','Virtual Talent / Streaming Producer'],
      ['สร้างชุมชนแฟนคลับให้เติบโต','Entertainment Marketer / Community Manager']
    ]}
};

const app = document.getElementById('app');
let soundEnabled = false;
let audioContext = null;
let state = initialState();

function initialState(){
  return {screen:'cover',step:'1.1',answers:{},districtChoices:{},passport:{},orders:{}};
}
function escapeHtml(value){
  return String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function shuffle(input){
  const a=[...input];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function orderFor(id){
  if(!state.orders[id]) state.orders[id]=shuffle(KEYS);
  return state.orders[id];
}
function scoresFor(ids){
  const result=Object.fromEntries(KEYS.map(k=>[k,0]));
  for(const id of ids){if(state.answers[id] && result[state.answers[id]]!==undefined) result[state.answers[id]]++;}
  return result;
}
function sortedTracks(scores,finalTieBreak=false){
  return [...KEYS].sort((a,b)=>scores[b]-scores[a] ||
    (finalTieBreak && state.answers['5.2']===a?-1:0) - (finalTieBreak && state.answers['5.2']===b?-1:0) ||
    KEYS.indexOf(a)-KEYS.indexOf(b));
}
function selectedDistricts(){
  if(!BEFORE_DISTRICTS.every(id=>Boolean(state.answers[id]))) return [];
  const scores=scoresFor(BEFORE_DISTRICTS);
  const ranked=sortedTracks(scores);
  return scores[ranked[0]]-scores[ranked[1]]<=1 ? ranked.slice(0,2) : ranked.slice(0,1);
}
function sequence(){
  return [...BEFORE_DISTRICTS,...selectedDistricts().map(id=>'district:'+id),...AFTER_DISTRICTS,'passport','result'];
}
function getResults(){
  const scores=scoresFor([...BEFORE_DISTRICTS,...AFTER_DISTRICTS]);
  const ranked=sortedTracks(scores,true);
  const primary=ranked[0];
  const secondary=scores[primary]-scores[ranked[1]]<=1?ranked[1]:null;
  return {scores,primary,secondary};
}
function playClick(){
  if(!soundEnabled) return;
  try{
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    const now=audioContext.currentTime;
    const oscillator=audioContext.createOscillator();
    const gain=audioContext.createGain();
    oscillator.type='sine';oscillator.frequency.setValueAtTime(580,now);
    oscillator.frequency.exponentialRampToValueAtTime(820,now+.095);
    gain.gain.setValueAtTime(.024,now);gain.gain.exponentialRampToValueAtTime(.001,now+.13);
    oscillator.connect(gain);gain.connect(audioContext.destination);
    oscillator.start(now);oscillator.stop(now+.14);
  }catch(e){/* Sound is optional. */}
}
function soundIcon(){
  return soundEnabled ?
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3Z"/><path d="M16 9a5 5 0 0 1 0 6M19 6a9 9 0 0 1 0 12"/></svg>' :
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3Z"/><path d="m16 9 5 6M21 9l-5 6"/></svg>';
}
function topBar(showTitle=true){
  return `<div class="top-bar"><div class="brand-tiny">${showTitle?'Imagine City':'IMAGINE CITY'}</div>
    <div class="top-actions"><button class="icon-btn" data-action="sound" type="button" aria-label="${soundEnabled?'ปิดเสียง':'เปิดเสียง'}" title="${soundEnabled?'ปิดเสียง':'เปิดเสียง'}">${soundIcon()}</button></div></div>`;
}
function button(label,action,solid=false,disabled=false,extra=''){
  return `<button type="button" class="sketch-btn ${solid?'sketch-btn--solid':''} ${extra}" data-action="${action}" ${disabled?'disabled':''}>${label}</button>`;
}
function imageTag(name,alt,cls='scene-illustration'){
  return `<img src="${A+name}" class="${cls}" alt="${escapeHtml(alt)}" draggable="false" />`;
}
function sceneAnimationClass(id){
  const map={
    '1.1':'anim-rise',
    '1.2':'anim-float',
    '1.3':'anim-sway',
    '2.1':'anim-pulse',
    '2.2':'anim-soft-bob',
    '2.3':'anim-shop-pop',
    '4.1':'anim-group-bob',
    '4.2':'anim-tilt',
    '5.1':'anim-spotlight',
    '5.2':'anim-rainbow',
    'district:DGA':'anim-paint',
    'district:DGD':'anim-shop-pop',
    'district:IGD':'anim-play',
    'district:AFX':'anim-film',
    'district:DEN':'anim-spotlight',
    'passport':'anim-float',
    'result':'anim-result'
  };
  return map[id]||'anim-soft-bob';
}
function renderCover(){
  return `${topBar(false)}<section class="cover">
      <img class="cover-logo" src="${A}imagine-city-logo.png" alt="Imagine City — คืนสุดท้ายก่อนสีจะหายไป" />
      ${button('START <span class="hand-arrow">➜</span>','start',false,false,'start-button')}
    </section>`;
}
function renderStory(){
  return `${topBar()}<section class="story"><p class="story-steps">PROLOGUE · BEFORE THE ADVENTURE</p>
    <h1>เป็ดน้อยกับหลุมปริศนา</h1>
    <p class="story-paragraph">ในโลกที่มีเวทมนตร์นับไม่ถ้วน เป็ดตัวหนึ่งเรียนรู้มาหลากหลายศาสตร์ แต่ยังไม่รู้ว่าตัวเองเหมาะกับศาสตร์ใด จึงออกเดินทางตามหาคำตอบ</p>
    <p class="story-paragraph">วันหนึ่งเป็ดพบ<strong>หลุมประหลาดสีขาวดำ</strong> และตัดสินใจกระโดดลงไป เมื่อรู้สึกตัวอีกครั้ง ก็มาอยู่ในเมืองที่ไม่คุ้นเคย ทุกสิ่งกลับไร้สีสัน</p>
    <p class="story-paragraph">ลูกไฟดวงเล็กปรากฏขึ้น และเล่าว่า <strong>Imagine City</strong> เคยเต็มไปด้วยภาพวาด ป้ายไฟ เสียงเพลง และผู้คนที่มีความสุข แต่ตอนนี้เหลือเพียงสีขาวดำ</p>
    <div class="story-highlight">“หากมีใครสักคนขึ้นเวที Imagine Design Event และปลุกพลังแห่งความสร้างสรรค์ สีสันทั้งหมดจะกลับมาอีกครั้ง!”</div>
    <p class="story-details">ร่วมตัดสินใจแทนเป็ด ไม่มีคำตอบถูกหรือผิด ทุกทางเลือกจะพาไปพบศาสตร์เวทมนตร์ที่ใกล้ตัวเจ้ามากขึ้น</p>
    <hr class="story-rule"/><div class="nav-bottom">${button('← BACK','back')}${button('เริ่มผจญภัย →','begin',true)}</div>
    </section>`;
}
function getProgress(current){
  const all=[...BEFORE_DISTRICTS,...AFTER_DISTRICTS];
  const index=all.indexOf(current);
  const answered=all.filter(id=>state.answers[id]).length;
  return {label:index>=0?`${index+1}/${TOTAL_SCORED}`:`${answered}/${TOTAL_SCORED}`,percent:(answered/TOTAL_SCORED)*100};
}
function progressBlock(stage){
  const p=getProgress(stage);
  return `<div class="progress-block"><div class="progress-track" role="progressbar" aria-label="ความคืบหน้าแบบทดสอบ" aria-valuemin="0" aria-valuemax="${TOTAL_SCORED}" aria-valuenow="${Object.keys(state.answers).length}"><div class="progress-fill" style="width:${p.percent}%"></div></div><span class="progress-text">${p.label}</span></div>`;
}
function choicesForScene(sceneId){
  const scene=SCENES[sceneId];
  return `<div class="answers" role="radiogroup" aria-label="คำตอบ">
    ${orderFor(sceneId).map((key,i)=>{
      const sel=state.answers[sceneId]===key;
      return `<button type="button" class="choice ${sel?'selected':''}" role="radio" aria-checked="${sel}" data-action="choose" data-scene="${sceneId}" data-value="${key}"><span class="choice-dot" aria-hidden="true"></span><span class="choice-copy">${escapeHtml(scene.options[key])}</span></button>`;
    }).join('')}</div>`;
}
function renderScene(id){
  const sc=SCENES[id];
  const progress=progressBlock(id);
  const artclass=`${id==='5.1'||id==='5.2'?'scene-illustration scene-illustration--festival':'scene-illustration'} ${sceneAnimationClass(id)}`;
  return `${topBar()}<div class="quiz-head"><span class="chapter-tag">Chapter ${sc.chapter}</span></div>
    ${progress}<section class="prompt-frame"><span class="scene-num">${sc.caption}</span><h1 class="question-title">${sc.title}</h1>
    <p class="question-copy">${sc.text}</p></section>
    ${imageTag(sc.art,sc.caption,artclass)}
    ${choicesForScene(id)}
    <div class="nav-bottom">${button('← BACK','back',false,false,'sketch-btn--small')}${button('NEXT →','next',true,!state.answers[id])}</div>
    <p class="page-foot">ไม่มีคำตอบถูกหรือผิด · เลือกสิ่งที่ตรงใจที่สุด</p>`;
}
function renderDistrict(track){
  const d=DISTRICTS[track]; const choice=state.districtChoices[track];
  return `${topBar()}<div class="quiz-head"><span class="chapter-tag">Chapter 3</span></div>
    ${progressBlock('district')}
    <section class="prompt-frame"><span class="scene-num">${d.chapter} [${track}]</span><h1 class="question-title">${d.title}</h1><p class="question-copy">${d.text}</p></section>
    ${imageTag(d.art,d.title,`scene-illustration scene-illustration--district ${sceneAnimationClass('district:'+track)}`)}
    <p class="district-note">เลือกสิ่งที่เจ้าสนใจมากที่สุด (ใช้แนะนำอาชีพ ไม่คิดคะแนนเพิ่ม)</p>
    <div class="answers" role="radiogroup" aria-label="ความสนใจด้านอาชีพ">${d.options.map(([text,job],i)=>{
      const sel=choice===i;return `<button type="button" class="choice ${sel?'selected':''}" role="radio" aria-checked="${sel}" data-action="district-choice" data-track="${track}" data-index="${i}"><span class="choice-dot" aria-hidden="true"></span><span class="choice-copy">${escapeHtml(text)}</span></button>`;
    }).join('')}</div>
    <div class="nav-bottom">${button('← BACK','back',false,false,'sketch-btn--small')}${button('NEXT →','next',true,choice===undefined)}</div>
    <p class="page-foot">นี่คือย่านที่สอดคล้องกับคำตอบก่อนหน้าของเจ้า</p>`;
}
const PASSPORT_FIELDS = [
 ['grade','ตอนนี้เรียนอยู่ชั้นไหน',['','ม.4','ม.5','ม.6','ปวช.','ปวส.','อื่น ๆ']],
 ['stream','กำลังเรียนสายอะไร',['','ศิลป์-คำนวณ','ศิลป์-ภาษา','วิทย์-คณิต','สายอาชีพ','อื่น ๆ']],
 ['discover','รู้จักคณะนี้จากที่ไหน',['','Facebook','Instagram','TikTok','เพื่อนหรือรุ่นพี่','ครูแนะแนว','งานกิจกรรม','อื่น ๆ']],
 ['decision','ตอนนี้อยู่ขั้นไหนของการเลือกคณะ',['','เพิ่งเริ่มหาข้อมูล','กำลังเปรียบเทียบหลายที่','ตั้งใจสมัครแล้ว','รอผลสอบที่อื่นก่อน']],
 ['contact','อยากรับข่าวสารของคณะทางไหน',['','LINE','อีเมล','Facebook','Instagram','โทรศัพท์']]
];
const PRIORITIES=['ค่าเทอม','ทุนการศึกษา','ชื่อเสียงมหาวิทยาลัย','อาชีพหลังเรียนจบ','ผลงานของรุ่นพี่','การเดินทาง','ความชอบของตัวเอง','ผู้ปกครองสนับสนุน'];
const EXPERIENCES=['วาดรูป','ออกแบบ','ตัดต่อวิดีโอ','ทำเกม','จัดกิจกรรม','ถ่ายคอนเทนต์','ยังไม่เคยเลย'];
function fieldSelect(id,label,items){
  const v=state.passport[id]??'';
  return `<div class="field"><label for="f-${id}">${label}</label><select id="f-${id}" data-field="${id}">
    ${items.map((opt,i)=>`<option value="${escapeHtml(opt)}" ${v===opt?'selected':''}>${opt||'— ไม่ระบุ —'}</option>`).join('')}
    </select></div>`;
}
function multiField(id,label,items,max){
  const selected=state.passport[id]||[];
  return `<div class="field"><label>${label}</label><div class="multi-picks" aria-label="${label}">
    ${items.map((opt,i)=>`<button type="button" class="chip ${selected.includes(opt)?'active':''}" aria-pressed="${selected.includes(opt)}" data-action="multi" data-field="${id}" data-value="${escapeHtml(opt)}" data-max="${max||items.length}">${opt}</button>`).join('')}
    </div>${max?`<span class="field-hint">เลือกได้สูงสุด ${max} ข้อ</span>`:''}</div>`;
}
function renderPassport(){
  return `${topBar()}<div class="quiz-head"><span class="chapter-tag">Traveller Card</span></div>
    ${progressBlock('passport')}
    <section class="prompt-frame"><span class="scene-num">ประตูสุดท้าย — บัตรบันทึกการเดินทาง</span>
    <h1 class="question-title">บันทึกการเดินทางของเจ้า</h1><p class="question-copy">หลังคืนสีสันให้อิมาจิน ลูกไฟมอบบัตรนักเดินทางให้เป็ด เจ้าจะกรอกข้อมูลเท่าที่สะดวกหรือข้ามก็ได้</p></section>
    ${imageTag('passport.png','บัตรนักเดินทางพร้อมปากกา',`scene-illustration scene-illustration--passport ${sceneAnimationClass('passport')}`)}
    <div class="form-stack">
      <div class="field"><label for="f-nickname">1. ชื่อเล่น</label><input maxlength="40" autocomplete="off" id="f-nickname" data-field="nickname" placeholder="ชื่อเล่น (ไม่บังคับ)" value="${escapeHtml(state.passport.nickname||'')}" /></div>
      ${fieldSelect('grade','2. ชั้นที่กำลังเรียน',['','ม.4','ม.5','ม.6','ปวช.','ปวส.','อื่น ๆ'])}
      ${fieldSelect('stream','3. สายการเรียน',['','ศิลป์-คำนวณ','ศิลป์-ภาษา','วิทย์-คณิต','สายอาชีพ','อื่น ๆ'])}
      <div class="field"><label for="f-province">4. จังหวัด</label><input maxlength="50" autocomplete="off" id="f-province" data-field="province" placeholder="จังหวัด (ไม่บังคับ)" value="${escapeHtml(state.passport.province||'')}" /></div>
      ${fieldSelect('discover','5. รู้จักคณะนี้จากที่ไหน',['','Facebook','Instagram','TikTok','เพื่อนหรือรุ่นพี่','ครูแนะแนว','งานกิจกรรม','อื่น ๆ'])}
      ${multiField('priorities','6. ใช้อะไรพิจารณาเลือกคณะ',PRIORITIES,2)}
      ${fieldSelect('decision','7. อยู่ขั้นไหนของการเลือกคณะ',['','เพิ่งเริ่มหาข้อมูล','กำลังเปรียบเทียบหลายที่','ตั้งใจสมัครแล้ว','รอผลสอบที่อื่นก่อน'])}
      ${multiField('experiences','8. เคยทำงานสร้างสรรค์อะไรบ้าง',EXPERIENCES)}
      ${fieldSelect('contact','9. อยากรับข่าวสารผ่านช่องทางใด',['','LINE','อีเมล','Facebook','Instagram','โทรศัพท์'])}
    </div>
    <p class="field-hint">ข้อมูลนี้อยู่เฉพาะในหน้าเว็บบนเครื่องที่กำลังเล่น ไม่ส่งไปยังเซิร์ฟเวอร์ และจะหายเมื่อรีเฟรชหน้า</p>
    <div class="nav-bottom">${button('← BACK','back',false,false,'sketch-btn--small')}${button('ดูผลลัพธ์ →','next',true)}</div>`;
}
function createReview(){
  const ids=[...BEFORE_DISTRICTS,...AFTER_DISTRICTS];
  return `<section class="result-list"><h2>เส้นทางเวทมนตร์ทั้ง ${TOTAL_SCORED} การตัดสินใจ</h2>
  <ul>${ids.map((id,i)=>`<li><strong>${i+1}. ${SCENES[id].caption}:</strong> ${escapeHtml(SCENES[id].options[state.answers[id]]||'ยังไม่ได้เลือก')}</li>`).join('')}</ul></section>`;
}
function chosenJobs(){
  const result=[];
  for(const id of selectedDistricts()){
    const val=state.districtChoices[id];if(val!==undefined)result.push(`${id}: ${DISTRICTS[id].options[val][1]}`);
  }
  return result;
}
function renderResult(){
  const {primary,secondary}=getResults(); const info=TRACKS[primary];
  const nickname=(state.passport.nickname||'').trim();
  const selectedJobs=chosenJobs();
  return `${topBar()}<div class="result-top">
    <h1 class="congratulations">Congratulations!</h1>
    ${imageTag('scene-5-2.png','สายรุ้งคืนสีสันให้เมืองอิมาจิน','rainbow-top')}
    <p class="result-lead">เมืองอิมาจินกลับมามีสีสันแล้ว${nickname?' '+escapeHtml(nickname):''}!<br />เป็ดได้ค้นพบพลังที่ใกล้ตัวเองที่สุด</p>
    ${imageTag(info.character,info.short,`result-art ${sceneAnimationClass('result')}`)}
    <h2 class="result-name">${info.short}</h2>
    <span class="result-code">${primary} · ${info.en}</span>
    <p class="result-description">${info.description}</p>
    ${selectedJobs.length?`<p class="result-interest"><strong>ความสนใจที่เลือก:</strong> ${escapeHtml(selectedJobs[0])}</p>`:''}
    ${secondary?`<div class="secondary-result"><span>ศาสตร์ที่ใกล้เคียงกัน</span>
       ${imageTag(TRACKS[secondary].character,TRACKS[secondary].short,'secondary-result-art')}
       <strong>${TRACKS[secondary].short} [${secondary}]</strong></div>`:''}
    <p class="result-goodbye">ทุกเส้นทางมีเวทมนตร์ในแบบของตัวเอง ✧</p>
    <div class="result-actions">${button('↺ เริ่มใหม่','restart')}${button('พิมพ์ / บันทึก PDF','print',true)}</div>
    <p class="page-foot">ผลลัพธ์นี้ใช้เพื่อสำรวจความสนใจ</p>
  </div>`;
}
function render(){
  if(state.screen==='cover') app.innerHTML=renderCover();
  else if(state.screen==='story') app.innerHTML=renderStory();
  else if(state.step==='result') app.innerHTML=renderResult();
  else if(state.step==='passport') app.innerHTML=renderPassport();
  else if(state.step.startsWith('district:')) app.innerHTML=renderDistrict(state.step.slice(9));
  else app.innerHTML=renderScene(state.step);
}
function canAdvance(){
  if(state.screen!=='quiz')return true;
  if(SCENES[state.step])return Boolean(state.answers[state.step]);
  if(state.step.startsWith('district:'))return state.districtChoices[state.step.slice(9)]!==undefined;
  return true;
}
// Smooth chapter transitions; keep reduced-motion accessibility and a CSS-only fallback.
function switchScreen(change){
  const update=()=>{change();render();window.scrollTo(0,0);};
  const reduceMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(document.startViewTransition && !reduceMotion){
    document.startViewTransition(update);
  } else {
    update();
    if(!reduceMotion){
      app.classList.remove('screen-enter');
      void app.offsetWidth;
      app.classList.add('screen-enter');
    }
  }
}
function next(){
  if(!canAdvance())return;
  const flow=sequence(),index=flow.indexOf(state.step);
  if(index>=0 && index<flow.length-1) switchScreen(()=>{state.step=flow[index+1];});
}
function back(){
  if(state.screen==='cover')return;
  const flow=sequence(),index=flow.indexOf(state.step);
  switchScreen(()=>{
    if(state.screen==='story')state.screen='cover';
    else if(index===0)state.screen='story';
    else if(index>0)state.step=flow[index-1];
  });
}
function reset(){switchScreen(()=>{state=initialState();});}
function selectAnswer(btn){
  const scene=btn.dataset.scene;
  state.answers[scene]=btn.dataset.value;
  // Keep the current question on screen while the selected option responds.
  btn.closest('.answers').querySelectorAll('.choice').forEach(choice=>{
    const chosen=choice===btn;
    choice.classList.toggle('selected',chosen);
    choice.setAttribute('aria-checked',String(chosen));
  });
  btn.classList.remove('choice-tap');
  void btn.offsetWidth;
  btn.classList.add('choice-tap');
  const nextButton=app.querySelector('[data-action="next"]');
  if(nextButton)nextButton.disabled=false;
  const bar=app.querySelector('.progress-fill');
  if(bar)bar.style.width=`${getProgress(scene).percent}%`;
  const progress=app.querySelector('[role="progressbar"]');
  if(progress)progress.setAttribute('aria-valuenow',String(Object.keys(state.answers).length));
}
function selectDistrict(btn){
  const track=btn.dataset.track;
  state.districtChoices[track]=Number(btn.dataset.index);
  btn.closest('.answers').querySelectorAll('.choice').forEach(choice=>{
    const chosen=choice===btn;
    choice.classList.toggle('selected',chosen);
    choice.setAttribute('aria-checked',String(chosen));
  });
  btn.classList.remove('choice-tap');
  void btn.offsetWidth;
  btn.classList.add('choice-tap');
  const nextButton=app.querySelector('[data-action="next"]');
  if(nextButton)nextButton.disabled=false;
}
app.addEventListener('click',event=>{
  const btn=event.target.closest('[data-action]');if(!btn)return;
  const action=btn.dataset.action;
  if(action==='sound'){soundEnabled=!soundEnabled;playClick();render();return;}
  playClick();
  if(action==='start'){switchScreen(()=>{state.screen='story';});return;}
  if(action==='begin'){switchScreen(()=>{state.screen='quiz';state.step='1.1';});return;}
  if(action==='back'){back();return;}
  if(action==='next'){next();return;}
  if(action==='restart'){reset();return;}
  if(action==='print'){window.print();return;}
  if(action==='choose'){selectAnswer(btn);return;}
  if(action==='district-choice'){selectDistrict(btn);return;}
  if(action==='multi'){
    const id=btn.dataset.field,val=btn.dataset.value,max=Number(btn.dataset.max);
    const arr=[...(state.passport[id]||[])]; const i=arr.indexOf(val);
    if(i>=0)arr.splice(i,1);
    else if(arr.length<max){if(id==='experiences' && val==='ยังไม่เคยเลย')arr.length=0;
      else if(id==='experiences'){const z=arr.indexOf('ยังไม่เคยเลย');if(z>=0)arr.splice(z,1);}
      arr.push(val);
    }
    state.passport[id]=arr; render();return;
  }
});
app.addEventListener('change',event=>{
  const input=event.target.closest('[data-field]');
  if(input && input.dataset.action!=='multi')state.passport[input.dataset.field]=input.value;
});
app.addEventListener('input',event=>{
  const input=event.target.closest('input[data-field]');
  if(input)state.passport[input.dataset.field]=input.value;
});
render();
