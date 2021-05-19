let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
/* Dar refresh à página sempre que damos resize */
window.onresize = function(){ location.reload(); } 