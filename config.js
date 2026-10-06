// ============================================================
//  Configuração do quiz — edite aqui (não precisa mexer no resto)
// ============================================================
window.QUIZ_CONFIG = {
  // Quantas perguntas por rodada (1 = acertou, ganhou)
  questionsPerRound: 1,

  // Volta para a tela inicial após X segundos sem toque (útil no stand)
  idleSeconds: 60,

  // Nome do evento exibido no topo
  eventName: "SECOMP · UFSCar",

  // Brinde de quem participa e segue a Vinteum (também é a opção de quem erra)
  participationPrize: "Caneta",

  // Redes da Vinteum (links usados nos QR codes e nos ícones)
  social: [
    { key: "instagram", label: "Instagram", handle: "@vinteum_org", url: "https://instagram.com/vinteum_org" },
    { key: "x", label: "X", handle: "@vinteum_org", url: "https://x.com/vinteum_org" },
    { key: "linkedin", label: "LinkedIn", handle: "Vinteum", url: "https://www.linkedin.com/company/vinteum-org/" },
  ],
  links: {
    discord: "https://discord.gg/vinteum",
    site: "https://vinteum.org",
  },

  // Dificuldades: "need" = acertos necessários para ganhar o brinde
  levels: {
    easy: {
      label: "Fácil",
      tagline: "Curiosidades e o básico do Bitcoin",
      need: 1,
      prize: "Chaveiro",
    },
    medium: {
      label: "Médio",
      tagline: "Como a rede funciona por dentro",
      need: 1,
      prize: "Caderneta",
    },
    hard: {
      label: "Difícil",
      tagline: "Criptografia, matemática e protocolo",
      need: 1,
      prize: "Livro",
    },
  },
};
