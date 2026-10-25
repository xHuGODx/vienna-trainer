# Vienna Game Trainer

Mini-site em português para aprender e praticar um repertório de Vienna Game e Vienna Gambit com as peças brancas.

Inclui um explorador de linhas, tabuleiro interativo, explicações por variação, treino de próximo lance, pistas progressivas e progresso guardado localmente.

## Stack

- Next.js 16, React 19 e TypeScript
- `chess.js` para regras, SAN e FEN
- Vitest para testes da lógica
- CSS próprio, sem framework visual
- Dados locais e sem backend

## Executar localmente

Requer Node.js 24 ou uma versão compatível indicada pelo Next.js.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Validar

```bash
npm run validate:repertoire
npm test
npm run lint
npm run typecheck
npm run build
```

O build executa automaticamente a validação do repertório.

## Repertório

As variações estão em [`data/repertoire.ts`](./data/repertoire.ts). Cada linha contém:

- sequência em SAN;
- família e dificuldade;
- planos e alertas;
- posições-chave com a continuação recomendada.

Para adicionar uma linha:

1. Adiciona uma nova `Variation` com ID único.
2. Usa apenas lances SAN legais desde a posição inicial.
3. Define posições de treino apenas quando são as brancas a jogar.
4. Executa `npm run validate:repertoire`.

O validador reconstrói todas as partidas com `chess.js`, confirma os lances recomendados e rejeita posições duplicadas com respostas incompatíveis.

## Progresso

O progresso é guardado em `localStorage`. Não existem contas, cookies de sessão ou base de dados.

## Deploy

Importa o repositório na Vercel e usa o preset **Next.js**. Não são necessárias variáveis de ambiente. Opcionalmente, define `NEXT_PUBLIC_SITE_URL` com o domínio de produção para atualizar metadata e sitemap.

As recomendações constituem um repertório prático; não representam os únicos lances válidos em cada posição.

## Referências de abertura

O repertório foi cruzado com a página de abertura do [Lichess](https://lichess.org/opening/Vienna_Game_Vienna_Gambit) e com o conjunto público [lichess-org/chess-openings](https://github.com/lichess-org/chess-openings). A validação local garante legalidade; as avaliações e recomendações continuam a representar um repertório pedagógico, não uma análise exaustiva de motor.
