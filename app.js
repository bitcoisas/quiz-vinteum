(() => {
  const CFG = window.QUIZ_CONFIG;
  const BANK = window.QUIZ_QUESTIONS;
  const $ = (s) => document.querySelector(s);

  const LEVEL_COLORS = { easy: "#3cae66", medium: "#f2ae0a", hard: "#00b3a4" };
  const LEVEL_DOTS = { easy: 1, medium: 2, hard: 3 };

  const screens = {
    start: $("#screen-start"),
    level: $("#screen-level"),
    quiz: $("#screen-quiz"),
    result: $("#screen-result"),
  };

  const seen = { easy: new Set(), medium: new Set(), hard: new Set() };
  let state = null;
  let idleTimer = null;
  let clockTimer = null;
  let current = "start";

  // ---------- utilidades ----------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function show(name) {
    current = name;
    for (const [key, el] of Object.entries(screens)) el.hidden = key !== name;
    window.scrollTo(0, 0);
    resetIdle();
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    if (current === "start") return;
    idleTimer = setTimeout(goHome, CFG.idleSeconds * 1000);
  }

  function goHome() {
    stopClock();
    state = null;
    show("start");
  }

  function makeCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const buf = new Uint8Array(4);
    (window.crypto || window.msCrypto).getRandomValues(buf);
    return "VQ-" + Array.from(buf, (b) => alphabet[b % alphabet.length]).join("");
  }

  // ---------- dificuldade ----------
  function ruleText(lv) {
    const n = CFG.questionsPerRound;
    if (n === 1) return `Acerte <b>1 pergunta</b> e ganhe: <b>${lv.prize}</b>`;
    return `Acerte <b>${lv.need} de ${n}</b> e ganhe: <b>${lv.prize}</b>`;
  }

  function renderLevels() {
    const wrap = $("#levels");
    wrap.innerHTML = "";
    for (const [key, lv] of Object.entries(CFG.levels)) {
      const btn = document.createElement("button");
      btn.className = "level";
      btn.style.setProperty("--c", LEVEL_COLORS[key]);
      btn.dataset.level = key;
      const dots = Array.from({ length: 3 }, (_, i) => `<i class="${i < LEVEL_DOTS[key] ? "on" : ""}"></i>`).join("");
      btn.innerHTML = `
        <div class="level-row"><span class="level-name">${lv.label}</span><span class="dots" aria-hidden="true">${dots}</span></div>
        <p class="level-tag">${lv.tagline}</p>
        <p class="level-rule">${ruleText(lv)}</p>`;
      btn.addEventListener("click", () => startRound(key));
      wrap.appendChild(btn);
    }
  }

  // ---------- rodada ----------
  function pickQuestions(level) {
    const pool = BANK[level];
    const n = CFG.questionsPerRound;
    let fresh = pool.map((_, i) => i).filter((i) => !seen[level].has(i));
    if (fresh.length < n) {
      seen[level].clear();
      fresh = pool.map((_, i) => i);
    }
    const chosen = shuffle(fresh).slice(0, n);
    chosen.forEach((i) => seen[level].add(i));
    return chosen.map((i) => {
      const q = pool[i];
      return { q: q.q, ok: q.ok, why: q.why, options: shuffle([q.ok, ...q.bad]) };
    });
  }

  function startRound(level) {
    state = { level, qs: pickQuestions(level), i: 0, score: 0, results: [], locked: false };
    show("quiz");
    renderQuestion();
  }

  function renderProgress() {
    const bar = $("#q-progress");
    bar.innerHTML = "";
    state.qs.forEach((_, idx) => {
      const s = document.createElement("span");
      if (idx < state.results.length) s.className = state.results[idx] ? "done-ok" : "done-bad";
      else if (idx === state.i) s.className = "now";
      bar.appendChild(s);
    });
  }

  function renderQuestion() {
    const q = state.qs[state.i];
    const lv = CFG.levels[state.level];
    state.locked = false;

    const pill = $("#q-level");
    pill.textContent = lv.label;
    pill.style.setProperty("--c", LEVEL_COLORS[state.level]);
    $("#q-count").textContent = state.qs.length > 1 ? `Pergunta ${state.i + 1} de ${state.qs.length}` : "Sua pergunta";
    renderProgress();

    const title = $("#q-text");
    title.textContent = q.q;

    const wrap = $("#q-options");
    wrap.innerHTML = "";
    q.options.forEach((opt, idx) => {
      const b = document.createElement("button");
      b.className = "option";
      b.innerHTML = `<span class="letter">${"ABCD"[idx]}</span><span class="txt"></span>`;
      b.querySelector(".txt").textContent = opt;
      b.addEventListener("click", () => answer(b, opt));
      wrap.appendChild(b);
    });

    $("#q-feedback").hidden = true;
    title.focus({ preventScroll: true });
  }

  function answer(btn, chosen) {
    if (!state || state.locked) return;
    state.locked = true;
    resetIdle();

    const q = state.qs[state.i];
    const right = chosen === q.ok;
    state.results.push(right);
    if (right) state.score++;

    document.querySelectorAll("#q-options .option").forEach((el) => {
      el.disabled = true;
      const txt = el.querySelector(".txt").textContent;
      if (txt === q.ok) el.classList.add("correct");
      else if (el === btn) el.classList.add("wrong");
      else el.classList.add("dim");
    });

    renderProgress();
    const verdict = $("#q-verdict");
    verdict.textContent = right ? "Isso mesmo!" : "Não foi dessa vez";
    verdict.className = "verdict " + (right ? "ok" : "no");
    $("#q-why").textContent = (right ? "" : `Resposta certa: ${q.ok}. `) + q.why;

    const last = state.i === state.qs.length - 1;
    $("#btn-next").textContent = last ? (right && state.qs.length === 1 ? "Pegar meu brinde" : "Ver resultado") : "Próxima";
    const fb = $("#q-feedback");
    fb.hidden = false;
    fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function next() {
    if (!state) return;
    if (state.i >= state.qs.length - 1) return finish();
    state.i++;
    renderQuestion();
    window.scrollTo(0, 0);
  }

  // ---------- resultado ----------
  function fmtNow() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }
  function stopClock() { clearInterval(clockTimer); clockTimer = null; }

  function finish() {
    const lv = CFG.levels[state.level];
    const total = state.qs.length;
    const win = state.score >= lv.need;

    show("result");
    $("#r-score").textContent = total === 1 ? (win ? "✓" : "✗") : `${state.score}/${total}`;
    $("#r-ring").className = "ring" + (win ? "" : " lose");
    $("#r-ring").style.setProperty("--c", win ? LEVEL_COLORS[state.level] : "#f2ae0a");

    const voucher = $("#r-voucher");
    stopClock();

    if (win) {
      $("#r-title").textContent = total === 1 ? "Acertou! 🎉" : state.score === total ? "Perfeito! 🎉" : "Mandou bem! 🎉";
      $("#r-sub").textContent = total === 1 ? `Você mandou bem no nível ${lv.label}.` : `Você acertou ${state.score} de ${total} no nível ${lv.label}.`;
      $("#r-prize").textContent = lv.prize;
      $("#r-code").textContent = makeCode();
      $("#r-time").textContent = fmtNow();
      clockTimer = setInterval(() => ($("#r-time").textContent = fmtNow()), 1000);
      voucher.hidden = false;
      confetti();
    } else {
      $("#r-title").textContent = total === 1 ? "Não foi dessa vez" : "Quase lá!";
      $("#r-sub").textContent = total === 1 ? "Mas quem sabe na próxima! Fale com a equipe no stand para tentar de novo." : `Você acertou ${state.score} de ${total}. Eram necessários ${lv.need} para ganhar o brinde.`;
      voucher.hidden = true;
    }
  }

  // ---------- confete ----------
  function confetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = $("#confetti");
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = (cv.width = innerWidth * dpr);
    const H = (cv.height = innerHeight * dpr);
    const colors = ["#3cae66", "#009086", "#f2ae0a", "#8aae40", "#ffffff"];
    const parts = Array.from({ length: 140 }, () => ({
      x: Math.random() * W,
      y: -Math.random() * H * 0.4,
      w: (6 + Math.random() * 6) * dpr,
      h: (8 + Math.random() * 8) * dpr,
      vx: (Math.random() - 0.5) * 3 * dpr,
      vy: (2 + Math.random() * 4) * dpr,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      c: colors[(Math.random() * colors.length) | 0],
    }));
    const start = performance.now();
    (function frame(t) {
      const el = t - start;
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = Math.max(0, 1 - el / 3200);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (el < 3200) requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, W, H);
    })(start);
  }

  // ---------- eventos ----------
  $("#event-name").textContent = CFG.eventName;
  renderLevels();
  $("#btn-play").addEventListener("click", () => show("level"));
  $("#btn-back-start").addEventListener("click", () => show("start"));
  $("#btn-next").addEventListener("click", next);
  $("#btn-home").addEventListener("click", goHome);
  ["pointerdown", "keydown", "touchstart"].forEach((ev) => document.addEventListener(ev, resetIdle, { passive: true }));

  // PWA / uso offline (wifi de evento costuma falhar)
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
})();
