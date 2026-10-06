# Quiz Bitcoin · Vinteum

Quiz sobre Bitcoin para o stand da Vinteum na SECOMP (UFSCar). Site estático (HTML/CSS/JS puro, sem build), pensado para celular e funcionando também no desktop.

## Como funciona

1. A pessoa escolhe a dificuldade (Fácil, Médio ou Difícil) e responde 1 pergunta sorteada. A explicação aparece logo após a resposta.
2. **Acertou:** vê o brinde do nível, com um relógio ao vivo (mostra que a tela é de verdade, não um print). Quem seguir a Vinteum também leva uma caneta.
3. **Errou:** escolhe entre "Ficar com a caneta" (precisa seguir a Vinteum) ou "Tentar novamente".
4. Em telas com mouse aparecem QR codes das redes da Vinteum; no celular, ícones clicáveis.

Brindes (editáveis em `config.js`): Fácil = Caderneta, Médio = Chaveiro, Difícil = Livro, e Caneta para quem participa e segue a Vinteum.

## Páginas

- `index.html`: o quiz (é o link que vai no QR code).
- `stand.html`: página para deixar aberta no notebook do stand, com QR codes grandes do quiz, do Discord e do site da Vinteum. O QR do quiz é gerado a partir do endereço onde o site está publicado.

## Publicar no GitHub Pages

1. Suba o **conteúdo** desta pasta (não a pasta em si) na raiz da branch `main`. No upload pelo navegador, arraste os arquivos e as pastas `assets` e `vendor` juntos.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em ~1 minuto o site fica em `https://SEU-USUARIO.github.io/quiz-vinteum/` e a página do stand em `.../stand.html`.

Dica: abra o quiz e a página do stand uma vez com internet. Depois disso, tudo fica em cache e funciona mesmo se o wifi do evento cair (inclusive os QR codes, que são gerados no próprio aparelho).

## Personalizar

- `config.js`: acertos necessários e brinde de cada nível, brinde de participação, links das redes, nome do evento, tempo de inatividade.
- `questions.js`: banco de perguntas (`ok` = certa, `bad` = 3 erradas, `why` = explicação).
- `style.css`: cores no topo (`:root`).

Depois de publicado, se mudar qualquer arquivo, aumente o número em `CACHE` no `sw.js` (ex.: `quiz-vinteum-v4`) para os celulares pegarem a versão nova.

## Créditos

Ícones das redes: [Simple Icons](https://simpleicons.org) (CC0). QR code: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) de Kazuhiko Arase (MIT), em `vendor/qrcode.js`.
