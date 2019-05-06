const centerEl = document.querySelector('.center');
const spriteEl = document.querySelector('.sprite');
let width, height, frame = 0;

resize();
window.addEventListener('resize', resize);

setInterval(() => {
  frame = Math.floor((Math.random()*19)+1);
  spriteEl.style.backgroundPositionY = `-${height*frame}px`;
  playSound();
}, 1000);

function resize(){
  width = centerEl.clientWidth;
  height = width * 0.5625;
  spriteEl.style.height = `${height}px`;
  spriteEl.style.width = `${width}px`;
  spriteEl.style.backgroundPositionY = `-${height*frame}px`;
}

const playSound = throttle(() => {
  const sound = new Audio('assets/stomp.mp3');
  sound.play();
}, 20, true);

// ===== Helpers

function map (value, start1, stop1, start2, stop2) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

function throttle(fn, interval, callFirst) {
  let wait = false;
  let callNow = false;
  return () => {
    callNow = callFirst && !wait;
    let context = this;
    let args = arguments;
    if (!wait) {
      wait = true;
      setTimeout(() => {
        wait = false;
        if (!callFirst) {
          return fn.apply(context, args);
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return fn.apply(this, arguments);
    }
  };
}
