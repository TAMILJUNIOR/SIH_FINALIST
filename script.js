// script.js

// simple navigation for index buttons
document.addEventListener('DOMContentLoaded', ()=>{
  const yes = document.getElementById('yesBtn');
  const no = document.getElementById('noBtn');

  if(yes) yes.addEventListener('click', ()=> {
    // record user gesture intent so letter page can try autoplay (helps some browsers)
    try { sessionStorage.setItem('playRequested', '1'); } catch(e){}

    // try to give a user gesture so audio can autoplay later (best-effort)
    try { document.getElementById('bg-music')?.play(); } catch(e){}
    console.log("YES BUTTON CLICKED");

    // navigate to letter
    window.location.href = 'letter.html';
  });
  if(no) no.addEventListener('click', ()=> window.location.href = 'denied.html');

  // clicking anywhere on page spawns small hearts (also helps audio autoplay permission in some browsers)
  document.body.addEventListener('click', ()=>{
    spawnHearts(6);
    try { 
      const bg = document.getElementById('bg-music');
      if (bg) {
        // if currently muted (autoplay fallback), try to unmute on user click
        if (bg.muted) {
          bg.muted = false;
          bg.volume = 0.08;
          bg.play().catch(()=>{});
        } else {
          // normal attempt to play if paused
          bg.play().catch(()=>{});
        }
      }
    } catch(e){}
  }, { once: false });
});

function typeWriter(text, node, speed=18, cb){
  node.innerHTML = '';
  let i = 0;

  function step(){
    if(i >= text.length){
      if(cb) cb();
      return;
    }

    node.innerHTML += text[i];
    
    // ❤️ THIS IS WHAT MAKES AUTO-SCROLL WORK
    node.scrollTop = node.scrollHeight;

    i++;

    // natural pause on punctuation
    let delay = speed;
    if(/[.,!?]/.test(text[i])) delay += 90;

    setTimeout(step, delay);
  }

  step();
}

// Unmute audio on first user click (required by browser policy)
document.addEventListener("click", function unmuteOnce() {
    const bg = document.getElementById("bg-music");
    if (bg) {
        bg.muted = false;
        bg.volume = 0.08;
        bg.play().catch(()=>{});
    }
    document.removeEventListener("click", unmuteOnce);
});
