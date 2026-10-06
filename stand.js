(() => {
  const CFG = window.QUIZ_CONFIG;
  const $ = (s) => document.querySelector(s);

  // O QR do quiz aponta para a pasta onde este site está publicado (a mesma de index.html)
  const quizUrl = new URL("./", location.href).href;

  const items = [
    { id: "quiz", url: quizUrl, label: quizUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") },
    { id: "discord", url: CFG.links.discord, label: CFG.links.discord.replace(/^https?:\/\//, "") },
    { id: "site", url: CFG.links.site, label: CFG.links.site.replace(/^https?:\/\//, "") },
  ];
  for (const it of items) {
    $("#qr-" + it.id).innerHTML = VQ.qrSvg(it.url);
    $("#url-" + it.id).textContent = it.label;
  }
  $("#event-name").textContent = CFG.eventName;

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
})();
