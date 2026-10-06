# Quiz Bitcoin · Vinteum

Quiz sobre Bitcoin para o stand da Vinteum na SECOMP (UFSCar). Site estático (HTML/CSS/JS puro, sem build), pensado para celular e funcionando também no desktop.

## Como funciona

1. A pessoa escolhe a dificuldade (Fácil, Médio ou Difícil).
2. Responde 1 pergunta sorteada do banco daquele nível; a explicação aparece logo após a resposta.
3. Se acertar, aparece a tela do brinde com um código e um relógio ao vivo. A equipe confere a tela e entrega o brinde. Quem errar pode tentar de novo, a critério da equipe.

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `quiz-vinteum`) e suba estes arquivos na raiz da branch `main`.
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em ~1 minuto o site fica em `https://SEU-USUARIO.github.io/quiz-vinteum/`.

Dica para o stand: abra o link no celular/tablet uma vez com internet. O site guarda tudo no cache e depois abre mesmo se o wifi do evento cair. Se quiser, use "Adicionar à tela inicial" para abrir em tela cheia. Gere um QR code do link para as pessoas jogarem no próprio celular.

## Personalizar

- `config.js`: acertos necessários e brinde de cada nível, perguntas por rodada, nome do evento, tempo de inatividade até voltar ao início.
- `questions.js`: banco de perguntas (`ok` = resposta certa, `bad` = 3 erradas, `why` = explicação). As alternativas são embaralhadas automaticamente.
- `style.css`: cores no topo do arquivo (`:root`).

Se mudar qualquer arquivo depois de publicado, aumente o número em `CACHE` no `sw.js` (ex.: `quiz-vinteum-v2`) para os celulares pegarem a versão nova.

## Estrutura

```
index.html  style.css  app.js  config.js  questions.js
sw.js  manifest.webmanifest  assets/
```
