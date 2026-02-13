(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  const ui = {
    confetti: $("#confetti"),
    btnArea: $("#btnArea"),
    noMsg: $("#noMsg"),
    yes: $("#btnYes"),
    no: $("#btnNo"),
    back: $("#btnBack"),
    envelope: $("#envelope"),
    views: [...document.querySelectorAll(".view")],
  };

  const state = {
    dodgeCount: 0,
    noX: 0,
    noY: 0,
  };

  function setView(name){
    ui.views.forEach(v => v.classList.toggle("active", v.dataset.view === name));
  }

  function clamp(n, min, max){
    return Math.max(min, Math.min(max, n));
  }

  function rand(min, max){
    return Math.random() * (max - min) + min;
  }

  function pick(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function spawnHearts(count = 22){
    ui.confetti.innerHTML = "";
    const hearts = ["💗","💖","💘","💝","💕","❤️"];

    for (let i = 0; i < count; i++){
      const el = document.createElement("i");
      el.textContent = hearts[i % hearts.length];

      el.style.left = rand(0, 100) + "vw";
      el.style.fontSize = rand(16, 34) + "px";
      el.style.animationDuration = rand(2.3, 3.7) + "s";
      el.style.setProperty("--dx", rand(-20, 20) + "vw");
      el.style.setProperty("--rot", rand(-360, 360) + "deg");

      ui.confetti.appendChild(el);
    }

    window.clearTimeout(spawnHearts._t);
    spawnHearts._t = window.setTimeout(() => (ui.confetti.innerHTML = ""), 4200);
  }

  function resetNoButton(){
    state.dodgeCount = 0;
    state.noX = 0;
    state.noY = 0;
    ui.no.style.transform = "translate(0px, 0px)";
  }

  function dodgeNoButton(){
    state.dodgeCount += 1;

    const area = ui.btnArea.getBoundingClientRect();
    const btn = ui.no.getBoundingClientRect();

    // Movement bounds (keeps it near the buttons, not across the screen)
    const minX = -area.width * 0.10;
    const maxX =  area.width * 0.55;
    const minY = -area.height * 0.25;
    const maxY =  area.height * 0.35;

    // Jump grows with attempts, capped
    const jump = clamp(45 + state.dodgeCount * 10, 45, 170);

    state.noX = clamp(state.noX + rand(-jump, jump), minX, maxX);
    state.noY = clamp(state.noY + rand(-jump * 0.55, jump * 0.55), minY, maxY);

    ui.no.style.transition = "transform .14s cubic-bezier(.2, 1.25, .25, 1)";
    ui.no.style.transform = `translate(${state.noX}px, ${state.noY}px)`;

    ui.noMsg.textContent = pick(["No? 😳", "Try again 😌", "Not so fast 😭", "Ayo?? 🤨"]);
  }

  function toggleEnvelope(){
    ui.envelope.classList.toggle("open");
    const isOpen = ui.envelope.classList.contains("open");
    ui.envelope.setAttribute("aria-pressed", String(isOpen));
    if (isOpen) spawnHearts(18);
  }

  // Events
  ui.yes.addEventListener("click", () => {
    ui.noMsg.textContent = "";
    setView("letter");
    spawnHearts(28);
    ui.envelope.focus();
    resetNoButton();
  });

  ui.back.addEventListener("click", () => {
    ui.envelope.classList.remove("open");
    ui.envelope.setAttribute("aria-pressed", "false");
    setView("question");
  });

  ui.no.addEventListener("mouseenter", dodgeNoButton);
  ui.no.addEventListener("pointerdown", (e) => { e.preventDefault(); dodgeNoButton(); });
  ui.no.addEventListener("click", () => { ui.noMsg.textContent = "Okay okay… you got it 😭"; });

  ui.envelope.addEventListener("click", toggleEnvelope);
  ui.envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      toggleEnvelope();
    }
  });
})();
