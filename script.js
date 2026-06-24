/* =============================================
   M-ACTIVE GO — Prototype Script
   ============================================= */

/* =============================================
   MOCK DATA
   ============================================= */

const mockOrganizer = {
  name: "M-ACTIVE",
  fullName: "M-ACTIVE Sp. z o.o.",
  address: "ul. Tenisowa 12, 00-001 Warszawa",
  phone: "+48 600 123 456",
  email: "biuro@m-active.pl",
  website: "www.m-active.pl",
  description: "M-ACTIVE to firma specjalizująca się w organizacji turniejów tenisowych dla amatorów i zaawansowanych graczy. Działamy na terenie całej Polski, stawiając na profesjonalizm, dostępność i pasję do sportu."
};

/* ---- Bracket data helpers ---- */
function mkMatch(id, round, pAname, pAseed, pBname, pBseed, s1a, s1b, s2a, s2b, s3a, s3b, tb1, tb2, tb3, winner) {
  return {
    id,
    round,
    status: (s1a !== null || s1b !== null) ? 'finished' : 'pending',
    playerA: { name: pAname, seed: pAseed },
    playerB: { name: pBname, seed: pBseed },
    score: [
      { playerAGames: s1a ?? null, playerBGames: s1b ?? null, tieBreakSmallPoints: tb1 ?? null },
      { playerAGames: s2a ?? null, playerBGames: s2b ?? null, tieBreakSmallPoints: tb2 ?? null },
      { playerAGames: s3a ?? null, playerBGames: s3b ?? null, tieBreakSmallPoints: tb3 ?? null },
    ],
    winner: winner || null
  };
}

function formatSetScore(playerAGames, playerBGames, tieBreakSmallPoints, forPlayerA) {
  const games = forPlayerA ? playerAGames : playerBGames;
  const opGames = forPlayerA ? playerBGames : playerAGames;
  if (games === null || games === undefined) return '.';
  const isTieBreakWinner = (games === 7 && opGames === 6);
  if (isTieBreakWinner && tieBreakSmallPoints !== null) {
    return `${games}<sup>${tieBreakSmallPoints}</sup>`;
  }
  return String(games);
}

const womenDoublesBracket = {
  r1: [
    mkMatch('w-r1-1','Runda 1','Kowalska / Wiśniewska',1,'Nowakowska / Dąbrowska',null, 6,4, 6,2, null,null, null,null,null,'playerA'),
    mkMatch('w-r1-2','Runda 1','Kamińska / Wójcik',3,'Lewandowska / Zielińska',null, 7,6, 6,3, null,null, 4,null,null,'playerA'),
    mkMatch('w-r1-3','Runda 1','Szymańska / Woźniak',2,'Kozłowska / Jankowska',null, 6,1, 6,4, null,null, null,null,null,'playerA'),
    mkMatch('w-r1-4','Runda 1','Malinowska / Piotrowska',4,'Kwiatkowska / Adamska',null, 4,6, 6,3, 6,4, null,null,null,'playerA'),
  ],
  sf: [
    mkMatch('w-sf-1','Półfinał','Kowalska / Wiśniewska',1,'Kamińska / Wójcik',3, 6,3, 7,6, null,null, null,4,null,'playerA'),
    mkMatch('w-sf-2','Półfinał','Szymańska / Woźniak',2,'Malinowska / Piotrowska',4, 6,2, 6,4, null,null, null,null,null,'playerA'),
  ],
  final: mkMatch('w-f','Finał','Kowalska / Wiśniewska',1,'Szymańska / Woźniak',2, 7,5, 6,4, null,null, 3,null,null,'playerA'),
  winner: 'Kowalska / Wiśniewska'
};

const menSinglesBracket = {
  r1: [
    mkMatch('m-r1-1','Runda 1','Nowak Adam',1,'Kowalski Jan',null, 6,3, 7,5, null,null, null,null,null,'playerA'),
    mkMatch('m-r1-2','Runda 1','Wiśniewski P.',3,'Dąbrowski M.',null, 6,4, 6,2, null,null, null,null,null,'playerA'),
    mkMatch('m-r1-3','Runda 1','Kaczmarek R.',2,'Lewandowski K.',null, 7,6, 4,6, 6,3, 6,null,null,'playerA'),
    mkMatch('m-r1-4','Runda 1','Zieliński T.',4,'Szymański B.',null, 6,1, 6,3, null,null, null,null,null,'playerA'),
  ],
  sf: [
    mkMatch('m-sf-1','Półfinał','Nowak Adam',1,'Wiśniewski P.',3, 6,4, 6,3, null,null, null,null,null,'playerA'),
    mkMatch('m-sf-2','Półfinał','Kaczmarek R.',2,'Zieliński T.',4, 7,6, 5,4, null,null, 4,null,null,'playerA'),
  ],
  final: mkMatch('m-f','Finał','Nowak Adam',1,'Kaczmarek R.',2, 6,4, 7,6, null,null, null,3,null,'playerA'),
  winner: 'Nowak Adam'
};

const mixedOpenBracket = {
  r1: [
    mkMatch('x-r1-1','Runda 1','Nowak / Kamińska',1,'Kowalski / Wójcik',null, 6,2, 6,3, null,null, null,null,null,'playerA'),
    mkMatch('x-r1-2','Runda 1','Wiśniewski / Nowakowska',3,'Dąbrowski / Zielińska',null, 7,6, 5,4, null,null, 5,null,null,'playerA'),
    mkMatch('x-r1-3','Runda 1','Kaczmarek / Szymańska',2,'Lewandowski / Kozłowska',null, 6,3, 6,1, null,null, null,null,null,'playerA'),
    mkMatch('x-r1-4','Runda 1','Zieliński / Malinowska',4,'Piotrowski / Kwiatkowska',null, null,null, null,null, null,null, null,null,null,null),
  ],
  sf: [
    mkMatch('x-sf-1','Półfinał','Nowak / Kamińska',1,'Wiśniewski / Nowakowska',3, 6,4, 7,6, null,null, null,4,null,'playerA'),
    mkMatch('x-sf-2','Półfinał','Kaczmarek / Szymańska',2,'Zieliński / Malinowska',4, 6,2, 6,3, null,null, null,null,null,'playerA'),
  ],
  final: mkMatch('x-f','Finał','Nowak / Kamińska',1,'Kaczmarek / Szymańska',2, 7,6, 4,6, 6,4, 3,null,null,'playerA'),
  winner: 'Nowak / Kamińska'
};

const archicup2026Tournament = {
  id: 10,
  name: "TENNIS ARCHI CUP 2026",
  shortDesc: "XXXV MISTRZOSTWA POLSKI ARCHITEKTÓW W TENISIE",
  dateStart: "2026-06-08",
  dateEnd: "2026-06-14",
  location: "Polska",
  organizer: "M-ACTIVE",
  status: "finished",
  categories: [
    {
      id: 100,
      name: 'DEBLE KOBIETY OPEN',
      players: 7,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'debel',
      gender: 'kobiety',
      level: 'open',
      limit: 8,
      format: 'elimination',
      seedsCount: 2,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('dko-r1-1', 'r1', 'K. Tarnawska K. Żołnierek-Mazurek', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('dko-r1-2', 'r1', 'E. Sakwerda K. Wolak', null, 'A. Bonna M. Mejka', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('dko-r1-3', 'r1', 'A. Bartczak N. Duczmal', null, 'D. Gotkiewicz P. Paczkowska', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('dko-r1-4', 'r1', 'K. Białk A. Skrzyńska-Elert', null, 'M. Górska A. Wiśnicka-Trzaskowska', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        sf: [mkMatch('dko-sf-1', 'sf', 'K. Tarnawska K. Żołnierek-Mazurek', null, 'A. Bonna M. Mejka', null, 5, 7, 6, 2, 10, 8, null, null, null, 'playerA'), mkMatch('dko-sf-2', 'sf', 'D. Gotkiewicz P. Paczkowska', null, 'M. Górska A. Wiśnicka-Trzaskowska', null, 1, 6, 1, 6, null, null, null, null, null, 'playerB')],
        final: mkMatch('dko-final', 'final', 'K. Tarnawska K. Żołnierek-Mazurek', null, 'M. Górska A. Wiśnicka-Trzaskowska', null, 0, 6, 7, 5, 10, 8, null, null, null, 'playerA'),
        third: mkMatch('dko-third', 'third', 'A. Bonna M. Mejka', null, 'D. Gotkiewicz P. Paczkowska', null, 4, 6, 2, 6, null, null, null, null, null, 'playerB')
      }
    },
    {
      id: 101,
      name: 'DEBLE MĘŻCZYŹNI OPEN',
      players: 4,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'debel',
      gender: 'mezczyzni',
      level: 'open',
      limit: 4,
      format: 'elimination',
      seedsCount: 2,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('dmo-r1-1', 'r1', 'O. Berent M. Wileński', 1, 'J. Folwarski T. Urbanowicz', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('dmo-r1-2', 'r1', 'P. Frączek M. Lew', null, 'M. Mazurek M. Niewiadomski', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        final: mkMatch('dmo-final', 'final', 'J. Folwarski T. Urbanowicz', null, 'M. Mazurek M. Niewiadomski', null, 7, 5, 6, 1, null, null, null, null, null, 'playerA'),
        third: mkMatch('dmo-third', 'third', 'O. Berent M. Wileński', 1, 'P. Frączek M. Lew', null, 6, 2, 6, 2, null, null, null, null, null, 'playerA')
      }
    },
    {
      id: 102,
      name: 'DEBLE MĘŻCZYŹNI 45+',
      players: 4,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'debel',
      gender: 'mezczyzni',
      level: '45+',
      limit: 4,
      format: 'elimination',
      seedsCount: 2,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('dm45-r1-1', 'r1', 'G. Czaus J. Ratajczak', 1, 'D. Adamczyk J. Łukasik', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('dm45-r1-2', 'r1', 'Ł. Matuszewski M. Więcek', null, 'K. Hunger M. Markowski', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        final: mkMatch('dm45-final', 'final', 'G. Czaus J. Ratajczak', null, 'K. Hunger M. Markowski', null, 6, 4, 6, 4, null, null, null, null, null, 'playerA'),
        third: mkMatch('dm45-third', 'third', 'D. Adamczyk J. Łukasik', null, 'Ł. Matuszewski M. Więcek', null, 6, 3, 6, 4, null, null, null, null, null, 'playerA')
      }
    },
    {
      id: 103,
      name: 'DEBLE MĘŻCZYŹNI 55+',
      players: 0,
      type: 'Każdy z każdym',
      status: 'finished',
      categoryType: 'debel',
      gender: 'mezczyzni',
      level: '55+',
      limit: 4,
      format: 'roundrobin',
      seedsCount: 0,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: null
    },
    {
      id: 104,
      name: 'MIKSTY OPEN',
      players: 11,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'mikst',
      gender: 'open',
      level: 'open',
      limit: 16,
      format: 'elimination',
      seedsCount: 4,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('mx-r1-1', 'r1', 'D. Grochowska W. Gajewski', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('mx-r1-2', 'r1', 'A. Kochańska-Bojdak A. Kochański', null, 'M. Zmysłowska P. Zmysłowski', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('mx-r1-3', 'r1', 'L. Ostrowska P. Becla', 3, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('mx-r1-4', 'r1', 'A. Bednarczyk-Mleczko R. Mleczko', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('mx-r1-5', 'r1', 'M. Niemiec R. Grzelewski', null, 'J. Pawłowska A. Borowicz', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('mx-r1-6', 'r1', '', null, 'E. Śliwa M. Śliwa', 4, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('mx-r1-7', 'r1', 'M. Mik-Piwowar W. Nowak', null, 'A. Bogusławska-Szulska A. Szulski', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('mx-r1-8', 'r1', '', null, 'G. Zając J. Pachowski', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        r2: [mkMatch('mx-r2-1', 'r2', 'D. Grochowska W. Gajewski', null, 'M. Zmysłowska P. Zmysłowski', null, 2, 6, 1, 6, null, null, null, null, null, 'playerB'), mkMatch('mx-r2-2', 'r2', 'L. Ostrowska P. Becla', null, 'A. Bednarczyk-Mleczko R. Mleczko', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('mx-r2-3', 'r2', 'M. Niemiec R. Grzelewski', null, 'E. Śliwa M. Śliwa', null, 4, 6, 1, 6, null, null, null, null, null, 'playerB'), mkMatch('mx-r2-4', 'r2', 'M. Mik-Piwowar W. Nowak', null, 'G. Zając J. Pachowski', null, 2, 6, 1, 6, null, null, null, null, null, 'playerB')],
        sf: [mkMatch('mx-sf-1', 'sf', 'M. Zmysłowska P. Zmysłowski', null, 'L. Ostrowska P. Becla', null, 3, 6, 2, 6, null, null, null, null, null, 'playerB'), mkMatch('mx-sf-2', 'sf', 'E. Śliwa M. Śliwa', null, 'G. Zając J. Pachowski', null, 4, 6, 2, 6, null, null, null, null, null, 'playerB')],
        final: mkMatch('mx-final', 'final', 'L. Ostrowska P. Becla', null, 'G. Zając J. Pachowski', null, 6, 7, 2, 6, null, null, null, null, null, 'playerB'),
        third: mkMatch('mx-third', 'third', 'M. Zmysłowska P. Zmysłowski', null, 'E. Śliwa M. Śliwa', 4, 0, 6, 2, 6, null, null, null, null, null, 'playerB')
      }
    },
    {
      id: 105,
      name: 'SINGLE MĘŻCZYŹNI OPEN',
      players: 23,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'mezczyzni',
      level: 'open',
      limit: 32,
      format: 'elimination',
      seedsCount: 8,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('smo-r1-1', 'r1', 'J. Folwarski', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smo-r1-2', 'r1', 'A. Borowicz', null, 'A. Drzewiecki', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smo-r1-3', 'r1', 'M. Kowalczyk', null, 'W. Nowak', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smo-r1-4', 'r1', '', null, 'T. Urbanowicz', 6, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smo-r1-5', 'r1', 'M. Tomczak', 3, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smo-r1-6', 'r1', 'M. Mazurek', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smo-r1-7', 'r1', 'P. Zmysłowski', null, 'M. Śliwa', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smo-r1-8', 'r1', '', null, 'K. Hunger', 7, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smo-r1-9', 'r1', 'M. Lew', 8, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smo-r1-10', 'r1', 'P. Ciałkowski', null, 'B. Popiela', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smo-r1-11', 'r1', 'V. Shupliak', null, 'W. Gajewski', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smo-r1-12', 'r1', '', null, 'R. Mleczko', 4, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smo-r1-13', 'r1', 'J. Pachowski', 5, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smo-r1-14', 'r1', 'O. Berent', null, 'J. Urbaniak', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smo-r1-15', 'r1', 'P. Osipowicz', null, 'P. Becla', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smo-r1-16', 'r1', '', null, 'T. Ginter', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        r2: [mkMatch('smo-r2-1', 'r2', 'J. Folwarski', null, 'A. Drzewiecki', null, 7, 5, 6, 4, null, null, null, null, null, 'playerA'), mkMatch('smo-r2-2', 'r2', 'W. Nowak', null, 'T. Urbanowicz', null, 6, 0, 6, 0, null, null, null, null, null, 'playerA'), mkMatch('smo-r2-3', 'r2', 'M. Tomczak', null, 'M. Mazurek', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smo-r2-4', 'r2', 'M. Śliwa', null, 'K. Hunger', null, 1, 6, 4, 6, null, null, null, null, null, 'playerB'), mkMatch('smo-r2-5', 'r2', 'M. Lew', null, 'P. Ciałkowski', null, 0, 6, 0, 6, null, null, null, null, null, 'playerB'), mkMatch('smo-r2-6', 'r2', 'W. Gajewski', null, 'R. Mleczko', null, 0, 6, 1, 6, null, null, null, null, null, 'playerB'), mkMatch('smo-r2-7', 'r2', 'J. Pachowski', null, 'O. Berent', null, 0, 6, 0, 6, null, null, null, null, null, 'playerB'), mkMatch('smo-r2-8', 'r2', 'P. Becla', null, 'T. Ginter', null, 0, 6, 0, 6, null, null, null, null, null, 'playerB')],
        qf: [mkMatch('smo-qf-1', 'qf', 'J. Folwarski', null, 'W. Nowak', null, 6, 0, 6, 2, null, null, null, null, null, 'playerA'), mkMatch('smo-qf-2', 'qf', 'M. Tomczak', null, 'K. Hunger', null, 6, 1, 6, 2, null, null, null, null, null, 'playerA'), mkMatch('smo-qf-3', 'qf', 'P. Ciałkowski', null, 'R. Mleczko', null, 6, 2, 6, 2, null, null, null, null, null, 'playerA'), mkMatch('smo-qf-4', 'qf', 'O. Berent', null, 'T. Ginter', null, 1, 6, 1, 6, null, null, null, null, null, 'playerB')],
        sf: [mkMatch('smo-sf-1', 'sf', 'J. Folwarski', null, 'M. Tomczak', null, 6, 4, 4, 6, 10, 7, null, null, null, 'playerA'), mkMatch('smo-sf-2', 'sf', 'P. Ciałkowski', null, 'T. Ginter', null, 6, 1, 6, 0, null, null, null, null, null, 'playerA')],
        final: mkMatch('smo-final', 'final', 'J. Folwarski', null, 'P. Ciałkowski', null, 6, 2, 6, 4, null, null, null, null, null, 'playerA'),
        third: mkMatch('smo-third', 'third', 'M. Tomczak', 3, 'T. Ginter', 2, 2, 6, 2, 6, null, null, null, null, null, 'playerB')
      }
    },
    {
      id: 106,
      name: 'SINGLE MĘŻCZYŹNI 45+',
      players: 13,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'mezczyzni',
      level: '45+',
      limit: 16,
      format: 'elimination',
      seedsCount: 4,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('sm45-r1-1', 'r1', 'G. Czaus', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm45-r1-2', 'r1', 'D. Adamczyk', null, 'Ł. Matuszewski', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm45-r1-3', 'r1', 'M. Gochowski', 4, 'M. Górski', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm45-r1-4', 'r1', 'R. Mielniczek', null, 'M. Mrówka', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm45-r1-5', 'r1', 'R. Grzelewski', null, 'A. Szulski', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sm45-r1-6', 'r1', '', null, 'M. Wieliński', 3, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sm45-r1-7', 'r1', 'P. Frączek', null, 'M. Więcek', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sm45-r1-8', 'r1', '', null, 'M. Niewiadomski', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        r2: [mkMatch('sm45-r2-1', 'r2', 'G. Czaus', null, 'D. Adamczyk', null, 2, 6, 6, 2, 14, 12, null, null, null, 'playerA'), mkMatch('sm45-r2-2', 'r2', 'M. Gochowski', null, 'R. Mielniczek', null, 6, 2, 6, 2, null, null, null, null, null, 'playerA'), mkMatch('sm45-r2-3', 'r2', 'A. Szulski', null, 'M. Wieliński', null, 0, 6, 0, 6, null, null, null, null, null, 'playerB'), mkMatch('sm45-r2-4', 'r2', 'M. Więcek', null, 'M. Niewiadomski', null, 4, 6, 7, 6, 5, 10, null, null, null, 'playerB')],
        sf: [mkMatch('sm45-sf-1', 'sf', 'G. Czaus', null, 'M. Gochowski', null, 6, 0, 6, 3, null, null, null, null, null, 'playerA'), mkMatch('sm45-sf-2', 'sf', 'M. Wieliński', null, 'M. Niewiadomski', null, 6, 3, 6, 2, null, null, null, null, null, 'playerA')],
        final: mkMatch('sm45-final', 'final', 'G. Czaus', null, 'M. Wieliński', null, 6, 4, 6, 7, 11, 9, null, null, null, 'playerA'),
        third: mkMatch('sm45-third', 'third', 'M. Gochowski', 4, 'M. Niewiadomski', 2, null, null, null, null, null, null, null, null, null, null)
      }
    },
    {
      id: 107,
      name: 'SINGLE MĘŻCZYŹNI 55+',
      players: 9,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'mezczyzni',
      level: '55+',
      limit: 16,
      format: 'elimination',
      seedsCount: 4,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('sm55-r1-1', 'r1', 'J. Łukasik', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55-r1-2', 'r1', 'M. Markowski', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55-r1-3', 'r1', 'P. Piaskowicki', 3, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55-r1-4', 'r1', 'R. Lamorski', null, 'J. Ratajczak', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sm55-r1-5', 'r1', 'T. Janiszewski', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55-r1-6', 'r1', '', null, 'K. Fiedor', 4, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sm55-r1-7', 'r1', 'W. Małecki', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55-r1-8', 'r1', '', null, 'W. Wowie', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        r2: [mkMatch('sm55-r2-1', 'r2', 'J. Łukasik', null, 'M. Markowski', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55-r2-2', 'r2', 'P. Piaskowicki', null, 'J. Ratajczak', null, 6, 4, 6, 3, null, null, null, null, null, 'playerA'), mkMatch('sm55-r2-3', 'r2', 'T. Janiszewski', null, 'K. Fiedor', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55-r2-4', 'r2', 'W. Małecki', null, 'W. Wowie', null, null, null, null, null, null, null, null, null, null, 'playerB')],
        sf: [mkMatch('sm55-sf-1', 'sf', 'J. Łukasik', null, 'P. Piaskowicki', null, 6, 0, 6, 1, null, null, null, null, null, 'playerA'), mkMatch('sm55-sf-2', 'sf', 'T. Janiszewski', null, 'W. Wowie', null, 1, 6, 0, 6, null, null, null, null, null, 'playerB')],
        final: mkMatch('sm55-final', 'final', 'J. Łukasik', null, 'W. Wowie', null, 6, 1, 6, 0, null, null, null, null, null, 'playerA'),
        third: mkMatch('sm55-third', 'third', 'P. Piaskowicki', 3, 'T. Janiszewski', null, 6, 2, 6, 2, null, null, null, null, null, 'playerA')
      }
    },
    {
      id: 108,
      name: 'SINGLE MĘŻCZYŹNI 65+',
      players: 6,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'mezczyzni',
      level: '65+',
      limit: 8,
      format: 'elimination',
      seedsCount: 2,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('sm65-r1-1', 'r1', 'B. Brzózka', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm65-r1-2', 'r1', 'T. Zaforymski', null, 'A. Wolny', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sm65-r1-3', 'r1', 'A. Kochański', null, 'P. Fischer', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sm65-r1-4', 'r1', '', null, 'A. Bartnik', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        sf: [mkMatch('sm65-sf-1', 'sf', 'B. Brzózka', null, 'A. Wolny', null, 6, 0, 6, 2, null, null, null, null, null, 'playerA'), mkMatch('sm65-sf-2', 'sf', 'P. Fischer', null, 'A. Bartnik', null, 6, 4, 1, 6, 6, 10, null, null, null, 'playerB')],
        final: mkMatch('sm65-final', 'final', 'B. Brzózka', null, 'A. Bartnik', null, 5, 7, 1, 6, null, null, null, null, null, 'playerB'),
        third: mkMatch('sm65-third', 'third', 'A. Wolny', null, 'P. Fischer', null, 6, 1, 4, 6, 8, 10, null, null, null, 'playerB')
      }
    },
    {
      id: 109,
      name: 'SINGLE KOBIETY OPEN',
      players: 21,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'kobiety',
      level: 'open',
      limit: 32,
      format: 'elimination',
      seedsCount: 8,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('sko-r1-1', 'r1', 'E. Śliwa', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-2', 'r1', 'A. Bonna', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-3', 'r1', 'M. Mejka', null, 'K. Wolak', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sko-r1-4', 'r1', '', null, 'M. Mik-Piwowar', 6, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sko-r1-5', 'r1', 'A. Wiśnicka-Trzaskowska', 3, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-6', 'r1', 'A. Olech', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-7', 'r1', 'K. Białk', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-8', 'r1', '', null, 'D. Grochowska', 5, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sko-r1-9', 'r1', 'A. Bartczak', 8, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-10', 'r1', 'M. Sikora-Nowak', null, 'N. Duczmal', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-11', 'r1', 'M. Zmysłowska', null, 'A. Oleszkiewicz', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-12', 'r1', '', null, 'G. Zając', 4, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sko-r1-13', 'r1', 'N. Niemiec', 7, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-14', 'r1', 'A. Skrzyńska-Elert', null, 'M. Zielińska', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-15', 'r1', 'A. Kochańska-Bojdak', null, 'J. Pawłowska', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r1-16', 'r1', '', null, 'L. Ostrowska', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        r2: [mkMatch('sko-r2-1', 'r2', 'E. Śliwa', null, 'A. Bonna', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r2-2', 'r2', 'K. Wolak', null, 'M. Mik-Piwowar', null, 5, 7, 1, 6, null, null, null, null, null, 'playerB'), mkMatch('sko-r2-3', 'r2', 'A. Wiśnicka-Trzaskowska', null, 'A. Olech', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sko-r2-4', 'r2', 'K. Białk', null, 'D. Grochowska', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sko-r2-5', 'r2', 'A. Bartczak', null, 'M. Sikora-Nowak', null, 2, 6, 1, 6, null, null, null, null, null, 'playerB'), mkMatch('sko-r2-6', 'r2', 'M. Zmysłowska', null, 'G. Zając', null, 6, 7, 4, 6, null, null, null, null, null, 'playerB'), mkMatch('sko-r2-7', 'r2', 'M. Niemiec', null, 'A. Skrzyńska-Elert', null, 6, 0, 6, 0, null, null, null, null, null, 'playerA'), mkMatch('sko-r2-8', 'r2', 'A. Kochańska-Bojdak', null, 'L. Ostrowska', null, 6, 7, 6, 7, null, null, null, null, null, 'playerB')],
        qf: [mkMatch('sko-qf-1', 'qf', 'E. Śliwa', null, 'M. Mik-Piwowar', null, 6, 1, 6, 1, null, null, null, null, null, 'playerA'), mkMatch('sko-qf-2', 'qf', 'A. Wiśnicka-Trzaskowska', null, 'D. Grochowska', null, 6, 0, 6, 1, null, null, null, null, null, 'playerA'), mkMatch('sko-qf-3', 'qf', 'M. Sikora-Nowak', null, 'G. Zając', null, 1, 6, 1, 6, null, null, null, null, null, 'playerB'), mkMatch('sko-qf-4', 'qf', 'M. Niemiec', null, 'L. Ostrowska', null, 1, 6, 1, 6, null, null, null, null, null, 'playerB')],
        sf: [mkMatch('sko-sf-1', 'sf', 'E. Śliwa', null, 'A. Wiśnicka-Trzaskowska', null, 6, 1, 6, 2, null, null, null, null, null, 'playerA'), mkMatch('sko-sf-2', 'sf', 'G. Zając', null, 'L. Ostrowska', null, 6, 1, 6, 0, null, null, null, null, null, 'playerA')],
        final: mkMatch('sko-final', 'final', 'E. Śliwa', null, 'G. Zając', null, 5, 7, 7, 6, 10, 7, null, null, null, 'playerA'),
        third: mkMatch('sko-third', 'third', 'A. Wiśnicka-Trzaskowska', 3, 'L. Ostrowska', 2, 3, 6, 1, 6, null, null, null, null, null, 'playerB')
      }
    },
    {
      id: 110,
      name: 'SINGLE KOBIETY 45+',
      players: 11,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'kobiety',
      level: '45+',
      limit: 16,
      format: 'elimination',
      seedsCount: 4,
      dateStart: '2026-06-12',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('sk45-r1-1', 'r1', 'E. Sakwerda', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sk45-r1-2', 'r1', 'D. Gotkiewicz', null, 'A. Bogusławska-Szulska', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sk45-r1-3', 'r1', 'M. Górska', 3, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sk45-r1-4', 'r1', 'O. Knapik', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sk45-r1-5', 'r1', 'J. Małecka', null, 'K. Tarnawska', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sk45-r1-6', 'r1', '', null, 'A. Jamska-Kulka', 4, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sk45-r1-7', 'r1', 'P. Paczkowska', null, 'A. Bednarczyk-Mleczko', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sk45-r1-8', 'r1', '', null, 'K. Żołnierek-Mazurek', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        r2: [mkMatch('sk45-r2-1', 'r2', 'E. Sakwerda', null, 'A. Bogusławska-Szulska', null, 2, 6, 6, 2, 10, 8, null, null, null, 'playerA'), mkMatch('sk45-r2-2', 'r2', 'M. Górska', null, 'O. Knapik', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sk45-r2-3', 'r2', 'K. Tarnawska', null, 'A. Jamska-Kulka', null, 3, 6, 4, 6, null, null, null, null, null, 'playerB'), mkMatch('sk45-r2-4', 'r2', 'A. Bednarczyk-Mleczko', null, 'K. Żołnierek-Mazurek', null, 2, 6, 2, 6, null, null, null, null, null, 'playerB')],
        sf: [mkMatch('sk45-sf-1', 'sf', 'E. Sakwerda', null, 'M. Górska', null, 6, 2, 6, 2, null, null, null, null, null, 'playerA'), mkMatch('sk45-sf-2', 'sf', 'A. Jamska-Kulka', null, 'K. Żołnierek-Mazurek', null, 6, 4, 6, 3, null, null, null, null, null, 'playerA')],
        final: mkMatch('sk45-final', 'final', 'E. Sakwerda', null, 'A. Jamska-Kulka', null, 3, 6, 6, 3, 10, 8, null, null, null, 'playerA'),
        third: mkMatch('sk45-third', 'third', 'M. Górska', 3, 'K. Żołnierek-Mazurek', 2, 6, 4, 6, 4, null, null, null, null, null, 'playerA')
      }
    },
    {
      id: 111,
      name: 'SINGLE MĘŻCZYŹNI OPEN - TURNIEJ POCIESZENIA',
      players: 9,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'mezczyzni',
      level: 'open',
      limit: 16,
      format: 'elimination',
      seedsCount: 4,
      dateStart: '2026-06-08',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('smop-r1-1', 'r1', 'J. Pachowski', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smop-r1-2', 'r1', 'M. Kowalczyk', null, 'V. Shupliak', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smop-r1-3', 'r1', 'M. Lew', 3, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smop-r1-4', 'r1', 'J. Urbaniak', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smop-r1-5', 'r1', 'P. Osipowicz', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smop-r1-6', 'r1', '', null, 'A. Borowicz', 4, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smop-r1-7', 'r1', 'B. Popiela', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smop-r1-8', 'r1', '', null, 'T. Urbanowicz', 2, null, null, null, null, null, null, null, null, null, 'playerB')],
        r2: [mkMatch('smop-r2-1', 'r2', 'J. Pachowski', null, 'M. Kowalczyk', null, 6, 3, null, null, null, null, null, null, null, 'playerA'), mkMatch('smop-r2-2', 'r2', 'M. Lew', null, 'J. Urbaniak', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('smop-r2-3', 'r2', 'P. Osipowicz', null, 'A. Borowicz', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('smop-r2-4', 'r2', 'B. Popiela', null, 'T. Urbanowicz', null, null, null, null, null, null, null, null, null, null, 'playerB')],
        sf: [mkMatch('smop-sf-1', 'sf', 'J. Pachowski', null, 'M. Lew', null, 1, 6, null, null, null, null, null, null, null, 'playerB'), mkMatch('smop-sf-2', 'sf', 'A. Borowicz', null, 'T. Urbanowicz', null, 0, 6, null, null, null, null, null, null, null, 'playerB')],
        final: mkMatch('smop-final', 'final', 'M. Lew', null, 'T. Urbanowicz', null, 5, 7, null, null, null, null, null, null, null, 'playerB')
      }
    },
    {
      id: 112,
      name: 'SINGLE MĘŻCZYŹNI 45+ - TURNIEJ POCIESZENIA',
      players: 5,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'mezczyzni',
      level: '45+',
      limit: 8,
      format: 'elimination',
      seedsCount: 0,
      dateStart: '2026-06-08',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('sm45p-r1-1', 'r1', 'P. Frączek', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm45p-r1-2', 'r1', 'R. Grzelewski', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm45p-r1-3', 'r1', 'Ł. Matuszewski', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm45p-r1-4', 'r1', 'M. Górski', null, 'M. Mrówka', null, null, null, null, null, null, null, null, null, null, 'playerA')],
        sf: [mkMatch('sm45p-sf-1', 'sf', 'P. Frączek', null, 'R. Grzelewski', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm45p-sf-2', 'sf', 'Ł. Matuszewski', null, 'M. Górski', null, 1, 6, null, null, null, null, null, null, null, 'playerB')],
        final: mkMatch('sm45p-final', 'final', 'P. Frączek', null, 'M. Górski', null, 7, 6, null, null, null, null, null, null, null, 'playerA')
      }
    },
    {
      id: 113,
      name: 'SINGLE MĘŻCZYŹNI 55+ - TURNIEJ POCIESZENIA',
      players: 5,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'mezczyzni',
      level: '55+',
      limit: 8,
      format: 'elimination',
      seedsCount: 0,
      dateStart: '2026-06-08',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('sm55p-r1-1', 'r1', 'M. Markowski', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55p-r1-2', 'r1', 'T. Zaforymski', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55p-r1-3', 'r1', 'R. Lamorski', null, 'W. Małecki', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('sm55p-r1-4', 'r1', 'A. Kochański', null, '', null, null, null, null, null, null, null, null, null, null, 'playerA')],
        sf: [mkMatch('sm55p-sf-1', 'sf', 'M. Markowski', null, 'T. Zaforymski', null, null, null, null, null, null, null, null, null, null, 'playerB'), mkMatch('sm55p-sf-2', 'sf', 'R. Lamorski', null, 'A. Kochański', null, 6, 0, null, null, null, null, null, null, null, 'playerA')],
        final: mkMatch('sm55p-final', 'final', 'T. Zaforymski', null, 'R. Lamorski', null, 2, 6, null, null, null, null, null, null, null, 'playerB')
      }
    },
    {
      id: 114,
      name: 'SINGLE KOBIETY OPEN - TURNIEJ POCIESZENIA',
      players: 7,
      type: 'Drabinka',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'kobiety',
      level: 'open',
      limit: 8,
      format: 'elimination',
      seedsCount: 2,
      dateStart: '2026-06-08',
      timeStart: '12:00',
      participants: [],
      bracket: {
        r1: [mkMatch('skop-r1-1', 'r1', 'A. Bartczak', 1, '', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('skop-r1-2', 'r1', 'A. Bonna', null, 'M. Zielińska', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('skop-r1-3', 'r1', 'K. Białk', null, 'N. Duczmal', null, null, null, null, null, null, null, null, null, null, 'playerA'), mkMatch('skop-r1-4', 'r1', 'M. Mejka', null, 'J. Pawłowska', 2, null, null, null, null, null, null, null, null, null, 'playerA')],
        sf: [mkMatch('skop-sf-1', 'sf', 'A. Bartczak', null, 'A. Bonna', null, 0, 6, null, null, null, null, null, null, null, 'playerB'), mkMatch('skop-sf-2', 'sf', 'K. Białk', null, 'M. Mejka', null, 6, 4, null, null, null, null, null, null, null, 'playerA')],
        final: mkMatch('skop-final', 'final', 'A. Bonna', null, 'K. Białk', null, 6, 1, null, null, null, null, null, null, null, 'playerA')
      }
    },
    {
      id: 115,
      name: 'SINGLE KOBIETY 45+ - TURNIEJ POCIESZENIA',
      players: 0,
      type: 'Każdy z każdym',
      status: 'finished',
      categoryType: 'singiel',
      gender: 'kobiety',
      level: '45+',
      limit: 4,
      format: 'roundrobin',
      seedsCount: 0,
      dateStart: '2026-06-08',
      timeStart: '12:00',
      participants: [],
      bracket: null
    }
  ]
};

const mockTournaments = [
  archicup2026Tournament,
  {
    id: 1,
    name: "M-ACTIVE Summer Cup 2026",
    shortDesc: "Weekendowy turniej tenisowy organizowany przez M-ACTIVE dla zawodników amatorskich. System prezentuje informacje organizacyjne, kategorie oraz aktualne drabinki turniejowe.",
    dateStart: "2026-07-04",
    dateEnd: "2026-07-06",
    location: "Kortex Tenis Club, Warszawa",
    organizer: "M-ACTIVE",
    status: "active",
    categories: [
      { id: 1, name: "Debel kobiety open",      players: 8,  type: "Drabinka",        status: "active",   bracket: womenDoublesBracket, categoryType: 'debel',   gender: 'kobiety',    level: 'open', limit: 8,  format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
      { id: 2, name: "Debel mężczyźni open",    players: 8,  type: "Drabinka",        status: "active",   bracket: null,                categoryType: 'debel',   gender: 'mezczyzni',  level: 'open', limit: 8,  format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
      { id: 3, name: "Singiel mężczyźni open",  players: 8,  type: "Drabinka",        status: "active",   bracket: menSinglesBracket,   categoryType: 'singiel', gender: 'mezczyzni',  level: 'open', limit: 8,  format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
      { id: 4, name: "Singiel kobiety open",    players: 6,  type: "Drabinka",        status: "planned",  bracket: null,                categoryType: 'singiel', gender: 'kobiety',    level: 'open', limit: 8,  format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
      { id: 5, name: "Mikst open",              players: 8,  type: "Drabinka",        status: "active",   bracket: mixedOpenBracket,    categoryType: 'mikst',   gender: 'open',       level: 'open', limit: 8,  format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
      { id: 6, name: "Turniej pocieszenia",     players: 4,  type: "Każdy z każdym",  status: "planned",  bracket: null,                categoryType: 'debel',   gender: 'open',       level: 'open', limit: 8,  format: 'roundrobin',  seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
    ]
  },
  {
    id: 2,
    name: "M-ACTIVE Ladies Doubles",
    shortDesc: "Turniej deblowy dedykowany zawodniczkom. Elegancka rywalizacja w dwóch kategoriach zaawansowania — otwarty i zaawansowany.",
    dateStart: "2026-08-15",
    dateEnd: "2026-08-16",
    location: "Sport Park Wilanów, Warszawa",
    organizer: "M-ACTIVE",
    status: "planned",
    categories: [
      { id: 7, name: "Debel kobiety open",      players: 8,  type: "Drabinka",       status: "planned", bracket: null, categoryType: 'debel', gender: 'kobiety', level: 'open', limit: 8,  format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
      { id: 8, name: "Debel kobiety advanced",  players: 8,  type: "Drabinka",       status: "planned", bracket: null, categoryType: 'debel', gender: 'kobiety', level: 'zaawansowany', limit: 8,  format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
    ]
  },
  {
    id: 3,
    name: "M-ACTIVE Open Weekend",
    shortDesc: "Weekendowy maraton tenisowy dla wszystkich poziomów zaawansowania. Trzy dni intensywnej rywalizacji w czterech kategoriach.",
    dateStart: "2026-05-10",
    dateEnd: "2026-05-12",
    location: "Legia Tenis Club, Warszawa",
    organizer: "M-ACTIVE",
    status: "finished",
    categories: [
      { id: 9,  name: "Singiel mężczyźni open", players: 12, type: "Drabinka",       status: "finished", bracket: null, categoryType: 'singiel', gender: 'mezczyzni', level: 'open', limit: 16, format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
      { id: 10, name: "Singiel kobiety open",   players: 8,  type: "Drabinka",       status: "finished", bracket: null, categoryType: 'singiel', gender: 'kobiety',   level: 'open', limit: 8,  format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
      { id: 11, name: "Debel mieszany open",    players: 8,  type: "Drabinka",       status: "finished", bracket: null, categoryType: 'debel',   gender: 'open',      level: 'open', limit: 8,  format: 'elimination', seedsCount: 2, dateStart: null, timeStart: null, participants: [] },
      { id: 12, name: "Turniej seniors 40+",    players: 6,  type: "Każdy z każdym", status: "finished", bracket: null, categoryType: 'singiel', gender: 'mezczyzni', level: 'open', limit: 8,  format: 'roundrobin',  seedsCount: 0, dateStart: null, timeStart: null, participants: [] },
    ]
  }
];

/* =============================================
   STATE
   ============================================= */

const state = {
  view: 'admin',
  adminLoggedIn: false,
  adminSection: 'dashboard',
  publicSection: 'home',
  selectedTournamentId: 1,
  selectedCategoryId: 1,
  selectedCategoryDetailId: null,
  editingTournamentId: null,
  pdfTournamentId: null,
  tournaments: [...mockTournaments],
  categories: [],
  _pendingDraw: null
};

/* =============================================
   VIEW SWITCHING
   ============================================= */

function _switchView(v, skipHistory) {
  state.view = v;
  document.getElementById('admin-view').classList.toggle('hidden', v !== 'admin');
  document.getElementById('public-view').classList.toggle('hidden', v !== 'public');
  document.getElementById('btn-admin').classList.toggle('active', v === 'admin');
  document.getElementById('btn-public').classList.toggle('active', v !== 'admin');
  if (v === 'public' && !skipHistory) _renderPublicHome(true);
}

function switchView(v) {
  _switchView(v);
  if (v === 'public') navigate('public');
  else navigate('admin');
}

/* =============================================
   DARK MODE
   ============================================= */

function toggleDarkMode() {
  const dark = document.body.classList.toggle('dark');
  document.getElementById('dark-toggle-icon').textContent = dark ? '☀️' : '🌙';
  try { localStorage.setItem('mactive-dark', dark ? '1' : '0'); } catch(e) {}
}

function initDarkMode() {
  try {
    if (localStorage.getItem('mactive-dark') === '1') {
      document.body.classList.add('dark');
      document.getElementById('dark-toggle-icon').textContent = '☀️';
    }
  } catch(e) {}
}

/* =============================================
   HASH ROUTER
   ============================================= */

function navigate(hash, replace) {
  if (replace) {
    history.replaceState(null, '', '#' + hash);
  } else {
    history.pushState(null, '', '#' + hash);
  }
}

function routeCurrentHash() {
  const raw = location.hash.replace(/^#/, '') || '';
  const parts = raw.split('/');
  const section = parts[0];

  if (section === 'public') {
    const tId  = parseInt(parts[1]);
    const cId  = parseInt(parts[2]);
    _switchView('public', true);
    if (!isNaN(tId) && !isNaN(cId)) {
      _showBracket(tId, cId, true);
    } else if (!isNaN(tId)) {
      _showPublicTournamentDetail(tId, true);
    } else {
      _renderPublicHome(true);
    }
  } else {
    // admin section
    _switchView('admin', true);
    if (!state.adminLoggedIn) return;
    const sub = parts[1];
    if (sub === 'tournaments' && parts[2] && parts[3] === 'cat' && parts[4]) {
      showTournamentDetail(parseInt(parts[2]), true);
      showCategoryDetail(parseInt(parts[2]), parseInt(parts[4]), true);
    }
    else if (sub === 'tournaments' && parts[2] && !isNaN(parseInt(parts[2]))) {
      showTournamentDetail(parseInt(parts[2]), true);
    }
    else if (sub === 'tournaments') _showSection('tournaments', true);
    else if (sub === 'add-tournament') _showSection('add-tournament', true);
    else if (sub === 'edit' && parts[2]) { state.editingTournamentId = parseInt(parts[2]); _showSection('edit-tournament', true); }
    else if (sub === 'organizer') _showSection('organizer', true);
    else if (sub === 'settings') _showSection('settings', true);
    else _showSection('dashboard', true);
  }
}

window.addEventListener('popstate', routeCurrentHash);

/* =============================================
   TOAST
   ============================================= */

function showToast(msg) {
  const container = document.getElementById('toast');
  const el = document.createElement('div');
  el.className = 'toast-item';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 3100);
}

/* =============================================
   MODAL HELPERS
   ============================================= */

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

/* =============================================
   ADMIN — Login
   ============================================= */

function adminLogin() {
  const email = document.getElementById('login-email').value.trim();
  if (!email) {
    showToast('Podaj adres e-mail');
    return;
  }
  state.adminLoggedIn = true;
  document.getElementById('admin-login').classList.add('hidden');
  document.getElementById('admin-app').classList.remove('hidden');
  showToast('Zalogowano jako ' + email);
  navigate('admin', true);  // replace, nie push — żeby back nie wracał do loginu
  showSection('dashboard');
}

function adminLogout() {
  state.adminLoggedIn = false;
  document.getElementById('admin-app').classList.add('hidden');
  document.getElementById('admin-login').classList.remove('hidden');
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

/* =============================================
   ADMIN — Section Navigation
   ============================================= */

const sectionTitles = {
  dashboard:           'Dashboard',
  organizer:           'Dane M-ACTIVE',
  tournaments:         'Turnieje',
  'add-tournament':    'Dodaj turniej',
  'edit-tournament':   'Edytuj turniej',
  settings:            'Ustawienia',
  'tournament-detail': 'Turniej',
  'category-detail':   'Kategoria'
};

function _showSection(name, skipHistory) {
  state.adminSection = name;
  document.querySelectorAll('.sidebar-item').forEach(btn => btn.classList.remove('active'));
  const navBtn = document.getElementById('nav-' + name);
  if (navBtn) navBtn.classList.add('active');
  document.querySelectorAll('.admin-section-content').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById('sec-' + name);
  if (target) target.classList.remove('hidden');
  document.getElementById('topbar-title').textContent = sectionTitles[name] || name;
  if (name === 'dashboard') renderDashboard();
  if (name === 'tournaments') renderAdminTournamentList();
  renderAdminBreadcrumb(name);
}

function showSection(name) {
  _showSection(name);
  const hashMap = {
    dashboard: 'admin',
    organizer: 'admin/organizer',
    tournaments: 'admin/tournaments',
    'add-tournament': 'admin/add-tournament',
    settings: 'admin/settings',
  };
  if (name === 'edit-tournament' && state.editingTournamentId) {
    navigate('admin/edit/' + state.editingTournamentId);
  } else {
    navigate(hashMap[name] || 'admin');
  }
}

function renderAdminBreadcrumb(section, t) {
  const el = document.getElementById('admin-breadcrumb');
  if (!el) return;

  if (section === 'tournament-detail' && t) {
    el.innerHTML = `
      <span class="bc-link" onclick="navigate('admin')">Dashboard</span>
      <span class="breadcrumb-sep">/</span>
      <span class="bc-link" onclick="showSection('tournaments')">Turnieje</span>
      <span class="breadcrumb-sep">/</span>
      <span class="bc-current">${t.name}</span>`;
    return;
  }

  const crumbs = {
    dashboard:        [['Dashboard', null]],
    organizer:        [['Dashboard', 'admin'], ['Dane M-ACTIVE', null]],
    tournaments:      [['Dashboard', 'admin'], ['Turnieje', null]],
    'add-tournament': [['Dashboard', 'admin'], ['Turnieje', 'admin/tournaments'], ['Dodaj turniej', null]],
    'edit-tournament':[['Dashboard', 'admin'], ['Turnieje', 'admin/tournaments'], ['Edytuj turniej', null]],
    settings:         [['Dashboard', 'admin'], ['Ustawienia', null]],
    'tournament-detail': [['Dashboard', 'admin'], ['Turnieje', 'admin/tournaments'], ['Turniej', null]],
    'category-detail':   [['Dashboard', 'admin'], ['Turnieje', 'admin/tournaments'], ['Turniej', null], ['Kategoria', null]],
  };

  const items = crumbs[section] || [['Dashboard', null]];
  el.innerHTML = items.map(([ label, hash ], i) =>
    hash
      ? `<span class="bc-link" onclick="navigate('${hash}')">${label}</span><span class="breadcrumb-sep">/</span>`
      : `<span class="bc-current">${label}</span>`
  ).join('');
}

/* =============================================
   ADMIN — Dashboard
   ============================================= */

function renderDashboard() {
  renderStatsCards();
  renderDashboardTournamentList();
}

function renderStatsCards() {
  const totalCategories = state.tournaments.reduce((s, t) => s + t.categories.length, 0);
  const totalPlayers    = state.tournaments.reduce((s, t) =>
    s + t.categories.reduce((cs, c) => cs + c.players, 0), 0);
  const active = state.tournaments.filter(t => t.status === 'active').length;

  const stats = [
    { icon: '🏆', label: 'Aktywne turnieje', value: active, desc: `z ${state.tournaments.length} łącznie` },
    { icon: '📋', label: 'Liczba kategorii',  value: totalCategories, desc: 'we wszystkich turniejach' },
    { icon: '👤', label: 'Zawodnicy / pary',  value: totalPlayers, desc: 'łącznie we wszystkich kategoriach' },
    { icon: '📄', label: 'Wygenerowane PDF',  value: 7, desc: 'w tym miesiącu' },
  ];

  document.getElementById('stats-grid').innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-icon">${s.icon}</div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-desc">${s.desc}</div>
    </div>`).join('');
}

function renderDashboardTournamentList() {
  const html = state.tournaments.slice(0, 3).map(t => `
    <div class="form-panel" style="margin-bottom:14px;padding:18px 22px">
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <div style="flex:1;min-width:200px">
          <div style="font-weight:700;font-size:14.5px;margin-bottom:3px">${t.name}</div>
          <div style="font-size:12.5px;color:var(--text-muted)">📅 ${formatDate(t.dateStart)} — ${formatDate(t.dateEnd)} &nbsp;·&nbsp; 📍 ${t.location}</div>
        </div>
        ${badgeHtml(t.status)}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm" onclick="showSection('tournaments')">Edytuj</button>
          <button class="btn btn-ghost btn-sm" onclick="openPdfModal(${t.id})">📄 PDF</button>
        </div>
      </div>
    </div>`).join('');

  document.getElementById('dashboard-tournament-list').innerHTML = html;
}

/* =============================================
   ADMIN — Tournament List
   ============================================= */

function renderAdminTournamentList() {
  const tbody = document.getElementById('admin-tournament-tbody');
  tbody.innerHTML = state.tournaments.map(t => `
    <tr>
      <td>
        <div class="t-name">${t.name}</div>
        <div class="t-sub">${(t.shortDesc||'').substring(0, 60)}…</div>
      </td>
      <td style="white-space:nowrap;font-size:13px">${formatDate(t.dateStart)}<br><span style="color:var(--text-muted)">do ${formatDate(t.dateEnd)}</span></td>
      <td style="font-size:13px;color:var(--text-muted)">${t.location}</td>
      <td style="font-size:13px;text-align:center">${t.categories.length}</td>
      <td>${badgeHtml(t.status)}</td>
      <td>
        <div class="t-actions">
          <button class="btn btn-primary btn-sm" onclick="showTournamentDetail(${t.id})">📋 Szczegóły</button>
          <button class="btn btn-secondary btn-sm" onclick="editTournament(${t.id})">✏️ Edytuj</button>
          <button class="btn btn-ghost btn-sm" onclick="openPublicPreview(${t.id})">🌐 Podgląd</button>
          <button class="btn btn-ghost btn-sm" onclick="openPdfModal(${t.id})">📄 PDF</button>
        </div>
      </td>
    </tr>`).join('');
}

/* =============================================
   ADMIN — Edit Tournament
   ============================================= */

let editCategories = [];

function editTournament(id) {
  const t = state.tournaments.find(t => t.id === id);
  if (!t) return;
  state.editingTournamentId = id;

  document.getElementById('edit-tournament-name-banner').textContent = t.name;
  document.getElementById('et-name').value      = t.name;
  document.getElementById('et-desc').value      = t.shortDesc;
  document.getElementById('et-start').value     = t.dateStart;
  document.getElementById('et-end').value       = t.dateEnd;
  document.getElementById('et-location').value  = t.location;
  document.getElementById('et-status').value    = t.status;

  editCategories = t.categories.map(c => c.name);
  renderEditCategoryTags();
  showSection('edit-tournament');
}

function addEditCategory() {
  const input = document.getElementById('edit-new-category-input');
  const val = input.value.trim();
  if (!val || editCategories.includes(val)) return;
  editCategories.push(val);
  input.value = '';
  renderEditCategoryTags();
}

function removeEditCategory(name) {
  editCategories = editCategories.filter(c => c !== name);
  renderEditCategoryTags();
}

function renderEditCategoryTags() {
  document.getElementById('edit-category-tags').innerHTML = editCategories.map(c => `
    <div class="category-tag">
      ${c}
      <button onclick="removeEditCategory('${c.replace(/'/g, "\\'")}')">×</button>
    </div>`).join('');
}

function updateTournament() {
  const id  = state.editingTournamentId;
  const t   = state.tournaments.find(t => t.id === id);
  if (!t) return;

  t.name      = document.getElementById('et-name').value.trim() || t.name;
  t.shortDesc = document.getElementById('et-desc').value || t.shortDesc;
  t.dateStart = document.getElementById('et-start').value || t.dateStart;
  t.dateEnd   = document.getElementById('et-end').value   || t.dateEnd;
  t.location  = document.getElementById('et-location').value || t.location;
  t.status    = document.getElementById('et-status').value;

  // Merge categories — keep existing bracket data, add new ones
  const existingMap = Object.fromEntries(t.categories.map(c => [c.name, c]));
  t.categories = editCategories.map((name, i) =>
    existingMap[name] || { id: 200 + i, name, players: 8, type: 'Drabinka', status: 'planned', bracket: null }
  );

  state.editingTournamentId = null;
  showToast(`Turniej „${t.name}" został zaktualizowany.`);
  showSection('tournaments');
}

/* =============================================
   ADMIN — Organizer Data Save
   ============================================= */

function saveOrgData() {
  showToast('Dane organizatora zostały zapisane.');
}

/* =============================================
   ADMIN — Add Tournament Form
   ============================================= */

let formCategories = [];

function addCategory() {
  const input = document.getElementById('new-category-input');
  const val = input.value.trim();
  if (!val) return;
  if (formCategories.includes(val)) { showToast('Ta kategoria już istnieje'); return; }
  formCategories.push(val);
  input.value = '';
  renderCategoryTags();
}

function removeCategory(name) {
  formCategories = formCategories.filter(c => c !== name);
  renderCategoryTags();
}

const defaultCategories = [
  "Debel kobiety open",
  "Debel mężczyźni open",
  "Singiel mężczyźni open",
  "Singiel kobiety open",
  "Mikst open",
  "Turniej pocieszenia"
];

function addDefaultCategories() {
  defaultCategories.forEach(c => {
    if (!formCategories.includes(c)) formCategories.push(c);
  });
  renderCategoryTags();
  showToast('Dodano domyślne kategorie');
}

function renderCategoryTags() {
  document.getElementById('category-tags').innerHTML = formCategories.map(c => `
    <div class="category-tag">
      ${c}
      <button onclick="removeCategory('${c.replace(/'/g, "\\'")}')" title="Usuń">×</button>
    </div>`).join('');
}

function saveTournament() {
  const name = document.getElementById('t-name').value.trim();
  if (!name) { showToast('Podaj nazwę turnieju'); return; }

  const newT = {
    id: state.tournaments.length + 10,
    name,
    shortDesc: document.getElementById('t-desc').value || 'Nowy turniej M-ACTIVE',
    dateStart: document.getElementById('t-start').value || '2026-09-01',
    dateEnd:   document.getElementById('t-end').value   || '2026-09-02',
    location:  document.getElementById('t-location').value || 'Lokalizacja TBD',
    organizer: document.getElementById('t-organizer').value || 'M-ACTIVE',
    status: 'planned',
    categories: formCategories.map((c, i) => ({
      id: 100 + i,
      name: c,
      players: 8,
      type: 'Drabinka',
      status: 'planned',
      bracket: null
    }))
  };

  state.tournaments.unshift(newT);
  openModal('modal-saved');
}

function resetTournamentForm() {
  ['t-name','t-desc','t-location'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('t-start').value = '';
  document.getElementById('t-end').value = '';
  document.getElementById('t-organizer').value = 'M-ACTIVE';
  formCategories = [];
  renderCategoryTags();
}

function goToTournamentList() {
  closeModal('modal-saved');
  showSection('tournaments');
}

/* =============================================
   ADMIN — PDF Modal
   ============================================= */

function openPdfModal(id) {
  state.pdfTournamentId = id;
  openModal('modal-pdf-trigger');
}

function openPublicPreview(id) {
  state.selectedTournamentId = id;
  switchView('public');
  showPublicTournamentDetail(id);
}

/* =============================================
   PDF PREVIEW
   ============================================= */

function openPdfPreview() {
  closeModal('modal-pdf-trigger');
  const mode = document.querySelector('input[name="pdf-mode"]:checked')?.value || 'current';
  const isBlank = mode === 'blank';
  renderPdfBrackets(isBlank);
  document.getElementById('pdf-preview').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePdfPreview() {
  document.getElementById('pdf-preview').classList.add('hidden');
  document.body.style.overflow = '';
}

function renderPdfBrackets(isBlank) {
  document.getElementById('pdf-bracket-women').innerHTML = buildBracketHTML(womenDoublesBracket, true, false, isBlank);
  document.getElementById('pdf-bracket-men').innerHTML   = buildBracketHTML(menSinglesBracket, true, false, isBlank);
}

/* =============================================
   PUBLIC — Home
   ============================================= */

function _renderPublicHome(skipHistory) {
  showPubSection('home');
  const grid = document.getElementById('pub-tournaments-grid');
  grid.innerHTML = state.tournaments.map(t => `
    <div class="tournament-card" onclick="showPublicTournamentDetail(${t.id})">
      <div class="tc-header">
        <div class="tc-name">${t.name}</div>
        ${badgeHtml(t.status)}
      </div>
      <div class="tc-meta">
        <div class="tc-meta-item"><span class="tc-meta-icon">📅</span>${formatDate(t.dateStart)} – ${formatDate(t.dateEnd)}</div>
        <div class="tc-meta-item"><span class="tc-meta-icon">📍</span>${t.location}</div>
        <div class="tc-meta-item"><span class="tc-meta-icon">🏢</span>${t.organizer}</div>
      </div>
      <div class="tc-desc">${t.shortDesc}</div>
      <div class="tc-footer">
        <div class="tc-categories">📋 ${t.categories.length} ${pl(t.categories.length, 'kategoria', 'kategorie', 'kategorii')}</div>
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();showPublicTournamentDetail(${t.id})">
          Zobacz szczegóły →
        </button>
      </div>
    </div>`).join('');
}

function renderPublicHome() {
  _renderPublicHome();
  navigate('public');
}

function goPublicHome() {
  navigate('public');
}

/* =============================================
   PUBLIC — Tournament Detail
   ============================================= */

function _showPublicTournamentDetail(id, skipHistory) {
  const t = state.tournaments.find(t => t.id === id);
  if (!t) return;
  state.selectedTournamentId = id;
  showPubSection('detail');

  document.getElementById('detail-breadcrumb').innerHTML = `
    <span class="bc-link" onclick="navigate('public')">Turnieje</span>
    <span class="breadcrumb-sep">/</span>
    <span>${t.name}</span>`;
  document.getElementById('detail-name').textContent = t.name;
  document.getElementById('detail-badge').innerHTML = badgeHtml(t.status);
  document.getElementById('detail-dates').textContent = formatDate(t.dateStart) + ' – ' + formatDate(t.dateEnd);
  document.getElementById('detail-location').textContent = t.location;
  document.getElementById('detail-organizer').textContent = t.organizer;
  document.getElementById('detail-description').textContent = t.shortDesc + ' Zawodnicy rywalizują w atmosferze sportowej fair play, a wyniki na bieżąco aktualizowane są przez sędziów turnieju.';

  document.getElementById('detail-org-info').innerHTML = `
    <div class="org-row"><span class="org-label">Organizator</span><span>${mockOrganizer.fullName}</span></div>
    <div class="org-row"><span class="org-label">Adres</span><span>${mockOrganizer.address}</span></div>
    <div class="org-row"><span class="org-label">Telefon</span><span>${mockOrganizer.phone}</span></div>
    <div class="org-row"><span class="org-label">E-mail</span><span>${mockOrganizer.email}</span></div>
    <div class="org-row"><span class="org-label">WWW</span><span>${mockOrganizer.website}</span></div>`;

  document.getElementById('pub-categories-grid').innerHTML = t.categories.map(c => `
    <div class="category-card" onclick="showBracket(${t.id}, ${c.id})">
      <div class="cc-name">${c.name}</div>
      <div class="cc-type">${c.type}</div>
      <div class="cc-meta">
        <span>👥 ${c.players} ${c.players <= 4 ? 'zawodników' : c.name.includes('Debel') || c.name.includes('Mikst') ? 'par' : 'zawodników'}</span>
        <span>${badgeHtml(c.status)}</span>
      </div>
      <button class="btn btn-primary btn-sm" style="margin-top:6px;align-self:flex-start">
        Zobacz drabinkę →
      </button>
    </div>`).join('');
}

function showPublicTournamentDetail(id) {
  _showPublicTournamentDetail(id);
  navigate('public/' + id);
}

/* =============================================
   PUBLIC — Bracket View
   ============================================= */

function _showBracket(tournamentId, categoryId, skipHistory) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;

  state.selectedTournamentId = tournamentId;
  state.selectedCategoryId   = categoryId;
  showPubSection('bracket');

  document.getElementById('bracket-breadcrumb').innerHTML = `
    <span class="bc-link" onclick="navigate('public')">Turnieje</span>
    <span class="breadcrumb-sep">/</span>
    <span class="bc-link" onclick="navigate('public/${t.id}')">${t.name}</span>
    <span class="breadcrumb-sep">/</span>
    <span class="current">${cat.name}</span>`;

  document.getElementById('bracket-back-btn').onclick = () => navigate('public/' + t.id);

  document.getElementById('bracket-category-title').textContent = cat.name;
  document.getElementById('bracket-meta').innerHTML = `
    <span>📋 ${cat.type}</span>
    <span>👥 ${cat.players} ${cat.name.includes('Debel') || cat.name.includes('Mikst') ? 'par' : 'zawodników'}</span>
    <span>📅 ${formatDate(t.dateStart)} – ${formatDate(t.dateEnd)}</span>
    <span>${badgeHtml(cat.status)}</span>`;

  document.getElementById('bracket-category-switcher').innerHTML =
    t.categories.map(c => `
      <button class="cat-pill ${c.id === categoryId ? 'active' : ''}"
        onclick="showBracket(${t.id}, ${c.id})">
        ${c.name}
      </button>`).join('');

  const bracketArea = document.getElementById('bracket-scroll');
  const labelsArea  = document.getElementById('bracket-round-labels');

  if (!cat.bracket) {
    labelsArea.innerHTML = '';
    bracketArea.innerHTML = `
      <div class="empty-state" style="width:100%;align-self:center">
        <div class="empty-icon">🔜</div>
        <div class="empty-title">Drabinka w przygotowaniu</div>
        <div class="empty-desc">Drabinka tej kategorii zostanie opublikowana wkrótce przez organizatora.</div>
      </div>`;
    return;
  }

  labelsArea.innerHTML = `
    <div class="brl-item r1">Ćwierćfinał</div>
    <div class="brl-item conn"></div>
    <div class="brl-item r2">Półfinał</div>
    <div class="brl-item conn"></div>
    <div class="brl-item r3">Finał</div>`;

  bracketArea.innerHTML = buildBracketHTML(cat.bracket, false, false, false);
  requestAnimationFrame(() => initBracketConnectors(bracketArea));
}

function showBracket(tournamentId, categoryId) {
  _showBracket(tournamentId, categoryId);
  navigate('public/' + tournamentId + '/' + categoryId);
}

/* =============================================
   BRACKET — Connector Lines (SVG, post-render)
   ============================================= */

function initBracketConnectors(container) {
  const conns = container.querySelectorAll('.bracket-conn');
  conns.forEach(conn => {
    const prevRound = conn.previousElementSibling;
    const nextRound = conn.nextElementSibling;
    if (!prevRound || !nextRound) return;

    const connRect = conn.getBoundingClientRect();
    const prevMatches = prevRound.querySelectorAll('.b-match');
    const nextMatches = nextRound.querySelectorAll('.b-match');
    if (!prevMatches.length || !nextMatches.length) return;

    const W = connRect.width || 28;
    const H = connRect.height || 400;
    const stroke = 'rgba(108,192,48,0.45)';
    const mid = W / 2;

    const getCenter = (el) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2 - connRect.top;
    };

    const prevCenters = Array.from(prevMatches).map(getCenter);
    const nextCenters = Array.from(nextMatches).map(getCenter);

    const lines = [];
    nextCenters.forEach((dst, j) => {
      const src1 = prevCenters[j * 2];
      const src2 = prevCenters[j * 2 + 1];
      if (src1 !== undefined) lines.push(`<line x1="0" y1="${src1.toFixed(1)}" x2="${mid}" y2="${src1.toFixed(1)}" stroke="${stroke}" stroke-width="1.5"/>`);
      if (src2 !== undefined) lines.push(`<line x1="0" y1="${src2.toFixed(1)}" x2="${mid}" y2="${src2.toFixed(1)}" stroke="${stroke}" stroke-width="1.5"/>`);
      if (src1 !== undefined && src2 !== undefined) {
        lines.push(`<line x1="${mid}" y1="${src1.toFixed(1)}" x2="${mid}" y2="${src2.toFixed(1)}" stroke="${stroke}" stroke-width="1.5"/>`);
      }
      lines.push(`<line x1="${mid}" y1="${dst.toFixed(1)}" x2="${W}" y2="${dst.toFixed(1)}" stroke="${stroke}" stroke-width="1.5"/>`);
    });

    conn.style.position = 'relative';
    conn.innerHTML = `<svg style="position:absolute;top:0;left:0;width:${W}px;height:${H}px;overflow:visible" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${lines.join('')}</svg>`;
  });
}

/* =============================================
   BRACKET HTML BUILDER
   ============================================= */

function buildMatchCardHTML(match, isAdmin, isBlank) {
  if (!match) return '';
  const aWins = match.winner === 'playerA';
  const bWins = match.winner === 'playerB';

  const renderScoreCells = (forPlayerA) =>
    match.score.map((s, i) => {
      if (isBlank) {
        return `<span class="score-cell blank-cell">□</span>`;
      }
      const games = forPlayerA ? s.playerAGames : s.playerBGames;
      const opGames = forPlayerA ? s.playerBGames : s.playerAGames;
      if (isAdmin) {
        const isTb = (s.playerAGames === 7 && s.playerBGames === 6) || (s.playerAGames === 6 && s.playerBGames === 7);
        const side = forPlayerA ? 'playerA' : 'playerB';
        return `<div class="score-cell-wrap">
          <input class="score-input" type="number" min="0" max="7"
            value="${games !== null ? games : ''}" placeholder="–"
            data-match="${match.id}" data-side="${side}" data-set="${i}"
            oninput="handleScoreInput(this)"/>
          ${isTb ? `<input class="tb-input" type="number" min="0" max="99"
            value="${s.tieBreakSmallPoints !== null ? s.tieBreakSmallPoints : ''}" placeholder="tb"
            data-match="${match.id}" data-side="tb" data-set="${i}"
            oninput="handleTbInput(this)" title="Małe punkty tie-breaka"/>` : '<span class="tb-spacer"></span>'}
        </div>`;
      }
      if (games === null) return `<span class="score-cell muted">.</span>`;
      const formatted = formatSetScore(s.playerAGames, s.playerBGames, s.tieBreakSmallPoints, forPlayerA);
      return `<span class="score-cell">${formatted}</span>`;
    }).join('');

  const rowA = `
    <div class="match-row ${aWins ? 'is-winner' : ''}">
      <div class="player-info">
        ${aWins ? '<span class="winner-badge">W</span>' : '<span class="winner-badge-placeholder"></span>'}
        ${match.playerA.seed ? `<span class="player-seed">${match.playerA.seed}</span>` : ''}
        <span class="player-name">${match.playerA.name}</span>
      </div>
      <div class="score-grid">${renderScoreCells(true)}</div>
    </div>`;

  const rowB = `
    <div class="match-row ${bWins ? 'is-winner' : ''}">
      <div class="player-info">
        ${bWins ? '<span class="winner-badge">W</span>' : '<span class="winner-badge-placeholder"></span>'}
        ${match.playerB.seed ? `<span class="player-seed">${match.playerB.seed}</span>` : ''}
        <span class="player-name">${match.playerB.name}</span>
      </div>
      <div class="score-grid">${renderScoreCells(false)}</div>
    </div>`;

  const winnerSelect = isAdmin && !isBlank ? `
    <div class="winner-select-row">
      <select class="form-input winner-select-input" onchange="setMatchWinner('${match.id}', this.value)">
        <option value="">— Zwycięzca —</option>
        <option value="playerA" ${match.winner==='playerA'?'selected':''}>✓ ${match.playerA.name}</option>
        <option value="playerB" ${match.winner==='playerB'?'selected':''}>✓ ${match.playerB.name}</option>
      </select>
    </div>` : '';

  return `
    <div class="b-match is-${match.status}" data-match-id="${match.id}">
      ${rowA}
      <div class="match-divider"></div>
      ${rowB}
      ${winnerSelect}
    </div>`;
}

function buildBracketHTML(bData, compact, adminMode, isBlank) {
  const matchCard = (match) => {
    if (!match) return `<div class="b-match-placeholder"></div>`;
    return buildMatchCardHTML(match, !!adminMode, !!isBlank);
  };

  const rounds = bData.r1
    ? (bData.r2
      ? (bData.qf
        ? [bData.r1, bData.r2, bData.qf, bData.sf, [bData.final]]
        : [bData.r1, bData.r2, bData.sf, [bData.final]])
      : [bData.r1, bData.sf, [bData.final]])
    : [[bData.final]];
  const filteredRounds = rounds.filter(Boolean);

  const renderRounds = () => {
    const parts = [];
    for (let ri = 0; ri < filteredRounds.length; ri++) {
      const rnd = filteredRounds[ri];
      parts.push(`<div class="bracket-round" data-matches="${rnd.length}">${rnd.map(m => matchCard(m)).join('')}</div>`);
      if (ri < filteredRounds.length - 1) {
        parts.push(`<div class="bracket-conn" data-from="${rnd.length}" data-to="${filteredRounds[ri+1].length}"></div>`);
      }
    }
    return parts.join('');
  };

  const thirdHtml = bData.third
    ? `<div class="bracket-third-place"><span class="bracket-third-label">Mecz o 3. miejsce</span>${matchCard(bData.third)}</div>`
    : '';

  const resultsHtml = (() => {
    const fin = bData.final;
    if (!fin || !fin.winner) return '';
    const first = fin.winner === 'playerA' ? fin.playerA.name : fin.playerB.name;
    const second = fin.winner === 'playerA' ? fin.playerB.name : fin.playerA.name;
    let rows = `<div class="result-row result-1"><span class="result-place">1.</span><span class="result-name">${first}</span></div>`;
    rows += `<div class="result-row result-2"><span class="result-place">2.</span><span class="result-name">${second}</span></div>`;
    if (bData.third && bData.third.winner) {
      const third = bData.third.winner === 'playerA' ? bData.third.playerA.name : bData.third.playerB.name;
      rows += `<div class="result-row result-3"><span class="result-place">3.</span><span class="result-name">${third}</span></div>`;
    }
    return `<div class="bracket-results">${rows}</div>`;
  })();

  return `<div class="bracket-flex${compact ? ' bracket-compact' : ''}">${renderRounds()}</div>${thirdHtml}${resultsHtml}`;
}

// Znajdź mecz po ID we wszystkich drabinkach
function findMatchById(matchId) {
  const seen = new Set();
  const brackets = [];
  [womenDoublesBracket, menSinglesBracket, mixedOpenBracket].forEach(b => brackets.push(b));
  state.tournaments.forEach(t => t.categories.forEach(c => {
    if (c.bracket && !seen.has(c.bracket)) { seen.add(c.bracket); brackets.push(c.bracket); }
  }));
  for (const b of brackets) {
    const all = [...(b.r1||[]), ...(b.r2||[]), ...(b.qf||[]), ...(b.sf||[]), b.final].filter(Boolean);
    const found = all.find(m => m && m.id === matchId);
    if (found) return found;
  }
  return null;
}

function handleScoreInput(input) {
  const matchId = input.dataset.match;
  const side    = input.dataset.side;   // 'playerA' | 'playerB'
  const setIdx  = parseInt(input.dataset.set);
  const val     = input.value === '' ? null : parseInt(input.value);

  const match = findMatchById(matchId);
  if (!match) return;

  if (side === 'playerA') match.score[setIdx].playerAGames = val;
  else match.score[setIdx].playerBGames = val;
  match.status = 'finished';

  // Check if we need to show/hide TB input
  const s = match.score[setIdx];
  const isTb = (s.playerAGames === 7 && s.playerBGames === 6) || (s.playerAGames === 6 && s.playerBGames === 7);
  if (!isTb) s.tieBreakSmallPoints = null;

  // Re-render the match card inline
  rerenderMatch(matchId);
  showToast('Wynik zaktualizowany');
}

function handleTbInput(input) {
  const matchId = input.dataset.match;
  const setIdx  = parseInt(input.dataset.set);
  const val     = input.value === '' ? null : parseInt(input.value);

  const match = findMatchById(matchId);
  if (!match) return;
  match.score[setIdx].tieBreakSmallPoints = val;
  showToast('Tie-break zaktualizowany');
}

function rerenderMatch(matchId) {
  const els = document.querySelectorAll(`[data-match-id="${matchId}"]`);
  els.forEach(el => {
    const match = findMatchById(matchId);
    if (!match) return;
    const isAdmin = el.querySelector('.score-input') !== null;
    const tmp = document.createElement('div');
    tmp.innerHTML = buildMatchCardHTML(match, isAdmin, false);
    el.replaceWith(tmp.firstElementChild);
  });
}

function setMatchWinner(matchId, winner) {
  const match = findMatchById(matchId);
  if (!match) return;
  match.winner = winner || null;
  showToast('Zwycięzca zapisany');
  rerenderMatch(matchId);
}

function updateMatchScore(input) {
  handleScoreInput(input);
}

/* =============================================
   PUBLIC — Section Switching
   ============================================= */

function showPubSection(name) {
  state.publicSection = name;
  const sections = {
    home:    'pub-home',
    detail:  'pub-detail',
    bracket: 'pub-bracket',
    about:   'pub-about',
    contact: 'pub-contact'
  };
  Object.values(sections).forEach(id => document.getElementById(id).classList.add('hidden'));
  if (sections[name]) document.getElementById(sections[name]).classList.remove('hidden');

  // Update nav active state
  document.querySelectorAll('.pub-nav-link').forEach(b => b.classList.remove('active'));
  if (name === 'home')    document.querySelector('.pub-nav-link:first-child')?.classList.add('active');
  if (name === 'about')   document.getElementById('nav-about')?.classList.add('active');
  if (name === 'contact') document.getElementById('nav-contact')?.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPublicPage(name) {
  showPubSection(name);
}

function sendContactForm() {
  const name = document.getElementById('contact-name').value.trim();
  if (!name) { showToast('Podaj imię i nazwisko'); return; }
  showToast('Wiadomość wysłana! Odpiszemy wkrótce.');
  ['contact-name','contact-email','contact-msg'].forEach(id => { document.getElementById(id).value = ''; });
}

/* =============================================
   HELPERS
   ============================================= */

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  const months = ['sty','lut','mar','kwi','maj','cze','lip','sie','wrz','paź','lis','gru'];
  return `${parseInt(d)} ${months[parseInt(m)-1]} ${y}`;
}

function badgeHtml(status) {
  const map = {
    active:   ['badge-active',   'Aktywny'],
    planned:  ['badge-planned',  'Planowany'],
    finished: ['badge-finished', 'Zakończony'],
    drawn:    ['badge-drawn',    'Rozlosowana'],
  };
  const [cls, label] = map[status] || ['badge-finished','Nieznany'];
  return `<span class="badge ${cls}">${label}</span>`;
}

function pl(n, one, few, many) {
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return few;
  return many;
}

/* =============================================
   ADMIN — Tournament Detail View
   ============================================= */

function showTournamentDetail(tournamentId, skipHistory) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  state.selectedTournamentId = tournamentId;

  _showSection('tournament-detail', true);

  // Render banner
  document.getElementById('tournament-detail-banner').innerHTML = `
    <div class="detail-hero-top">
      <h1 style="color:#fff">${t.name}</h1>
      ${badgeHtml(t.status)}
      <button class="btn btn-secondary btn-sm" style="margin-left:auto" onclick="editTournament(${t.id})">✏️ Edytuj dane turnieju</button>
    </div>
    <div class="detail-hero-meta" style="margin-top:12px">
      <div class="detail-hero-meta-item"><span class="icon">📅</span><span>${formatDate(t.dateStart)} – ${formatDate(t.dateEnd)}</span></div>
      <div class="detail-hero-meta-item"><span class="icon">📍</span><span>${t.location}</span></div>
    </div>`;

  renderTournamentDetailCategories(tournamentId);
  renderAdminBreadcrumb('tournament-detail', t);

  document.getElementById('topbar-title').textContent = t.name;

  if (!skipHistory) navigate('admin/tournaments/' + tournamentId);
}

function renderTournamentDetailCategories(tournamentId) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;

  const container = document.getElementById('tournament-detail-categories');

  if (t.categories.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-title">Brak kategorii</div><div class="empty-desc">Dodaj pierwszą kategorię do turnieju.</div></div>`;
    return;
  }

  container.innerHTML = t.categories.map(c => {
    const pdfBtn = (c.status === 'drawn' || c.status === 'active' || c.status === 'finished')
      ? `<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openPdfModal(${tournamentId})">📄 Generuj PDF</button>` : '';

    return `
    <div class="category-card-admin" onclick="showCategoryDetail(${tournamentId}, ${c.id})">
      <div class="cat-card-top">
        <div class="cat-card-name">${c.name}</div>
        ${badgeHtml(c.status)}
      </div>
      <div class="cat-card-meta">
        <span>📋 ${c.type}</span>
        <span>👥 ${c.players} ${c.categoryType === 'singiel' ? 'zawodników' : 'par'}</span>
        ${c.participants && c.participants.length > 0 ? `<span>✓ ${c.participants.length} zapisanych</span>` : ''}
      </div>
      <div class="cat-card-actions" onclick="event.stopPropagation()">
        <button class="btn btn-primary btn-sm" onclick="showCategoryDetail(${tournamentId}, ${c.id})">Otwórz kategorię →</button>
        ${pdfBtn}
      </div>
    </div>`;
  }).join('');
}

function openAddCategoryModal() {
  openModal('modal-add-category');
}

function saveNewCategory() {
  const name = document.getElementById('nc-name').value.trim();
  if (!name) { showToast('Podaj nazwę kategorii'); return; }

  const t = state.tournaments.find(t => t.id === state.selectedTournamentId);
  if (!t) return;

  const maxId = Math.max(0, ...state.tournaments.flatMap(t => t.categories.map(c => c.id)));
  const newCat = {
    id: maxId + 1,
    name,
    players: parseInt(document.getElementById('nc-limit').value) || 8,
    type: document.getElementById('nc-format').value === 'elimination' ? 'Drabinka' :
          document.getElementById('nc-format').value === 'roundrobin' ? 'Każdy z każdym' : 'Grupy + play-off',
    status: document.getElementById('nc-status').value || 'planned',
    categoryType: document.getElementById('nc-type').value,
    gender: document.getElementById('nc-gender').value,
    level: document.getElementById('nc-level').value,
    limit: parseInt(document.getElementById('nc-limit').value) || 8,
    format: document.getElementById('nc-format').value,
    seedsCount: parseInt(document.getElementById('nc-seeds').value) || 2,
    dateStart: document.getElementById('nc-date').value || null,
    timeStart: document.getElementById('nc-time').value || null,
    bracket: null,
    participants: []
  };

  t.categories.push(newCat);
  closeModal('modal-add-category');
  showToast(`Kategoria "${name}" została dodana.`);
  renderTournamentDetailCategories(state.selectedTournamentId);

  // Reset form
  ['nc-name','nc-date','nc-time'].forEach(id => { document.getElementById(id).value = ''; });
}

/* =============================================
   ADMIN — Category Detail View
   ============================================= */

function showCategoryDetail(tournamentId, categoryId, skipHistory) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;

  state.selectedTournamentId = tournamentId;
  state.selectedCategoryDetailId = categoryId;

  _showSection('category-detail', true);
  document.getElementById('topbar-title').textContent = cat.name;

  // Breadcrumb
  document.getElementById('category-detail-breadcrumb').innerHTML = `
    <span class="bc-link" onclick="navigate('admin')">Dashboard</span>
    <span class="breadcrumb-sep">/</span>
    <span class="bc-link" onclick="showSection('tournaments')">Turnieje</span>
    <span class="breadcrumb-sep">/</span>
    <span class="bc-link" onclick="showTournamentDetail(${t.id})">${t.name}</span>
    <span class="breadcrumb-sep">/</span>
    <span class="bc-current">${cat.name}</span>`;

  // Back button
  document.getElementById('category-detail-back-btn').onclick = () => showTournamentDetail(tournamentId);

  // Info panel
  const typeLabels   = { singiel: 'Singiel', debel: 'Debel', mikst: 'Mikst' };
  const genderLabels = { kobiety: 'Kobiety', mezczyzni: 'Mężczyźni', open: 'Open' };
  const levelLabels  = { open: 'Open', poczatkujacy: 'Początkujący', sredniozaawansowany: 'Średniozaawansowany', zaawansowany: 'Zaawansowany' };
  const formatLabels = { elimination: 'Drabinka single-elimination', groups: 'Grupy + play-off', roundrobin: 'Każdy z każdym' };

  document.getElementById('category-info-panel').innerHTML = `
    <div class="form-panel-title">Informacje o kategorii</div>
    <div class="form-grid" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px">
      <div><div class="form-label">Nazwa</div><div style="font-weight:600">${cat.name}</div></div>
      <div><div class="form-label">Typ</div><div>${typeLabels[cat.categoryType] || cat.categoryType || '—'}</div></div>
      <div><div class="form-label">Płeć</div><div>${genderLabels[cat.gender] || cat.gender || '—'}</div></div>
      <div><div class="form-label">Poziom</div><div>${levelLabels[cat.level] || cat.level || '—'}</div></div>
      <div><div class="form-label">Format</div><div>${formatLabels[cat.format] || cat.type || '—'}</div></div>
      <div><div class="form-label">Limit</div><div>${cat.limit || 8}</div></div>
      <div><div class="form-label">Rozstawieni</div><div>${cat.seedsCount || 0}</div></div>
      <div><div class="form-label">Status</div><div>${badgeHtml(cat.status)}</div></div>
    </div>`;

  // Action bar
  renderCategoryActionBar(t, cat);

  // Main content based on status
  renderCategoryMainContent(t, cat);

  if (!skipHistory) navigate('admin/tournaments/' + tournamentId + '/cat/' + categoryId);
}

function renderCategoryActionBar(t, cat) {
  const bar = document.getElementById('category-action-bar');
  let html = '';

  if (cat.status === 'planned') {
    const canDraw = cat.participants && cat.participants.length >= 2;
    html = `
      <button class="btn btn-primary draw-btn" ${canDraw ? '' : 'disabled title="Potrzebujesz co najmniej 2 uczestników"'}
        onclick="openDrawModal(${t.id}, ${cat.id})">🎲 Losuj drabinkę</button>
      <button class="btn btn-ghost btn-sm" onclick="openPdfModal(${t.id})">📄 PDF</button>`;
  } else if (cat.status === 'drawn') {
    html = `
      <button class="btn btn-secondary btn-sm" onclick="openDrawModal(${t.id}, ${cat.id})">🔄 Ponów losowanie</button>
      <button class="btn btn-primary btn-sm" onclick="startCategory(${t.id}, ${cat.id})">▶ Rozpocznij kategorię</button>
      <button class="btn btn-ghost btn-sm" onclick="openPdfModal(${t.id})">📄 Generuj PDF do druku</button>`;
  } else if (cat.status === 'active') {
    html = `
      <button class="btn btn-ghost btn-sm" onclick="openPdfModal(${t.id})">📄 Generuj PDF</button>`;
  } else if (cat.status === 'finished') {
    html = `
      <button class="btn btn-ghost btn-sm" onclick="openPdfModal(${t.id})">📄 Generuj finalny PDF</button>`;
  }

  bar.innerHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">${html}</div>`;
}

function renderCategoryMainContent(t, cat) {
  const container = document.getElementById('category-main-content');

  if (cat.status === 'planned') {
    container.innerHTML = renderParticipantsSection(t, cat);
  } else if (cat.status === 'drawn') {
    container.innerHTML = `
      <div class="form-panel">
        <div class="form-panel-title">Drabinka (podgląd)</div>
        ${cat.bracket ? buildBracketHTML(cat.bracket, false, false, false) : '<div class="empty-state"><div class="empty-icon">🔜</div><div class="empty-title">Brak drabinki</div></div>'}
      </div>`;
    if (cat.bracket) {
      requestAnimationFrame(() => {
        const scroll = container.querySelector('.bracket-flex');
        if (scroll) initBracketConnectors(scroll.parentElement);
      });
    }
  } else if (cat.status === 'active') {
    container.innerHTML = `
      <div class="form-panel">
        <div class="form-panel-title">Drabinka (tryb admin — edycja wyników)</div>
        ${cat.bracket ? buildBracketHTML(cat.bracket, false, true, false) : '<div class="empty-state"><div class="empty-icon">🔜</div><div class="empty-title">Brak drabinki</div></div>'}
      </div>`;
    if (cat.bracket) {
      requestAnimationFrame(() => {
        const scroll = container.querySelector('.bracket-flex');
        if (scroll) initBracketConnectors(scroll.parentElement);
      });
    }
  } else if (cat.status === 'finished') {
    container.innerHTML = `
      <div class="form-panel">
        <div class="form-panel-title">Drabinka (zakończona)</div>
        ${cat.bracket ? buildBracketHTML(cat.bracket, false, false, false) : '<div class="empty-state"><div class="empty-icon">🏆</div><div class="empty-title">Brak danych drabinki</div></div>'}
      </div>`;
    if (cat.bracket) {
      requestAnimationFrame(() => {
        const scroll = container.querySelector('.bracket-flex');
        if (scroll) initBracketConnectors(scroll.parentElement);
      });
    }
  }
}

function startCategory(tournamentId, categoryId) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;
  cat.status = 'active';
  showToast('Kategoria została aktywowana!');
  showCategoryDetail(tournamentId, categoryId, true);
}

/* =============================================
   ADMIN — Participants Section
   ============================================= */

function renderParticipantsSection(t, cat) {
  const participants = cat.participants || [];
  const isDoubles = cat.categoryType === 'debel' || cat.categoryType === 'mikst';
  const limit = cat.limit || 8;
  const maxSeeds = Math.floor(limit / 4);

  const tableHeaders = isDoubles
    ? `<th>Lp.</th><th>Para (Zawodnik 1 / Zawodnik 2)</th><th>Klub/Miasto</th><th>Ranking</th><th>Rozstawiony</th><th>Akcje</th>`
    : `<th>Lp.</th><th>Zawodnik</th><th>Klub/Miasto</th><th>Ranking</th><th>Rozstawiony</th><th>Akcje</th>`;

  const tableRows = participants.map((p, i) => {
    const seedInput = p.seed !== null ? `<input type="number" class="form-input" style="width:60px;display:inline-block;padding:4px 6px" min="1" max="${maxSeeds}" value="${p.seed}" onchange="updateParticipantSeed(${t.id}, ${cat.id}, '${p.id}', this.value)"/>` : '';
    return `
      <tr>
        <td>${i + 1}</td>
        <td>${isDoubles ? `<strong>${p.name1}</strong> / ${p.name2 || '<em style="color:var(--text-muted)">brak</em>'}` : `<strong>${p.name1}</strong>`}</td>
        <td>${p.club || '—'}</td>
        <td>${p.ranking || '—'}</td>
        <td>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
            <input type="checkbox" ${p.seed !== null ? 'checked' : ''} onchange="toggleParticipantSeed(${t.id}, ${cat.id}, '${p.id}', this.checked)"/>
            <span>Rozstawiony</span>
          </label>
          ${seedInput}
        </td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="removeParticipant(${t.id}, ${cat.id}, '${p.id}')">✕ Usuń</button>
        </td>
      </tr>`;
  }).join('');

  const addFormHtml = isDoubles ? `
    <div id="add-participant-form-${cat.id}" class="participant-add-form hidden">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr auto;gap:8px;align-items:end">
        <div><label class="form-label">Zawodnik 1</label><input class="form-input" id="np-name1-${cat.id}" placeholder="Imię Nazwisko"/></div>
        <div><label class="form-label">Zawodnik 2</label><input class="form-input" id="np-name2-${cat.id}" placeholder="Imię Nazwisko"/></div>
        <div><label class="form-label">Klub</label><input class="form-input" id="np-club-${cat.id}" placeholder="Klub/Miasto"/></div>
        <div><label class="form-label">Ranking</label><input class="form-input" id="np-ranking-${cat.id}" placeholder="np. 450"/></div>
        <button class="btn btn-primary" onclick="addParticipant(${t.id}, ${cat.id})">Dodaj</button>
      </div>
    </div>` : `
    <div id="add-participant-form-${cat.id}" class="participant-add-form hidden">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px;align-items:end">
        <div><label class="form-label">Imię i nazwisko</label><input class="form-input" id="np-name1-${cat.id}" placeholder="Imię Nazwisko"/></div>
        <div><label class="form-label">Klub</label><input class="form-input" id="np-club-${cat.id}" placeholder="Klub/Miasto"/></div>
        <div><label class="form-label">Ranking</label><input class="form-input" id="np-ranking-${cat.id}" placeholder="np. 450"/></div>
        <button class="btn btn-primary" onclick="addParticipant(${t.id}, ${cat.id})">Dodaj</button>
      </div>
    </div>`;

  return `
    <div class="form-panel">
      <div class="form-panel-title">
        Uczestnicy — Drabinka ${limit} ${isDoubles ? 'par' : 'zawodników'} — maksymalnie ${maxSeeds} rozstawień
      </div>
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="toggleAddParticipantForm(${cat.id})">➕ Dodaj uczestnika${isDoubles ? '/parę' : ''}</button>
        <button class="btn btn-ghost btn-sm" onclick="addMockParticipants(${t.id}, ${cat.id})">🎾 Dodaj przykładowe ${isDoubles ? 'pary' : 'zawodników'}</button>
      </div>
      ${addFormHtml}
      ${participants.length > 0 ? `
        <div class="participants-table-wrap">
          <table class="participants-table">
            <thead><tr>${tableHeaders}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>` : `<div class="empty-state" style="padding:30px"><div class="empty-icon">👥</div><div class="empty-title">Brak uczestników</div><div class="empty-desc">Dodaj uczestników ręcznie lub skorzystaj z przykładowych danych.</div></div>`}
    </div>`;
}

function toggleAddParticipantForm(catId) {
  const form = document.getElementById(`add-participant-form-${catId}`);
  if (form) form.classList.toggle('hidden');
}

function addParticipant(tournamentId, categoryId) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;

  const name1 = document.getElementById(`np-name1-${cat.id}`)?.value.trim();
  const name2El = document.getElementById(`np-name2-${cat.id}`);
  const name2 = name2El ? name2El.value.trim() : null;
  const club = document.getElementById(`np-club-${cat.id}`)?.value.trim() || '';
  const ranking = document.getElementById(`np-ranking-${cat.id}`)?.value.trim() || '';

  if (!name1) { showToast('Podaj imię i nazwisko'); return; }

  if (!cat.participants) cat.participants = [];
  cat.participants.push({
    id: 'p' + Date.now(),
    name1,
    name2: name2 || null,
    club,
    ranking,
    seed: null,
    status: 'confirmed'
  });
  cat.players = cat.participants.length;

  showToast('Uczestnik dodany');
  showCategoryDetail(tournamentId, categoryId, true);
}

function removeParticipant(tournamentId, categoryId, participantId) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;
  cat.participants = (cat.participants || []).filter(p => p.id !== participantId);
  cat.players = cat.participants.length;
  showToast('Uczestnik usunięty');
  showCategoryDetail(tournamentId, categoryId, true);
}

function toggleParticipantSeed(tournamentId, categoryId, participantId, checked) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;
  const p = (cat.participants || []).find(p => p.id === participantId);
  if (!p) return;
  p.seed = checked ? 1 : null;
  showCategoryDetail(tournamentId, categoryId, true);
}

function updateParticipantSeed(tournamentId, categoryId, participantId, val) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;
  const p = (cat.participants || []).find(p => p.id === participantId);
  if (!p) return;
  const num = parseInt(val);
  const maxSeeds = Math.floor((cat.limit || 8) / 4);
  if (isNaN(num) || num < 1 || num > maxSeeds) { showToast('Nieprawidłowy numer rozstawienia'); return; }
  const duplicate = (cat.participants || []).find(other => other.id !== participantId && other.seed === num);
  if (duplicate) { showToast('Numer rozstawienia już jest zajęty'); return; }
  p.seed = num;
}

function addMockParticipants(tournamentId, categoryId) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;

  if (!cat.participants) cat.participants = [];

  const isDoubles = cat.categoryType === 'debel' || cat.categoryType === 'mikst';
  const isFemale  = cat.gender === 'kobiety';
  const isMale    = cat.gender === 'mezczyzni';
  const isMixed   = cat.categoryType === 'mikst';

  let mockData;

  if (isMixed) {
    mockData = [
      { name1: 'Nowak Piotr',        name2: 'Kowalska Anna',      club: 'Legia TC Warszawa', ranking: '520' },
      { name1: 'Wiśniewski Krzysztof', name2: 'Kamińska Monika',  club: 'ATC Kraków',        ranking: '480' },
      { name1: 'Dąbrowski Marek',    name2: 'Zielińska Katarzyna', club: 'WTC Wrocław',      ranking: '450' },
      { name1: 'Kaczmarek Rafał',    name2: 'Szymańska Beata',    club: 'GTK Gdańsk',        ranking: '420' },
      { name1: 'Lewandowski Tomasz', name2: 'Wójcik Ewa',         club: 'Kortex Warszawa',   ranking: '390' },
      { name1: 'Piotrowski Jacek',   name2: 'Malinowska Joanna',  club: 'TC Poznań',         ranking: '360' },
      { name1: 'Zieliński Bartosz',  name2: 'Nowakowska Maria',   club: 'Legia TC Warszawa', ranking: '340' },
      { name1: 'Adamski Grzegorz',   name2: 'Kwiatkowska Izabela',club: 'ATC Kraków',        ranking: '310' },
    ];
  } else if (isDoubles && isFemale) {
    mockData = [
      { name1: 'Kowalska Anna',      name2: 'Wiśniewska Barbara',  club: 'Legia TC Warszawa', ranking: '510' },
      { name1: 'Kamińska Monika',    name2: 'Wójcik Ewa',          club: 'ATC Kraków',        ranking: '480' },
      { name1: 'Szymańska Beata',    name2: 'Woźniak Agnieszka',   club: 'WTC Wrocław',       ranking: '455' },
      { name1: 'Malinowska Joanna',  name2: 'Piotrowska Karolina', club: 'GTK Gdańsk',        ranking: '425' },
      { name1: 'Kwiatkowska Izabela',name2: 'Adamska Natalia',     club: 'Kortex Warszawa',   ranking: '400' },
      { name1: 'Nowakowska Maria',   name2: 'Dąbrowska Marta',     club: 'TC Poznań',         ranking: '370' },
      { name1: 'Zielińska Katarzyna',name2: 'Lewandowska Renata',  club: 'Legia TC Warszawa', ranking: '345' },
      { name1: 'Jankowska Dorota',   name2: 'Kozłowska Paulina',   club: 'ATC Kraków',        ranking: '315' },
    ];
  } else if (isDoubles && isMale) {
    mockData = [
      { name1: 'Nowak Adam',         name2: 'Kowalski Jan',        club: 'Legia TC Warszawa', ranking: '540' },
      { name1: 'Wiśniewski Piotr',   name2: 'Dąbrowski Marek',     club: 'ATC Kraków',        ranking: '510' },
      { name1: 'Kaczmarek Rafał',    name2: 'Lewandowski Tomasz',  club: 'WTC Wrocław',       ranking: '475' },
      { name1: 'Zieliński Bartosz',  name2: 'Szymański Bogdan',    club: 'GTK Gdańsk',        ranking: '445' },
      { name1: 'Piotrowski Krzysztof',name2: 'Wróbel Andrzej',    club: 'Kortex Warszawa',   ranking: '415' },
      { name1: 'Dudek Łukasz',       name2: 'Wójcik Sławomir',     club: 'TC Poznań',         ranking: '385' },
      { name1: 'Michalski Jacek',    name2: 'Jankowski Paweł',     club: 'Legia TC Warszawa', ranking: '355' },
      { name1: 'Wojciechowski Robert',name2: 'Adamski Grzegorz',   club: 'ATC Kraków',        ranking: '325' },
    ];
  } else if (isFemale) {
    mockData = [
      { name1: 'Kowalska Anna',       club: 'Legia TC Warszawa', ranking: '510' },
      { name1: 'Wiśniewska Barbara',  club: 'ATC Kraków',        ranking: '480' },
      { name1: 'Kamińska Monika',     club: 'WTC Wrocław',       ranking: '455' },
      { name1: 'Wójcik Ewa',          club: 'GTK Gdańsk',        ranking: '425' },
      { name1: 'Szymańska Beata',     club: 'Kortex Warszawa',   ranking: '400' },
      { name1: 'Malinowska Joanna',   club: 'TC Poznań',         ranking: '370' },
      { name1: 'Kwiatkowska Izabela', club: 'Legia TC Warszawa', ranking: '345' },
      { name1: 'Nowakowska Maria',    club: 'ATC Kraków',        ranking: '315' },
    ];
  } else {
    mockData = [
      { name1: 'Nowak Adam',        club: 'Legia TC Warszawa', ranking: '540' },
      { name1: 'Kowalski Jan',      club: 'ATC Kraków',        ranking: '510' },
      { name1: 'Wiśniewski Piotr',  club: 'WTC Wrocław',       ranking: '475' },
      { name1: 'Dąbrowski Marek',   club: 'GTK Gdańsk',        ranking: '445' },
      { name1: 'Kaczmarek Rafał',   club: 'Kortex Warszawa',   ranking: '415' },
      { name1: 'Lewandowski Tomasz',club: 'TC Poznań',         ranking: '385' },
      { name1: 'Zieliński Bartosz', club: 'Legia TC Warszawa', ranking: '355' },
      { name1: 'Szymański Bogdan',  club: 'ATC Kraków',        ranking: '325' },
    ];
  }

  mockData.forEach(d => {
    cat.participants.push({
      id: 'p' + Date.now() + Math.random(),
      name1: d.name1,
      name2: d.name2 || null,
      club: d.club,
      ranking: d.ranking,
      seed: null,
      status: 'confirmed'
    });
  });

  cat.players = cat.participants.length;
  showToast('Dodano przykładowych uczestników');
  showCategoryDetail(tournamentId, categoryId, true);
}

/* =============================================
   ADMIN — Draw Algorithm
   ============================================= */

function openDrawModal(tournamentId, categoryId) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;

  const participants = cat.participants || [];
  const n = participants.length;
  const S = nextPow2(Math.max(n, 2));
  const byes = S - n;
  const seeds = participants.filter(p => p.seed !== null).length;

  document.getElementById('modal-draw-info').innerHTML = `
    <strong>${cat.name}</strong><br>
    Uczestników: <strong>${n}</strong><br>
    Rozmiar drabinki: <strong>${S}</strong><br>
    Bye: <strong>${byes}</strong><br>
    Rozstawionych: <strong>${seeds}</strong><br>
    ${cat.bracket ? '<span style="color:var(--accent)">⚠️ Uwaga: drabinka zostanie nadpisana!</span>' : ''}`;

  state._pendingDraw = { tournamentId, categoryId };
  openModal('modal-draw');
}

function nextPow2(n) {
  let s = 1;
  while (s < n) s *= 2;
  return Math.min(s, 32);
}

function executeDraw() {
  closeModal('modal-draw');
  const { tournamentId, categoryId } = state._pendingDraw || {};
  if (!tournamentId || !categoryId) return;

  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;

  const participants = cat.participants || [];
  const n = participants.length;
  const S = nextPow2(Math.max(n, 2));
  const slots = new Array(S).fill(null);

  // Place seeds
  const seeded = participants.filter(p => p.seed !== null).sort((a, b) => a.seed - b.seed);
  const seedPositions = getSeedPositions(S);
  seeded.forEach((p, i) => {
    if (i < seedPositions.length) slots[seedPositions[i]] = p;
  });

  // Shuffle non-seeded
  const nonSeeded = participants.filter(p => p.seed === null);
  shuffle(nonSeeded);

  // Fill remaining slots with non-seeded, then BYEs
  const emptySlots = slots.map((s, i) => s === null ? i : -1).filter(i => i >= 0);
  nonSeeded.forEach((p, i) => { if (i < emptySlots.length) slots[emptySlots[i]] = p; });

  // Build first-round matches
  const totalMatches = S / 2;
  const r1Matches = [];
  let matchCounter = 1;

  for (let i = 0; i < totalMatches; i++) {
    const pA = slots[i * 2];
    const pB = slots[i * 2 + 1];
    const aName = pA ? (pA.name2 ? `${pA.name1} / ${pA.name2}` : pA.name1) : 'BYE';
    const bName = pB ? (pB.name2 ? `${pB.name1} / ${pB.name2}` : pB.name1) : 'BYE';
    const aSeed = pA ? pA.seed : null;
    const bSeed = pB ? pB.seed : null;

    let winner = null;
    let status = 'pending';
    if (!pA || !pB) {
      winner = !pA ? 'playerB' : 'playerA';
      status = 'finished';
    }

    const match = {
      id: `draw-r1-${matchCounter++}`,
      round: 'Runda 1',
      status,
      playerA: { name: aName, seed: aSeed },
      playerB: { name: bName, seed: bSeed },
      score: [
        { playerAGames: null, playerBGames: null, tieBreakSmallPoints: null },
        { playerAGames: null, playerBGames: null, tieBreakSmallPoints: null },
        { playerAGames: null, playerBGames: null, tieBreakSmallPoints: null },
      ],
      winner
    };
    r1Matches.push(match);
  }

  // Build subsequent TBD rounds
  let bracket;
  const numSf = totalMatches / 2;
  const sfMatches = [];
  for (let i = 0; i < numSf; i++) {
    sfMatches.push(mkMatch(`draw-sf-${i+1}`, 'Półfinał', 'TBD', null, 'TBD', null, null,null, null,null, null,null, null,null,null, null));
  }
  const final = mkMatch(`draw-f`, 'Finał', 'TBD', null, 'TBD', null, null,null, null,null, null,null, null,null,null, null);
  bracket = { r1: r1Matches, sf: sfMatches, final };

  cat.bracket = bracket;
  cat.status = 'drawn';

  showToast('Drabinka wylosowana!');
  showCategoryDetail(tournamentId, categoryId, true);
}

function getSeedPositions(S) {
  const positions = [];
  if (S >= 2)  positions.push(0);
  if (S >= 2)  positions.push(S - 1);
  if (S >= 4)  positions.push(S / 2);
  if (S >= 4)  positions.push(S / 2 - 1);
  if (S >= 8)  positions.push(S / 4);
  if (S >= 8)  positions.push(S / 4 * 3 - 1);
  if (S >= 16) positions.push(S / 8);
  if (S >= 16) positions.push(S / 8 * 7 - 1);
  return positions;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* =============================================
   INIT — run on page load
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Set up login on Enter key
  document.getElementById('login-password').addEventListener('keydown', e => {
    if (e.key === 'Enter') adminLogin();
  });
  document.getElementById('login-email').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('login-password').focus();
  });

  // Start in Admin view, on login screen
  renderCategoryTags();

  // Pre-fill demo credentials for ease of demo
  document.getElementById('login-email').value = 'admin@m-active.pl';
  document.getElementById('login-password').value = 'demo1234';

  initDarkMode();

  // Route to current hash on initial load
  const initHash = location.hash.replace(/^#/, '');
  if (initHash && initHash !== 'admin') {
    navigate(initHash, true);
    routeCurrentHash();
  } else {
    navigate('admin', true);
  }
});
