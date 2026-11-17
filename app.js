
function switchTab(tabId) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    
    const targetView = document.getElementById('view-' + tabId);
    if (targetView) targetView.classList.add('active');
    
    // Find matching tab button
    event && event.currentTarget && event.currentTarget.classList.add('active');
}

console.log("StreamPulse with Yailen AI Loaded Successfully!");
