// ============================================================
//  Banco de perguntas.
//  ok  = resposta correta (as opções são embaralhadas na tela)
//  bad = 3 respostas erradas
//  why = explicação curta mostrada depois de responder
// ============================================================
window.QUIZ_QUESTIONS = {
  easy: [
    {
      q: "Quem criou o Bitcoin?",
      ok: "Satoshi Nakamoto (pseudônimo)",
      bad: ["Elon Musk", "Vitalik Buterin", "Steve Jobs"],
      why: "Satoshi Nakamoto publicou o white paper em 2008 e, até hoje, ninguém sabe quem é (ou quem são) de verdade.",
    },
    {
      q: "Qual é o número máximo de bitcoins que vão existir?",
      ok: "21 milhões",
      bad: ["100 milhões", "1 bilhão", "Ilimitado"],
      why: "O limite de 21 milhões está no código e é verificado por todos os nós da rede.",
    },
    {
      q: "Como se chama a menor unidade do Bitcoin?",
      ok: "Satoshi (sat)",
      bad: ["Centavo", "Bitinho", "Wei"],
      why: "1 bitcoin = 100 milhões de satoshis. Wei é uma unidade de outra rede.",
    },
    {
      q: "Em que ano o Bitcoin começou a funcionar (bloco gênesis)?",
      ok: "2009",
      bad: ["1999", "2012", "2015"],
      why: "O bloco gênesis foi minerado em 3 de janeiro de 2009.",
    },
    {
      q: "No famoso “Bitcoin Pizza Day”, quanto foi pago por duas pizzas?",
      ok: "10.000 bitcoins",
      bad: ["1 bitcoin", "100 bitcoins", "1 milhão de bitcoins"],
      why: "Em 22 de maio de 2010, Laszlo Hanyecz pagou 10.000 BTC por duas pizzas — uma das primeiras compras com Bitcoin.",
    },
    {
      q: "O que uma carteira de Bitcoin realmente guarda?",
      ok: "As chaves que dão acesso aos fundos",
      bad: ["Moedas digitais dentro do app", "Seus dados do banco", "Uma cópia de todos os usuários"],
      why: "Os bitcoins ficam registrados na blockchain; a carteira guarda as chaves que permitem movimentá-los.",
    },
    {
      q: "Cada quanto tempo, em média, um novo bloco é minerado?",
      ok: "A cada 10 minutos",
      bad: ["A cada 1 segundo", "A cada 1 hora", "A cada 24 horas"],
      why: "O ajuste de dificuldade mantém a média em torno de 10 minutos.",
    },
    {
      q: "O que significa “not your keys, not your coins”?",
      ok: "Quem não controla as chaves privadas não controla de fato as moedas",
      bad: [
        "Só quem minera é dono das moedas",
        "As moedas pertencem à corretora que você usa",
        "Chaves físicas são obrigatórias para comprar",
      ],
      why: "Se uma empresa guarda suas chaves, você depende dela para mexer nos seus bitcoins.",
    },
    {
      q: "O que acontece em um halving?",
      ok: "A recompensa por bloco minerado cai pela metade",
      bad: ["O preço do Bitcoin dobra", "A rede fica offline por um dia", "Metade das moedas é destruída"],
      why: "Acontece a cada 210.000 blocos (cerca de 4 anos) e torna a emissão de novos bitcoins previsível.",
    },
    {
      q: "Qual é o nome da rede de pagamentos rápidos construída sobre o Bitcoin?",
      ok: "Lightning Network",
      bad: ["Thunder Network", "Flash Chain", "Rainbow Protocol"],
      why: "A Lightning permite pagamentos quase instantâneos e baratos, liquidando na blockchain só quando necessário.",
    },
    {
      q: "Quem controla a rede Bitcoin?",
      ok: "Ninguém sozinho: ela é descentralizada, mantida por milhares de nós",
      bad: ["O Banco Central", "Uma empresa do Vale do Silício", "O governo dos EUA"],
      why: "Qualquer pessoa pode rodar um nó e verificar as regras por conta própria.",
    },
    {
      q: "O Bitcoin é um software de código aberto?",
      ok: "Sim: qualquer pessoa pode ler, auditar e propor melhorias",
      bad: ["Não, o código é secreto", "Só empresas autorizadas podem ver o código", "Só governos têm acesso"],
      why: "É por isso que existem desenvolvedores do mundo todo contribuindo — inclusive aqui no Brasil.",
    },
    {
      q: "A Casa21, hackerspace da Vinteum, fica em qual cidade?",
      ok: "São Paulo",
      bad: ["Florianópolis", "Curitiba", "Recife"],
      why: "A Casa21 é um espaço comunitário em São Paulo para aprender, programar e construir sobre Bitcoin.",
    },
  ],

  medium: [
    {
      q: "Qual função hash é usada na prova de trabalho do Bitcoin?",
      ok: "SHA-256",
      bad: ["MD5", "SHA-1", "Keccak-256"],
      why: "Mineradores aplicam SHA-256 duas vezes ao cabeçalho do bloco, procurando um hash abaixo do alvo.",
    },
    {
      q: "O que é um UTXO?",
      ok: "Uma saída de transação ainda não gasta",
      bad: ["Um tipo de carteira", "Uma taxa de rede", "Um tipo de minerador"],
      why: "Seu “saldo” é a soma dos UTXOs que você consegue gastar.",
    },
    {
      q: "Qual é a recompensa de bloco desde o halving de 2024?",
      ok: "3,125 BTC",
      bad: ["6,25 BTC", "12,5 BTC", "1,5625 BTC"],
      why: "Caiu de 6,25 para 3,125 BTC em abril de 2024 (bloco 840.000).",
    },
    {
      q: "De quantos em quantos blocos a dificuldade da mineração é ajustada?",
      ok: "2016 blocos",
      bad: ["210.000 blocos", "144 blocos", "1.000 blocos"],
      why: "2016 blocos × 10 minutos ≈ 2 semanas.",
    },
    {
      q: "Qual curva elíptica o Bitcoin usa nas assinaturas?",
      ok: "secp256k1",
      bad: ["Curve25519", "secp256r1 (P-256)", "Ed448"],
      why: "Chaves públicas são pontos nessa curva; chaves privadas são números de 256 bits.",
    },
    {
      q: "Qual é o tamanho de uma chave privada do Bitcoin?",
      ok: "256 bits",
      bad: ["64 bits", "128 bits", "512 bits"],
      why: "São 2²⁵⁶ possibilidades — adivinhar uma chave é, na prática, impossível.",
    },
    {
      q: "O que é a mempool?",
      ok: "A fila de transações ainda não confirmadas guardada pelos nós",
      bad: ["O grupo de mineradores de um bloco", "Um fundo de reserva de bitcoins", "O histórico de preços"],
      why: "Cada nó mantém a sua mempool; mineradores escolhem dali as transações para o próximo bloco.",
    },
    {
      q: "Qual atualização de 2021 trouxe assinaturas Schnorr ao Bitcoin?",
      ok: "Taproot",
      bad: ["SegWit", "Lightning", "Halving"],
      why: "O Taproot foi ativado em novembro de 2021 (bloco 709.632).",
    },
    {
      q: "Em que ano foi publicado o white paper do Bitcoin?",
      ok: "2008",
      bad: ["2006", "2009", "2011"],
      why: "Em 31 de outubro de 2008: “Bitcoin: A Peer-to-Peer Electronic Cash System”.",
    },
    {
      q: "Endereços que começam com “bc1” usam qual formato?",
      ok: "Bech32 (SegWit nativo)",
      bad: ["Base58 clássico", "Hexadecimal puro", "Base64"],
      why: "O Bech32 evita caracteres parecidos e consegue detectar erros de digitação.",
    },
    {
      q: "Qual jornal aparece na mensagem embutida no bloco gênesis?",
      ok: "The Times",
      bad: ["The New York Times", "Folha de S.Paulo", "The Wall Street Journal"],
      why: "A mensagem cita uma manchete de 3 de janeiro de 2009 sobre socorro a bancos: prova de data e crítica ao sistema.",
    },
    {
      q: "Quantos satoshis existem em 1 bitcoin?",
      ok: "100.000.000",
      bad: ["1.000.000", "10.000", "21.000.000"],
      why: "Por isso o Bitcoin tem 8 casas decimais.",
    },
    {
      q: "Qual opcode do Bitcoin Script verifica uma assinatura?",
      ok: "OP_CHECKSIG",
      bad: ["OP_VERIFYSIGN", "OP_SIGN", "OP_HASH256"],
      why: "Quase todo script de pagamento comum depende de OP_CHECKSIG (ou de uma variante dele).",
    },
  ],

  hard: [
    {
      q: "O que a árvore de Merkle de um bloco permite?",
      ok: "Provar que uma transação está no bloco sem baixar o bloco inteiro",
      bad: ["Criptografar as transações", "Aumentar a velocidade de mineração", "Esconder os endereços"],
      why: "Basta uma pequena “prova de Merkle”: carteiras leves usam isso para verificar pagamentos.",
    },
    {
      q: "Qual é a equação da curva secp256k1?",
      ok: "y² = x³ + 7",
      bad: ["y² = x³ − x", "y² = x³ + 486662x² + x", "y = x² + 7"],
      why: "É uma curva com a = 0 e b = 7. A segunda opção é a equação da Curve25519.",
    },
    {
      q: "Na prova de trabalho, um bloco é válido quando o hash do seu cabeçalho é…",
      ok: "Menor ou igual ao alvo (target) de dificuldade",
      bad: ["Exatamente igual ao hash do bloco anterior", "Maior que o alvo", "Divisível por 21"],
      why: "Quanto menor o alvo, mais tentativas são necessárias — e mais difícil é minerar.",
    },
    {
      q: "Qual BIP define as frases de recuperação (seed words)?",
      ok: "BIP-39",
      bad: ["BIP-21", "BIP-70", "BIP-174"],
      why: "O BIP-39 define a lista de 2048 palavras; o BIP-32 define as carteiras hierárquicas (HD).",
    },
    {
      q: "Qual BIP introduziu o SegWit?",
      ok: "BIP-141",
      bad: ["BIP-32", "BIP-84", "BIP-340"],
      why: "O SegWit foi ativado em agosto de 2017 e abriu caminho para a Lightning e para o Taproot.",
    },
    {
      q: "O HASH160 (usado em endereços clássicos) gera um resultado de quantos bits?",
      ok: "160 bits",
      bad: ["128 bits", "256 bits", "512 bits"],
      why: "HASH160 = RIPEMD-160(SHA-256(chave pública)).",
    },
    {
      q: "Quantos blocos precisam passar até uma recompensa de mineração (coinbase) poder ser gasta?",
      ok: "100 blocos",
      bad: ["6 blocos", "10 blocos", "2016 blocos"],
      why: "A maturidade de 100 blocos protege contra reorganizações da cadeia.",
    },
    {
      q: "Por que o total emitido de bitcoins é um pouco menor que 21 milhões?",
      ok: "A recompensa é arredondada para baixo, em satoshis, a cada halving",
      bad: ["Moedas são queimadas a cada transação", "Mineradores precisam devolver as sobras", "O limite real é de 20 milhões"],
      why: "O teto real é de cerca de 20.999.999,9769 BTC.",
    },
    {
      q: "Contando em satoshis inteiros, após quantos halvings a recompensa de bloco chega a zero?",
      ok: "33 halvings",
      bad: ["21 halvings", "64 halvings", "100 halvings"],
      why: "50 BTC = 5 bilhões de sats; depois de 33 divisões por 2 sobra menos de 1 sat. Isso deve acontecer por volta do ano 2140.",
    },
    {
      q: "Em um HTLC da Lightning, o que libera o pagamento ao recebedor?",
      ok: "Revelar o preimage do hash",
      bad: ["Pagar uma taxa extra", "Esperar 6 confirmações", "Assinar com a chave do minerador"],
      why: "O mesmo segredo destrava o pagamento em cada salto da rota, de ponta a ponta.",
    },
    {
      q: "Quantos bits tem o campo nonce no cabeçalho de um bloco?",
      ok: "32 bits",
      bad: ["8 bits", "64 bits", "256 bits"],
      why: "32 bits já não bastam hoje, por isso mineradores também variam um “extranonce” na transação coinbase.",
    },
    {
      q: "Qual é o tamanho do cabeçalho de um bloco?",
      ok: "80 bytes",
      bad: ["32 bytes", "256 bytes", "1 MB"],
      why: "Versão (4) + hash anterior (32) + raiz de Merkle (32) + tempo (4) + bits (4) + nonce (4) = 80 bytes.",
    },
  ],
};
