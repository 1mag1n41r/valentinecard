(() => {
  const yes = document.getElementById("btnYes");
  const no  = document.getElementById("btnNo");
  const area = document.getElementById("btnArea");
  const msg = document.getElementById("noMsg");

  if (!yes || !no || !area || !msg) return;

  const state = { tries: 0, x: 0, y: 0 };

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const rand  = (min, max) => Math.random() * (max - min) + min;
  const dodgeLines = ["不要? 😳", "再一次 😌", "🤪", "🤨", "不要嗎? 👀"];

  function getBounds() {
    const areaRect = area.getBoundingClientRect();
    const noRect = no.getBoundingClientRect();

    const maxX = Math.max(0, (areaRect.width - noRect.width) * 0.5);
    const maxY = Math.max(0, Math.min(80, areaRect.height * 0.6));

    return {
      minX: -maxX,
      maxX,
      minY: -maxY,
      maxY
    };
  }

  function dodge(){
    state.tries += 1;

    const { minX, maxX, minY, maxY } = getBounds();

    const jump = clamp(28 + state.tries * 8, 28, 90);
    const dx = rand(-jump, jump);
    const dy = rand(-jump * 0.7, jump * 0.7);

    state.x = clamp(state.x + dx, minX, maxX);
    state.y = clamp(state.y + dy, minY, maxY);

    no.style.transition = "transform .14s cubic-bezier(.2, 1.25, .25, 1)";
    no.style.transform = `translate(${state.x}px, ${state.y}px)`;

    msg.textContent = dodgeLines[Math.floor(Math.random() * dodgeLines.length)];
  }

  no.addEventListener("mouseenter", dodge);
  no.addEventListener("pointerdown", (e) => { e.preventDefault(); dodge(); });

  window.addEventListener("resize", () => {
    const { minX, maxX, minY, maxY } = getBounds();
    state.x = clamp(state.x, minX, maxX);
    state.y = clamp(state.y, minY, maxY);
    no.style.transform = `translate(${state.x}px, ${state.y}px)`;
  });

  yes.addEventListener("click", () => {
    window.location.href = "letter.html";
  });
})();
