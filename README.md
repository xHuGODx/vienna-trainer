# Vienna Game Trainer

A mini-site for learning and practising a Vienna Game and Vienna Gambit repertoire with the white pieces.

It includes a line explorer, an interactive chessboard, explanations for each variation, next-move training, progressive hints, and locally saved progress.

## Stack

- Next.js 16, React 19, and TypeScript
- `chess.js` for chess rules, SAN, and FEN
- Vitest for logic tests
- Custom CSS with no visual framework
- Local data and no backend

## Run locally

Requires Node.js 24 or a compatible version supported by Next.js.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm run validate:repertoire
npm test
npm run lint
npm run typecheck
npm run build
```

The build automatically validates the repertoire.

## Repertoire

The variations live in [`data/repertoire.ts`](./data/repertoire.ts). Each line contains:

- a SAN move sequence;
- family and difficulty;
- plans and warnings;
- key positions with the recommended continuation.

To add a line:

1. Add a new `Variation` with a unique ID.
2. Use only legal SAN moves from the starting position.
3. Define training positions only when it is White's turn.
4. Run `npm run validate:repertoire`.

The validator rebuilds every game with `chess.js`, checks all recommended moves, and rejects duplicate positions with incompatible answers.

## Progress

Progress is stored in `localStorage`. There are no accounts, session cookies, or databases.

## Deploy

Import the repository into Vercel and use the **Next.js** preset. No environment variables are required. Optionally, set `NEXT_PUBLIC_SITE_URL` to the production domain to update the metadata and sitemap.

The recommendations form a practical repertoire; they are not the only valid moves in each position.

## Opening references

The repertoire was cross-checked against the [Lichess opening page](https://lichess.org/opening/Vienna_Game_Vienna_Gambit) and the public [lichess-org/chess-openings](https://github.com/lichess-org/chess-openings) dataset. Local validation guarantees legality; the evaluations and recommendations remain a teaching repertoire rather than exhaustive engine analysis.
