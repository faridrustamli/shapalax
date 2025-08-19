const shapalaxBtn = document.getElementById("shapalaxBtn");
const resetBtn = document.getElementById("resetBtn");
const counterEl = document.getElementById("counter");
const emojiContainer = document.getElementById("emojiContainer");
const sound = document.getElementById("shapalaxSound");

let counter = 0;

// Şapalax butonu
shapalaxBtn.addEventListener("click", () => {
  counter++;
  counterEl.textContent = counter;

  // Ses çal
  sound.currentTime = 0;
  sound.play();

  // Emoji animasyonu
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.textContent = "👏";
  emoji.style.left = Math.random() * 80 + "%";
  emojiContainer.appendChild(emoji);

  setTimeout(() => emoji.remove(), 2000);
});

// Reset butonu
resetBtn.addEventListener("click", () => {
  counter = 0;
  counterEl.textContent = counter;
});
