/* ═══════════════════════════════════════════════════════════
   VOLLEY — Spin Page Script  (spin.js)
   Reel physics · Dropdown filters · Audio feedback
   ═══════════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const {
    buildPool, shuffle, saveSession, loadSession,
    CAT_META, DIFF_META, showToast,
    playTick, playLand, getAudio,
    renderStreakBadge,
  } = window.VolleyTopics;

  /* ── State ──────────────────────────────────────────────── */
  let curCat    = 'all';
  let curDiff   = 'all';
  let pool      = buildPool('all', 'all');
  let lastIdx   = -1;
  let spinning  = false;
  let rafId     = null;
  let currentTopic = '';

  const ITEM_H = 124; // px — must match CSS .reel-item height

  /* ── DOM refs ───────────────────────────────────────────── */
  const reelWindow  = document.getElementById('reelWindow');
  const reelStrip   = document.getElementById('reelStrip');
  const catBadge    = document.getElementById('catBadge');
  const diffPips    = document.getElementById('diffPips');
  const scrollThumb = document.getElementById('scrollThumb');
  const spinBtn     = document.getElementById('spinBtn');
  const toTimerBtn  = document.getElementById('toTimerBtn');

  /* ── Window height helper ───────────────────────────────── */
  function winH() {
    return reelWindow ? reelWindow.offsetHeight : 370;
  }

  /* ── Text auto-fit ──────────────────────────────────────── */
  function fitItem(el) {
    const len = el.textContent.length;
    if (len > 65) {
      el.style.fontSize = '1.35rem';
      el.style.lineHeight = '1.28';
    } else if (len > 50) {
      el.style.fontSize = '1.65rem';
      el.style.lineHeight = '1.26';
    } else if (len > 36) {
      el.style.fontSize = '1.92rem';
      el.style.lineHeight = '1.24';
    } else {
      el.style.fontSize = '2.2rem';
      el.style.lineHeight = '1.22';
    }
  }

  function makeItem(text) {
    const d = document.createElement('div');
    d.className = 'reel-item';
    d.style.height = ITEM_H + 'px';
    d.textContent = text;
    fitItem(d);
    return d;
  }

  /* ── Difficulty pips ────────────────────────────────────── */
  function renderPips(diff) {
    if (!diffPips) return;
    const count = DIFF_META[diff]?.pips ?? 0;
    diffPips.querySelectorAll('.pip').forEach((p, i) => {
      p.classList.toggle('lit', i < count);
    });
    diffPips.style.opacity = count > 0 ? '0.85' : '0';
  }

  /* ── Scroll thumb position ──────────────────────────────── */
  function setThumb(progress) {
    if (scrollThumb) scrollThumb.style.top = (Math.min(Math.max(progress, 0), 1) * 70) + '%';
  }

  /* ── Static initial display (no animation) ──────────────── */
  function initStaticReel() {
    if (!reelStrip) return;
    const WH = winH();
    const sample = shuffle(pool).slice(0, 5);

    reelStrip.innerHTML = '';
    reelStrip.classList.remove('settled');
    reelStrip.style.transition = '';

    sample.forEach(t => reelStrip.appendChild(makeItem(t)));

    const mid = 2;
    const offsetY = -(mid * ITEM_H + ITEM_H / 2 - WH / 2);
    reelStrip.style.transform = `translateY(${offsetY}px)`;
    reelStrip.classList.add('settled');

    // Dim surrounding items manually
    Array.from(reelStrip.children).forEach((el, i) => {
      const dist = Math.abs(i - mid);
      el.style.opacity = dist === 0 ? '1' : (dist === 1 ? '0.22' : '0.10');
      el.style.transform = dist === 0 ? 'scale(1.14)' : 'scale(1)';
      if (dist === 0) el.classList.add('landed');
    });

    currentTopic = sample[mid] || '';

    // Badge + pips
    if (catBadge) {
      catBadge.textContent = CAT_META[curCat]?.badge || '🎯 ALL TOPICS';
      catBadge.style.opacity = '0.75';
    }
    renderPips(curDiff);
    setThumb(0.5);
    syncTimerBtn();
  }

  /* ── Depth styling during animation ──────────────────────── */
  function applyDepth(y) {
    const vc = winH() / 2;
    const items = reelStrip.children;
    for (let i = 0; i < items.length; i++) {
      const cy = i * ITEM_H + ITEM_H / 2 + y;
      const dist = Math.abs(cy - vc);
      const norm = Math.min(dist / (ITEM_H * 1.2), 1);
      items[i].style.transform = `scale(${1.14 - norm * 0.22})`;
      items[i].style.opacity   = String(1 - norm * 0.82);
    }
  }

  /* ── SPIN PHYSICS ─────────────────────────────────────────
     Physics constants:
       FRICTION   = velocity multiplier per frame (60fps)
       THRESHOLD  = velocity below which we snap to target
  ──────────────────────────────────────────────────────────── */
  function spin(initVel) {
    if (spinning || pool.length === 0) return;
    spinning = true;
    if (spinBtn) { spinBtn.disabled = true; spinBtn.textContent = "Spinning…"; }
    if (rafId) cancelAnimationFrame(rafId);

    try { getAudio(); } catch (e) { /* ok */ }

    const WH        = winH();
    const FRICTION  = 0.9835;
    const THRESHOLD = 1.4;

    // Pre-simulate: find how far the reel will travel
    let simV = initVel, simDist = 0;
    while (simV >= THRESHOLD) { simDist += simV; simV *= FRICTION; }

    // Which row index will naturally end up centered?
    const naturalLandIdx = Math.round((simDist + WH / 2 - ITEM_H / 2) / ITEM_H);
    const LAND  = naturalLandIdx + 1;
    const COUNT = LAND + 5;

    // Pick winning topic
    let winIdx;
    do { winIdx = (Math.random() * pool.length) | 0; }
    while (pool.length > 1 && winIdx === lastIdx);
    lastIdx = winIdx;
    currentTopic = pool[winIdx];

    // Build the full reel item list
    let items = [];
    while (items.length < COUNT) items = items.concat(shuffle(pool));
    items = items.slice(0, COUNT);
    items[LAND] = currentTopic;

    const TARGET_Y = -(LAND * ITEM_H + ITEM_H / 2 - WH / 2);

    // Reset strip
    reelStrip.innerHTML = '';
    reelStrip.classList.remove('settled');
    reelStrip.style.transition = '';
    reelStrip.style.transform  = 'translateY(0)';
    if (catBadge)   catBadge.style.opacity  = '0';
    if (diffPips)   diffPips.style.opacity  = '0';

    items.forEach((t, i) => {
      const el = makeItem(t);
      if (i === LAND) el.dataset.land = '1';
      reelStrip.appendChild(el);
    });

    /* ── RAF animation loop ──────────────────────────────── */
    let pos = 0, vel = initVel, lastTs = null, lastBound = 0;

    function frame(ts) {
      if (!lastTs) lastTs = ts;
      const rawDt = (ts - lastTs) / 16.667;
      const dt    = Math.min(rawDt, 3);
      lastTs = ts;
      if (dt === 0) { rafId = requestAnimationFrame(frame); return; }

      pos += vel * dt;
      vel *= Math.pow(FRICTION, dt);

      reelStrip.style.transform = `translateY(${-pos}px)`;
      applyDepth(-pos);

      // Scroll thumb
      setThumb(pos / (COUNT * ITEM_H));

      // Tick sound each new item
      const curBound = (pos / ITEM_H) | 0;
      if (curBound > lastBound) {
        playTick(Math.min((initVel - vel) / initVel, 0.97));
        lastBound = curBound;
      }

      if (vel >= THRESHOLD) {
        rafId = requestAnimationFrame(frame);
      } else {
        snapToLand();
      }
    }

    /* ── Spring snap to final landing position ───────────── */
    function snapToLand() {
      const startY = -pos;
      const delta  = TARGET_Y - startY;
      const t0     = performance.now();
      const DUR    = 640;

      function springFrame(now) {
        const elapsed = now - t0;
        const t = Math.min(elapsed / DUR, 1);
        // Damped spring: 1 - e^(-7t) · cos(5t)
        const eased = 1 - Math.exp(-7 * t) * Math.cos(5 * t);
        const y = startY + delta * eased;
        reelStrip.style.transform = `translateY(${y}px)`;
        applyDepth(y);
        if (t < 1) {
          rafId = requestAnimationFrame(springFrame);
        } else {
          onLanded();
        }
      }
      rafId = requestAnimationFrame(springFrame);
    }

    /* ── Settle callback ─────────────────────────────────── */
    function onLanded() {
      reelStrip.style.transform = `translateY(${TARGET_Y}px)`;
      reelStrip.classList.add('settled');

      const landEl = reelStrip.querySelector('[data-land="1"]');
      if (landEl) landEl.classList.add('landed');

      if (catBadge) {
        catBadge.textContent  = CAT_META[curCat]?.badge || '🎯 ALL TOPICS';
        catBadge.style.opacity = '1';
      }
      renderPips(curDiff);
      setThumb(0.5);

      playLand();
      spinning = false;
      if (spinBtn) { spinBtn.disabled = false; spinBtn.textContent = "Spin"; }

      // Persist topic for timer page
      saveSession({ topic: currentTopic, cat: curCat, diff: curDiff });
      syncTimerBtn();
      showToast('Topic locked — start the timer when ready.');
    }

    rafId = requestAnimationFrame(frame);
  }

  /* ── Timer button state ─────────────────────────────────── */
  function syncTimerBtn() {
    if (!toTimerBtn) return;
    if (currentTopic) {
      toTimerBtn.textContent = 'Start Timer →';
      toTimerBtn.removeAttribute('disabled');
    } else {
      toTimerBtn.textContent = 'Start Timer →';
    }
  }

  /* ── Dropdown factory ───────────────────────────────────── */
  function setupDropdown(pillId, onSelect) {
    const pill    = document.getElementById(pillId);
    if (!pill) return;
    const trigger = pill.querySelector('.fpill-trigger');
    const menu    = pill.querySelector('.fpill-menu');

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = pill.classList.contains('open');
      document.querySelectorAll('.fpill.open').forEach(p => {
        p.classList.remove('open');
        p.querySelector('.fpill-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        pill.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    menu.addEventListener('click', e => {
      const opt = e.target.closest('.fpill-option');
      if (!opt) return;
      menu.querySelectorAll('.fpill-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      onSelect(opt);
      pill.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });

    // Close on outside click
    document.addEventListener('click', () => {
      pill.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });
    pill.addEventListener('click', e => e.stopPropagation());
  }

  setupDropdown('catPill', opt => {
    curCat = opt.dataset.val;
    const catTrigger = document.getElementById('catTrigger');
    if (catTrigger) {
      catTrigger.querySelector('#catIcon').textContent  = opt.dataset.icon;
      catTrigger.querySelector('#catLabel').textContent = opt.dataset.label;
    }
    pool = buildPool(curCat, curDiff);
    lastIdx = -1;
    initStaticReel();
  });

  setupDropdown('diffPill', opt => {
    curDiff = opt.dataset.val;
    const diffTrigger = document.getElementById('diffTrigger');
    if (diffTrigger) {
      diffTrigger.querySelector('#diffIcon').textContent  = opt.dataset.icon;
      diffTrigger.querySelector('#diffLabel').textContent = opt.dataset.label;
    }
    pool = buildPool(curCat, curDiff);
    lastIdx = -1;
    initStaticReel();
  });

  /* ── Spin button ────────────────────────────────────────── */
  if (spinBtn) {
    spinBtn.addEventListener('click', () => {
      if (spinning) return;
      try { getAudio(); } catch (e) {}
      spin(36 + Math.random() * 16);
    });
  }

  /* ── Timer button — navigate to timer.html ──────────────── */
  if (toTimerBtn) {
    toTimerBtn.addEventListener('click', () => {
      if (currentTopic) {
        saveSession({ topic: currentTopic, cat: curCat, diff: curDiff });
      }
      window.location.href = 'timer.html';
    });
  }

  /* ── Keyboard shortcuts ─────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space') {
      e.preventDefault();
      if (!spinning) {
        try { getAudio(); } catch (err) {}
        spin(36 + Math.random() * 16);
      }
    }
    if (e.code === 'Enter' && currentTopic && !spinning) {
      e.preventDefault();
      saveSession({ topic: currentTopic, cat: curCat, diff: curDiff });
      window.location.href = 'timer.html';
    }
  });

  /* ── Restore previous session filter state ──────────────── */
  const prev = loadSession();
  if (prev?.cat && prev.cat !== 'all') {
    curCat  = prev.cat;
    curDiff = prev.diff || 'all';
    pool = buildPool(curCat, curDiff);

    // Update pill UI to match restored state
    const catOpt = document.querySelector(`[data-val="${curCat}"]`);
    if (catOpt) {
      catOpt.closest('.fpill-menu')?.querySelectorAll('.fpill-option').forEach(o => o.classList.remove('active'));
      catOpt.classList.add('active');
      const catIcon  = document.getElementById('catIcon');
      const catLabel = document.getElementById('catLabel');
      if (catIcon)  catIcon.textContent  = catOpt.dataset.icon;
      if (catLabel) catLabel.textContent = catOpt.dataset.label;
    }
  }

  /* ── Init on load ───────────────────────────────────────── */
  renderStreakBadge();
  initStaticReel();
});
