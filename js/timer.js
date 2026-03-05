/* ═══════════════════════════════════════════════════════════
   VOLLEY — Timer Page Script  (timer.js)
   FIX #10: Full post-session rating + coach's tip
   FIX #12/13/14: Streak update, session save, counter
   ═══════════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const {
    loadSession, showToast, playTimerEnd, getAudio, escHtml,
    getCoachTip, updateStreak, saveSessionHistory, totalSessions,
    renderStreakBadge,
  } = window.VolleyTopics;

  /* ── Load topic from session ──────────────────────────── */
  const session = loadSession();

  /* ── DOM refs — Timer ─────────────────────────────────── */
  const topicText   = document.getElementById('topicText');
  const topicCard   = document.getElementById('topicCard');
  const ringArc     = document.getElementById('ringArc');
  const ringTime    = document.getElementById('ringTime');
  const ringAdj     = document.getElementById('ringAdj');
  const playBtn     = document.getElementById('playBtn');
  const resetBtn    = document.getElementById('resetBtn');
  const adjMinus    = document.getElementById('adjMinus');
  const adjPlus     = document.getElementById('adjPlus');
  const statusDot   = document.getElementById('statusDot');
  const statusLabel = document.getElementById('statusLabel');
  const bgGlow      = document.getElementById('timerBgGlow');

  /* ── DOM refs — Done overlay ──────────────────────────── */
  const doneOverlay    = document.getElementById('doneOverlay');
  const doneTopicEcho  = document.getElementById('doneTopicEcho');
  const coachTipText   = document.getElementById('coachTipText');
  const sessionNumEl   = document.getElementById('sessionNum');
  const btnGoAgain     = document.getElementById('btnGoAgain');
  const btnNewTopic    = document.getElementById('btnNewTopic');

  /* ── Ring geometry ─────────────────────────────────────
     radius = 104 → circumference ≈ 653.45
  ──────────────────────────────────────────────────────── */
  const RADIUS = 104;
  const CIRC   = +(2 * Math.PI * RADIUS).toFixed(2);
  if (ringArc) ringArc.setAttribute('stroke-dasharray', CIRC);

  /* ── Timer state ───────────────────────────────────────── */
  let totalSecs  = 60;
  let remaining  = 60;
  let running    = false;
  let tickId     = null;
  let elapsedSecs = 0; // track how long they actually spoke

  /* ── Star rating state ─────────────────────────────────── */
  let selectedRating = 0;

  /* ── Populate topic ─────────────────────────────────────── */
  if (topicText) {
    if (session?.topic) {
      topicText.innerHTML = escHtml(session.topic);
      topicText.classList.remove('empty');
      if (topicCard) topicCard.classList.add('has-topic');
    } else {
      topicText.textContent = 'Go back and spin a topic first.';
      topicText.classList.add('empty');
    }
  }

  /* ── Render streak badge on load ────────────────────────── */
  renderStreakBadge();

  /* ── Render ring ────────────────────────────────────────── */
  function renderRing() {
    const frac   = Math.max(remaining, 0) / totalSecs;
    const offset = +(CIRC * (1 - frac)).toFixed(3);

    if (ringArc) {
      ringArc.style.strokeDashoffset = offset;
      ringArc.classList.remove('state-warn', 'state-danger');
      if (remaining <= 10 && remaining > 0) ringArc.classList.add('state-danger');
      else if (remaining <= 20)             ringArc.classList.add('state-warn');
    }

    if (ringTime) {
      const m = Math.floor(Math.max(remaining, 0) / 60);
      const s = Math.max(remaining, 0) % 60;
      ringTime.textContent = `${m}:${String(s).padStart(2, '0')}`;
      ringTime.classList.remove('state-warn', 'state-danger');
      if (remaining <= 10 && remaining > 0) ringTime.classList.add('state-danger');
      else if (remaining <= 20)             ringTime.classList.add('state-warn');
    }

    if (bgGlow) bgGlow.classList.toggle('danger-glow', remaining <= 10 && remaining > 0);
    if (ringAdj) ringAdj.classList.toggle('hidden', running);
  }

  /* ── Status chip ────────────────────────────────────────── */
  function setStatus(state) {
    if (!statusDot || !statusLabel) return;
    statusDot.className = 'dot';
    switch (state) {
      case 'idle':    statusLabel.textContent = 'Ready'; break;
      case 'running': statusDot.classList.add('live'); statusLabel.textContent = 'Speaking…'; break;
      case 'paused':  statusLabel.textContent = 'Paused'; break;
      case 'done':    statusDot.classList.add('done'); statusLabel.textContent = 'Done'; break;
    }
  }

  /* ── Timer controls ─────────────────────────────────────── */
  function startTimer() {
    if (remaining <= 0) resetTimer();
    running = true;
    if (playBtn) { playBtn.textContent = '⏸'; playBtn.classList.add('running'); }
    setStatus('running');
    renderRing();

    tickId = setInterval(() => {
      remaining  = Math.max(0, remaining - 1);
      elapsedSecs += 1;
      renderRing();
      if (remaining <= 0) { stopTimer(); onTimerDone(); }
    }, 1000);
  }

  function stopTimer() {
    running = false;
    clearInterval(tickId);
    if (playBtn) { playBtn.textContent = '▶'; playBtn.classList.remove('running'); }
    if (remaining > 0) setStatus('paused');
    renderRing();
  }

  function resetTimer() {
    stopTimer();
    remaining = totalSecs;
    elapsedSecs = 0;
    selectedRating = 0;
    setStatus('idle');
    if (doneOverlay) doneOverlay.classList.remove('show');
    if (bgGlow) bgGlow.classList.remove('danger-glow');
    renderRing();
    resetStars();
  }

  /* ── Timer done → show post-session screen ──────────────── */
  function onTimerDone() {
    setStatus('done');
    try { playTimerEnd(); } catch (e) {}

    // Update streak + save session (rating added later)
    const streak = updateStreak();
    renderStreakBadge();

    // Populate done screen
    if (doneTopicEcho) {
      doneTopicEcho.textContent = session?.topic
        ? `"${session.topic}"`
        : 'No topic selected.';
    }

    // Coach's tip — based on category
    const tip = getCoachTip(session?.cat || 'all');
    if (coachTipText) coachTipText.textContent = tip;

    // Session count
    const count = totalSessions() + 1; // +1 because we haven't saved yet
    if (sessionNumEl) sessionNumEl.textContent = `Session #${count}`;

    // Show streak toast if milestone
    if (streak.count > 1) {
      setTimeout(() => showToast(`🔥 ${streak.count}-day streak! Keep it up.`), 700);
    }

    setTimeout(() => {
      if (doneOverlay) doneOverlay.classList.add('show');
    }, 600);
  }

  /* ── Star rating ────────────────────────────────────────── */
  function initStars() {
    const stars = document.querySelectorAll('.star-btn');
    stars.forEach((btn, i) => {
      btn.addEventListener('mouseenter', () => highlightStars(i + 1));
      btn.addEventListener('mouseleave', () => highlightStars(selectedRating));
      btn.addEventListener('click', () => {
        selectedRating = i + 1;
        highlightStars(selectedRating);
        btn.classList.add('pop');
        setTimeout(() => btn.classList.remove('pop'), 400);
      });
    });
  }

  function highlightStars(n) {
    document.querySelectorAll('.star-btn').forEach((btn, i) => {
      btn.classList.toggle('selected', i < n);
    });
  }

  function resetStars() {
    selectedRating = 0;
    highlightStars(0);
  }

  /* ── Save & Continue (done overlay primary CTA) ─────────── */
  const btnSaveAndContinue = document.getElementById('btnSaveAndContinue');
  if (btnSaveAndContinue) {
    btnSaveAndContinue.addEventListener('click', () => {
      // Save session with rating
      saveSessionHistory({
        topic:        session?.topic || '',
        cat:          session?.cat   || 'all',
        diff:         session?.diff  || 'all',
        rating:       selectedRating,
        durationSecs: elapsedSecs,
      });
      window.location.href = 'spin.html';
    });
  }

  if (btnGoAgain) {
    btnGoAgain.addEventListener('click', () => {
      // Save with current rating before resetting
      saveSessionHistory({
        topic:        session?.topic || '',
        cat:          session?.cat   || 'all',
        diff:         session?.diff  || 'all',
        rating:       selectedRating,
        durationSecs: elapsedSecs,
      });
      doneOverlay.classList.remove('show');
      resetTimer();
    });
  }

  if (btnNewTopic) {
    btnNewTopic.addEventListener('click', () => {
      saveSessionHistory({
        topic:        session?.topic || '',
        cat:          session?.cat   || 'all',
        diff:         session?.diff  || 'all',
        rating:       selectedRating,
        durationSecs: elapsedSecs,
      });
      window.location.href = 'spin.html';
    });
  }

  /* ── Play / Reset buttons ───────────────────────────────── */
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      try { getAudio(); } catch (e) {}
      if (running) stopTimer(); else startTimer();
    });
  }
  if (resetBtn) resetBtn.addEventListener('click', resetTimer);

  /* ── +/- duration adjusters ─────────────────────────────── */
  if (adjMinus) {
    adjMinus.addEventListener('click', () => {
      if (running) return;
      totalSecs = Math.max(30, totalSecs - 30);
      remaining = totalSecs; renderRing();
    });
  }
  if (adjPlus) {
    adjPlus.addEventListener('click', () => {
      if (running) return;
      totalSecs = Math.min(300, totalSecs + 30);
      remaining = totalSecs; renderRing();
    });
  }

  /* ── Keyboard shortcuts ─────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space') {
      e.preventDefault();
      try { getAudio(); } catch (err) {}
      if (running) stopTimer(); else startTimer();
    }
    if (e.code === 'KeyR') resetTimer();
  });

  /* ── Init ───────────────────────────────────────────────── */
  setStatus('idle');
  renderRing();
  initStars();
});
