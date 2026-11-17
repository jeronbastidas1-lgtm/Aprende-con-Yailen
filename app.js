// Lista de videos de prueba estables y directos (con CORS habilitado)
const demoVideos = {
    1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    5: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    6: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    7: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    8: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
};

function switchTab(tabId) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    
    const targetView = document.getElementById('view-' + tabId);
    if (targetView) targetView.classList.add('active');
    
    event && event.currentTarget && event.currentTarget.classList.add('active');
}

function openWithdrawModal() {
    alert("Retiro hacia Nequi / Billetera de ingresos abierto. Tasa: 1 USDT = 3200 COP.");
}

function openPlayerModal() {
    const modal = document.getElementById('playerModal');
    modal.classList.add('active');
    
    const vid = document.getElementById('sampleVideo');
    vid.src = demoVideos[1]; // Cargar episodio 1 por defecto
    vid.load();
    vid.play().catch(e => console.log("Reproducción automática bloqueada por el navegador:", e));
}

function closePlayerModal() {
    const modal = document.getElementById('playerModal');
    modal.classList.remove('active');
    
    const vid = document.getElementById('sampleVideo');
    vid.pause();
    vid.src = "";
}

function selectEp(num) {
    document.querySelectorAll('.ep-chip').forEach(c => c.classList.remove('active'));
    event && event.currentTarget && event.currentTarget.classList.add('active');
    
    const titleSpan = document.getElementById('playerTitle');
    titleSpan.textContent = "Episodio 0" + num + " - Yailen Studio";
    
    const vid = document.getElementById('sampleVideo');
    vid.src = demoVideos[num] || demoVideos[1];
    vid.load();
    vid.play().catch(e => console.log("Reproducción automática bloqueada:", e));
}

console.log("Streampulse Stable Video Player Loaded Successfully!");
