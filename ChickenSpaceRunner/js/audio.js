/*****************************************************************************
 * AUDIO ENGINE - Web Audio API sound effects (no external files needed)
 *****************************************************************************/

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioContext;

function initAudio() {
  audioContext = new AudioCtx();
}

function playTone(freq, type, duration, volume = 0.3) {
  if (!audioContext) return;
  if (audioContext.state === 'suspended') audioContext.resume();

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioContext.currentTime);
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start();
  osc.stop(audioContext.currentTime + duration);
}

const SFX = {
  jump() {
    playTone(400, 'square', 0.15, 0.2);
    playTone(600, 'square', 0.1, 0.15);
  },

  dash() {
    playTone(200, 'sawtooth', 0.3, 0.25);
    playTone(100, 'square', 0.2, 0.2);
  },

  death() {
    playTone(150, 'sawtooth', 0.5, 0.4);
    playTone(80, 'square', 0.6, 0.3);
  },

  win() {
    playTone(523, 'sine', 0.2, 0.3);
    setTimeout(() => playTone(659, 'sine', 0.2, 0.3), 150);
    setTimeout(() => playTone(784, 'sine', 0.4, 0.4), 300);
  },

  powerup() {
    playTone(800, 'sine', 0.15, 0.25);
    playTone(1000, 'sine', 0.2, 0.2);
  },

  collapse() {
    playTone(60, 'sawtooth', 0.4, 0.35);
  }
};