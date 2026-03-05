/* ═══════════════════════════════════════════════════════════
   VOLLEY — History Page Script  (history.js)
   Full session log · category filter · stats · clear
   ═══════════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const {
    CAT_META, loadHistory, loadStreak,
    renderStreakBadge, showToast,
  } = window.VolleyTopics;

  renderStreakBadge();

  /* ── Constants ────────────────────────────────────────── */
  const DIFF_DISPLAY = {
    easy:   '🟢 Warm-Up',
    medium: '🟡 Pressure',
    hard:   '🔴 High Stakes',
    all:    '🎲 Any Level',
  };

  /* ── State ────────────────────────────────────────────── */
  let activeCat = 'all';

  /* ── DOM refs ─────────────────────────────────────────── */
  const statsEl       = document.getElementById('histStats');
  const controlsEl    = document.getElementById('histControls');
  const emptyEl       = document.getElementById('histEmpty');
  const filterEmptyEl = document.getElementById('histFilterEmpty');
  const gridEl        = document.getElementById('histGrid');
  const ctaEl         = document.getElementById('histPageCta');

  /* ── Helpers ──────────────────────────────────────────── */
  function fmtDate(iso) {
    const d = new Date(iso);
    const days = Math.floor((Date.now() - d) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7)  return days + ' days ago';
    if (days < 30) return Math.floor(days / 7) + 'w ago';
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric',
      year: days > 365 ? 'numeric' : undefined,
    });
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

  /* ── Build one card ───────────────────────────────────── */
  function buildCard(session, idx) {
    const card = document.createElement('div');
    card.className = 'sess-card';
    card.setAttribute('role', 'listitem');
    card.style.animationDelay = Math.min(idx * 50, 400) + 'ms';

    const catMeta = CAT_META[session.cat] || CAT_META.all;

    /* top */
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

    /* bottom */
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
      dot.className = 'sess-dot'; dot.textContent = '·';
      const durEl = document.createElement('span');
      durEl.className = 'sess-dur'; durEl.textContent = dur;
      meta.appendChild(dot);
      meta.appendChild(durEl);
    }

    const starsWrap = document.createElement('div');
    starsWrap.className = 'sess-stars';
    starsWrap.setAttribute('aria-label',
      session.rating > 0 ? session.rating + ' stars' : 'Unrated');

    if (session.rating > 0) {
      makeStars(session.rating, starsWrap);
    } else {
      const u = document.createElement('span');
      u.className = 'sess-unrated'; u.textContent = 'unrated';
      starsWrap.appendChild(u);
    }

    bottom.appendChild(meta);
    bottom.appendChild(starsWrap);

    card.appendChild(top);
    card.appendChild(topic);
    card.appendChild(bottom);
    return card;
  }

  /* ── Populate stats bar ───────────────────────────────── */
  function populateStats(all) {
    const streak    = loadStreak();
    const totalSecs = all.reduce((a, s) => a + (s.durationSecs || 0), 0);
    const rated     = all.filter(s => s.rating > 0);
    const avg       = rated.length
      ? (rated.reduce((a, s) => a + s.rating, 0) / rated.length).toFixed(1)
      : '—';
    const mins = Math.round(totalSecs / 60);

    document.getElementById('hsSessions').textContent = all.length;
    document.getElementById('hsAvg').textContent      = avg === '—' ? '—' : avg + '★';
    document.getElementById('hsStreak').textContent   = streak.count;
    document.getElementById('hsTime').textContent     = mins > 0 ? mins + 'm' : '<1m';
  }

  /* ── Main render ──────────────────────────────────────── */
  function render() {
    const all = loadHistory();

    if (all.length === 0) {
      /* no history at all */
      if (statsEl)       statsEl.classList.add('hidden');
      if (controlsEl)    controlsEl.classList.add('hidden');
      if (emptyEl)       { emptyEl.style.display = 'flex'; }
      if (filterEmptyEl) { filterEmptyEl.style.display = 'none'; }
      if (gridEl)        { gridEl.style.display = 'none'; }
      if (ctaEl)         ctaEl.classList.add('hidden');
      return;
    }

    /* has history */
    populateStats(all);
    if (statsEl)    statsEl.classList.remove('hidden');
    if (controlsEl) controlsEl.classList.remove('hidden');
    if (emptyEl)    emptyEl.style.display = 'none';
    if (ctaEl)      ctaEl.classList.remove('hidden');

    /* apply filter */
    const filtered = activeCat === 'all'
      ? all
      : all.filter(s => s.cat === activeCat);

    if (filtered.length === 0) {
      if (filterEmptyEl) filterEmptyEl.style.display = 'flex';
      if (gridEl) gridEl.style.display = 'none';
      return;
    }

    if (filterEmptyEl) filterEmptyEl.style.display = 'none';
    if (gridEl) {
      gridEl.style.display = 'grid';
      gridEl.innerHTML = '';
      filtered.forEach((s, i) => gridEl.appendChild(buildCard(s, i)));
    }
  }

  /* ── Filter buttons ───────────────────────────────────── */
  document.querySelectorAll('.hist-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hist-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      render();
    });
  });

  /* ── Reset filter (from filter-empty state) ───────────── */
  const resetFilterBtn = document.getElementById('histResetFilter');
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      activeCat = 'all';
      document.querySelectorAll('.hist-filter').forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('.hist-filter[data-cat="all"]');
      if (allBtn) allBtn.classList.add('active');
      render();
    });
  }

  /* ── Clear all ────────────────────────────────────────── */
  const clearBtn = document.getElementById('histClearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!confirm('Clear all session history? This cannot be undone.')) return;
      try { localStorage.removeItem('volley_history'); } catch (e) {}
      activeCat = 'all';
      document.querySelectorAll('.hist-filter').forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('.hist-filter[data-cat="all"]');
      if (allBtn) allBtn.classList.add('active');
      render();
      showToast('History cleared.');
    });
  }

  /* ── Init ─────────────────────────────────────────────── */
  render();
});
