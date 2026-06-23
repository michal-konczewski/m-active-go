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
function mkMatch(idSuffix, round, pAname, pAseed, pBname, pBseed, sA1, sA2, sA3, sB1, sB2, sB3, tbA1, tbA2, tbA3, tbB1, tbB2, tbB3, winner) {
  return {
    id: 'match-' + idSuffix,
    round,
    status: (sA1 !== null || sB1 !== null) ? 'finished' : 'pending',
    playerA: { name: pAname, seed: pAseed },
    playerB: { name: pBname, seed: pBseed },
    score: {
      playerA: [
        { games: sA1, tiebreak: tbA1 ?? null },
        { games: sA2, tiebreak: tbA2 ?? null },
        { games: sA3, tiebreak: tbA3 ?? null },
      ],
      playerB: [
        { games: sB1, tiebreak: tbB1 ?? null },
        { games: sB2, tiebreak: tbB2 ?? null },
        { games: sB3, tiebreak: tbB3 ?? null },
      ]
    },
    winner // 'playerA' | 'playerB' | null
  };
}

const womenDoublesBracket = {
  r1: [
    mkMatch('w-r1-1','Runda 1','Kowalska / Wiśniewska',1,'Nowakowska / Dąbrowska',null, 6,6,null, 4,2,null, null,null,null,null,null,null,'playerA'),
    mkMatch('w-r1-2','Runda 1','Kamińska / Wójcik',3,'Lewandowska / Zielińska',null, 7,6,null, 5,3,null, null,null,null,null,null,null,'playerA'),
    mkMatch('w-r1-3','Runda 1','Szymańska / Woźniak',2,'Kozłowska / Jankowska',null, 6,6,null, 1,4,null, null,null,null,null,null,null,'playerA'),
    mkMatch('w-r1-4','Runda 1','Malinowska / Piotrowska',4,'Kwiatkowska / Adamska',null, 4,6,6, 6,3,4, null,null,null,null,null,null,'playerA'),
  ],
  sf: [
    mkMatch('w-sf-1','Półfinał','Kowalska / Wiśniewska',1,'Kamińska / Wójcik',3, 6,7,null, 3,6,null, null,6,null,null,4,null,'playerA'),
    mkMatch('w-sf-2','Półfinał','Szymańska / Woźniak',2,'Malinowska / Piotrowska',4, 6,6,null, 2,4,null, null,null,null,null,null,null,'playerA'),
  ],
  final: mkMatch('w-f','Finał','Kowalska / Wiśniewska',1,'Szymańska / Woźniak',2, 7,6,null, 5,4,null, null,null,null,null,null,null,'playerA'),
  winner: 'Kowalska / Wiśniewska'
};

const menSinglesBracket = {
  r1: [
    mkMatch('m-r1-1','Runda 1','Nowak Adam',1,'Kowalski Jan',null, 6,7,null, 3,5,null, null,null,null,null,null,null,'playerA'),
    mkMatch('m-r1-2','Runda 1','Wiśniewski P.',3,'Dąbrowski M.',null, 6,6,null, 4,2,null, null,null,null,null,null,null,'playerA'),
    mkMatch('m-r1-3','Runda 1','Kaczmarek R.',2,'Lewandowski K.',null, 7,4,6, 6,6,3, 6,null,null,7,null,null,'playerA'),
    mkMatch('m-r1-4','Runda 1','Zieliński T.',4,'Szymański B.',null, 6,6,null, 1,3,null, null,null,null,null,null,null,'playerA'),
  ],
  sf: [
    mkMatch('m-sf-1','Półfinał','Nowak Adam',1,'Wiśniewski P.',3, 6,6,null, 4,3,null, null,null,null,null,null,null,'playerA'),
    mkMatch('m-sf-2','Półfinał','Kaczmarek R.',2,'Zieliński T.',4, 7,6,null, 5,4,null, null,null,null,null,null,null,'playerA'),
  ],
  final: mkMatch('m-f','Finał','Nowak Adam',1,'Kaczmarek R.',2, 6,7,null, 4,6,null, null,6,null,null,4,null,'playerA'),
  winner: 'Nowak Adam'
};

const mixedOpenBracket = {
  r1: [
    mkMatch('x-r1-1','Runda 1','Nowak / Kamińska',1,'Kowalski / Wójcik',null, 6,6,null, 2,3,null, null,null,null,null,null,null,'playerA'),
    mkMatch('x-r1-2','Runda 1','Wiśniewski / Nowakowska',3,'Dąbrowski / Zielińska',null, 7,6,null, 5,4,null, null,null,null,null,null,null,'playerA'),
    mkMatch('x-r1-3','Runda 1','Kaczmarek / Szymańska',2,'Lewandowski / Kozłowska',null, 6,6,null, 3,1,null, null,null,null,null,null,null,'playerA'),
    mkMatch('x-r1-4','Runda 1','Zieliński / Malinowska',4,'Piotrowski / Kwiatkowska',null, null,null,null, null,null,null, null,null,null,null,null,null,'playerA'),
  ],
  sf: [
    mkMatch('x-sf-1','Półfinał','Nowak / Kamińska',1,'Wiśniewski / Nowakowska',3, 6,7,null, 4,6,null, null,6,null,null,4,null,'playerA'),
    mkMatch('x-sf-2','Półfinał','Kaczmarek / Szymańska',2,'Zieliński / Malinowska',4, 6,6,null, 2,3,null, null,null,null,null,null,null,'playerA'),
  ],
  final: mkMatch('x-f','Finał','Nowak / Kamińska',1,'Kaczmarek / Szymańska',2, 7,4,6, 6,6,4, 6,null,null,4,null,null,'playerA'),
  winner: 'Nowak / Kamińska'
};

const mockTournaments = [
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
      { id: 1, name: "Debel kobiety open",      players: 8,  type: "Drabinka",        status: "active",   bracket: womenDoublesBracket },
      { id: 2, name: "Debel mężczyźni open",    players: 8,  type: "Drabinka",        status: "active",   bracket: null },
      { id: 3, name: "Singiel mężczyźni open",  players: 8,  type: "Drabinka",        status: "active",   bracket: menSinglesBracket },
      { id: 4, name: "Singiel kobiety open",    players: 6,  type: "Drabinka",        status: "planned",  bracket: null },
      { id: 5, name: "Mikst open",              players: 8,  type: "Drabinka",        status: "active",   bracket: mixedOpenBracket },
      { id: 6, name: "Turniej pocieszenia",     players: 4,  type: "Każdy z każdym",  status: "planned",  bracket: null },
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
      { id: 7, name: "Debel kobiety open",      players: 8,  type: "Drabinka",       status: "planned", bracket: null },
      { id: 8, name: "Debel kobiety advanced",  players: 8,  type: "Drabinka",       status: "planned", bracket: null },
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
      { id: 9,  name: "Singiel mężczyźni open", players: 12, type: "Drabinka",       status: "finished", bracket: null },
      { id: 10, name: "Singiel kobiety open",   players: 8,  type: "Drabinka",       status: "finished", bracket: null },
      { id: 11, name: "Debel mieszany open",    players: 8,  type: "Drabinka",       status: "finished", bracket: null },
      { id: 12, name: "Turniej seniors 40+",    players: 6,  type: "Każdy z każdym", status: "finished", bracket: null },
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
  editingTournamentId: null,
  tournaments: [...mockTournaments],
  categories: []
};

/* =============================================
   VIEW SWITCHING
   ============================================= */

function switchView(v) {
  state.view = v;
  document.getElementById('admin-view').classList.toggle('hidden', v !== 'admin');
  document.getElementById('public-view').classList.toggle('hidden', v !== 'public');
  document.getElementById('btn-admin').classList.toggle('active', v === 'admin');
  document.getElementById('btn-public').classList.toggle('active', v !== 'admin');

  if (v === 'public') renderPublicHome();
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
  renderDashboard();
  showToast('Zalogowano jako ' + email);
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
  dashboard:          'Dashboard',
  organizer:          'Dane M-ACTIVE',
  tournaments:        'Turnieje',
  'add-tournament':   'Dodaj turniej',
  'edit-tournament':  'Edytuj turniej',
  settings:           'Ustawienia'
};

function showSection(name) {
  state.adminSection = name;

  // Update sidebar active state
  document.querySelectorAll('.sidebar-item').forEach(btn => btn.classList.remove('active'));
  const navBtn = document.getElementById('nav-' + name);
  if (navBtn) navBtn.classList.add('active');

  // Hide all sections
  document.querySelectorAll('.admin-section-content').forEach(s => s.classList.add('hidden'));

  // Show target section
  const target = document.getElementById('sec-' + name);
  if (target) target.classList.remove('hidden');

  // Update topbar title
  document.getElementById('topbar-title').textContent = sectionTitles[name] || name;

  // Render dynamic sections
  if (name === 'dashboard') renderDashboard();
  if (name === 'tournaments') renderAdminTournamentList();
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
        <div class="t-sub">${t.shortDesc.substring(0, 60)}…</div>
      </td>
      <td style="white-space:nowrap;font-size:13px">${formatDate(t.dateStart)}<br><span style="color:var(--text-muted)">do ${formatDate(t.dateEnd)}</span></td>
      <td style="font-size:13px;color:var(--text-muted)">${t.location}</td>
      <td style="font-size:13px;text-align:center">${t.categories.length}</td>
      <td>${badgeHtml(t.status)}</td>
      <td>
        <div class="t-actions">
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
  renderPdfBrackets();
  document.getElementById('pdf-preview').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePdfPreview() {
  document.getElementById('pdf-preview').classList.add('hidden');
  document.body.style.overflow = '';
}

function renderPdfBrackets() {
  document.getElementById('pdf-bracket-women').innerHTML = buildBracketHTML(womenDoublesBracket, true);
  document.getElementById('pdf-bracket-men').innerHTML   = buildBracketHTML(menSinglesBracket, true);
}

/* =============================================
   PUBLIC — Home
   ============================================= */

function renderPublicHome() {
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

function goPublicHome() {
  renderPublicHome();
}

/* =============================================
   PUBLIC — Tournament Detail
   ============================================= */

function showPublicTournamentDetail(id) {
  const t = state.tournaments.find(t => t.id === id);
  if (!t) return;
  state.selectedTournamentId = id;
  showPubSection('detail');

  document.getElementById('detail-breadcrumb').textContent = t.name;
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

  const statusLabel = { active: 'Aktywna', planned: 'Planowana', finished: 'Zakończona' };
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

/* =============================================
   PUBLIC — Bracket View
   ============================================= */

function showBracket(tournamentId, categoryId) {
  const t = state.tournaments.find(t => t.id === tournamentId);
  if (!t) return;
  const cat = t.categories.find(c => c.id === categoryId);
  if (!cat) return;

  state.selectedTournamentId = tournamentId;
  state.selectedCategoryId   = categoryId;
  showPubSection('bracket');

  // Breadcrumb
  document.getElementById('bracket-breadcrumb').innerHTML = `
    <span onclick="goPublicHome()">Turnieje</span>
    <span class="breadcrumb-sep">/</span>
    <span onclick="showPublicTournamentDetail(${t.id})">${t.name}</span>
    <span class="breadcrumb-sep">/</span>
    <span class="current">${cat.name}</span>`;

  // Title + meta
  document.getElementById('bracket-category-title').textContent = cat.name;
  document.getElementById('bracket-meta').innerHTML = `
    <span>📋 ${cat.type}</span>
    <span>👥 ${cat.players} ${cat.name.includes('Debel') || cat.name.includes('Mikst') ? 'par' : 'zawodników'}</span>
    <span>📅 ${formatDate(t.dateStart)} – ${formatDate(t.dateEnd)}</span>
    <span>${badgeHtml(cat.status)}</span>`;

  // Category switcher pills
  document.getElementById('bracket-category-switcher').innerHTML =
    t.categories.map(c => `
      <button class="cat-pill ${c.id === categoryId ? 'active' : ''}"
        onclick="showBracket(${t.id}, ${c.id})">
        ${c.name}
      </button>`).join('');

  // Render bracket
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
    <div class="brl-item r3">Finał</div>
    <div class="brl-item winner">Zwycięzca</div>`;

  bracketArea.innerHTML = buildBracketHTML(cat.bracket, false);
}

/* =============================================
   BRACKET HTML BUILDER
   ============================================= */

function buildBracketHTML(bData, compact, adminMode) {
  const h  = compact ? 520 : 600;
  const mw = compact ? 260 : 300;
  const cw = 50;

  const r1 = [h/8, h*3/8, h*5/8, h*7/8];
  const r2 = [h/4, h*3/4];
  const r3 = h/2;

  const scoreCell = (set, isAdmin, matchId, side, setIdx) => {
    const val = set.games;
    const tb  = set.tiebreak;
    if (isAdmin) {
      return `<div class="score-cell-wrap">
        <input class="score-input" type="number" min="0" max="7"
          value="${val !== null ? val : ''}" placeholder="–"
          data-match="${matchId}" data-side="${side}" data-set="${setIdx}"
          onchange="updateMatchScore(this)"/>
        <input class="tb-input" type="number" min="0" max="99"
          value="${tb !== null ? tb : ''}" placeholder=""
          data-match="${matchId}" data-side="${side}" data-set="${setIdx}" data-tb="1"
          onchange="updateMatchScore(this)"/>
      </div>`;
    }
    if (val === null) return `<span class="score-cell muted">.</span>`;
    return `<span class="score-cell">${val}${tb !== null ? `<sup>${tb}</sup>` : ''}</span>`;
  };

  const matchCard = (match) => {
    if (!match) return `<div style="height:88px"></div>`;
    const aWins = match.winner === 'playerA';
    const bWins = match.winner === 'playerB';
    const isAdmin = !!adminMode;
    const pending = match.status === 'pending';

    const rowA = `
      <div class="match-row ${aWins ? 'is-winner' : ''}">
        <div class="player-info">
          ${aWins ? '<span class="winner-badge">W</span>' : '<span class="winner-badge-placeholder"></span>'}
          ${match.playerA.seed ? `<span class="player-seed">${match.playerA.seed}</span>` : ''}
          <span class="player-name">${match.playerA.name}</span>
        </div>
        <div class="score-grid">
          ${match.score.playerA.map((s,i) => scoreCell(s, isAdmin, match.id, 'playerA', i)).join('')}
        </div>
      </div>`;

    const rowB = `
      <div class="match-row ${bWins ? 'is-winner' : ''}">
        <div class="player-info">
          ${bWins ? '<span class="winner-badge">W</span>' : '<span class="winner-badge-placeholder"></span>'}
          ${match.playerB.seed ? `<span class="player-seed">${match.playerB.seed}</span>` : ''}
          <span class="player-name">${match.playerB.name}</span>
        </div>
        <div class="score-grid">
          ${match.score.playerB.map((s,i) => scoreCell(s, isAdmin, match.id, 'playerB', i)).join('')}
        </div>
      </div>`;

    const winnerSelect = isAdmin ? `
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
  };

  const connColor = 'rgba(108,192,48,0.35)';
  const connSVG1 = `
    <svg viewBox="0 0 ${cw} ${h}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="${r1[0]}" x2="${cw/2}" y2="${r1[0]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="0" y1="${r1[1]}" x2="${cw/2}" y2="${r1[1]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="${cw/2}" y1="${r1[0]}" x2="${cw/2}" y2="${r1[1]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="${cw/2}" y1="${r2[0]}" x2="${cw}" y2="${r2[0]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="0" y1="${r1[2]}" x2="${cw/2}" y2="${r1[2]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="0" y1="${r1[3]}" x2="${cw/2}" y2="${r1[3]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="${cw/2}" y1="${r1[2]}" x2="${cw/2}" y2="${r1[3]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="${cw/2}" y1="${r2[1]}" x2="${cw}" y2="${r2[1]}" stroke="${connColor}" stroke-width="1.5"/>
    </svg>`;

  const connSVG2 = `
    <svg viewBox="0 0 ${cw} ${h}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="${r2[0]}" x2="${cw/2}" y2="${r2[0]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="0" y1="${r2[1]}" x2="${cw/2}" y2="${r2[1]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="${cw/2}" y1="${r2[0]}" x2="${cw/2}" y2="${r2[1]}" stroke="${connColor}" stroke-width="1.5"/>
      <line x1="${cw/2}" y1="${r3}" x2="${cw}" y2="${r3}" stroke="${connColor}" stroke-width="1.5"/>
    </svg>`;

  return `
    <div class="bracket-round" style="width:${mw}px;height:${h}px">
      ${bData.r1.map(m => matchCard(m)).join('')}
    </div>
    <div class="bracket-connector" style="width:${cw}px;height:${h}px">${connSVG1}</div>
    <div class="bracket-round" style="width:${mw}px;height:${h}px">
      ${bData.sf.map(m => matchCard(m)).join('')}
    </div>
    <div class="bracket-connector" style="width:${cw}px;height:${h}px">${connSVG2}</div>
    <div class="bracket-round" style="width:${mw}px;height:${h}px">
      ${matchCard(bData.final)}
    </div>
    <div class="bracket-winner-box">
      <div class="winner-trophy">🏆</div>
      <div class="winner-label">Zwycięzca</div>
      <div class="winner-name">${bData.winner}</div>
    </div>`;
}

// Znajdź mecz po ID we wszystkich drabinkach
function findMatchById(matchId) {
  const brackets = [womenDoublesBracket, menSinglesBracket, mixedOpenBracket];
  // Also search in tournament categories
  state.tournaments.forEach(t => t.categories.forEach(c => {
    if (c.bracket) brackets.push(c.bracket);
  }));
  for (const b of brackets) {
    const allMatches = [...(b.r1||[]), ...(b.sf||[]), b.final].filter(Boolean);
    const found = allMatches.find(m => m.id === matchId);
    if (found) return found;
  }
  return null;
}

function updateMatchScore(input) {
  const matchId = input.dataset.match;
  const side    = input.dataset.side;   // 'playerA' | 'playerB'
  const setIdx  = parseInt(input.dataset.set);
  const isTb    = !!input.dataset.tb;
  const val     = input.value === '' ? null : parseInt(input.value);

  const match = findMatchById(matchId);
  if (!match) return;

  if (isTb) {
    match.score[side][setIdx].tiebreak = val;
  } else {
    match.score[side][setIdx].games = val;
  }
  match.status = 'finished';
  showToast('Wynik meczu został zaktualizowany');
}

function setMatchWinner(matchId, winner) {
  const match = findMatchById(matchId);
  if (!match) return;
  match.winner = winner || null;
  showToast('Zwycięzca meczu został zapisany');
  // Re-render current bracket if visible
  const bracketArea = document.getElementById('bracket-scroll');
  if (bracketArea && !bracketArea.closest('.hidden')) {
    const catId = state.selectedCategoryId;
    const tournament = state.tournaments.find(t => t.id === state.selectedTournamentId);
    const cat = tournament?.categories.find(c => c.id === catId);
    if (cat?.bracket) {
      bracketArea.innerHTML = buildBracketHTML(cat.bracket, false, false);
    }
  }
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
  const map = { active: ['badge-active','Aktywny'], planned: ['badge-planned','Planowany'], finished: ['badge-finished','Zakończony'] };
  const [cls, label] = map[status] || ['badge-finished','Nieznany'];
  return `<span class="badge ${cls}">${label}</span>`;
}

function pl(n, one, few, many) {
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return few;
  return many;
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
});
