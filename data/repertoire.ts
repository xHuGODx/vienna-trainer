import type { Variation } from "@/types/repertoire";

export const repertoire: Variation[] = [
  {
    id: "gambit-accepted-main",
    title: "Gambito aceite: recaptura central",
    subtitle: "3...exf4 4.e5 Ng8",
    family: "gambit-accepted",
    difficulty: "beginner",
    opponentApproach: "As pretas aceitam o peão com 3...exf4",
    moves: ["e4", "e5", "Nc3", "Nf6", "f4", "exf4", "e5", "Ng8", "Nf3", "d6", "d4", "dxe5", "Qe2", "Be7", "Qxe5", "Nf6", "Bxf4"],
    summary: "A aceitação dá às brancas espaço e tempos de desenvolvimento. O centro forte compensa o peão temporariamente sacrificado.",
    ideas: ["Expulsar o cavalo com e5", "Desenvolver com Nf3 e construir o centro com d4", "Recuperar e5 com a dama e depois o peão de f4"],
    warnings: ["Jogar Nf3 antes de d4 evita ...Qh4+", "Não recuperar o peão à pressa se isso atrasar o desenvolvimento"],
    tags: ["Vienna Gambit", "Aceite", "Centro", "Linha principal"],
    keyPositions: [
      { afterPly: 6, explanation: "O avanço ganha espaço e ataca o cavalo de f6 com tempo.", idea: "Usar o peão de e como ganho de desenvolvimento.", pieceHint: "Move o peão de e4.", squareHint: "O destino é e5.", alternatives: [] },
      { afterPly: 8, explanation: "Nf3 desenvolve, trava ...Qh4+ e prepara d4.", idea: "Desenvolver antes de abrir o centro.", pieceHint: "Move o cavalo de g1.", squareHint: "O destino é f3.", alternatives: [] },
      { afterPly: 12, explanation: "Qe2 mantém as damas e prepara Qxe5, preservando a iniciativa.", idea: "Recuperar o centro sem trocar damas.", pieceHint: "Move a dama.", squareHint: "O destino é e2.", alternatives: ["Nxe5"] }
    ],
    sourceNotes: "Linha principal prática, verificada contra teoria corrente do Vienna Gambit."
  },
  {
    id: "gambit-accepted-qe7-trap",
    title: "Gambito aceite: a dama entra cedo",
    subtitle: "4...Qe7 5.Qe2",
    family: "gambit-accepted",
    difficulty: "advanced",
    opponentApproach: "As pretas tentam imobilizar e5 com 4...Qe7",
    moves: ["e4", "e5", "Nc3", "Nf6", "f4", "exf4", "e5", "Qe7", "Qe2", "Ng8", "Nf3", "d6", "Nd5", "Qd7", "Nxc7+", "Qxc7", "exd6+", "Qe7", "dxe7"],
    summary: "Qe2 sustém e5. Se as pretas colocarem a dama em d7, o salto Nd5–c7 cria uma sequência tática muito forte.",
    ideas: ["Responder à cravada com Qe2", "Ganhar tempos sobre a dama", "Procurar Nxc7+ seguido de exd6+"],
    warnings: ["A armadilha só funciona quando a dama preta segue para d7", "Se as pretas desviarem, regressa aos princípios de desenvolvimento"],
    tags: ["Vienna Gambit", "Aceite", "Armadilha", "Tática"],
    keyPositions: [
      { afterPly: 8, explanation: "Qe2 defende o peão avançado e mantém o cavalo preto sob ataque.", idea: "Responder à cravada com uma contracravada simples.", pieceHint: "Move a dama.", squareHint: "O destino é e2.", alternatives: [] },
      { afterPly: 12, explanation: "Nd5 ataca a dama e prepara o garfo em c7.", idea: "Explorar a dama mal colocada e o rei no centro.", pieceHint: "Move o cavalo de c3.", squareHint: "O destino é d5.", alternatives: [] },
      { afterPly: 14, explanation: "Nxc7+ força a dama a capturar e permite o xeque descoberto em d6.", idea: "Desviar a dama para a coluna c.", pieceHint: "Move o cavalo de d5.", squareHint: "Captura em c7 com xeque.", alternatives: [] }
    ],
    sourceNotes: "Armadilha temática; apresentada como resposta a uma sequência específica, não como resultado forçado contra defesa correta."
  },
  {
    id: "gambit-accepted-knight-blunder",
    title: "Gambito aceite: cavalo em h5",
    subtitle: "4...Nh5? 5.Qxh5",
    family: "gambit-accepted",
    difficulty: "beginner",
    opponentApproach: "As pretas tentam salvar o cavalo com 4...Nh5?",
    moves: ["e4", "e5", "Nc3", "Nf6", "f4", "exf4", "e5", "Nh5", "Qxh5", "d6", "d4"],
    summary: "O cavalo em h5 fica simplesmente pendurado na diagonal da dama branca.",
    ideas: ["Verificar sempre se o cavalo tem uma casa segura", "A dama em d1 já ataca h5 depois de e4"],
    warnings: ["Não compliques quando podes ganhar uma peça diretamente"],
    tags: ["Vienna Gambit", "Erro comum", "Tática"],
    keyPositions: [
      { afterPly: 8, explanation: "A diagonal d1–h5 está aberta: a dama pode capturar o cavalo.", idea: "Punir imediatamente uma peça sem defesa.", pieceHint: "Move a dama.", squareHint: "Captura em h5.", alternatives: [] }
    ],
    sourceNotes: "Punição tática elementar e legalmente validada."
  },
  {
    id: "gambit-declined-d5-main",
    title: "Defesa principal: contra-ataque central",
    subtitle: "3...d5 4.fxe5 Nxe4 5.Qf3",
    family: "gambit-declined",
    difficulty: "intermediate",
    opponentApproach: "As pretas recusam o gambito com o golpe correto 3...d5",
    moves: ["e4", "e5", "Nc3", "Nf6", "f4", "d5", "fxe5", "Nxe4", "Qf3", "Nxc3", "bxc3", "Be7", "d4", "O-O", "Bd3", "Be6", "Ne2"],
    summary: "Esta é a resposta crítica das pretas. As brancas aceitam peões c dobrados em troca de centro, espaço e iniciativa.",
    ideas: ["Qf3 ataca e4 e f7", "Construir o centro com d4", "Desenvolver Bd3 e Ne2 antes de atacar"],
    warnings: ["Não esperes uma vitória rápida contra 3...d5", "Os peões dobrados são aceitáveis porque sustentam d4"],
    tags: ["Vienna Gambit", "Recusado", "Linha principal", "Posicional"],
    keyPositions: [
      { afterPly: 6, explanation: "fxe5 aceita o desafio central e abre a coluna f.", idea: "Resolver a tensão antes que as pretas consolidem.", pieceHint: "Move o peão de f4.", squareHint: "Captura em e5.", alternatives: [] },
      { afterPly: 8, explanation: "Qf3 é a Paulsen Attack: pressiona o cavalo e o ponto f7.", idea: "Criar duas ameaças com um só lance.", pieceHint: "Move a dama.", squareHint: "O destino é f3.", alternatives: ["Nf3"] },
      { afterPly: 12, explanation: "d4 usa os peões dobrados como suporte de um centro amplo.", idea: "Transformar a estrutura em espaço e desenvolvimento.", pieceHint: "Move o peão de d2.", squareHint: "O destino é d4.", alternatives: [] }
    ],
    sourceNotes: "Linha teórica principal da defesa 3...d5."
  },
  {
    id: "gambit-declined-d5-nf3",
    title: "3...d5: desenvolvimento com Nf3",
    subtitle: "5.Nf3 Be7 6.d4",
    family: "gambit-declined",
    difficulty: "intermediate",
    opponentApproach: "As pretas escolhem 3...d5 e uma configuração sólida",
    moves: ["e4", "e5", "Nc3", "Nf6", "f4", "d5", "fxe5", "Nxe4", "Nf3", "Be7", "d4", "O-O", "Bd3", "Nxc3", "bxc3", "c5", "O-O"],
    summary: "Nf3 é uma alternativa natural a Qf3: menos concreta, mas fácil de jogar e orientada para desenvolvimento.",
    ideas: ["Desenvolver sem bloquear a dama", "Usar Bd3 contra h7", "Roque rápido e pressão no centro"],
    warnings: ["As pretas igualam se as brancas jogarem sem energia", "Mantém o peão de e5 bem apoiado"],
    tags: ["Vienna Gambit", "Recusado", "Alternativa", "Desenvolvimento"],
    keyPositions: [
      { afterPly: 10, explanation: "d4 sustém e5 e reclama o centro.", idea: "Fixar a vantagem espacial.", pieceHint: "Move o peão de d2.", squareHint: "O destino é d4.", alternatives: [] }
    ],
    sourceNotes: "Alternativa prática à Paulsen Attack."
  },
  {
    id: "gambit-declined-d6",
    title: "Gambito recusado: defesa sólida com ...d6",
    subtitle: "3...d6 4.Nf3 Nc6 5.Bb5",
    family: "gambit-declined",
    difficulty: "beginner",
    opponentApproach: "As pretas protegem e5 com 3...d6",
    moves: ["e4", "e5", "Nc3", "Nf6", "f4", "d6", "Nf3", "Nc6", "Bb5", "Bd7", "d3", "Be7", "O-O", "O-O"],
    summary: "Contra a defesa sólida, as brancas desenvolvem naturalmente e aumentam a pressão sobre e5.",
    ideas: ["Nf3 e Bb5 aumentam a pressão no centro", "Roque curto antes de abrir linhas", "Escolher o momento certo para fxe5"],
    warnings: ["Não forces f5 sem desenvolvimento", "Se ...exf4 surgir, recupera com Bxf4 quando for conveniente"],
    tags: ["Vienna Gambit", "Recusado", "Sólido", "Desenvolvimento"],
    keyPositions: [
      { afterPly: 6, explanation: "Nf3 desenvolve e reforça a luta pelo centro.", idea: "Melhorar as peças antes de definir a tensão.", pieceHint: "Move o cavalo de g1.", squareHint: "O destino é f3.", alternatives: [] },
      { afterPly: 8, explanation: "Bb5 liga o cavalo de c6 ao rei e aumenta a pressão em e5.", idea: "Desenvolver com uma ameaça posicional.", pieceHint: "Move o bispo de f1.", squareHint: "O destino é b5.", alternatives: ["Bc4"] }
    ],
    sourceNotes: "Plano de repertório simples contra 3...d6."
  },
  {
    id: "gambit-declined-nc6",
    title: "3...Nc6: ganhar o centro com tempo",
    subtitle: "4.fxe5 Nxe5 5.d4",
    family: "gambit-declined",
    difficulty: "intermediate",
    opponentApproach: "As pretas desenvolvem 3...Nc6 sem resolver o centro",
    moves: ["e4", "e5", "Nc3", "Nf6", "f4", "Nc6", "fxe5", "Nxe5", "d4", "Ng6", "e5", "Ng8", "Nf3", "d6", "Bc4"],
    summary: "A sequência fxe5 e d4 persegue o cavalo e dá às brancas um centro muito avançado.",
    ideas: ["Abrir a coluna f", "Ganhar tempos sobre o cavalo de e5", "Desenvolver rapidamente antes de o centro ser atacado"],
    warnings: ["O centro avançado precisa de desenvolvimento para não se tornar um alvo"],
    tags: ["Vienna Gambit", "Recusado", "Ganho de tempo", "Centro"],
    keyPositions: [
      { afterPly: 6, explanation: "fxe5 abre linhas e obriga o cavalo a ocupar e5.", idea: "Criar um alvo central para d4.", pieceHint: "Move o peão de f4.", squareHint: "Captura em e5.", alternatives: [] },
      { afterPly: 8, explanation: "d4 ataca o cavalo e constrói o centro com tempo.", idea: "Desenvolver o centro enquanto a mesma peça preta se move outra vez.", pieceHint: "Move o peão de d2.", squareHint: "O destino é d4.", alternatives: [] }
    ],
    sourceNotes: "Resposta temática e frequente a 3...Nc6."
  },
  {
    id: "gambit-declined-bc5",
    title: "3...Bc5: desenvolvimento sem pressa",
    subtitle: "4.Nf3 d6 5.Bc4",
    family: "gambit-declined",
    difficulty: "beginner",
    opponentApproach: "As pretas desenvolvem o bispo para c5",
    moves: ["e4", "e5", "Nc3", "Nf6", "f4", "Bc5", "Nf3", "d6", "Bc4", "Nc6", "d3", "O-O", "f5"],
    summary: "Não é preciso resolver imediatamente a tensão. As brancas completam o desenvolvimento e ganham espaço com f5.",
    ideas: ["Nf3 e Bc4 apontam ao rei", "d3 estabiliza e4", "f5 ganha espaço quando o rei está seguro"],
    warnings: ["Não abras o centro com o rei branco preso em e1"],
    tags: ["Vienna Gambit", "Recusado", "Desenvolvimento", "Ataque"],
    keyPositions: [
      { afterPly: 6, explanation: "Nf3 protege h4, desenvolve e prepara o roque.", idea: "Manter opções enquanto completas o desenvolvimento.", pieceHint: "Move o cavalo de g1.", squareHint: "O destino é f3.", alternatives: ["fxe5"] },
      { afterPly: 8, explanation: "Bc4 coloca imediatamente pressão em f7.", idea: "Apontar as peças ao flanco do rei.", pieceHint: "Move o bispo de f1.", squareHint: "O destino é c4.", alternatives: [] }
    ],
    sourceNotes: "Configuração prática contra o desenvolvimento precoce do bispo."
  },
  {
    id: "quiet-vienna-max-lange",
    title: "Max Lange: configuração clássica",
    subtitle: "2...Nc6 3.Bc4 Nf6 4.d3",
    family: "quiet-vienna",
    difficulty: "beginner",
    opponentApproach: "As pretas desenvolvem 2...Nc6",
    moves: ["e4", "e5", "Nc3", "Nc6", "Bc4", "Nf6", "d3", "Bc5", "Nf3", "d6", "h3", "O-O", "O-O", "Be6", "Bb3"],
    summary: "Uma Vienna sólida: d3 protege e4 antes de f4 e permite um desenvolvimento sem riscos.",
    ideas: ["Proteger e4 com d3", "Roque rápido", "Preparar f4 ou Be3 conforme a posição"],
    warnings: ["4.f4?! permite ...Nxe4 porque e4 deixa de estar suficientemente protegido"],
    tags: ["Vienna Game", "Max Lange", "Posicional", "Desenvolvimento"],
    keyPositions: [
      { afterPly: 4, explanation: "Bc4 desenvolve para uma diagonal ativa e mantém as opções abertas.", idea: "Desenvolvimento natural com pressão em f7.", pieceHint: "Move o bispo de f1.", squareHint: "O destino é c4.", alternatives: ["Nf3", "f4"] },
      { afterPly: 6, explanation: "d3 protege e4 antes de continuar o desenvolvimento.", idea: "Retirar o peão central da tática ...Nxe4.", pieceHint: "Move o peão de d2.", squareHint: "O destino é d3.", alternatives: [] }
    ],
    sourceNotes: "Estrutura clássica e segura da Max Lange Defense."
  },
  {
    id: "quiet-vienna-g3",
    title: "Vienna moderna com fianchetto",
    subtitle: "2...Nf6 3.g3",
    family: "quiet-vienna",
    difficulty: "beginner",
    opponentApproach: "As pretas desenvolvem 2...Nf6 e as brancas escolhem um plano posicional",
    moves: ["e4", "e5", "Nc3", "Nf6", "g3", "d5", "exd5", "Nxd5", "Bg2", "Nxc3", "bxc3", "Bd6", "Ne2", "O-O", "O-O"],
    summary: "O fianchetto evita a teoria mais afiada e cria pressão duradoura na grande diagonal.",
    ideas: ["Bg2 controla o centro", "Ne2 mantém o peão f livre", "Roque curto e d4 no momento certo"],
    warnings: ["Depois de bxc3, usa os peões centrais de forma ativa"],
    tags: ["Vienna Game", "Fianchetto", "Posicional", "Alternativa"],
    keyPositions: [
      { afterPly: 4, explanation: "g3 prepara o fianchetto e conduz a uma Vienna estratégica.", idea: "Controlar o centro à distância.", pieceHint: "Move o peão de g2.", squareHint: "O destino é g3.", alternatives: ["f4", "Bc4"] },
      { afterPly: 8, explanation: "Bg2 completa o fianchetto e aumenta a pressão na diagonal longa.", idea: "Ativar o bispo antes de decidir a estrutura.", pieceHint: "Move o bispo de f1.", squareHint: "O destino é g2.", alternatives: [] }
    ],
    sourceNotes: "Sistema posicional reconhecido da Vienna Game."
  },
  {
    id: "black-sideline-bc5",
    title: "2...Bc5: ocupar o centro",
    subtitle: "3.Nf3 d6 4.d4",
    family: "black-sideline",
    difficulty: "beginner",
    opponentApproach: "As pretas desenvolvem o bispo antes do cavalo",
    moves: ["e4", "e5", "Nc3", "Bc5", "Nf3", "d6", "d4", "exd4", "Nxd4", "Nf6", "Be3", "O-O", "Qd2"],
    summary: "As brancas desenvolvem e aproveitam a ausência do cavalo em c6 para jogar d4 cedo.",
    ideas: ["Nf3 e d4 reclamam o centro", "Recapturar com o cavalo", "Be3 desenvolve atacando o bispo"],
    warnings: ["Evita f4 imediato se isso deixar e4 vulnerável"],
    tags: ["Vienna Game", "Sideline", "Centro", "Desenvolvimento"],
    keyPositions: [
      { afterPly: 4, explanation: "Nf3 desenvolve, protege e5 e prepara d4.", idea: "Responder ao bispo com controlo central.", pieceHint: "Move o cavalo de g1.", squareHint: "O destino é f3.", alternatives: ["Bc4"] },
      { afterPly: 6, explanation: "d4 ocupa o centro enquanto o cavalo preto ainda está em b8.", idea: "Usar a vantagem de desenvolvimento.", pieceHint: "Move o peão de d2.", squareHint: "O destino é d4.", alternatives: [] }
    ],
    sourceNotes: "Plano simples contra 2...Bc5."
  },
  {
    id: "black-sideline-bb4",
    title: "2...Bb4: desenvolver sem temer a cravada",
    subtitle: "3.Nge2 Nf6 4.d3",
    family: "black-sideline",
    difficulty: "intermediate",
    opponentApproach: "As pretas cravam o cavalo de c3 com 2...Bb4",
    moves: ["e4", "e5", "Nc3", "Bb4", "Nge2", "Nf6", "d3", "d5", "exd5", "Nxd5", "Bd2", "Nxc3", "bxc3", "Bd6", "Ng3"],
    summary: "Nge2 mantém a estrutura flexível e prepara o roque sem conceder táticas na coluna e.",
    ideas: ["Desenvolver o cavalo por e2", "Quebrar a cravada com Bd2", "Usar a coluna b se a estrutura for dobrada"],
    warnings: ["Não avances a ala do rei antes de completar o desenvolvimento"],
    tags: ["Vienna Game", "Sideline", "Cravada", "Posicional"],
    keyPositions: [
      { afterPly: 4, explanation: "Nge2 desenvolve sem bloquear o peão f e reduz o efeito da cravada.", idea: "Manter flexibilidade contra uma saída precoce do bispo.", pieceHint: "Move o cavalo de g1.", squareHint: "O destino é e2.", alternatives: ["Nf3"] },
      { afterPly: 10, explanation: "Bd2 desenvolve e pergunta ao bispo preto como pretende resolver a tensão.", idea: "Desfazer a cravada com desenvolvimento.", pieceHint: "Move o bispo de c1.", squareHint: "O destino é d2.", alternatives: [] }
    ],
    sourceNotes: "Repertório prático contra a rara 2...Bb4."
  },
  {
    id: "black-sideline-d6",
    title: "2...d6: abrir o centro",
    subtitle: "3.d4 exd4 4.Qxd4",
    family: "black-sideline",
    difficulty: "intermediate",
    opponentApproach: "As pretas adotam uma Philidor por ordem de lances",
    moves: ["e4", "e5", "Nc3", "d6", "d4", "exd4", "Qxd4", "Nf6", "Bf4", "Be7", "O-O-O", "O-O", "f3"],
    summary: "A estrutura passiva das pretas permite abrir o centro e desenvolver com ganho de espaço.",
    ideas: ["Jogar d4 antes de ...Nf6", "Desenvolver Bf4 com pressão em d6", "Roque grande graças à dama fora de d1"],
    warnings: ["Depois do roque grande, controla ...c5 e ...b5"],
    tags: ["Vienna Game", "Sideline", "Centro aberto", "Roques opostos"],
    keyPositions: [
      { afterPly: 4, explanation: "d4 explora a abordagem passiva e reclama o centro completo.", idea: "Abrir a posição antes de as pretas desenvolverem.", pieceHint: "Move o peão de d2.", squareHint: "O destino é d4.", alternatives: ["Nf3"] },
      { afterPly: 6, explanation: "Qxd4 recupera mantendo peças ativas e liberta d1 para o roque grande.", idea: "Usar a dama ativamente sem a expor a tempos imediatos.", pieceHint: "Move a dama.", squareHint: "Captura em d4.", alternatives: [] }
    ],
    sourceNotes: "Plano central contra a ordem de lances 2...d6."
  }
];

export const familyLabels = {
  "gambit-accepted": "Gambito aceite",
  "gambit-declined": "Gambito recusado",
  "quiet-vienna": "Vienna tranquila",
  "black-sideline": "Respostas secundárias",
} as const;

export const difficultyLabels = {
  beginner: "Iniciante",
  intermediate: "Intermédio",
  advanced: "Avançado",
} as const;
