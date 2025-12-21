document.addEventListener("DOMContentLoaded", () => {

/* 🎶 Music */
const music = document.getElementById("bgMusic");

function startMusic() {
  if (!music) return;

  const t = sessionStorage.getItem("musicTime");
  const v = sessionStorage.getItem("musicVolume");

  if (t) music.currentTime = parseFloat(t);
  music.volume = v ? parseFloat(v) : 0.3;

  music.play().catch(() => {});
}

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

setInterval(() => {
  if (music && !music.paused) {
    sessionStorage.setItem("musicTime", music.currentTime);
    sessionStorage.setItem("musicVolume", music.volume);
  }
}, 400);

/* 💌 Letter */
const text = `
I don’t really know how to explain this properly,
so I decided to just be honest instead.

Somewhere between small conversations,
random smiles,
and quiet moments,
you became someone I care about more than I expected.

This whole thing —
the pages, the little details,
even the silly animations —
they’re all here for one reason.

You.

I wanted you to feel special.
I wanted you to feel chosen.
And I wanted you to know that
there’s someone who genuinely thinks about you.

So here I am,
with a soft heart and a simple question,
hoping you feel even half of what I feel right now.

I’d really love to choose you 💕
`;

const textEl = document.getElementById("text");
const cursor = document.getElementById("cursor");
const buttons = document.getElementById("buttons");

let i = 0;
const TYPE_SPEED = 40;

if (textEl) {
  const typing = setInterval(() => {
    textEl.textContent += text.charAt(i++);
    if (i >= text.length) {
      clearInterval(typing);
      if (cursor) cursor.remove();

      textEl.innerHTML = textEl.innerHTML.replace(
        "I’d really love to choose you 💕",
        `<span class="last-glow">I’d really love to choose you 💕</span>`
      );

      if (buttons) {
        buttons.style.opacity = 1;
        buttons.style.transform = "translateY(0)";
      }
    }
  }, TYPE_SPEED);
}

/* 💖 YES */
window.yes = function () {
  for (let i = 0; i < 30; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = "💕";
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "0";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }

  fadeMusic(0, 1200);

  setTimeout(() => {
    window.location.href =
      "https://wa.me/919746104873?text=" +
      encodeURIComponent(
        "I loved your surprise… but I think I deserve a gift now 👀🎁💖"
      );
  }, 1300);
};

/* 🙈 NO */
let n = 0;
const noTexts = [
  "Are you sure? 🥺",
  "Read again 😌",
  "That button is shy 🙈",
  "I’ll wait 💕"
];

window.no = function () {
  alert(noTexts[n++ % noTexts.length]);
};

/* 🎶 Fade music */
function fadeMusic(target, duration) {
  if (!music) return;

  const start = music.volume;
  let step = 0;
  const total = 30;

  const fade = setInterval(() => {
    step++;
    music.volume = start + (target - start) * (step / total);
    sessionStorage.setItem("musicVolume", music.volume);
    if (step >= total) clearInterval(fade);
  }, duration / total);
}

});
