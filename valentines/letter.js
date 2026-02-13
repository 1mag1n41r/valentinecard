(() => {
  const envelope = document.getElementById("envelope");
  const confetti = document.getElementById("confetti");
  const page = document.body;
  const rand = (min, max) => Math.random() * (max - min) + min;

  if (!envelope || !confetti || !page) return;

  function applyFlowerSources() {
    const flowers = Array.from(document.querySelectorAll(".flower"));
    if (!flowers.length) return;
    flowers.forEach((el) => {
      const src = el.dataset.src || "Subject 3.png";
      el.style.backgroundImage = `url("${src}")`;
    });
  }

  function spawnHearts(count = 18){
    if (!confetti) return;
    confetti.innerHTML = "";

    const hearts = ["💗","💖","💘","💝","💕","❤️"];
    for (let i = 0; i < count; i++){
      const el = document.createElement("i");
      el.textContent = hearts[i % hearts.length];
      el.style.left = rand(0, 100) + "vw";
      el.style.fontSize = rand(16, 34) + "px";
      el.style.animationDuration = rand(2.2, 3.6) + "s";
      el.style.setProperty("--dx", rand(-20, 20) + "vw");
      el.style.setProperty("--rot", rand(-360, 360) + "deg");
      confetti.appendChild(el);
    }

    window.clearTimeout(spawnHearts._t);
    spawnHearts._t = window.setTimeout(() => (confetti.innerHTML = ""), 3600);
  }

  function openLetter(){
    if (page.classList.contains("letter-open")) return;

    envelope.classList.add("open");
    envelope.setAttribute("aria-pressed", "true");
    page.classList.add("opening");
    spawnHearts(22);

    window.setTimeout(() => {
      page.classList.add("letter-open");
      page.classList.remove("opening");
      envelope.setAttribute("aria-label", "Letter opened");
    }, 700);
  }

  envelope.addEventListener("click", openLetter);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openLetter();
    }
  });

  // small entry burst
  spawnHearts(12);
  applyFlowerSources();
})();
