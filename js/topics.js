/* ═══════════════════════════════════════════════════════════
   VOLLEY — Topic Data & Utilities  (topics.js)
   All original topics — no overlap with Off the Cuff
   ═══════════════════════════════════════════════════════════ */

'use strict';

const VOLLEY_TOPICS = {
  career: {
    easy: [
      "The most underrated career skill nobody teaches you.",
      "What makes someone instantly trustworthy at work?",
      "Should you follow your passion or follow the money?",
      "What does a truly great mentor look like?",
      "Why do smart people sometimes fail at their jobs?",
      "The thing you wish you'd known before your first job.",
      "Is staying in one company for 10 years smart or risky?",
      "What separates someone who gets promoted from someone who plateaus?",
      "What does 'work ethic' actually mean in practice?",
      "How do you make a strong first impression — and does it even matter?",
    ],
    medium: [
      "How do you make a decision when the data says one thing and your gut says another?",
      "Is hustle culture genuinely productive or a collective delusion?",
      "What does real leadership look like vs. what companies say it looks like?",
      "How do you give critical feedback to someone who doesn't want to hear it?",
      "Is ambition a virtue or a source of suffering — or both?",
      "How do you know when it's time to leave a job you're actually good at?",
      "What's the real difference between being busy and being effective?",
      "When does playing office politics become necessary — and when does it become corrosive?",
      "How do you rebuild credibility after making a visible mistake?",
      "Is being likeable at work a genuine advantage or a trap?",
    ],
    hard: [
      "Argue that performance reviews are actively harmful to team culture.",
      "Is the meritocracy myth the most damaging lie in the modern workplace?",
      "How should organizations handle employees who are brilliant but impossible to work with?",
      "Make the case that the traditional career ladder no longer serves anyone.",
      "Is remote work quietly destroying the conditions that produce great work?",
      "Defend this: most diversity initiatives improve optics but rarely move the needle on outcomes.",
      "Is loyalty to a company rational — or something companies invented to exploit workers?",
    ],
  },
  mindset: {
    easy: [
      "What's the one habit that has genuinely changed how you think?",
      "Is confidence something you build over time or something you simply choose?",
      "How do you stay focused when everything around you is competing for your attention?",
      "What's the most useful thing failure has ever actually taught you?",
      "Is being hard on yourself the same thing as having high standards?",
      "What does being disciplined actually look like in daily life?",
      "When is stubbornness a strength and when is it just being wrong loudly?",
      "What does it mean to have a growth mindset — beyond just the phrase?",
    ],
    medium: [
      "Is your biggest limitation a skill gap or a story you've been telling yourself?",
      "How do you build genuine resilience without just becoming emotionally numb?",
      "What's the difference between acceptance and giving up?",
      "Is self-awareness overrated as a path to actual improvement?",
      "How do you make peace with a decision you can never take back?",
      "What does it mean to truly know yourself — and is it even possible?",
      "Is the pursuit of self-improvement secretly a form of self-rejection?",
      "How do you hold onto your values when external pressure is pushing against them?",
    ],
    hard: [
      "Argue that the desire for certainty is more dangerous than uncertainty itself.",
      "Is ego the engine of achievement or the root of every meaningful failure?",
      "What does authentic identity mean when we're constantly being shaped by external forces?",
      "Is mental resilience something you're born with or something you construct — and does the difference matter?",
      "Argue that comfort, not failure, is the real enemy of human growth.",
      "Is chasing meaning more important than chasing happiness — and can you actually have both?",
      "What is the relationship between control and peace, and why do we confuse them?",
    ],
  },
  society: {
    easy: [
      "Is social media making people more or less genuinely empathetic?",
      "What does community actually mean in an age of digital connection?",
      "Should voting be made mandatory for all citizens?",
      "What's the most underrated social problem that nobody is talking about?",
      "Is city living or rural living actually better for long-term human wellbeing?",
      "What does 'the common good' mean in practice today?",
      "Is privacy still a meaningful right — or is it already gone?",
      "What does it look like to be a good neighbor in 2025?",
    ],
    medium: [
      "Has the 24-hour news cycle made citizens better informed or more manipulated?",
      "Is inequality the natural outcome of freedom — or is it always a political choice?",
      "What does free speech mean when misinformation spreads at the speed of a retweet?",
      "Is cancel culture a legitimate form of accountability or a form of mob justice?",
      "How do you rebuild trust in institutions that people have collectively stopped believing in?",
      "Is the nuclear family the ideal social unit — or just the default we happened to inherit?",
      "What is the actual relationship between economic growth and human happiness?",
      "Is loneliness the defining public health crisis of this generation?",
    ],
    hard: [
      "Argue that democracy is structurally unfit to solve long-horizon problems like climate change.",
      "Is nationalism a rational response to globalization or a regression to tribalism?",
      "Make the case that social media companies should be classified as public utilities.",
      "Is universal basic income a safety net that enables freedom — or a poverty trap that removes incentive?",
      "What does justice actually look like for historical wrongs that can never be fully undone?",
      "Argue that individual rights and collective wellbeing are fundamentally incompatible values.",
    ],
  },
  tech: {
    easy: [
      "Has the smartphone made your life measurably better or worse on balance?",
      "What's one piece of technology you could give up tomorrow without missing it?",
      "Should children learn to code the same way they learn to read and write?",
      "Is the algorithm your personal discovery engine or your echo chamber?",
      "What's the most dangerous app currently installed on your phone?",
      "Does technology make us more genuinely productive — or just more anxious?",
      "What tech innovation from the last decade has had the most unexpected impact?",
    ],
    medium: [
      "Will AI ultimately be the most liberating or the most oppressive technology ever built?",
      "Is the attention economy the greatest structural threat to human autonomy in this century?",
      "Should there be a recognized universal right to disconnect from the internet?",
      "How should we regulate a technology we don't yet fully understand?",
      "Is big tech monopoly power more or less dangerous than government monopoly power?",
      "Has automation created more opportunity than it's destroyed — and who has actually benefited?",
      "What responsibility do platforms have for the ideas and content they algorithmically amplify?",
    ],
    hard: [
      "Argue that open-source AI development poses a greater civilizational risk than closed, corporate AI.",
      "Is it ethical to build AI systems that can convincingly impersonate a human being?",
      "Make the case that the pace of technological change has permanently outrun our capacity for ethical judgment.",
      "Should AI systems be legally required to disclose uncertainty and limitations to users?",
      "Is the global surveillance infrastructure built for national security now effectively impossible to dismantle?",
      "Argue that social media has done more measurable damage to democratic discourse than any foreign adversary.",
    ],
  },
  debate: {
    easy: [
      "Office work is objectively better than remote work. Defend or demolish.",
      "Being consistently early is just as inconsiderate as always being late.",
      "A college degree is no longer worth the financial cost. Agree or argue against.",
      "Breakfast is the most important meal of the day — or a myth invented by cereal companies.",
      "Single-player games are more rewarding than multiplayer. Make your case.",
      "Reading fiction is a better use of time than watching documentaries.",
      "Money buys happiness — full stop. Argue for or against.",
    ],
    medium: [
      "Unpopular opinion: most startup advice actively harms the people who follow it.",
      "Defend this: the best leaders are the ones who do the least.",
      "Argue that short-form content is permanently degrading our capacity for deep thought.",
      "Make the case that cities should begin eliminating personal car ownership within 20 years.",
      "Vulnerability is the highest form of courage — or the most overrated concept in modern leadership.",
      "All employee salaries should be fully transparent across an entire organization.",
      "Defend this: social media companies owe users payment for their data and attention.",
    ],
    hard: [
      "Argue that extreme wealth inequality is an existential threat to functioning democracy.",
      "Make the case that colonizing other planets before solving Earth's problems is morally indefensible.",
      "Defend or dismantle: free will is an illusion constructed by the brain after decisions are already made.",
      "Is it ethical for governments to limit free speech when it threatens social cohesion?",
      "Argue that the global industrial food system is a greater long-term risk than nuclear weapons.",
      "Should there be a binding international treaty on AI development — and who enforces it when a country defects?",
    ],
  },
  story: {
    easy: [
      "Tell me about a moment that completely changed how you see another person.",
      "Describe the best advice you ever received — and whether you actually took it.",
      "Tell me about a time you were completely wrong about something you were certain of.",
      "Describe a small, ordinary moment that turned out to matter far more than it looked.",
      "Tell me about a decision you made entirely with your gut that you still stand behind.",
      "Describe a day you went in expecting one thing and got something else entirely.",
      "Tell me about a time a stranger had an unexpected impact on you.",
    ],
    medium: [
      "Tell me about a time you had to speak up when staying quiet would have been so much easier.",
      "Describe a failure that, in retrospect, quietly set something better in motion.",
      "Tell me about a moment when you understood something about yourself for the very first time.",
      "Describe navigating a situation where there was genuinely no obviously right answer.",
      "Tell me about a risk you took that permanently changed the trajectory of your life.",
      "Describe being tested by something you had absolutely no way to prepare for.",
      "Tell me about a time you changed your mind about something you'd believed for years.",
    ],
    hard: [
      "Tell me about a moment that forced you to completely redefine what success means to you.",
      "Describe a situation where two deeply held values of yours came into direct, unavoidable conflict.",
      "Tell me about the most important conversation you've ever had — and what made it matter.",
      "Describe coming to terms with a genuine limitation about yourself that you cannot change.",
      "Tell me about a moment when you chose the harder, right path over the easier, wrong one.",
      "Describe watching something you worked hard to build — a team, a project, a relationship — come apart.",
    ],
  },
};

/* ── Category metadata ─────────────────────────────────── */
const CAT_META = {
  all:     { icon: '🎯', badge: '🎯 ALL TOPICS',    label: 'All Topics'   },
  career:  { icon: '💼', badge: '💼 CAREER',         label: 'Career'       },
  mindset: { icon: '🧠', badge: '🧠 MINDSET',        label: 'Mindset'      },
  society: { icon: '🌍', badge: '🌍 SOCIETY',        label: 'Society'      },
  tech:    { icon: '⚡', badge: '⚡ TECHNOLOGY',     label: 'Technology'   },
  debate:  { icon: '⚔️',  badge: '⚔️ DEBATE THIS',  label: 'Debate This'  },
  story:   { icon: '✦',  badge: '✦ STORYTELLING',   label: 'Storytelling' },
};

const DIFF_META = {
  all:    { icon: '🎲', label: 'Any Level',   pips: 0 },
  easy:   { icon: '🟢', label: 'Warm-Up',     pips: 1 },
  medium: { icon: '🟡', label: 'Pressure',    pips: 2 },
  hard:   { icon: '🔴', label: 'High Stakes', pips: 3 },
};

/* ── Build flat topic pool ─────────────────────────────── */
function buildPool(cat = 'all', diff = 'all') {
  const cats  = cat  === 'all' ? Object.keys(VOLLEY_TOPICS) : [cat];
  const diffs = diff === 'all' ? ['easy', 'medium', 'hard'] : [diff];
  let pool = [];
  cats.forEach(c => {
    if (!VOLLEY_TOPICS[c]) return;
    diffs.forEach(d => {
      if (VOLLEY_TOPICS[c][d]) pool = pool.concat(VOLLEY_TOPICS[c][d]);
    });
  });
  return pool;
}

/* ── Fisher-Yates shuffle ──────────────────────────────── */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Session storage helpers ───────────────────────────── */
const SESSION_KEY = 'volley_session';

function saveSession(data) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch (e) { /* sessionStorage unavailable */ }
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

/* ── Toast utility ─────────────────────────────────────── */
let _toastTimer;
function showToast(msg, duration = 2900) {
  let el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}

/* ── Escape HTML ───────────────────────────────────────── */
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Web Audio helpers ─────────────────────────────────── */
let _audioCtx = null;

function getAudio() {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_audioCtx.state === 'suspended') {
    _audioCtx.resume().catch(() => {});
  }
  return _audioCtx;
}

function playTick(speedRatio) {
  try {
    const ctx = getAudio();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    const f   = ctx.createBiquadFilter();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800 - speedRatio * 1000, t);
    f.type = 'bandpass';
    f.frequency.value = 2400;
    f.Q.value = 2.5;
    g.gain.setValueAtTime(0.07 + (1 - speedRatio) * 0.04, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
    osc.connect(f); f.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.065);
  } catch (e) { /* audio blocked */ }
}

function playLand() {
  try {
    const ctx = getAudio();
    const now = ctx.currentTime;
    [[880, 0, 0.13], [1320, 0.065, 0.09], [1760, 0.115, 0.055]].forEach(([freq, delay, vol]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(vol, now + delay + 0.012);
      g.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.56);
      o.connect(g); g.connect(ctx.destination);
      o.start(now); o.stop(now + delay + 0.6);
    });
  } catch (e) { /* audio blocked */ }
}

function playTimerEnd() {
  try {
    const ctx = getAudio();
    const now = ctx.currentTime;
    [660, 880, 1100].forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.12, now + i * 0.14);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.14 + 0.52);
      o.connect(g); g.connect(ctx.destination);
      o.start(now + i * 0.14);
      o.stop(now + i * 0.14 + 0.57);
    });
  } catch (e) { /* audio blocked */ }
}

/* Expose globally */

/* ══════════════════════════════════════════════════════════
   FIX #11: COACH'S TIPS — one per category
   ══════════════════════════════════════════════════════════ */
const COACH_TIPS = {
  career: [
    "Use the STAR method: Situation, Task, Action, Result. It turns any career topic into a crisp, credible story.",
    "Start with the counterintuitive point. If your opening is obvious, you've already lost the room.",
    "Anchor on a specific example within the first 20 seconds. Abstract career advice loses audiences fast.",
  ],
  mindset: [
    "Use PEEL — Point, Evidence, Explain, Link. It creates instant structure under pressure.",
    "The best mindset answers move from personal to universal. Start with your experience, end with the insight anyone can use.",
    "Acknowledge the tension first. 'This sounds simple but...' makes audiences lean in.",
  ],
  society: [
    "Give the steelman before your argument. Show you understand the opposing view — it makes your position far more convincing.",
    "Ground abstract societal points in a concrete person or moment. Data shifts heads; stories shift hearts.",
    "End on a question rather than a conclusion. It signals intellectual confidence and invites dialogue.",
  ],
  tech: [
    "Translate jargon immediately. Assume your audience is smart but not technical. The translation is the insight.",
    "Use the 'So what?' test after every claim. If you can't answer it in one sentence, keep building.",
    "The strongest tech takes start with the human consequence, not the mechanism.",
  ],
  debate: [
    "Concede the strongest counter-argument early, then dismantle it. It's the most persuasive move in any debate.",
    "Use 'Yes, and' structure — agree with the premise, then reframe it. It sounds collaborative while advancing your position.",
    "State your stance in the first sentence. Never make the audience guess what side you're on.",
  ],
  story: [
    "Start in the middle of the action. Drop us into the moment — context can come second.",
    "The best stories have a moment of change. Identify the 'before' and 'after' and make sure both are clear.",
    "Slow down at the emotional peak. Most speakers rush through the most important moment.",
  ],
  all: [
    "Use PEEL — Point, Evidence, Explain, Link. It creates instant structure under pressure.",
    "Start with your conclusion. Tell them where you're going, then take them there.",
    "Three points maximum. More than three and no one remembers any of them.",
    "Pause deliberately. Silence feels longer to you than to your audience — use it.",
  ],
};

function getCoachTip(cat) {
  const tips = COACH_TIPS[cat] || COACH_TIPS.all;
  return tips[(Math.random() * tips.length) | 0];
}

/* ══════════════════════════════════════════════════════════
   FIX #12 + #13 + #14: localStorage — Streak + History
   ══════════════════════════════════════════════════════════ */
const LS_STREAK_KEY  = 'volley_streak';
const LS_HISTORY_KEY = 'volley_history';

/* Today's date string YYYY-MM-DD */
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/* Load streak object: { count, lastDate } */
function loadStreak() {
  try {
    const raw = localStorage.getItem(LS_STREAK_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastDate: null };
  } catch (e) { return { count: 0, lastDate: null }; }
}

/* Update streak after a completed session */
function updateStreak() {
  const today = todayStr();
  const streak = loadStreak();

  if (streak.lastDate === today) {
    // Already practiced today — no change
    return streak;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);

  if (streak.lastDate === yStr) {
    // Practiced yesterday → extend streak
    streak.count += 1;
  } else {
    // Gap > 1 day → reset
    streak.count = 1;
  }
  streak.lastDate = today;

  try { localStorage.setItem(LS_STREAK_KEY, JSON.stringify(streak)); } catch (e) {}
  return streak;
}

/* Load full session history array */
function loadHistory() {
  try {
    const raw = localStorage.getItem(LS_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

/* Save one completed session to history */
function saveSessionHistory({ topic, cat, diff, rating, durationSecs }) {
  const history = loadHistory();
  history.unshift({
    topic:        topic || '',
    cat:          cat   || 'all',
    diff:         diff  || 'all',
    rating:       rating || 0,
    durationSecs: durationSecs || 0,
    date:         new Date().toISOString(),
  });
  // Keep last 100 sessions
  if (history.length > 100) history.length = 100;
  try { localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(history)); } catch (e) {}
}

/* Total sessions count */
function totalSessions() {
  return loadHistory().length;
}

/* ── Render streak badge in navbar ─────────────────────── */
function renderStreakBadge() {
  const el = document.getElementById('navStreak');
  if (!el) return;
  const streak = loadStreak();
  const countEl = el.querySelector('.nav-streak-count');
  if (countEl) countEl.textContent = streak.count;
  el.classList.toggle('has-streak', streak.count > 0);
}

/* ══════════════════════════════════════════════════════════
   EXPORT
   ══════════════════════════════════════════════════════════ */
window.VolleyTopics = {
  VOLLEY_TOPICS,
  CAT_META,
  DIFF_META,
  buildPool,
  shuffle,
  saveSession,
  loadSession,
  showToast,
  escHtml,
  playTick,
  playLand,
  playTimerEnd,
  getAudio,
  /* New FIX #11-14 */
  getCoachTip,
  updateStreak,
  loadStreak,
  saveSessionHistory,
  loadHistory,
  totalSessions,
  renderStreakBadge,
};
