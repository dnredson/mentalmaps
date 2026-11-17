# Mental Maps — Concurso Unicamp

Site estático e incremental para revisão das disciplinas do concurso de Professor Doutor em **Segurança Computacional e Sistemas Operacionais** da Unicamp.

## Mapas

- **MC504 — Sistemas Operacionais**
- **MC832 — Redes de Computadores**
- **MC942 / MO639 — Segurança Computacional e Segurança de Redes**

Cada disciplina possui seu próprio mapa mental. Os nós são clicáveis e exibem:

- definição curta;
- intuição voltada para prova;
- exemplo;
- conexões com outros conceitos;
- pergunta de recuperação ativa.

O progresso de revisão é salvo localmente no navegador.

## Estrutura

```text
.
├── index.html
├── assets/
│   ├── app.js
│   └── styles.css
└── data/
    ├── sistemas-operacionais.js
    ├── redes.js
    └── seguranca.js
```

O conteúdo fica separado da interface. Para adicionar novos conceitos, a preferência é editar apenas o arquivo da disciplina correspondente em `data/`.

## Recursos

- um mapa por disciplina;
- busca de conceitos;
- painel de detalhes;
- marcação de conceitos revisados;
- progresso persistente via `localStorage`;
- perguntas aleatórias para revisão ativa;
- impressão / exportação para PDF;
- layout responsivo;
- sem framework ou etapa de build.

## GitHub Pages

Depois de integrar a versão desejada ao `main`, o site pode ser publicado em **Settings → Pages → Deploy from a branch**, usando a branch `main` e a pasta raiz `/`.

A URL esperada, após a ativação do Pages, é:

`https://dnredson.github.io/mentalmaps/`

## Evolução

A ideia é atualizar os mapas junto com as sessões de estudo, preservando o que já foi consolidado e adicionando novos blocos conforme o conteúdo das disciplinas avança.
