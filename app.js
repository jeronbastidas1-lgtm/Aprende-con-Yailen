
console.log("StreamPulse App Initialized successfully!");
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});
