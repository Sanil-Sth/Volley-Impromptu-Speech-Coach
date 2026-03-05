/* ═══════════════════════════════════════════════════════════
   VOLLEY — Landing Page Script  (landing.js)
   Demo topic rotator · scroll reveals · history section
   ═══════════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const {
    buildPool, shuffle, CAT_META, DIFF_META,
    loadHistory, loadStreak, renderStreakBadge, showToast,
  } = window.VolleyTopics;

  /* ── Streak badge ─────────────────────────────────────── */
  renderStreakBadge();

  /* ── Demo Topic Rotator ───────────────────────────────── */
  const demoEl   = document.getElementById('demoTopic');
  const demoCat  = document.getElementById('demoCatBadge');
  const demoDiff = document.getElementById('demoDiffBadge');

  if (demoEl) {
    const demoPool = [
      { text: 'The most underrated career skill nobody teaches you.', cat: 'career',  diff: 'easy'   },
      { text: 'Argue that short-form content is destroying deep thought.', cat: 'debate',  diff: 'medium' },
      { text: 'Tell me about a moment you were completely wrong.', cat: 'story',   diff: 'easy'   },
      { text: 'Will AI be liberating or oppressive — make the case.', cat: 'tech',    diff: 'hard'   },
      { text: 'Is confidence something you build or something you choose?', cat: 'mindset', diff: 'easy'   },
      { text: 'Is inequality the natural outcome of freedom?', cat: 'society', diff: 'medium' },
      { text: 'Make the case that performance reviews harm culture.', cat: 'career',  diff: 'hard'   },
    ];
    let demoIdx = 0;

    function rotateTopic() {
      const item = demoPool[demoIdx % demoPool.length];
      demoIdx++;
      demoEl.classList.add('fade-out');
      setTimeout(() => {
        demoEl.textContent = item.text;
        if (demoCat) {
          const cm = CAT_META[item.cat] || CAT_META.all;
          demoCat.textContent = cm.badge;
        }
        if (demoDiff) {
          const dm = DIFF_META[item.diff] || DIFF_META.all;
          demoDiff.textContent = dm.icon + ' ' + dm.label;
        }
        demoEl.classList.remove('fade-out');
        demoEl.classList.add('fade-in');
        setTimeout(() => demoEl.classList.remove('fade-in'), 500);
      }, 380);
    }
    rotateTopic();
    setInterval(rotateTopic, 3500);
  }

  /* ── Scroll Reveal ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => entry.target.classList.add('visible'), +delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  document.querySelectorAll('.stagger-parent').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.dataset.revealDelay = i * 70;
    });
  });

  /* ── Smooth scrolls ───────────────────────────────────── */
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    scrollHint.addEventListener('click', () => {
      const how = document.getElementById('how');
      if (how) how.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ══════════════════════════════════════════════════════
     HISTORY SECTION
  ══════════════════════════════════════════════════════ */

  const DIFF_DISPLAY = {
    easy:   '🟢 Warm-Up',
    medium: '🟡 Pressure',
    hard:   '🔴 High Stakes',
    all:    '🎲 Any Level',
  };

  function fmtDate(iso) {
    const d = new Date(iso);
    const days = Math.floor((Date.now() - d) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7)  return days + ' days ago';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function fmtDur(secs) {
    if (!secs || secs < 1) return null;
    const m = Math.floor(secs / 60), s = secs % 60;
    if (m === 0) return s + 's';
    return s > 0 ? m + 'm ' + s + 's' : m + 'm';
  }

  function makeStars(rating, wrap) {
    for (let i = 1; i <= 5; i++) {
      const s = document.createElement('span');
      s.className = 'sess-star' + (i <= rating ? ' on' : '');
      s.textContent = '★';
      wrap.appendChild(s);
    }
  }

  function buildCard(session, idx) {
    const card = document.createElement('div');
    card.className = 'sess-card';
    card.setAttribute('role', 'listitem');
    card.style.animationDelay = Math.min(idx * 55, 440) + 'ms';

    const catMeta = CAT_META[session.cat] || CAT_META.all;

    /* top row */
    const top = document.createElement('div');
    top.className = 'sess-top';

    const badge = document.createElement('span');
    badge.className = 'sess-cat';
    badge.textContent = catMeta.badge;

    const date = document.createElement('span');
    date.className = 'sess-date';
    date.textContent = fmtDate(session.date);

    top.appendChild(badge);
    top.appendChild(date);

    /* topic */
    const topic = document.createElement('p');
    topic.className = 'sess-topic';
    topic.textContent = session.topic || 'No topic recorded.';

    /* bottom row */
    const bottom = document.createElement('div');
    bottom.className = 'sess-bottom';

    const meta = document.createElement('div');
    meta.className = 'sess-meta';

    const diff = document.createElement('span');
    diff.className = 'sess-diff';
    diff.textContent = DIFF_DISPLAY[session.diff] || DIFF_DISPLAY.all;
    meta.appendChild(diff);

    const dur = fmtDur(session.durationSecs);
    if (dur) {
      const dot = document.createElement('span');
      dot.className = 'sess-dot';
      dot.textContent = '·';
      const durEl = document.createElement('span');
      durEl.className = 'sess-dur';
      durEl.textContent = dur;
      meta.appendChild(dot);
      meta.appendChild(durEl);
    }

    const stars = document.createElement('div');
    stars.className = 'sess-stars';
    stars.setAttribute('aria-label', session.rating > 0 ? session.rating + ' stars' : 'Unrated');
    if (session.rating > 0) {
      makeStars(session.rating, stars);
    } else {
      const u = document.createElement('span');
      u.className = 'sess-unrated';
      u.textContent = 'unrated';
      stars.appendChild(u);
    }

    bottom.appendChild(meta);
    bottom.appendChild(stars);

    card.appendChild(top);
    card.appendChild(topic);
    card.appendChild(bottom);
    return card;
  }

  function renderHistory() {
    const history = loadHistory();
    const streak  = loadStreak();

    const statsEl  = document.getElementById('histStats');
    const emptyEl  = document.getElementById('histEmpty');
    const gridEl   = document.getElementById('histGrid');
    const clearBtn = document.getElementById('histClearBtn');

    if (!statsEl || !emptyEl || !gridEl) return;

    if (history.length === 0) {
      statsEl.style.display  = 'none';
      emptyEl.style.display  = 'flex';
      gridEl.style.display   = 'none';
      if (clearBtn) clearBtn.style.display = 'none';
      return;
    }

    /* populate stats */
    const totalSecs = history.reduce((a, s) => a + (s.durationSecs || 0), 0);
    const rated     = history.filter(s => s.rating > 0);
    const avg       = rated.length
      ? (rated.reduce((a, s) => a + s.rating, 0) / rated.length).toFixed(1)
      : '—';
    const mins = Math.round(totalSecs / 60);

    document.getElementById('hsSessions').textContent = history.length;
    document.getElementById('hsAvg').textContent      = avg === '—' ? '—' : avg + '★';
    document.getElementById('hsStreak').textContent   = streak.count;
    document.getElementById('hsTime').textContent     = mins > 0 ? mins + 'm' : '<1m';

    statsEl.style.display  = 'flex';
    emptyEl.style.display  = 'none';
    gridEl.style.display   = 'grid';
    if (clearBtn) clearBtn.style.display = 'inline-flex';

    /* render cards */
    gridEl.innerHTML = '';
    history.forEach((s, i) => gridEl.appendChild(buildCard(s, i)));
  }

  /* clear button */
  const clearBtn = document.getElementById('histClearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!confirm('Clear all session history? This cannot be undone.')) return;
      try { localStorage.removeItem('volley_history'); } catch (e) {}
      renderHistory();
      showToast('History cleared.');
    });
  }

  renderHistory();
});

