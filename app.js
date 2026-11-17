
var S=[
{id:1,t:"El Tren de los Animales",c:"Canciones",e:"🚂",g:["#ff8c00","#ff4d6d"],n:4,a:[["la vaca","🐮","muuu"],["el pollito","🐥","pío, pío"],["el perro","🐶","guau, guau"],["el pato","🦆","cuac, cuac"]],d:"Sube al tren con Yailen y descubre a los animales de cada estación."},
{id:2,t:"Ducha, chap chap",c:"Rutinas",e:"🛁",g:["#3b82f6","#2fd49b"],n:4,d:"La canción del baño: jabón, burbujas y mucha risa."},
{id:3,t:"Pasito de Dino",c:"Canciones",e:"🦖",g:["#2fd49b","#16a34a"],n:5,d:"Baila como un dinosaurio con pasos fáciles de imitar."},
{id:4,t:"Palabras amables",c:"Aprendo",e:"💛",g:["#ffd23f","#ff8c00"],n:5,d:"Por favor, gracias y perdón, cantados con Yailen."},
{id:5,t:"Dulces sueños",c:"Rutinas",e:"🌙",g:["#6d5dfc","#a855f7"],n:3,d:"Una canción de cuna para dormir entre nubes."},
{id:6,t:"Sonidos de la granja",c:"Aprendo",e:"🐮",g:["#f97316","#facc15"],n:6,d:"¿Quién hace muuu? Aprende los sonidos de los animales."},
{id:7,t:"¿Dónde está el animal?",c:"Cuentos",e:"🔎",g:["#ec4899","#f97316"],n:4,d:"Un juego de adivinanzas para buscar animales escondidos."},
{id:8,t:"Feliz Navidad",c:"Canciones",e:"🎄",g:["#16a34a","#ef4444"],n:3,d:"Una canción navideña para cantar en familia."}
];
var CATS=["Todo","Canciones","Aprendo","Rutinas","Cuentos"];
var st={tab:"home",cat:"Todo",q:"",favs:[],seen:[],stars:0,cur:null,ep:1,tick:null,secs:0,done:{}};
try{var sv=JSON.parse(localStorage.getItem("streampulse_yailentv")||"null");if(sv){st.favs=sv.favs||[];st.seen=sv.seen||[];st.stars=sv.stars||0;st.done=sv.done||{}}}catch(e){}
function save(){try{localStorage.setItem("streampulse_yailentv",JSON.stringify({favs:st.favs,seen:st.seen,stars:st.stars,done:st.done}))}catch(e){}}
function $(i){return document.getElementById(i)}
function toast(m){var t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove("on")},2200)}
function grad(s){return "background:linear-gradient(160deg,"+s.g[0]+","+s.g[1]+")"}

function switchTab(tabId) {
    st.tab = tabId;
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(t => t.setAttribute("aria-selected", "false"));
    
    if (tabId === 'home') {
        const v = $('view-inicio');
        if (v) v.classList.add('active');
        const btn = document.querySelector('nav button[data-t="home"]');
        if (btn) btn.setAttribute("aria-selected", "true");
    } else if (tabId === 'materiales') {
        const v = $('view-materiales');
        if (v) v.classList.add('active');
        const btn = document.querySelector('nav button[data-t="materiales"]');
        if (btn) btn.setAttribute("aria-selected", "true");
    } else if (tabId === 'invertir') {
        const v = $('view-invertir');
        if (v) v.classList.add('active');
        const btn = document.querySelector('nav button[data-t="invertir"]');
        if (btn) btn.setAttribute("aria-selected", "true");
    } else if (tabId === 'perfil') {
        const v = $('view-perfil');
        if (v) v.classList.add('active');
        const btn = document.querySelector('nav button[data-t="perfil"]');
        if (btn) btn.setAttribute("aria-selected", "true");
    }
    renderHome();
}

function cardH(s){
    var f=st.favs.indexOf(s.id)>-1;
    return '<div class="card"><button style="display:block;width:100%;text-align:left" data-open="'+s.id+'"><div class="poster" style="'+grad(s)+'"><span class="badge">'+s.n+' episodios</span>'+s.e+'</div><h3>'+s.t+'</h3><p>'+s.c+'</p></button><button class="fv" data-fav="'+s.id+'" aria-label="Favorito">'+(f?"🧡":"🤍")+'</button></div>';
}

function gridH(list){
    return list.length?'<div class="grid">'+list.map(cardH).join("")+'</div>':'<div class="empty" style="padding:30px; text-align:center; color:var(--tx2)">No hay videos aquí todavía. Toca el corazón para guardar.</div>';
}

function renderHome(){
    $("stTop").textContent="⭐ "+st.stars;
    var starC = $("starCount");
    if(starC) starC.textContent = st.stars;
    
    var grid = $("homeGrid");
    if(grid) {
        var filtered = S.filter(function(s){return st.cat==="Todo"||s.c===st.cat});
        grid.innerHTML = gridH(filtered);
    }
    
    document.querySelectorAll("#catChips button").forEach(function(b){
        b.setAttribute("aria-pressed", b.dataset.cat === st.cat);
    });
}

function toggleFav(id){
    var i=st.favs.indexOf(id);
    if(i>-1) st.favs.splice(i,1);
    else { st.favs.push(id); toast("Guardado en favoritos"); }
    save();
    renderHome();
    if(st.cur) $("plFav").textContent=st.favs.indexOf(st.cur.id)>-1?"🧡":"🤍";
}

function openP(id){
    st.cur=S.filter(function(s){return s.id===id})[0];
    st.ep=1;
    $("scr").style.cssText=grad(st.cur);
    buildStage();
    $("plT").textContent=st.cur.t;
    $("plD").textContent=st.cur.d;
    $("plFav").textContent=st.favs.indexOf(id)>-1?"🧡":"🤍";
    if(st.seen.indexOf(id)<0){st.seen.push(id);save()}
    epsR();
    stop();
    $("pl").classList.add("on");
    $("close").focus();
}

var YIMG="data:image/webp;base64,UklGRgyPAABXRUJQVlA4WAoAAAAQAAAAewEAmgIAQUxQSKsoAAAB8Idt2zMn2fbtx0x6IEASqnRQEKR405u9t5tiB8WGvRdsN2JviA1QwS6K5bYr3XLbAAUBKx0EQg+hpGcy+/5HkpGMuc5z3q9GxATg//f//zOgxZ4ws6o4gGaJLquKakOhrFatWx827Pzzzj+ufevGSQBglrgyQ7XJaS279r/4xhuemTV79vd5+bvyV82f89rYi/rkhACzhJQZAMvI7TlkxLhH//vjL/nFxRHDypL8Js+O6dMAMEs0mQFIzm0zbOIbC1fxlWuql3y0cMn15QT537yS4nf+DIm8YGmcXMtTccZgirhEHoyt1KQcIHiQStKEsrRSPAOIibyuZClNLM9Pc61Ft04kepSwugREpEVzMEYpH2CB9g8uQ9f/eXYXGypAaX1QAmfXONMpZmBi0eEsNf+/2z5yTOX92+eWt95/+ihqdw7vD/My47ye+OaN5Sd3pLHqhNobLFXQ1UYmGPr07TC/8k0jobEbhGnydt/yt/9kVK8Ml1XNo4kD+/LhYXxtnf++ywjnxklGN+p8jsgAA==";
var YSVG=`<svg class="yl MM" viewBox="0 0 120 190" role="img" aria-label="Yailen"><ellipse cx="60" cy="186" rx="34" ry="4" fill="#0003"/><circle cx="60" cy="52" r="36" fill="#3a2214"/><circle cx="27" cy="74" r="10" fill="#3a2214"/><circle cx="93" cy="74" r="10" fill="#3a2214"/><rect x="47" y="136" width="10" height="38" rx="5" fill="#e3a979"/><rect x="63" y="136" width="10" height="38" rx="5" fill="#e3a979"/><ellipse cx="50" cy="176" rx="13" ry="7" fill="#fff" stroke="#8ec9f5" stroke-width="2.5"/><ellipse cx="70" cy="176" rx="13" ry="7" fill="#fff" stroke="#8ec9f5" stroke-width="2.5"/><rect class="ar l" x="25" y="94" width="12" height="42" rx="6" fill="#e3a979"/><rect class="ar r" x="83" y="94" width="12" height="42" rx="6" fill="#e3a979"/><path d="M38 94Q60 86 82 94L94 150Q60 162 26 150Z" fill="#8ec9f5"/><path d="M60 134c-9-7-12-11-12-15 0-4 3-6 6-6 3 0 5 2 6 4 1-2 3-4 6-4 3 0 6 2 6 6 0 4-3 8-12 15z" fill="#ff6fa5"/><circle cx="60" cy="54" r="30" fill="#e3a979"/><path d="M29 50Q31 20 60 20Q89 20 91 50Q80 36 60 36Q40 36 29 50Z" fill="#3a2214"/><circle cx="49" cy="58" r="5" fill="#4a2a14"/><circle cx="71" cy="58" r="5" fill="#4a2a14"/><circle cx="50.5" cy="56.5" r="1.6" fill="#fff"/><circle cx="72.5" cy="56.5" r="1.6" fill="#fff"/><circle cx="42" cy="68" r="4.5" fill="#ff8aa5" opacity=".5"/><circle cx="78" cy="68" r="4.5" fill="#ff8aa5" opacity=".5"/><path d="M51 69Q60 78 69 69" stroke="#8a3b2a" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;

function buildStage(){
    refreshP();
    st.vid=0;
    var A=st.cur.a&&st.cur.a[st.ep-1],m=(st.ep-1)%4,ps="",i,pos=[[8,34],[78,26],[10,58]];
    for(i=0;i<3;i++) ps+='<span class="pr" aria-hidden="true" style="left:'+pos[i][0]+'%;top:'+pos[i][1]+'%;animation-delay:'+(i*.7)+'s">'+st.cur.e+'</span>';
    var ch=YIMG?'<div class="yl m'+m+'" id="yl" role="img" aria-label="Yailen"><img src="'+YIMG+'" alt="" style="width:100%;display:block"><i class="mo"></i></div>':YSVG.replace("MM","m"+m);
    $("stage").innerHTML='<span class="sun" aria-hidden="true">☀️</span><i class="cl" aria-hidden="true" style="top:10%"></i><i class="cl" aria-hidden="true" style="top:26%;animation-delay:-6s;animation-duration:16s"></i><div class="gr"></div><span class="tr" aria-hidden="true">🚂</span>'+ps+(A?'<div class="an" id="an" aria-hidden="true">'+A[1]+'</div>':'')+ch+'<div class="sub" id="sub" aria-live="polite"></div>';
    $("stage").className="stage"+(A?" ha":"");
}

function epsR(){
    var h="";
    for(var i=1;i<=st.cur.n;i++) h+='<button data-ep="'+i+'" aria-pressed="'+(i===st.ep)+'">'+i+'</button>';
    $("eps").innerHTML=h;
}

var LEN=12;
var P={1:["¡Todos al tren! ¡Chu chu!","¡Mira, un animalito!","¡Qué lindo viaje!","¡Seguimos jugando!"],2:["¡A bañarse, chap chap!","Mucho jabón y burbujas.","¡Qué rico el agua!","¡Limpiecita y feliz!"],3:["¡Un pasito de dino!","¡Rooaar! Soy un dinosaurio.","¡Salta, salta conmigo!","¡Qué divertido bailar!"],4:["Por favor y gracias.","Perdón, no fue mi intención.","¡Ser amable es bonito!","¡Gracias por jugar!"],5:["Ya es hora de dormir.","Las nubes son suaves.","Cierra los ojitos.","¡Dulces sueños!"],6:["¿Quién hace muuu?","¡Es la vaca! ¡Muuu!","¿Y el patito? ¡Cuac!","¡Qué linda la granja!"],7:["¿Dónde está el animal?","¡Ayúdame a buscarlo!","¡Lo encontré!","¡Qué bien lo hicimos!"],8:["¡Feliz Navidad!","Ya viene Navidad.","¡Canta conmigo!","¡Con mucho amor!"]};

function vz(){
    try{
        var v=speechSynthesis.getVoices().filter(function(x){return /^es/i.test(x.lang)});
        var f=v.filter(function(x){return /sabina|paulina|helena|laura|monica|dalia|salome|elvira|female|mujer|google/i.test(x.name)});
        return f[0]||v[0]||null;
    }catch(e){return null}
}

function lines(){
    var s=st.cur,A=s.a&&s.a[st.ep-1];
    if(A)return["¡Hola, soy Yailen! Hoy descubrimos este animalito.","Es "+A[0]+". ¡Mira qué lindo!","¡Hace "+A[2]+"! ¡Ahora tú! ¡Chu, chu!"];
    return["¡Hola! Soy Yailen.",P[s.id][(st.ep-1)%4],P[s.id][st.ep%4]];
}

function promptFor(){
    var s=st.cur,A=s.a&&s.a[st.ep-1],L=lines(),n=st.ep;
    if(!A)return"Clip de 10 s, 16:9, animación 3D tipo Pixar. Yailen dice: \"'+L.join(" ")+'\". Cámara: plano medio con leve acercamiento.";
    var pv=n>1?s.a[n-2][0]:"",nx=s.a[n]?s.a[n][0]:"";
    return["EPISODIO "+n+" · "+s.t+" · "+A[0],
    "Estilo: animación 3D tipo Pixar. Yailen está frente al vagón y saluda a cámara. Cuando dice «este animalito», "+A[0]+" asoma en 3D.",
    "Diálogo exacto de Yailen: «"+L[0]+"» «"+L[1]+"» «"+L[2]+"»",
    "Voz: Voiceover of a 4-year-old girl, speaking Latin American Spanish. Very high-pitched, extremely sweet, bright, and innocent timbre."].join("\n\n");
}

function refreshP(){var t=$("pt");if(t&&st.cur)t.value=promptFor()}
function cp(){var t=$("pt");t.select();var ok=function(){toast("Prompt copiado")};try{navigator.clipboard.writeText(t.value).then(ok,function(){document.execCommand("copy");ok()})}catch(e){toast("Prompt seleccionado")}}

function showLine(i){
    var a=lines(),t=a[i]||"",s=$("sub"),y=$("yl");
    if(i===0&&st.cur.a)setTimeout(function(){var q=$("an");if(q)q.classList.add("in")},1800);
    if(s){s.textContent=t;s.classList.add("on")}
    if(y){y.classList.add("talk");setTimeout(function(){y.classList.remove("talk")},3200)}
    try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t),v=vz();u.lang="es-MX";if(v)u.voice=v;u.pitch=1.9;u.rate=.95;speechSynthesis.speak(u)}catch(e){}
}

function stop(){
    clearInterval(st.tick);st.tick=null;
    $("play").textContent="▶ Ver";
    $("prog").style.width="0";
    $("stage").classList.remove("run");
    try{speechSynthesis.cancel()}catch(e){}
    var q=$("sub");if(q)q.classList.remove("on");
    var y=$("yl");if(y)y.classList.remove("talk");
    var an=$("an");if(an)an.classList.remove("in");
}

function play(){
    if(st.tick){stop();return}
    st.secs=0;
    $("play").textContent="⏸ Pausa";
    $("stage").classList.add("run");
    showLine(0);
    st.tick=setInterval(function(){
        st.secs++;
        if(st.secs%4===0&&st.secs<LEN) showLine(st.secs/4);
        $("prog").style.width=(st.secs/LEN*100)+"%";
        if(st.secs>=LEN){
            var k=st.cur.id+"-"+st.ep;
            stop();
            if(!st.done[k]){st.done[k]=1;st.stars++;save();toast("¡Episodio completo! +1 estrella ⭐");renderHome()}else toast("¡Episodio completo!");
        }
    },1000);
}

function openWithdrawModal(){
    alert("Retiro hacia Nequi / Billetera de ingresos abierto. Tasa: 1 USDT = 3200 COP.");
}

document.addEventListener("click",function(e){
    var t=e.target.closest("button");if(!t)return;var d=t.dataset;
    if(d.open) openP(+d.open);
    else if(d.fav) toggleFav(+d.fav);
    else if(d.cat) { st.cat=d.cat; renderHome(); }
    else if(d.t) { switchTab(d.t); }
    else if(d.ep) { st.ep=+d.ep; stop(); epsR(); buildStage(); }
    else if(t.id==="close") { stop(); $("pl").classList.remove("on"); renderHome(); }
    else if(t.id==="play") { play(); }
    else if(t.id==="pBtn") { var pp=$("pp"); pp.style.display=pp.style.display==="none"?"block":"none"; refreshP(); }
    else if(t.id==="pCopy") { cp(); }
    else if(t.id==="plFav") { toggleFav(st.cur.id); }
    else if(d.svc) {
        if(d.svc==="goals") alert("Centro de Retos: Completa episodios para ganar estrellas.");
        else if(d.svc==="done") alert("Episodios completados guardados en tu perfil.");
        else if(d.svc==="share") alert("Enlace de creador copiado al portapapeles.");
        else if(d.svc==="news") alert("¡Novedades de Wanketeros MEQUE KIDS activas!");
        else alert("Servicio de Yailen TV activo.");
    }
});

renderHome();
console.log("Streampulse & Yailen TV Initialized successfully!");
