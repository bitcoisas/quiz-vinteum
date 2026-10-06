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

  // Dificuldades: "need" = acertos necessários para ganhar o brinde
  levels: {
    easy: {
      label: "Fácil",
      tagline: "Curiosidades e o básico do Bitcoin",
      need: 1,
      prize: "Caneta ou chaveiro",
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
