// ===== VIBRATION SETUP =====
let vibrationEnabled = localStorage.getItem("vibration") !== "off";
const vibeBtn = document.getElementById("vibeToggle");

function updateVibeIcon() {
  document.body.classList.toggle("vibe-off", !vibrationEnabled);
  document.body.classList.toggle("vibe-on", vibrationEnabled);
}

vibeBtn.addEventListener("click", () => {
  vibrationEnabled = !vibrationEnabled;
  localStorage.setItem("vibration", vibrationEnabled ? "on" : "off");
  updateVibeIcon();
});

updateVibeIcon();

// ===== SOUNDS SETUP =====
const tapSound = new Audio("tap.mp3");
const actionSound = new Audio("action.mp3");
const equalSound = new Audio("equal.mp3");

tapSound.preload = "auto";
actionSound.preload = "auto";
equalSound.preload = "auto";

// ===== STATE =====
let soundEnabled = localStorage.getItem("sound") !== "off";

// ===== MUTE BUTTON =====
const muteBtn = document.getElementById("muteToggle");
function updateMuteIcon() {
  muteBtn.textContent = soundEnabled ? "🔊" : "🔇";
  document.body.classList.toggle("muted", !soundEnabled);
}
muteBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  localStorage.setItem("sound", soundEnabled ? "on" : "off");
  updateMuteIcon();
});
updateMuteIcon();

// ===== DARK MODE BUTTON =====
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// ===== CALCULATOR FUNCTIONALITY + RIPPLE + SOUND =====
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");

  buttons.forEach(btn => btn.classList.add("button-ripple"));

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // IGNORE CONTROL BUTTONS (mute, vibration, dark mode)
if (["muteToggle", "vibeToggle", "themeToggle"].includes(button.id)) return;
      
      // ===== VIBRATION =====
if (vibrationEnabled && navigator.vibrate) {
    navigator.vibrate(50); // vibrate 50ms
}

      // ===== RIPPLE EFFECT =====
      button.classList.remove("ripple-active");
      void button.offsetWidth;
      button.classList.add("ripple-active");

      // ===== SOUND =====
      if (soundEnabled) {
        const value = button.textContent;
        if (!isNaN(value) || value === ".") {
          tapSound.currentTime = 0;
          tapSound.play();
        } else if (["+", "-", "×", "÷"].includes(value)) {
          actionSound.currentTime = 0;
          actionSound.play();
        } else if (value === "=") {
          equalSound.currentTime = 0;
          equalSound.play();
        }
      }

      // ===== CALCULATOR LOGIC =====
      const value = button.textContent;
      if (value === "C") {
        display.value = "";
      } else if (value === "=") {
        try {
          display.value = eval(display.value.replace("×","*").replace("÷","/"));
        } catch {
          display.value = "Error";
        }
      } else if (value !== "🌙" && value !== "☀️" && value !== "🔊" && value !== "🔇") {
        display.value += value;
      }

    });
  });
});