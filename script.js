// Tanggal mulai kenal: ganti sesuai kenyataan (YYYY-MM-DD)
const START='2026-09-21';
// Kalimat kejutan: ganti sesukamu
const MSGS=['Kamu tuh bikin hari biasa jadi seru.','Ketawamu itu obat paling ampuh.','Terima kasih sudah jadi kamu.','Semoga harimu semanis senyummu.','Kamu lebih hebat dari yang kamu kira.'];
 
document.getElementById('days').textContent=Math.max(0,Math.floor((Date.now()-new Date(START))/864e5)).toLocaleString('id-ID')+' hari';
 
let n=0;
document.getElementById('surprise').onclick=()=>{document.getElementById('msg').textContent=MSGS[n++%MSGS.length]};
 
const root=document.documentElement,tb=document.getElementById('theme');
tb.onclick=()=>{const dark=root.dataset.theme==='dark'||(!root.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);root.dataset.theme=dark?'light':'dark';tb.textContent=dark?'🌙':'☀️'};
 
const aud=document.getElementById('aud'),pb=document.getElementById('play'),am=document.getElementById('audmsg');
pb.onclick=()=>{
  if(aud.paused){
    am.textContent='Memuat lagu...';
    const p=aud.play();
    if(p&&p.catch)p.catch(e=>{am.textContent=(e&&e.name==='NotAllowedError')?'Ketuk tombolnya sekali lagi ya.':'Lagu belum bisa diputar. Pastikan musik.mp3 ikut ter-upload.'});
  }else{aud.pause()}
};
aud.addEventListener('playing',()=>{pb.textContent='⏸ Jeda';am.textContent=''});
aud.addEventListener('pause',()=>{pb.textContent='▶ Putar'});
aud.addEventListener('ended',()=>{pb.textContent='▶ Putar'});
aud.addEventListener('error',()=>{am.textContent='Lagu gagal dimuat. Pastikan musik.mp3 ada di folder yang sama dan ikut ter-upload.'});
 
 
/* ===== TAMBAHAN: playlist 3 lagu ===== */
(function(){
  const tracks=[
    {t:'Cincin – Hindia',s:'musik2.mp3'},
    {t:'Everything You Are – Hindia',s:'musik.mp3'},
    {t:'Perfect – Ed Sheeran',s:'musik3.mp3'},
    {t:'Treat You Better – Shawn Mendes',s:'musik4.mp3'},
    {t:'Bergema Sampai Selamanya – Nadhif Basalamah',s:'musik5.mp3'},
    {t:'Ho Hey – The Lumineers',s:'musik6.mp3'}
  ];
  const box=document.getElementById('tracks');
  if(!box)return;
  const label=aud.closest('.card').querySelector('p.small');
  let cur=1; // musik.mp3 = Everything You Are
  const btns=tracks.map((tr,i)=>{
    const b=document.createElement('button');
    b.type='button';b.textContent=(i+1)+'. '+tr.t;
    b.onclick=()=>pick(i,true);
    box.appendChild(b);return b;
  });
  function mark(){
    btns.forEach((b,i)=>b.classList.toggle('on',i===cur));
    label.textContent=tracks[cur].t.replace(' – ',' — ');
  }
  function pick(i,play){
    cur=i;mark();
    aud.src=tracks[i].s;aud.load();
    if(play){
      am.textContent='Memuat lagu...';
      const p=aud.play();
      if(p&&p.catch)p.catch(()=>{am.textContent='Ketuk tombol Putar untuk mulai.'});
    }else{am.textContent='';pb.textContent='▶ Putar'}
  }
  aud.addEventListener('ended',()=>pick((cur+1)%tracks.length,true));
  mark();
})();
 
/* ===== TAMBAHAN 2: sentuhan mewah ===== */
(function(){
  const d=document,b=d.body;
  // intro layar pembuka (hilang otomatis)
  const sp=d.createElement('div');sp.className='splash';
  sp.innerHTML='<div>For You <i>pi</i><small>a little tribute</small></div>';
  b.appendChild(sp);
  const hide=()=>sp.classList.add('hide');
  setTimeout(hide,1500);sp.addEventListener('click',hide);setTimeout(()=>sp.remove(),3200);
  // garis progres scroll
  const pr=d.createElement('div');pr.className='progress';b.appendChild(pr);
  const prog=()=>{const h=d.documentElement,m=h.scrollHeight-h.clientHeight;pr.style.width=(m>0?h.scrollTop/m*100:0)+'%'};
  addEventListener('scroll',prog,{passive:true});prog();
  // ornamen pemisah
  const g=d.getElementById('galeri');
  if(g){const o=d.createElement('div');o.className='orn';o.setAttribute('aria-hidden','true');o.textContent='✦';g.parentNode.insertBefore(o,g)}
  // debu emas di hero
  const hero=d.querySelector('.hero');
  if(hero){
    const w=d.createElement('div');w.className='dust';w.setAttribute('aria-hidden','true');
    for(let i=0;i<14;i++){
      const p=d.createElement('b');
      p.style.cssText='left:'+(Math.random()*100)+'%;--s:'+(3+Math.random()*5)+'px;--d:'+(7+Math.random()*7)+'s;--l:-'+(Math.random()*10)+'s;--x:'+(Math.random()*60-30)+'px';
      w.appendChild(p);
    }
    hero.insertBefore(w,hero.firstChild);
  }
  // cahaya lembut mengikuti kursor di kartu
  d.querySelectorAll('.card').forEach(c=>c.addEventListener('pointermove',e=>{
    const r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
  }));
  // menu aktif sesuai posisi scroll
  const links=[...d.querySelectorAll('nav a[href^="#"]')];
  const act=()=>{
    let cur=links[0],best=-1e9;
    links.forEach(a=>{const t=d.querySelector(a.getAttribute('href'));if(!t)return;const y=t.getBoundingClientRect().top;if(y<=innerHeight*.4&&y>best){best=y;cur=a}});
    links.forEach(a=>a.classList.toggle('active',a===cur));
  };
  addEventListener('scroll',act,{passive:true});act();
  // equalizer saat lagu diputar
  const card=aud.closest('.card'),h3=card.querySelector('h3');
  h3.insertAdjacentHTML('beforeend','<span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>');
  aud.addEventListener('playing',()=>card.classList.add('playing'));
  ['pause','ended','error'].forEach(ev=>aud.addEventListener(ev,()=>card.classList.remove('playing')));
})();
 
/* ===== TAMBAHAN 3: loading screen baru + fitur menarik perhatian ===== */
// Isi surat rahasia: ganti sesukamu
const LETTER={
  judul:'Untuk kamu,',
  isi:'Aku nggak pandai merangkai kata, tapi aku ingin kamu tahu: kamu salah satu alasan hari-hariku terasa lebih ringan.\n\nTerima kasih sudah jadi kamu apa adanya. Semoga kamu selalu bahagia, ya.\n\n— dari seseorang yang diam-diam senang kenal kamu'
};
(function(){
  const d=document,root=d.documentElement,b=d.body;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
 
  /* --- loading screen --- */
  const ld=d.createElement('div');ld.className='ld';
  ld.innerHTML='<i class="ld-p ld-l"></i><i class="ld-p ld-r"></i>'+
    '<b class="ld-sp" style="left:14%;top:22%">✦</b><b class="ld-sp" style="right:16%;top:30%">✧</b><b class="ld-sp" style="left:22%;bottom:20%">✧</b><b class="ld-sp" style="right:20%;bottom:24%">✦</b>'+
    '<div class="ld-c"><div class="ld-w"><svg class="ld-ring" viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="ldg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8458b3"/><stop offset="1" stop-color="#c9a96e"/></linearGradient></defs><circle class="bg" cx="60" cy="60" r="54"/><circle class="fg" id="ldfg" cx="60" cy="60" r="54" stroke="url(#ldg)" transform="rotate(-90 60 60)"/></svg><div class="ld-h">💜</div></div>'+
    '<div class="ld-t">For You <em>pi</em></div><div class="ld-s">a little tribute</div><div class="ld-n"><span id="ldn">0</span>%</div><div class="ld-m" id="ldm">menyiapkan kejutan…</div></div>';
  b.appendChild(ld);root.classList.add('ready');root.style.overflow='hidden';
  const fg=d.getElementById('ldfg'),nn=d.getElementById('ldn'),mm=d.getElementById('ldm');
  const msgs=['menyiapkan kejutan…','merangkai kenangan…','menata bunga & lagu…','hampir siap ✦'];
  const MIN=reduce?300:2300,t0=performance.now();
  let loaded=d.readyState==='complete',done=false;
  addEventListener('load',()=>{loaded=true});
  function frame(now){
    const el=now-t0;let p=Math.min(el/MIN,1);
    if(!loaded)p=Math.min(p,.92);
    fg.style.strokeDashoffset=339.3*(1-p);
    nn.textContent=Math.floor(p*100);
    mm.textContent=msgs[Math.min(msgs.length-1,Math.floor(p*msgs.length))];
    if((p>=1&&loaded)||el>6000){finish();return}
    requestAnimationFrame(frame);
  }
  function finish(){
    if(done)return;done=true;
    fg.style.strokeDashoffset=0;nn.textContent=100;
    ld.classList.add('out');root.style.overflow='';
    setTimeout(()=>{ld.remove();start()},reduce?0:1050);
  }
  requestAnimationFrame(frame);
 
  /* --- ledakan hati/kilau saat ketuk + jejak kilau di desktop --- */
  function burst(x,y,n){
    if(reduce)return;
    const set=['💜','✨','🤍','🌸','💖'];
    for(let i=0;i<n;i++){
      const s=d.createElement('span');s.className='fx';s.textContent=set[i%set.length];
      s.style.cssText='left:'+x+'px;top:'+y+'px;font-size:'+(14+Math.random()*14)+'px;--dx:'+(Math.random()*160-80)+'px;--dy:'+(-(50+Math.random()*120))+'px;--t:'+(0.9+Math.random()*.7)+'s';
      b.appendChild(s);setTimeout(()=>s.remove(),1800);
    }
  }
  addEventListener('pointerdown',e=>{if(!d.querySelector('.ld'))burst(e.clientX,e.clientY,6)});
  let last=0;
  addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse'||reduce||d.querySelector('.ld'))return;
    const n=performance.now();if(n-last<70)return;last=n;
    const s=d.createElement('span');s.className='fx';s.textContent='✦';
    s.style.cssText='left:'+e.clientX+'px;top:'+e.clientY+'px;font-size:'+(8+Math.random()*8)+'px;color:var(--gold);--dx:'+(Math.random()*30-15)+'px;--dy:'+(10+Math.random()*30)+'px;--t:.8s';
    b.appendChild(s);setTimeout(()=>s.remove(),900);
  },{passive:true});
 
  /* --- kartu + surat rahasia --- */
  const grid=d.querySelector('.bento');
  if(grid){
    const c=d.createElement('article');c.className='card lilac w2 h2 env';c.style.setProperty('--i',12);
    c.innerHTML='<div class="emoji">💌</div><div><h3>Surat rahasia</h3><p class="small" style="margin-top:8px">Ada sepucuk surat kecil untukmu. Ketuk untuk membukanya.</p></div><button class="pill" type="button" style="align-self:flex-start">Buka suratnya</button>';
    grid.appendChild(c);
    const lt=d.createElement('div');lt.className='lt';lt.setAttribute('role','dialog');lt.setAttribute('aria-modal','true');lt.setAttribute('aria-label','Surat rahasia');
    lt.innerHTML='<div class="lt-p"><button class="lt-x" type="button" aria-label="Tutup">×</button><h4></h4><p></p></div>';
    lt.querySelector('h4').textContent=LETTER.judul;lt.querySelector('p').textContent=LETTER.isi;
    b.appendChild(lt);
    const openL=()=>{lt.classList.add('open');burst(innerWidth/2,innerHeight/2,14)};
    const closeL=()=>lt.classList.remove('open');
    c.addEventListener('click',openL);
    lt.addEventListener('click',e=>{if(e.target===lt||e.target.classList.contains('lt-x'))closeL()});
    addEventListener('keydown',e=>{if(e.key==='Escape')closeL()});
  }
 
  /* --- tombol musik melayang (piringan hitam) --- */
  const fab=d.createElement('button');fab.type='button';fab.className='fab';fab.setAttribute('aria-label','Putar atau jeda musik');
  fab.onclick=()=>pb.click();
  aud.addEventListener('playing',()=>fab.classList.add('spin'));
  ['pause','ended','error'].forEach(ev=>aud.addEventListener(ev,()=>fab.classList.remove('spin')));
 
  /* --- dijalankan setelah loading selesai --- */
  function start(){
    const cards=[...d.querySelectorAll('.bento .card')];
    if('IntersectionObserver' in window){
      cards.forEach((c,i)=>{const k=(i%4)*.08;c.classList.add('rv');c.style.transitionDelay='0s,0s,'+k+'s,'+k+'s'});
      const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{threshold:.12});
      cards.forEach(c=>io.observe(c));
    }
    const hp=d.querySelector('.hero p');
    if(hp&&!reduce){
      const full=hp.textContent;hp.setAttribute('aria-label',full);
      hp.style.minHeight=hp.offsetHeight+'px';hp.textContent='';hp.classList.add('tw');
      let i=0;const tick=()=>{hp.textContent=full.slice(0,++i);if(i<full.length)setTimeout(tick,26);else hp.classList.add('done')};tick();
    }
    b.appendChild(fab);
    burst(innerWidth/2,innerHeight*.35,10);
  }
})();
 
/* ===== TAMBAHAN 4: kartu Instagram & TikTok ===== */
// Akun sosmed: ganti sesukamu (tanpa tanda @)
const SOSMED={instagram:'yopiismhrja_',tiktok:'iniiyopiii'};
(function(){
  const d=document,grid=d.querySelector('.bento');
  const ig=SOSMED.instagram,tt=SOSMED.tiktok;
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const ini=s=>(String(s).replace(/[^a-z0-9]/gi,'')[0]||'♥').toUpperCase();
  const fl=(ch,n)=>{let s='';for(let i=0;i<n;i++)s+='<b class="sc-fl" aria-hidden="true" style="--r:'+(14+i*24)+';--dl:'+(i*.9)+'s;--x:'+(i%2?14:-10)+'px">'+ch[i%ch.length]+'</b>';return s};
  const IGSVG='<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
  function card(cls,url,label,html,i){
    const a=d.createElement('a');a.className='card sc '+cls+' w2';a.href=url;a.target='_blank';a.rel='noopener';
    a.setAttribute('aria-label',label);a.style.setProperty('--i',i);a.innerHTML=html;grid.appendChild(a);
  }
  if(grid){
    if(ig)card('ig','https://instagram.com/'+encodeURIComponent(ig),'Buka Instagram @'+ig,
      '<div class="sc-top"><span class="sc-w"><span class="sc-av">'+esc(ini(ig))+'</span></span><div class="sc-id"><b class="sc-h">@'+esc(ig)+'</b><small class="sc-pl">'+IGSVG+' Instagram</small></div><span class="sc-btn">Ikuti</span></div>'+
      '<p class="sc-t">Foto dan cerita kecil kami ada di sini.</p><div class="sc-ic" aria-hidden="true"><span>♡</span><span>💬</span><span>➤</span></div>'+fl(['♥','♡','♥'],3),13);
    if(tt)card('tt','https://tiktok.com/@'+encodeURIComponent(tt),'Buka TikTok @'+tt,
      '<div class="sc-top"><span class="sc-w"><span class="sc-av">'+esc(ini(tt))+'</span><i class="sc-bd">♪</i></span><div class="sc-id"><b class="sc-h" data-t="@'+esc(tt)+'">@'+esc(tt)+'</b><small class="sc-pl">♪ TikTok</small></div><span class="sc-btn">Ikuti</span></div>'+
      '<p class="sc-t">Video singkat, lagu, dan tawa kami.</p><div class="sc-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>'+fl(['♪','♫','♪'],3),14);
  }
  // tombol TikTok di footer, sama seperti Instagram
  const soc=d.querySelector('footer .soc');
  if(soc&&tt)soc.insertAdjacentHTML('beforeend','<a href="https://tiktok.com/@'+encodeURIComponent(tt)+'" target="_blank" rel="noopener" aria-label="TikTok">TikTok</a>');
})();
 
/* ===== TAMBAHAN 5: sosmed dipindah ke atas + tombol di hero + dock melayang ===== */
(function(){
  const d=document,ig=SOSMED.instagram,tt=SOSMED.tiktok;
  const igUrl='https://instagram.com/'+encodeURIComponent(ig),ttUrl='https://tiktok.com/@'+encodeURIComponent(tt);
  const IGSVG='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
 
  /* 1) pindahkan kartu IG & TikTok ke bagian atas, tepat di bawah hero */
  const cards=[...d.querySelectorAll('.bento .sc')];
  if(cards.length){
    const sec=d.createElement('section');sec.className='soc-sec';sec.id='sosmed';
    sec.innerHTML='<div class="soc-row"></div>';
    const row=sec.querySelector('.soc-row');
    cards.forEach((c,i)=>{
      c.classList.remove('w2');c.style.setProperty('--i',i);
      const btn=c.querySelector('.sc-btn');if(btn)btn.textContent='Ikuti ↗';
      const t=d.createElement('span');t.className='sc-tag';t.textContent='klik aku ✨';c.appendChild(t);
      row.appendChild(c);
    });
    const ref=d.querySelector('.orn')||d.getElementById('galeri');
    ref.parentNode.insertBefore(sec,ref);
    const nav=d.querySelector('header nav');
    if(nav&&nav.firstElementChild)nav.firstElementChild.insertAdjacentHTML('afterend','<a href="#sosmed">Ikuti</a>');
  }
 
  /* 2) tombol Instagram & TikTok langsung di hero (terlihat sejak layar pertama) */
  const hero=d.querySelector('.hero');
  if(hero&&(ig||tt)){
    const w=d.createElement('div');w.className='hero-soc';
    w.innerHTML=(ig?'<a class="h-ig" href="'+igUrl+'" target="_blank" rel="noopener">'+IGSVG+' Instagram</a>':'')+(tt?'<a class="h-tt" href="'+ttUrl+'" target="_blank" rel="noopener">♪ TikTok</a>':'');
    hero.appendChild(w);
  }
 
  /* 3) dock melayang di kiri bawah, muncul setelah scroll */
  if(ig||tt){
    const dock=d.createElement('div');dock.className='dock';
    dock.innerHTML=(ig?'<a class="d-ig" href="'+igUrl+'" target="_blank" rel="noopener" aria-label="Instagram" data-l="Instagram">'+IGSVG+'</a>':'')+(tt?'<a class="d-tt" href="'+ttUrl+'" target="_blank" rel="noopener" aria-label="TikTok" data-l="TikTok">♪</a>':'');
    d.body.appendChild(dock);
    const sh=()=>dock.classList.toggle('on',scrollY>420);
    addEventListener('scroll',sh,{passive:true});sh();
  }
})();
 
/* ===== TAMBAHAN 6: kartu gosok, kirim cinta, kata manis, kelopak jatuh ===== */
// Kata-kata manis (berganti otomatis): ganti sesukamu
const QUOTES=['Senyummu itu tempat favoritku buat pulang.','Kamu bikin hal biasa jadi terasa spesial.','Semoga hari ini baik sama kamu, seperti kamu baik ke orang lain.','Kamu cantik, dan itu bukan cuma soal wajah.','Terima kasih sudah ada.'];
// Pesan di balik kartu gosok: ganti sesukamu
const SCRATCH={judul:'Kamu itu istimewa.',isi:'Jangan lupa tersenyum hari ini 💜'};
(function(){
  const d=document,b=d.body,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function pop(x,y,n){
    if(reduce)return;
    const set=['💜','✨','🌸','💖','🤍','🎉'];
    for(let i=0;i<n;i++){
      const s=d.createElement('span');s.className='fx';s.textContent=set[i%set.length];
      s.style.cssText='left:'+x+'px;top:'+y+'px;font-size:'+(14+Math.random()*14)+'px;--dx:'+(Math.random()*200-100)+'px;--dy:'+(-(40+Math.random()*130))+'px;--t:'+(0.9+Math.random()*.8)+'s';
      b.appendChild(s);setTimeout(()=>s.remove(),1900);
    }
  }
  const grid=d.querySelector('.bento'),days=d.getElementById('days');
  if(grid){
    /* kartu gosok */
    const sx=d.createElement('article');sx.className='card sx w2';sx.style.setProperty('--i',15);
    sx.innerHTML='<div class="sx-msg"><div class="emoji">🎁</div><p class="big"></p><p class="small"></p></div><canvas class="sx-cv" aria-label="Gosok untuk membuka kejutan"></canvas>';
    sx.querySelector('.big').textContent=SCRATCH.judul;sx.querySelector('.small').textContent=SCRATCH.isi;
    /* kirim cinta */
    const lv=d.createElement('article');lv.className='card lilac love';lv.tabIndex=0;lv.setAttribute('role','button');lv.setAttribute('aria-label','Kirim cinta');lv.style.setProperty('--i',16);
    lv.innerHTML='<div class="emoji">💜</div><h3>Kirim cinta</h3><p class="small">Ketuk hatinya</p>';
    /* kata manis */
    const qc=d.createElement('article');qc.className='card butter qcard';qc.style.setProperty('--i',17);
    qc.innerHTML='<h3>Kata manis</h3><p class="hl rq"></p>';
    const anchor=days&&days.closest('.card');
    if(anchor)anchor.after(sx,lv,qc);else grid.append(sx,lv,qc);
 
    const cv=sx.querySelector('canvas'),ctx=cv.getContext('2d');
    function paint(){
      const w=cv.width=sx.clientWidth||300,h=cv.height=sx.clientHeight||200;
      const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#c9a96e');g.addColorStop(.5,'#f1e2bd');g.addColorStop(1,'#a77bd1');
      ctx.globalCompositeOperation='source-over';ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      ctx.fillStyle='rgba(255,255,255,.6)';
      for(let i=0;i<50;i++)ctx.fillRect(Math.random()*w,Math.random()*h,2,2);
      ctx.font='700 18px "Plus Jakarta Sans",sans-serif';ctx.textAlign='center';ctx.fillText('✦ gosok di sini ✦',w/2,h/2+6);
    }
    requestAnimationFrame(paint);
    let down=false,moves=0,fin=false;
    function check(){
      if(fin)return;
      const data=ctx.getImageData(0,0,cv.width,cv.height).data;let t=0,n=0;
      for(let i=3;i<data.length;i+=64){n++;if(data[i]<40)t++}
      if(t/n>.55){fin=true;cv.classList.add('done');const r=sx.getBoundingClientRect();pop(r.left+r.width/2,r.top+r.height/2,16)}
    }
    function scr(e){
      const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*cv.width/r.width,y=(e.clientY-r.top)*cv.height/r.height;
      ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(x,y,22,0,7);ctx.fill();
      if(++moves%10===0)check();
    }
    cv.addEventListener('pointerdown',e=>{down=true;cv.setPointerCapture(e.pointerId);scr(e)});
    cv.addEventListener('pointermove',e=>{if(down)scr(e)});
    ['pointerup','pointercancel'].forEach(ev=>cv.addEventListener(ev,()=>{down=false;check()}));
 
    let cnt=0;try{cnt=+localStorage.getItem('fyp_love')||0}catch(_){}
    const lt=lv.querySelector('p');
    const say=()=>{lt.textContent=cnt?('Sudah '+cnt+' cinta terkirim'+(cnt>=50?' 🥹':cnt>=10?' 💖':'')):'Ketuk hatinya'};say();
    const tap=()=>{
      cnt++;try{localStorage.setItem('fyp_love',cnt)}catch(_){}
      say();lv.classList.add('tap');setTimeout(()=>lv.classList.remove('tap'),150);
      const r=lv.getBoundingClientRect();pop(r.left+r.width/2,r.top+r.height/2,5);
    };
    lv.addEventListener('click',tap);
    lv.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tap()}});
 
    const rq=qc.querySelector('.rq');let qi=0;rq.textContent=QUOTES[0];
    setInterval(()=>{rq.classList.add('out');setTimeout(()=>{qi=(qi+1)%QUOTES.length;rq.textContent=QUOTES[qi];rq.classList.remove('out')},500)},4500);
  }
 
  /* kelopak bunga jatuh pelan di seluruh halaman */
  if(!reduce){
    const f=d.createElement('div');f.className='fall';f.setAttribute('aria-hidden','true');
    for(let i=0;i<12;i++){
      const p=d.createElement('i');p.textContent=i%3?'🌸':'✿';
      p.style.cssText='--l:'+(Math.random()*100)+'%;--s:'+(12+Math.random()*10)+'px;--d:'+(14+Math.random()*12)+'s;--dl:-'+(Math.random()*20)+'s;--sw:'+(Math.random()*160-80)+'px;--r:'+(180+Math.random()*360)+'deg';
      f.appendChild(p);
    }
    b.appendChild(f);
  }
})();
