const welcome = document.getElementById('welcome');
const letters = document.getElementById('letters');
const enterBtn = document.getElementById('enterBtn');
const backHome = document.getElementById('backHome');
const field = document.getElementById('envelopeField');
const modal = document.getElementById('memoryModal');
const closeModal = document.getElementById('closeModal');
const returnLetters = document.getElementById('returnLetters');
const memoryTitle = document.getElementById('memoryTitle');
const mediaArea = document.getElementById('mediaArea');
const memoryCaption = document.getElementById('memoryCaption');

// Swap these filenames with your own media, keeping the same names/extensions.
const memories = [
  { title:'Крутой', type:'photo', file:'media/photos/cool.jpg', color:'#dce9fa', seal:'#7b9dc4', symbol:'✦' },
  { title:'Молодой отец', type:'photo', file:'media/photos/young_father.jpg', color:'#f1e0d1', seal:'#b88962', symbol:'♡' },
  { title:'Энергичный', type:'video', file:'media/videos/energetic.mp4', color:'#dcebdc', seal:'#78a07c', symbol:'✧' },
  { title:'Семейный', type:'photo', file:'media/photos/family.jpg', color:'#e8ddf5', seal:'#9b83bd', symbol:'♡' },
  { title:'Блатной', type:'photo', file:'media/photos/blatnoy.jpg', color:'#f4d9df', seal:'#bf8291', symbol:'♠' },
  { title:'Лучший внук во всём мире', type:'photo', file:'media/photos/best_grandson.jpg', color:'#d7e8ef', seal:'#779daf', symbol:'✿' },
  { title:'20-летний', type:'video', file:'media/videos/20_years.mp4', color:'#e6e4e1', seal:'#8b8986', symbol:'▶' },
  { title:'Талантливый', type:'photo', file:'media/photos/talented.jpg', color:'#f4e8b9', seal:'#b7a04f', symbol:'✦' },
  { title:'Малой', type:'photo', file:'media/photos/young.jpg', color:'#f4e0cb', seal:'#b98c67', symbol:'♡' },
  { title:'Самый лучший брат в мире', type:'photo', file:'media/photos/best_brother.jpg', color:'#e2def2', seal:'#9884bb', symbol:'♥' },
  { title:'Лучший сын в мире', type:'photo', file:'media/photos/best_son.jpg', color:'#dcebdc', seal:'#7fa186', symbol:'✿' }
];

function showLetters(){ welcome.classList.add('hidden'); letters.classList.remove('hidden'); }
function showWelcome(){ letters.classList.add('hidden'); welcome.classList.remove('hidden'); }
enterBtn.addEventListener('click', showLetters);
backHome.addEventListener('click', showWelcome);

function createEnvelope(memory,index){
  const btn=document.createElement('button');
  btn.className='envelope';
  btn.style.setProperty('--env',memory.color);
  btn.style.setProperty('--seal',memory.seal);
  btn.style.setProperty('--tilt',`${(index%2===0?1:-1)*(2+(index%4))}deg`);
  btn.style.setProperty('--delay',`${(index%5)*-.7}s`);
  btn.setAttribute('aria-label',`Открыть воспоминание: ${memory.title}`);
  btn.innerHTML=`<span class="env-back"></span><span class="env-flap"></span><span class="env-front"></span><span class="seal">${memory.symbol}</span><span class="hover-hint">Нажми, чтобы разблокировать воспоминание</span><span class="env-label">${memory.title}</span>`;
  btn.addEventListener('click',()=>openMemory(memory));
  return btn;
}
// Shuffle envelope positions, but each envelope keeps its title and matching file.
const shuffled=[...memories].sort(()=>Math.random()-.5);
shuffled.forEach((memory,index)=>field.appendChild(createEnvelope(memory,index)));

function openMemory(memory){
  memoryTitle.textContent=memory.title;
  memoryCaption.textContent=memory.caption||'';
  mediaArea.innerHTML='';
  if(memory.type==='video'){
    const video=document.createElement('video');
    video.src=memory.file; video.controls=true; video.playsInline; video.preload='metadata';
    video.onerror=()=>showMissing(memory);
    mediaArea.appendChild(video);
  }else{
    const img=document.createElement('img');
    img.src=memory.file; img.alt=memory.title;
    img.onerror=()=>showMissing(memory);
    mediaArea.appendChild(img);
  }
  modal.classList.remove('hidden');
}
function showMissing(memory){
  mediaArea.innerHTML=`<div class="missing-media">Файл пока не добавлен.<br><small>Добавь файл: <strong>${memory.file}</strong></small></div>`;
}
function hideModal(){
  modal.classList.add('hidden');
  const video=mediaArea.querySelector('video'); if(video) video.pause();
}
closeModal.addEventListener('click',hideModal);
returnLetters.addEventListener('click',hideModal);
modal.addEventListener('click',e=>{if(e.target===modal)hideModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))hideModal()});
