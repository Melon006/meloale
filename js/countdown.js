const unlock = new Date("2025-12-23T00:00:00").getTime();
const msg = document.getElementById("msg");
const cd = document.getElementById("countdown");

const text = "Something small, sweet, and made just for you 💕";
let i = 0;

setInterval(() => {
  if (i < text.length) msg.innerHTML += text[i++];
}, 40);

setInterval(() => {
  const diff = unlock - Date.now();
  if (diff <= 0) location.href = "m.html";
  cd.innerText = Math.floor(diff / 86400000) + " days to go ⏳";
}, 1000);

