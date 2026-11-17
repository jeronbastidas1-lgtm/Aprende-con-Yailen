
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

console.log("Streampulse Repository Updated Successfully!");
