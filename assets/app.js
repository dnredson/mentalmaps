(() => {
  const maps = window.MENTAL_MAPS || {};
  const app = document.getElementById('app');
  const reviewBtn = document.getElementById('reviewBtn');
  const printBtn = document.getElementById('printBtn');
  const dialog = document.getElementById('reviewDialog');
  const reviewSubject = document.getElementById('reviewSubject');
  const reviewQuestion = document.getElementById('reviewQuestion');
  const reviewAnswer = document.getElementById('reviewAnswer');
  const showAnswerBtn = document.getElementById('showAnswerBtn');
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');

  let activeMap = null;
  let activeConcept = null;
  let activeQuestion = null;

  function storageKey(subjectId) {
    return 'mentalmaps-reviewed-' + subjectId;
  }

  function getReviewed(subjectId) {
    try {
      return new Set(JSON.parse(localStorage.getItem(storageKey(subjectId)) || '[]'));
    } catch {
      return new Set();
    }
  }

  function saveReviewed(subjectId, reviewed) {
    localStorage.setItem(storageKey(subjectId), JSON.stringify([...reviewed]));
  }

  function allConcepts(map) {
    return map.branches.flatMap(branch =>
      branch.concepts.map(concept => ({ ...concept, branch, map }))
    );
  }

  function getRoute() {
    const route = location.hash.replace(/^#\/?/, '').trim();
    return route || 'home';
  }

  function subjectColor(id) {
    return id === 'so' ? 'var(--so)' : id === 'redes' ? 'var(--redes)' : 'var(--seg)';
  }

  function renderHome() {
    activeMap = null;
    activeConcept = null;
    document.documentElement.style.setProperty('--subject', 'var(--accent)');

    const cards = Object.values(maps).map(map => {
      const total = allConcepts(map).length;
      const reviewed = getReviewed(map.id).size;
      return `
        <article class="subject-card" style="--subject:${subjectColor(map.id)}">
          <span class="code">${map.code}</span>
          <h2>${map.title}</h2>
          <p>${map.description}</p>
          <div class="stats">
            <span>${map.branches.length} blocos</span>
            <span>${total} conceitos</span>
            <span>${reviewed} revisados</span>
          </div>
          <a href="#/${map.id}">Abrir mapa</a>
        </article>`;
    }).join('');

    app.innerHTML = `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Preparação incremental</p>
          <h1>Um mapa por disciplina. Uma conexão por vez.</h1>
          <p>Os mapas organizam o que já estudamos e crescem junto com as sessões. Clique nos conceitos para revisar definições, exemplos, conexões e perguntas de prova.</p>
        </div>
        <aside class="hero-note">
          <div>
            <p class="eyebrow">Estratégia</p>
            <h2>Revisão visual + recuperação ativa</h2>
            <p>Use o mapa para reconstruir relações. Depois use “Pergunta surpresa” para testar se o conteúdo realmente ficou disponível na memória.</p>
          </div>
          <small>O progresso fica salvo neste navegador.</small>
        </aside>
      </section>

      <section class="subject-grid" aria-label="Disciplinas">
        ${cards}
      </section>`;
  }

  function renderMarkmapMap(map) {
    activeMap = map;
    activeConcept = null;
    document.documentElement.style.setProperty('--subject', subjectColor(map.id));

    app.innerHTML = `
      <header class="map-header">
        <div>
          <div class="map-title-row">
            <span class="subject-dot" aria-hidden="true"></span>
            <div>
              <p class="eyebrow">${map.code} · Silberschatz 9ª ed.</p>
              <h1>${map.title}</h1>
            </div>
          </div>
          <p>Mapa organizado pela sequência do livro. Conteúdo detalhado até 2.3; conceitos antecipados ficam ligados aos capítulos onde serão aprofundados.</p>
        </div>
        <div class="map-actions">
          <a class="btn btn-secondary" href="#/">← Disciplinas</a>
          <a class="btn btn-secondary" href="maps/sistemas-operacionais.md" target="_blank" rel="noreferrer">Ver Markdown</a>
        </div>
      </header>

      <section class="study-status" aria-label="Progresso no livro">
        <div><strong>✅ Revisado</strong><span>Capítulo 1 + 2.1–2.3</span></div>
        <div><strong>▶️ Próximo</strong><span>2.4 — Tipos de Chamadas de Sistema</span></div>
        <div><strong>🟡 Antecipado</strong><span>processos, RR, MMU/page fault, DMA/E/S</span></div>
      </section>

      <section class="markmap-shell">
        <div class="markmap-head">
          <div>
            <p class="eyebrow">Mapa interativo</p>
            <h2>Expanda, recolha, arraste e dê zoom</h2>
          </div>
          <div class="markmap-actions">
            <button id="foldChapters" class="btn btn-secondary" type="button" disabled>Ver capítulos</button>
            <button id="expandMap" class="btn btn-secondary" type="button" disabled>Expandir tudo</button>
            <button id="fitMap" class="btn btn-secondary" type="button" disabled>Centralizar</button>
          </div>
        </div>
        <markmap-view
          id="osMarkmap"
          src="./maps/sistemas-operacionais.md"
          theme="cards"
          layout="two-sided"
          color-scheme="auto"
          toolbar
        ></markmap-view>
        <p id="markmapStatus" class="map-help">Carregando o mapa…</p>
      </section>

      <section class="map-notes">
        <article>
          <span>✅</span>
          <div><strong>Revisado</strong><p>Conteúdo que já estudamos na sequência do livro.</p></div>
        </article>
        <article>
          <span>🟡</span>
          <div><strong>Antecipado</strong><p>Já apareceu nas revisões, mas será estudado formalmente no capítulo indicado.</p></div>
        </article>
        <article>
          <span>⏭️</span>
          <div><strong>A estudar</strong><p>Roadmap para sabermos exatamente o que vem depois.</p></div>
        </article>
      </section>`;

    const view = document.getElementById('osMarkmap');
    const status = document.getElementById('markmapStatus');
    const foldButton = document.getElementById('foldChapters');
    const expandButton = document.getElementById('expandMap');
    const fitButton = document.getElementById('fitMap');

    const enableControls = () => {
      foldButton.disabled = false;
      expandButton.disabled = false;
      fitButton.disabled = false;
      status.textContent = 'Dica: clique nos nós para abrir/fechar ramos. O toolbar também oferece zoom e níveis de expansão.';
    };

    view.addEventListener('render', enableControls, { once: true });
    view.addEventListener('error', () => {
      status.textContent = 'Não foi possível carregar o Markmap. Confirme que o servidor local está online e que há acesso à internet para carregar a biblioteca.';
    });

    foldButton.addEventListener('click', () => {
      view.mm?.foldToLevel(2);
      view.mm?.fit();
    });
    expandButton.addEventListener('click', () => {
      view.mm?.expandAll();
      view.mm?.fit();
    });
    fitButton.addEventListener('click', () => view.mm?.fit());
  }

  function renderMap(map) {
    if (map.id === 'so') {
      renderMarkmapMap(map);
      return;
    }

    activeMap = map;
    document.documentElement.style.setProperty('--subject', subjectColor(map.id));
    const reviewed = getReviewed(map.id);
    const concepts = allConcepts(map);

    app.innerHTML = `
      <header class="map-header">
        <div>
          <div class="map-title-row">
            <span class="subject-dot" aria-hidden="true"></span>
            <div>
              <p class="eyebrow">${map.code}</p>
              <h1>${map.title}</h1>
            </div>
          </div>
          <p>${map.description}</p>
        </div>
        <div class="map-actions">
          <input id="conceptSearch" class="search" type="search" placeholder="Buscar conceito..." aria-label="Buscar conceito">
          <a class="btn btn-secondary" href="#/">← Disciplinas</a>
          <button id="resetProgress" class="btn btn-secondary" type="button">Limpar progresso</button>
        </div>
      </header>

      <section class="progress-wrap">
        <div class="progress-row">
          <span><strong id="reviewedCount">${reviewed.size}</strong> de ${concepts.length} conceitos revisados</span>
          <span id="reviewedPercent">${Math.round((reviewed.size / concepts.length) * 100)}%</span>
        </div>
        <div class="progress" aria-hidden="true"><span id="progressBar"></span></div>
      </section>

      <section class="map-layout">
        <div class="mindmap">
          <div class="center-node">
            <strong>${map.center}</strong>
            <small>${map.centerNote}</small>
          </div>
          <div id="branchGrid" class="branch-grid"></div>
        </div>

        <aside id="detailPanel" class="detail">
          <p class="eyebrow">Conceito</p>
          <h2>Escolha um nó do mapa</h2>
          <p>Ao clicar em um conceito, aparecem aqui a definição, a intuição para prova, um exemplo e conexões importantes.</p>
        </aside>
      </section>`;

    const search = document.getElementById('conceptSearch');
    const reset = document.getElementById('resetProgress');

    search.addEventListener('input', () => renderBranches(map, search.value, reviewed));
    reset.addEventListener('click', () => {
      localStorage.removeItem(storageKey(map.id));
      activeConcept = null;
      renderMap(map);
    });

    renderBranches(map, '', reviewed);
    updateProgress(map, reviewed);
  }

  function renderBranches(map, filter, reviewed) {
    const grid = document.getElementById('branchGrid');
    const needle = filter.trim().toLowerCase();

    grid.innerHTML = map.branches.map((branch, branchIndex) => {
      const matches = branch.concepts.filter(concept => {
        const haystack = [
          concept.name,
          concept.definition,
          concept.example,
          ...(concept.links || [])
        ].join(' ').toLowerCase();
        return !needle || haystack.includes(needle);
      });

      if (!matches.length) return '';

      const color = branch.color || ['var(--subject)', 'var(--green)', '#7a62ad', '#3e8f8a'][branchIndex % 4];

      return `
        <section class="branch" style="--branch-color:${color}">
          <h3>${branch.title}</h3>
          <div class="nodes">
            ${matches.map(concept => `
              <button
                class="node ${activeConcept?.id === concept.id ? 'is-selected' : ''} ${reviewed.has(concept.id) ? 'is-reviewed' : ''}"
                data-concept-id="${concept.id}"
                type="button"
              >${concept.name}</button>
            `).join('')}
          </div>
        </section>`;
    }).join('') || '<div class="empty-state">Nenhum conceito encontrado.</div>';

    grid.querySelectorAll('[data-concept-id]').forEach(button => {
      button.addEventListener('click', () => {
        const concept = allConcepts(map).find(item => item.id === button.dataset.conceptId);
        activeConcept = concept;
        renderDetail(map, concept, reviewed);
        renderBranches(map, filter, reviewed);
      });
    });
  }

  function renderDetail(map, concept, reviewed) {
    const panel = document.getElementById('detailPanel');
    panel.innerHTML = `
      <p class="eyebrow">${concept.branch.title}</p>
      <h2>${concept.name}</h2>
      <p>${concept.definition}</p>

      <div class="detail-section">
        <strong>Intuição para prova</strong>
        <p>${concept.exam}</p>
      </div>

      <div class="detail-section">
        <strong>Exemplo</strong>
        <p>${concept.example}</p>
      </div>

      <div class="detail-section">
        <strong>Conecta com</strong>
        <div class="tags">
          ${(concept.links || []).map(link => `<span class="tag">${link}</span>`).join('')}
        </div>
      </div>

      <label class="review-check">
        <input id="reviewedToggle" type="checkbox" ${reviewed.has(concept.id) ? 'checked' : ''}>
        <span>Já revisei este conceito</span>
      </label>`;

    const toggle = document.getElementById('reviewedToggle');
    toggle.addEventListener('change', () => {
      if (toggle.checked) reviewed.add(concept.id);
      else reviewed.delete(concept.id);
      saveReviewed(map.id, reviewed);
      updateProgress(map, reviewed);
      renderBranches(map, document.getElementById('conceptSearch').value, reviewed);
    });
  }

  function updateProgress(map, reviewed) {
    const total = allConcepts(map).length;
    const percent = total ? Math.round((reviewed.size / total) * 100) : 0;
    const bar = document.getElementById('progressBar');
    if (!bar) return;
    document.getElementById('reviewedCount').textContent = reviewed.size;
    document.getElementById('reviewedPercent').textContent = percent + '%';
    bar.style.width = percent + '%';
  }

  function getQuestionPool() {
    if (activeMap) return allConcepts(activeMap).filter(c => c.question && c.answer);
    return Object.values(maps).flatMap(map => allConcepts(map)).filter(c => c.question && c.answer);
  }

  function chooseQuestion() {
    const pool = getQuestionPool();
    if (!pool.length) return;
    activeQuestion = pool[Math.floor(Math.random() * pool.length)];
    reviewSubject.textContent = activeQuestion.map.title;
    reviewQuestion.textContent = activeQuestion.question;
    reviewAnswer.textContent = activeQuestion.answer;
    reviewAnswer.hidden = true;
    showAnswerBtn.hidden = false;
  }

  reviewBtn.addEventListener('click', () => {
    chooseQuestion();
    dialog.showModal();
  });

  nextQuestionBtn.addEventListener('click', chooseQuestion);

  showAnswerBtn.addEventListener('click', () => {
    reviewAnswer.hidden = false;
    showAnswerBtn.hidden = true;
  });

  printBtn.addEventListener('click', () => window.print());

  function route() {
    const routeName = getRoute();
    if (routeName === 'home') renderHome();
    else if (maps[routeName]) renderMap(maps[routeName]);
    else renderHome();
    requestAnimationFrame(() => app.focus({ preventScroll: true }));
  }

  window.addEventListener('hashchange', route);
  route();
})();
