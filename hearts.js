// hearts.js
// call spawnHearts(n) to float n hearts up the screen
function rand(min, max){ return Math.random()*(max-min)+min; }

function spawnHearts(n=6){
  const container = document.body;
  for(let i=0;i<n;i++){
    const heart = document.createElement('div');
    heart.className = 'heart';
    const picks = ['❤️','💖','💕','🌹','✨','💫','💌'];
    heart.innerText = picks[Math.floor(Math.random()*picks.length)];

    // random start position near center-ish
    heart.style.left = (50 + rand(-30,30)) + '%';
    heart.style.top = (60 + rand(-10,20)) + '%';

    // random size
    const size = rand(18,36);
    heart.style.fontSize = size + 'px';

    // random opacity
    heart.style.opacity = rand(0.85,1);

    container.appendChild(heart);

    // animate using transform + opacity with random timing
    const translateY = rand(-380, -720);
    const translateX = rand(-80, 80);
    const rot = rand(-40,40);
    const duration = rand(4200, 9000);

    heart.animate([
      { transform: `translate(0px,0px) rotate(0deg) scale(1)`, opacity: 1 },
      { transform: `translate(${translateX}px, ${translateY}px) rotate(${rot}deg) scale(0.9)`, opacity: 0.02 }
    ], {
      duration: duration,
      easing: 'cubic-bezier(.18,.8,.4,1)',
      iterations: 1,
      fill: 'forwards'
    });

    // remove after animation
    setTimeout(()=> {
      if(heart && heart.parentNode) heart.parentNode.removeChild(heart);
    }, duration + 80);
  }
}

// gentle automatic spawn to keep mood
let autoSpawnStarted = false;
function startAutoSpawn(){
  if(autoSpawnStarted) return;
  autoSpawnStarted = true;
  setInterval(()=> spawnHearts(1), 1400);
}

// start small auto spawn after load
document.addEventListener('DOMContentLoaded', ()=> {
  startAutoSpawn();
});
