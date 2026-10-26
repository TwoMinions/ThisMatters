import { SKILLS, HOBBY_CATALOG, QUOTES } from "./catalog.js";
import { firebaseConfig, firebaseConfigured } from "./firebase-config.js";

const $ = (sel, root = document) => root.querySelector(sel);
const app = $("#app");
const DEMO_KEY = "thismatters-demo-v1";
const DAY_MS = 86400000;
const svgPaths = {
  home: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  skills:
    '<path d="m12 3-1.9 5.9L4 11l6.1 2.1L12 19l1.9-5.9L20 11l-6.1-2.1L12 3Z"/><path d="M4 3v4M2 5h4M20 17v4m-2-2h4"/>',
  hobbies:
    '<path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M18.4 5.6l-2.1 2.1m-8.6 8.6-2.1 2.1"/><circle cx="12" cy="12" r="4"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  chart: '<path d="M3 3v18h18M7 16l4-5 3 2 5-7"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M4 7h16M10 11v7m4-7v7M6 7l1 14h10l1-14M9 7V4h6v3"/>',
  pause: '<path d="M7 5v14M17 5v14"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
  refresh:
    '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.8 9A7 7 0 0 1 18 6l2 1M4 17l2 1a7 7 0 0 0 12.3-3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20.5 13A9 9 0 0 1 11 3.5 9 9 0 1 0 20.5 13Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  logout:
    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5m5 5H9"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  warning: '<path d="m12 3 10 18H2L12 3Zm0 6v5m0 4h.01"/>',
  leaf: '<path d="M20 4c-10 0-16 6-16 12a4 4 0 0 0 4 4c6 0 12-6 12-16ZM4 20c4-4 8-8 13-11"/>',
  book: '<path d="M12 7C9 5 6 5 3 6v14c3-1 6-1 9 1 3-2 6-2 9-1V6c-3-1-6-1-9 1Zm0 0v14"/>',
  spark:
    '<path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z"/>',
  target:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
  edit: '<path d="M3 21h4l12-12-4-4L3 17v4ZM13 7l4 4"/>',
  cloud:
    '<path d="M7 18h12a4 4 0 0 0 .7-7.9A7 7 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z"/>',
};
const icon = (name, size) =>
  `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${size ? `style="width:${size}px;height:${size}px"` : ""}>${svgPaths[name] || svgPaths.spark}</svg>`;
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const todayKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const shiftDay = (key, n) => {
  const d = new Date(`${key}T12:00:00`);
  d.setDate(d.getDate() + n);
  return todayKey(d);
};
const fmtTime = (sec) => {
  sec = Math.max(0, Math.floor(sec || 0));
  return `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
};
const niceDate = (
  key,
  options = { weekday: "long", month: "long", day: "numeric" },
) => new Date(`${key}T12:00:00`).toLocaleDateString("en-US", options);
const minutesOf = (time) => {
  const [h, m] = time.split(":").map(Number);
  return 60 * h + m;
};
const humanTime = (value) => {
  const [h, m] = value.split(":").map(Number);
  return `${String(h % 12 || 12)}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};
const uid = () =>
  globalThis.crypto?.randomUUID?.() ||
  `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
const skillById = (id) => SKILLS.find((s) => s.id === id);
const hobbyById = (id) => HOBBY_CATALOG.find((h) => h.id === id);

function createData(seed = false) {
  const d = {
    version: 1,
    createdAt: Date.now(),
    profile: { name: "You" },
    activeSkills: [],
    hobbies: [],
    hobbyLogs: {},
    schedule: {},
    focusByDate: {},
    settings: { theme: "light" },
    updatedAt: Date.now(),
  };
  if (seed) {
    d.profile.name = "Explorer";
    d.activeSkills = [newSkill("coding"), newSkill("reading")];
    d.hobbies = ["journaling", "walking"];
    d.hobbyLogs = {
      journaling: { [todayKey()]: 15 },
      walking: { [todayKey()]: 20 },
    };
    d.focusByDate = {
      [shiftDay(todayKey(), -2)]: 720,
      [shiftDay(todayKey(), -1)]: 1200,
      [todayKey()]: 0,
    };
    d.schedule[todayKey()] = [
      {
        id: uid(),
        title: "Morning focus",
        start: "09:00",
        end: "10:30",
        type: "Study",
        intensity: "high",
      },
      {
        id: uid(),
        title: "Break & a little sunshine",
        start: "10:30",
        end: "11:00",
        type: "Rest",
        intensity: "low",
      },
      {
        id: uid(),
        title: "Classes / deep work",
        start: "11:00",
        end: "13:30",
        type: "Study",
        intensity: "high",
      },
      {
        id: uid(),
        title: "Lunch & recharge",
        start: "13:30",
        end: "14:15",
        type: "Rest",
        intensity: "low",
      },
      {
        id: uid(),
        title: "Personal projects",
        start: "15:00",
        end: "16:30",
        type: "Creative",
        intensity: "medium",
      },
      {
        id: uid(),
        title: "Unplug and unwind",
        start: "18:30",
        end: "19:00",
        type: "Rest",
        intensity: "low",
      },
    ];
  }
  return d;
}
function newTask(skillId, index, date = todayKey()) {
  const def = skillById(skillId),
    task = def.tasks[index % def.tasks.length];
  return {
    id: uid(),
    index,
    date,
    title: task.title,
    description: task.description,
    minMinutes: task.minutes,
    elapsedSeconds: 0,
    completedAt: null,
  };
}
function newSkill(id) {
  return { id, startedAt: todayKey(), tasks: [newTask(id, 0)] };
}
function hydrate(raw) {
  const base = createData();
  if (!raw || typeof raw !== "object") return base;
  return {
    ...base,
    ...raw,
    profile: { ...base.profile, ...raw.profile },
    settings: { ...base.settings, ...raw.settings },
    activeSkills: Array.isArray(raw.activeSkills) ? raw.activeSkills : [],
    hobbies: Array.isArray(raw.hobbies) ? raw.hobbies : [],
    hobbyLogs:
      raw.hobbyLogs && typeof raw.hobbyLogs === "object" ? raw.hobbyLogs : {},
    schedule:
      raw.schedule && typeof raw.schedule === "object" ? raw.schedule : {},
    focusByDate:
      raw.focusByDate && typeof raw.focusByDate === "object"
        ? raw.focusByDate
        : {},
  };
}
let data = createData(),
  screen = "overview",
  mode = "demo",
  activeDate = todayKey(),
  filter = "All",
  quoteOffset = 0;
let menuOpen = false,
  authSignUp = false,
  authError = "",
  pendingSignUpName = "",
  authReady = false,
  authUser = null,
  fb = null,
  activeTimer = null,
  timerSaveAt = 0,
  saveChain = Promise.resolve(),
  lastShownDay = todayKey();
function getLatest(skill) {
  return skill.tasks[skill.tasks.length - 1];
}
function canAdvance(skill) {
  const t = getLatest(skill);
  return Boolean(
    t?.completedAt &&
    todayKey() > todayKey(new Date(t.completedAt)) &&
    todayKey() > t.date,
  );
}
function rollDaily() {
  let changed = false;
  for (const skill of data.activeSkills) {
    if (!skillById(skill.id)) continue;
    if (!skill.tasks?.length) {
      skill.tasks = [newTask(skill.id, 0)];
      changed = true;
      continue;
    }
    if (canAdvance(skill)) {
      const previous = getLatest(skill);
      skill.tasks.push(newTask(skill.id, previous.index + 1));
      changed = true;
    }
  }
  if (changed) persist();
  return changed;
}
function saveDemo() {
  try {
    localStorage.setItem(DEMO_KEY, JSON.stringify(data));
  } catch (e) {
    toast("Browser storage is full or unavailable.", "warning");
  }
}
function persist() {
  data.updatedAt = Date.now();
  if (mode === "demo") {
    saveDemo();
    return Promise.resolve();
  }
  if (mode === "cloud" && authUser && fb) {
    const snapshot = JSON.parse(JSON.stringify(data));
    saveChain = saveChain
      .catch(() => {})
      .then(() => fb.setDoc(fb.doc(fb.db, "users", authUser.uid), snapshot))
      .catch((e) => {
        console.error(e);
        toast(
          "Unable to save to Firebase. Check your connection or Firestore rules.",
          "warning",
        );
      });
    return saveChain;
  }
  return Promise.resolve();
}
function loadDemo() {
  try {
    const saved = localStorage.getItem(DEMO_KEY);
    data = saved ? hydrate(JSON.parse(saved)) : createData(true);
  } catch {
    data = createData(true);
  }
  mode = "demo";
  rollDaily();
  applyTheme();
  render();
}
function applyTheme() {
  document.documentElement.dataset.theme =
    data.settings.theme === "dark" ? "dark" : "light";
}
function toast(message, type = "success") {
  const node = document.createElement("div");
  node.className = "toast";
  node.innerHTML = `${icon(type === "warning" ? "warning" : "check")}<span>${esc(message)}</span>`;
  $("#toasts").append(node);
  setTimeout(() => node.remove(), 4700);
}
function stats() {
  const allTasks = data.activeSkills.flatMap((s) => s.tasks || []);
  const completed = allTasks.filter((t) => t.completedAt).length;
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    shiftDay(todayKey(), -i),
  );
  const focus = Math.floor(
    weekDates.reduce((n, k) => n + (Number(data.focusByDate[k]) || 0), 0) / 60,
  );
  const hobbyMinutes = Object.values(data.hobbyLogs).reduce(
    (n, logs) =>
      n + weekDates.reduce((s, k) => s + (Number(logs?.[k]) || 0), 0),
    0,
  );
  const todayHobby = Object.values(data.hobbyLogs).reduce(
    (n, logs) => n + (Number(logs?.[todayKey()]) || 0),
    0,
  );
  const doneToday = allTasks.filter(
    (t) => t.completedAt && todayKey(new Date(t.completedAt)) === todayKey(),
  ).length;
  return { completed, focus, hobbyMinutes, todayHobby, doneToday };
}
function quote() {
  const n = Math.floor(new Date(`${todayKey()}T12:00:00`).getTime() / DAY_MS);
  return QUOTES[
    (((n + quoteOffset) % QUOTES.length) + QUOTES.length) % QUOTES.length
  ];
}
function formatDuration(min) {
  return min >= 60
    ? `${Math.floor(min / 60)}h ${min % 60 ? `${min % 60}m` : ""}`
    : `${min}m`;
}
function analysisFor(key) {
  const events = [...(data.schedule[key] || [])]
    .filter((x) => x.start && x.end && x.end > x.start)
    .sort((a, b) => a.start.localeCompare(b.start));
  let occupied = 0,
    lastEnd = 0,
    overlaps = 0,
    high = 0,
    rest = 0,
    late = 0,
    longest = 0,
    run = 0,
    runEnd = -1;
  for (const e of events) {
    const a = minutesOf(e.start),
      b = minutesOf(e.end);
    occupied += Math.max(0, b - Math.max(a, lastEnd));
    if (a < lastEnd) overlaps++;
    lastEnd = Math.max(lastEnd, b);
    if (e.intensity === "high") high += b - a;
    if (e.type === "Rest") rest += b - a;
    if (e.intensity === "high" && b > 21 * 60)
      late += Math.max(0, b - Math.max(a, 21 * 60));
    if (e.type === "Rest") {
      run = 0;
      runEnd = -1;
    } else {
      if (runEnd < 0 || a > runEnd + 15) {
        run = b - a;
      } else {
        run += Math.max(0, b - Math.max(a, runEnd));
      }
      runEnd = b;
      longest = Math.max(longest, run);
    }
  }
  const active = events
    .filter((e) => e.type !== "Rest")
    .reduce((n, e) => n + minutesOf(e.end) - minutesOf(e.start), 0);
  let score = Math.min(
    100,
    Math.round(
      (active / 600) * 70 +
        (high / 300) * 20 +
        overlaps * 10 +
        (late ? 10 : 0) -
        (rest > 30 ? 8 : 0),
    ),
  );
  score = Math.max(0, score);
  const signals = [];
  if (!events.length) {
    signals.push({
      type: "good",
      title: "A blank canvas",
      description:
        "Add your classes, work and free time to see thoughtful suggestions.",
    });
  } else {
    if (overlaps)
      signals.push({
        type: "warn",
        title: "Your plans overlap",
        description: `${overlaps} event${overlaps > 1 ? "s" : ""} start before the previous one ends. Adjust the times to avoid double-booking.`,
      });
    if (active >= 540)
      signals.push({
        type: "warn",
        title: "A very full day",
        description: `You have ${formatDuration(Math.round(active))} of non-rest activities planned. Could something be moved or shortened?`,
      });
    if (longest >= 180 && rest < 30)
      signals.push({
        type: "warn",
        title: "Make room for a pause",
        description:
          "You have a long stretch of scheduled activity with limited designated rest. Try a 15–20 minute break.",
      });
    if (late)
      signals.push({
        type: "warn",
        title: "High-effort work late at night",
        description:
          "Demanding activities after 9 PM might crowd out your wind-down time.",
      });
    if (high >= 300)
      signals.push({
        type: "warn",
        title: "Lots of demanding work",
        description:
          "Consider separating high-focus blocks with lighter activities and breaks.",
      });
    if (!signals.length)
      signals.push({
        type: "good",
        title: "Your plan has breathing room",
        description:
          "No major scheduling pressure flags found in today’s entries. Keep listening to your energy levels.",
      });
  }
  return {
    events,
    occupied,
    active,
    rest,
    score,
    signals: signals.slice(0, 4),
    level: score >= 75 ? "Heavy" : score >= 45 ? "Moderate" : "Balanced",
  };
}
function navButton(id, label, iconName) {
  return `<button class="nav-item ${screen === id ? "active" : ""}" data-action="navigate" data-page="${id}">${icon(iconName)}<span class="nav-text">${label}</span>${id === "skills" && data.activeSkills.length ? `<span class="nav-count">${data.activeSkills.length}</span>` : ""}</button>`;
}
function sidebar() {
  const name = esc(data.profile.name || authUser?.displayName || "You"),
    initial = name.slice(0, 1).toUpperCase();
  return `<div class="mobile-scrim ${menuOpen ? "open" : ""}" data-action="close-menu"></div><aside class="sidebar ${menuOpen ? "open" : ""}">
  <div class="brand"><div class="brand-sign">tm<span class="brand-dot">.</span></div><div class="brand-word">thismatters<span class="brand-dot">.</span></div></div>
  <nav><div class="nav-label">Your space</div>${navButton("overview", "Overview", "home")}${navButton("skills", "Skill studio", "skills")}${navButton("hobbies", "Hobby corner", "hobbies")}${navButton("schedule", "My day", "calendar")}${navButton("insights", "Insights", "chart")}</nav>
  <div class="nav-bottom"><div class="nav-inspiration"><small>A small reminder</small><p>You don't need to do it all. Just what matters.</p><button class="text-link tiny-link" data-action="navigate" data-page="skills">Keep growing ${icon("arrow", 13)}</button></div>
  <button class="nav-item ${screen === "settings" ? "active" : ""}" data-action="navigate" data-page="settings">${icon("settings")}<span class="nav-text">Settings</span></button>
  <div class="nav-account"><div class="avatar">${initial}</div><div class="nav-person"><strong>${name}</strong><span>${mode === "cloud" ? "Firebase synced" : "Local demo workspace"}</span></div><button class="icon-btn" data-action="${mode === "cloud" ? "logout" : "settings"}" aria-label="${mode === "cloud" ? "Sign out" : "Settings"}" title="${mode === "cloud" ? "Sign out" : "Settings"}">${icon(mode === "cloud" ? "logout" : "settings")}</button></div></div></aside>`;
}
function mobileNav() {
  return `<nav class="mobile-nav" aria-label="Mobile navigation">${[
    ["overview", "Home", "home"],
    ["skills", "Skills", "skills"],
    ["hobbies", "Hobbies", "hobbies"],
    ["schedule", "My day", "calendar"],
    ["insights", "Insights", "chart"],
  ]
    .map(
      ([id, l, i]) =>
        `<button class="${screen === id ? "active" : ""}" data-action="navigate" data-page="${id}">${icon(i)}${l}</button>`,
    )
    .join("")}</nav>`;
}
function heading(title, subtitle, action = "") {
  return `<div class="page-heading"><div><div class="eyebrow">A BETTER YOU, ONE DAY AT A TIME</div><h1 style="margin-top:12px">${title}</h1><p>${subtitle}</p></div>${action}</div>`;
}
function statCard(name, value, desc, ic) {
  return `<div class="stat-card"><div class="stat-heading"><span>${name}</span>${icon(ic)}</div><div><div class="stat-value">${value}</div><div class="stat-description">${desc}</div></div></div>`;
}
function taskRows(limit = 3) {
  const active = data.activeSkills.slice(0, limit);
  if (!active.length)
    return `<div class="empty-state"><div class="empty-symbol">✳</div><b>Nothing on the list. Yet.</b><p>Pick a skill you’ve always wanted to explore. Your first tiny task is waiting.</p><button class="btn btn-primary" data-action="navigate" data-page="skills">Explore skills ${icon("arrow")}</button></div>`;
  return active
    .map((s) => {
      const d = skillById(s.id),
        t = getLatest(s);
      if (!d || !t) return "";
      const pct = Math.min(
        100,
        Math.round((t.elapsedSeconds / (t.minMinutes * 60)) * 100),
      );
      return `<div class="task-row"><div class="task-emblem" style="background:${d.tint}">${d.emoji}</div><div class="task-text"><b>${esc(t.title)}</b><small>${esc(d.title)} · ${t.minMinutes} min minimum</small><div class="mini-progress"><span style="width:${t.completedAt ? 100 : pct}%"></span></div></div><span class="pill ${t.completedAt ? "pill-done" : "pill-orange"}">${t.completedAt ? "Done" : pct + "%"}</span></div>`;
    })
    .join("");
}
function overview() {
  const s = stats(),
    a = analysisFor(todayKey()),
    done = data.activeSkills.filter((s) => getLatest(s)?.completedAt).length,
    total = data.activeSkills.length;
  const pct = total ? Math.round((done / total) * 100) : 0,
    q = quote();
  const name = (data.profile.name || "You").split(" ")[0];
  return `<div class="hero-grid"><section class="hero-card"><div class="hero-copy"><div class="eyebrow">YOUR JOURNEY, YOUR PACE</div><h1>Make space for <span>what matters.</span></h1><p>Little habits. Meaningful progress. A more intentional version of you starts today.</p><button class="btn btn-primary" data-action="navigate" data-page="skills">Explore your skills ${icon("arrow")}</button></div><div class="hero-orbit"><div class="orbit-center">✳</div><div class="orbit-spark"></div><div class="orbit-label">GROW, GENTLY.</div></div></section>
 <section class="quote-card"><div class="quote-top"><span>✳ &nbsp; Today's perspective</span>${icon("spark")}</div><div class="quote-big">“${esc(q.text)}”</div><div class="quote-bottom"><small>— ${esc(q.author)}</small><button class="quote-refresh" data-action="quote" aria-label="Show another quote" title="A new perspective">${icon("refresh")}</button></div></section></div>
 <div class="stats-grid">${statCard("Your active skills", total, "Skills in progress", "skills")}${statCard("Tasks completed", s.completed, "Every small step counts", "check")}${statCard("Focus this week", formatDuration(s.focus), "Recorded skill practice", "clock")}${statCard("Hobby time this week", formatDuration(s.hobbyMinutes), "Room for joy", "hobbies")}</div>
 <div class="section-title"><div><h2>Today's little steps</h2><p>Progress happens one focused moment at a time.</p></div><button class="text-link" data-action="navigate" data-page="skills">Your skill studio ${icon("arrow")}</button></div>
 <div class="dashboard-bottom"><section class="panel"><div class="panel-head"><h3>On your plate</h3><small>${niceDate(todayKey(), { month: "short", day: "numeric" })}</small></div>${taskRows()}${data.activeSkills.length > 3 ? `<button class="text-link" data-action="navigate" data-page="skills" style="margin-top:13px">See all your tasks ${icon("arrow")}</button>` : ""}</section>
 <section class="panel balance-card"><div class="panel-head"><h3>Your daily rhythm</h3><small>${a.level} schedule</small></div><div class="balance-art"><div class="art-rune left">✳</div><div class="balance-ring" style="--pct:${pct}%"><div class="balance-ring-center"><strong>${pct}%</strong><span>skills finished</span></div></div><div class="art-rune right">◌</div></div><p>${a.events.length ? `${a.active >= 540 ? "Your calendar is looking pretty full." : "Your day has a shape. Make sure it has space for you, too."} ${a.events.length} scheduled activities today.` : "Your day is yours to design. A little structure and enough breathing room can go a long way."}</p><button class="text-link" data-action="navigate" data-page="schedule">Check your day ${icon("arrow")}</button></section></div>
 <div class="section-title"><div><h2>Beyond productivity</h2><p>Not everything needs an outcome. Some things are just for you.</p></div><button class="text-link" data-action="navigate" data-page="hobbies">Hobby corner ${icon("arrow")}</button></div>
 <div class="hobby-summary"><div><h2>Make time for being you.</h2><p>${s.todayHobby ? "You’ve spent " + formatDuration(s.todayHobby) + " on things you enjoy today." : "Your hobbies belong on the calendar, too."} There’s no finish line here.</p></div><button class="btn btn-primary" data-action="navigate" data-page="hobbies">Explore hobbies ${icon("arrow")}</button></div>`;
}
function focusCard(s) {
  const def = skillById(s.id);
  if (!def) return "";
  const t = getLatest(s);
  if (!t) return "";
  const seconds = t.elapsedSeconds || 0,
    goal = t.minMinutes * 60,
    pct = Math.min(100, Math.round((100 * seconds) / goal)),
    running = activeTimer?.skillId === s.id;
  const completed = !!t.completedAt;
  return `<article class="focus-card"><div class="focus-title"><div style="display:flex;align-items:center;gap:11px"><span class="skill-icon" style="width:42px;height:42px;font-size:21px;background:${def.tint}">${def.emoji}</span><div><b>${esc(def.title)}</b><div class="focus-sub">Day ${t.index + 1} · ${esc(def.category)}</div></div></div><button class="icon-btn" title="Remove this skill" aria-label="Remove ${esc(def.title)}" data-action="remove-skill" data-id="${s.id}">${icon("trash")}</button></div>
 <div class="focus-task"><div class="eyebrow">${completed ? "TODAY’S WORK IS DONE" : "TODAY’S FOCUS"}</div><div style="margin-top:12px"><b>${esc(t.title)}</b><p>${esc(t.description)}</p></div></div>
 <div class="timer-track"><span data-progress-for="${s.id}" style="width:${pct}%"></span></div><div class="timer-info"><span><strong data-timer-for="${s.id}">${fmtTime(seconds)}</strong> practiced</span><span>${t.minMinutes} min minimum</span></div>
 ${completed ? `<div class="subtle-alert">${icon("check")}<span>Finished! Your next task will unlock on the next calendar day. There’s no need to rush.</span></div>` : `<div class="focus-actions"><button class="btn btn-primary" data-action="timer" data-id="${s.id}">${icon(running ? "pause" : "play")} ${running ? "Pause focus" : "Start focus"}</button><button class="btn btn-orange complete-btn" data-complete-for="${s.id}" data-action="complete-task" data-id="${s.id}" ${seconds < goal ? "disabled" : ""}>${icon("check")} Complete</button></div><div class="subtle-alert">${icon("clock")}<span>Complete this task after at least ${t.minMinutes} minutes of timed practice. Unfinished tasks carry forward into tomorrow.</span></div>`}</article>`;
}
function skillsPage() {
  const categories = ["All", ...new Set(SKILLS.map((s) => s.category))];
  const filtered = SKILLS.filter(
    (s) => filter === "All" || s.category === filter,
  );
  return `${heading("Skills worth growing.", "Choose a skill that excites you. We’ll assign one achievable task at a time, and a new one only after the previous one is truly complete.")}
 <div class="section-title"><div><h2>Your daily practice</h2><p>${data.activeSkills.length} active skill${data.activeSkills.length === 1 ? "" : "s"} · minimum-time focus timer</p></div></div>
 <div class="focus-section">${data.activeSkills.length ? `<div class="focus-grid">${data.activeSkills.map(focusCard).join("")}</div>` : `<div class="empty-state"><div class="empty-symbol">✳</div><b>Ready to grow something new?</b><p>Browse the skills below and add one to unlock your first daily task.</p></div>`}</div>
 <div class="section-title"><div><h2>Find your next curiosity</h2><p>Skills in every direction. Pick what feels right.</p></div></div>
 <div class="filter-bar">${categories.map((c) => `<button class="chip ${filter === c ? "active" : ""}" data-action="filter" data-category="${esc(c)}">${esc(c)}</button>`).join("")}</div>
 <div class="skill-library">${filtered
   .map((s) => {
     const added = data.activeSkills.some((a) => a.id === s.id);
     return `<article class="skill-card"><div class="skill-top"><span class="skill-icon" style="background:${s.tint}">${s.emoji}</span><span class="skill-cat">${esc(s.category)}</span></div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><div class="skill-footer"><small>${s.minutes} MIN / DAY</small><button class="btn ${added ? "btn-soft" : "btn-primary"} btn-small" data-action="add-skill" data-id="${s.id}" ${added ? "disabled" : ""}>${added ? `${icon("check")} Added` : `${icon("plus")} Start learning`}</button></div></article>`;
   })
   .join("")}</div>`;
}
function hobbyCard(h) {
  const selected = data.hobbies.includes(h.id),
    log = data.hobbyLogs[h.id] || {},
    today = Number(log[todayKey()] || 0),
    week = Array.from(
      { length: 7 },
      (_, i) => log[shiftDay(todayKey(), -i)] || 0,
    ).reduce((a, b) => a + b, 0);
  return `<article class="hobby-card ${selected ? "hobby-selected" : ""}"><div class="hobby-icon" style="background:${h.color || "#e6eee4"}">${esc(h.icon || "✳")}</div><h3>${esc(h.title)}</h3><p>${esc(h.descriptor || "Something joyful, just for you")}</p>${selected ? `<div class="hobby-actions"><div class="hobby-manage"><span class="hobby-minutes">${today} min today · ${week} this week</span><button data-action="remove-hobby" data-id="${esc(h.id)}" aria-label="Remove ${esc(h.title)}">Remove</button></div><div class="hobby-log"><button data-action="log-hobby" data-id="${esc(h.id)}" data-min="10">+10m</button><button data-action="log-hobby" data-id="${esc(h.id)}" data-min="20">+20m</button><button data-action="log-hobby" data-id="${esc(h.id)}" data-min="30">+30m</button></div></div>` : `<button class="btn btn-outline btn-small" data-action="add-hobby" data-id="${esc(h.id)}">${icon("plus")} Add hobby</button>`}</article>`;
}
function hobbiesPage() {
  const custom = data.settings.customHobbies || [];
  const s = stats();
  return `${heading("The hobby corner.", "Not everything you love has to become a goal. Make space for creativity, movement, play and the things that make you feel like you.")}
 <div class="hobby-summary"><div><div class="eyebrow">JOY IS PRODUCTIVE TOO</div><h2 style="margin-top:12px">A little more of what you love.</h2><p>There’s no pressure to maintain a streak. Log the time you spend doing things just for you.</p></div><div class="hobby-total">${s.todayHobby}<span> min today</span></div></div>
 <div class="section-title"><div><h2>Pick your happy place</h2><p>Tap “Add hobby”, then log a session whenever you make time for it.</p></div></div>
 <div class="hobby-library">${[...HOBBY_CATALOG, ...custom].map(hobbyCard).join("")}</div>
 <section class="settings-card" style="margin-top:24px"><h3>Something else makes you happy?</h3><p>Add a personal hobby. It doesn’t need to fit into any category.</p><form data-form="custom-hobby" class="form-grid"><div class="form-group full"><label for="hobby-name">Your hobby</label><input class="field" id="hobby-name" name="name" placeholder="e.g. Chess, baking, birdwatching" required maxlength="36"></div><div class="form-group full"><button class="btn btn-primary" type="submit">${icon("plus")} Add my hobby</button></div></form></section>`;
}
function schedulePage() {
  const a = analysisFor(activeDate),
    events = a.events;
  return `${heading("Design your day.", "Put your daily plans in one place. ThisMatters looks for avoidable overlaps, long stretches and excessive workload—without judging how you spend your time.", `<label class="form-group" style="max-width:210px"><span style="font-size:11px;color:var(--muted);font-weight:800">PLAN FOR</span><input class="date-field" type="date" id="schedule-date" aria-label="Date to plan" value="${activeDate}"></label>`)}
 <div class="schedule-layout"><section class="timeline-panel"><div class="panel-head"><div><h3>${niceDate(activeDate)}</h3><small>${events.length} activity${events.length === 1 ? "" : "ies"} planned</small></div><button class="btn btn-soft btn-small" data-action="copy-yesterday">${icon("refresh")} Copy previous day</button></div>
 ${events.length ? `<div class="event-list">${events.map((e) => `<article class="event-item"><div class="event-time">${humanTime(e.start)}<br><span style="color:var(--muted);font-weight:500">${humanTime(e.end)}</span></div><div class="event-marker ${e.intensity}"></div><div class="event-label"><strong>${esc(e.title)}</strong><span>${esc(e.type)} · ${esc(e.intensity)} intensity</span></div><button class="icon-btn" aria-label="Delete ${esc(e.title)}" title="Delete event" data-action="delete-event" data-id="${esc(e.id)}">${icon("trash")}</button></article>`).join("")}</div>` : `<div class="empty-state"><div class="empty-symbol">◷</div><b>A little structure can help.</b><p>Add your first activity below. Classes, hobbies, breaks—everything belongs here.</p></div>`}
 <form class="add-event" data-form="add-event"><h3>Add an activity</h3><div class="form-grid"><div class="form-group full"><label for="event-title">What are you doing?</label><input id="event-title" name="title" class="field" placeholder="e.g. Study session, lunch, walking" required maxlength="75"></div>
 <div class="form-group"><label for="event-start">Starts</label><input id="event-start" type="time" name="start" class="field" value="09:00" required></div><div class="form-group"><label for="event-end">Ends</label><input id="event-end" type="time" name="end" class="field" value="10:00" required></div>
 <div class="form-group"><label for="event-type">Category</label><select id="event-type" name="type" class="field"><option>Study</option><option>Work</option><option>Creative</option><option>Personal</option><option>Rest</option><option>Exercise</option></select></div><div class="form-group"><label for="event-intensity">Mental effort</label><select id="event-intensity" name="intensity" class="field"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option></select></div>
 <div class="full"><button class="btn btn-primary" type="submit">${icon("plus")} Add to my day</button></div></div></form></section>
 <aside class="analyzer-panel"><div class="panel-head"><div><h3>Room to breathe</h3><small>Schedule balance check</small></div><span class="pill ${a.score >= 75 ? "pill-orange" : ""}">${a.level}</span></div>
 <div class="analysis-gauge"><div class="load-circle" style="--gauge-color:${a.score >= 75 ? "#e67b54" : a.score >= 45 ? "#d5b569" : "#83a48d"};--gauge-pct:${a.score}%"><div class="load-center"><strong>${a.score}</strong><small>/ 100 load</small></div></div><p>${a.score >= 75 ? "Today may feel quite packed." : a.score >= 45 ? "A fairly active day. Protect your pauses." : "Your schedule looks manageable so far."}</p></div>
 <div class="analysis-counters"><div class="analysis-counter"><b>${formatDuration(Math.round(a.active))}</b><small>Planned activity</small></div><div class="analysis-counter"><b>${formatDuration(Math.round(a.rest))}</b><small>Planned rest</small></div></div>
 <div class="section-title" style="margin:22px 0 8px"><h2 style="font-size:16px">A gentle check-in</h2></div>
 <div class="signal-list">${a.signals.map((s) => `<div class="signal ${s.type === "warn" ? "warn" : ""}"><span class="signal-icon">${icon(s.type === "warn" ? "warning" : "check", 15)}</span><div><b>${esc(s.title)}</b><p>${esc(s.description)}</p></div></div>`).join("")}</div>
 <p class="advice-disclaimer">These are simple scheduling heuristics, not mental health or medical assessments. Your personal needs matter more than any score.</p></aside></div>`;
}
function insightsPage() {
  const s = stats(),
    week = Array.from({ length: 7 }, (_, i) => shiftDay(todayKey(), i - 6));
  const values = week.map((d) => Math.round((data.focusByDate[d] || 0) / 60)),
    maximum = Math.max(15, ...values),
    a = analysisFor(todayKey());
  const skillHistory = data.activeSkills
    .map((x) => ({
      def: skillById(x.id),
      n: x.tasks.filter((t) => t.completedAt).length,
    }))
    .filter((x) => x.def);
  return `${heading("The bigger picture.", "Notice your growth without turning every moment into a metric. Small, sustainable changes compound over time.")}
 <div class="stats-grid" style="margin-top:0;margin-bottom:25px">${statCard("Completed skill tasks", s.completed, "All time", "check")}${statCard("Focused minutes", s.focus, "This week", "clock")}${statCard("Joyful minutes", s.hobbyMinutes, "Your hobby time", "hobbies")}${statCard("Skills explored", data.activeSkills.length, "Keep discovering", "spark")}</div>
 <div class="insight-grid"><section><div class="bar-panel"><div class="panel-head"><h3>Your focus, this week</h3><small>Minutes of timed skill work</small></div><div class="chart-area">${week.map((d, i) => `<div class="chart-col"><span class="bar-mins">${values[i] ? values[i] + "m" : "—"}</span><div class="chart-slot"><div class="chart-bar ${i === 6 ? "today" : ""}" style="height:${values[i] ? Math.max(5, (values[i] / maximum) * 100) : 1}%"></div></div><label>${niceDate(d, { weekday: "short" })}</label></div>`).join("")}</div></div>
 <div class="insight-note"><div class="eyebrow">ANOTHER WAY TO SEE PROGRESS</div><h3 style="margin-top:13px">Consistent, not constant.</h3><p>Some days are fuller than others. Missing a day isn’t failure—returning to something meaningful is progress in itself.</p></div></section>
 <section><div class="panel"><div class="panel-head"><h3>Skill milestones</h3><small>From your practice</small></div>${skillHistory.length ? `<ol class="simple-list">${skillHistory.map((x, i) => `<li><div class="number">0${i + 1}</div><div><b>${esc(x.def.title)}</b><p>${x.n} daily task${x.n === 1 ? "" : "s"} completed. ${x.n ? "Keep that momentum gentle." : "Your first little win is waiting."}</p></div></li>`).join("")}</ol>` : `<div class="empty-state"><b>Your story is just beginning</b><p>Start practicing a skill and the milestones will appear here.</p><button class="btn btn-primary" data-action="navigate" data-page="skills">Choose a skill</button></div>`}</div>
 <div class="insight-highlight"><div class="eyebrow">TODAY'S NOTE</div><b style="margin-top:12px">${a.score >= 75 ? "Rest is not a reward. It is part of the plan." : "You are allowed to grow at your own pace."}</b><p>The goal isn’t to become busier. It’s to create more room for the life you want to live.</p></div></section></div>`;
}
function settingsPage() {
  return `${heading("Your space, your rules.", "Keep your personal growth gentle, private and in your control.")}
 <section class="settings-card"><h3>Personal details</h3><p>Make your dashboard feel more like yours.</p><form data-form="profile" class="form-grid"><div class="form-group full"><label for="display-name">Your first name or nickname</label><input class="field" id="display-name" name="name" required maxlength="50" value="${esc(data.profile.name || "")}"></div><div><button class="btn btn-primary" type="submit">Save name</button></div></form></section>
 <section class="settings-card"><h3>Appearance</h3><p>Choose the atmosphere that feels right to you.</p><div class="setting-row"><div><b>Dark mode</b><small>Give the screen a softer evening feel.</small></div><button class="btn btn-soft" data-action="toggle-theme">${icon(data.settings.theme === "dark" ? "sun" : "moon")} ${data.settings.theme === "dark" ? "Light mode" : "Dark mode"}</button></div></section>
 <section class="settings-card"><h3>Your data</h3><p>${mode === "cloud" ? "Your information is saved in your private Firestore user document." : "You are currently using local demo storage. It is stored only in this browser, not Firebase."}</p><div class="settings-actions"><button class="btn btn-primary" data-action="export">${icon("download")} Export my data</button><button class="btn btn-outline" data-action="reset">${icon("trash")} Reset my workspace</button>${mode === "cloud" ? `<button class="btn btn-soft" data-action="logout">${icon("logout")} Sign out</button>` : firebaseConfigured ? `<button class="btn btn-soft" data-action="cloud-login">${icon("cloud")} Connect Firebase</button>` : ""}</div></section>
 <section class="settings-card"><h3>${mode === "cloud" ? "Firebase connected" : "Demo workspace"}</h3><p>${mode === "cloud" ? "Signed in as " + esc(authUser?.email || authUser?.displayName || "Firebase user") + ". Your data is synced through Firebase Authentication and Cloud Firestore." : "For real cloud sync, add your Firebase configuration in firebase-config.js, enable an Authentication provider, create Firestore and publish the provided firestore.rules. Then reload the app."}</p>${mode === "demo" ? `<div class="subtle-alert">${icon("info")}<span>Local demo data will not be transferred to Firebase automatically. Export it if you want a backup.</span></div>` : ""}</section>`;
}
function render() {
  if (mode === "signin") {
    renderAuth();
    return;
  }
  if (mode === "loading") {
    app.innerHTML =
      '<div class="boot"><div class="boot-mark">thismatters<span>.</span></div><p>Preparing your space...</p></div>';
    return;
  }
  if (!data) {
    loadDemo();
    return;
  }
  document.title = `${{ overview: "Overview", skills: "Skill studio", hobbies: "Hobby corner", schedule: "My day", insights: "Insights", settings: "Settings" }[screen] || "Overview"} — ThisMatters`;
  const page =
    {
      overview,
      skills: skillsPage,
      hobbies: hobbiesPage,
      schedule: schedulePage,
      insights: insightsPage,
      settings: settingsPage,
    }[screen] || overview;
  app.innerHTML = `<div class="app-shell">${sidebar()}<main class="main"><header class="topbar"><div class="top-start"><button class="mobile-toggle" data-action="menu" aria-label="Open navigation">${icon("menu")}</button><span class="mobile-top-brand" style="display:none">thismatters<span>.</span></span><div class="breadcrumb">YOUR SPACE <span>/</span> <strong>${{ overview: "Overview", skills: "Skill studio", hobbies: "Hobby corner", schedule: "My day", insights: "Insights", settings: "Settings" }[screen]}</strong></div></div><div class="top-end"><span class="date-chip">${icon("calendar")} ${niceDate(todayKey(), { month: "short", day: "numeric", year: "numeric" })}</span><span class="mode-badge ${mode === "cloud" ? "cloud" : ""}">${mode === "cloud" ? "● CLOUD SYNC" : "◌ DEMO MODE"}</span><button class="top-round" data-action="toggle-theme" aria-label="Toggle dark mode" title="Toggle dark mode">${icon(data.settings.theme === "dark" ? "sun" : "moon")}</button></div></header><div class="content">${page()}</div></main>${mobileNav()}</div>`;
  if (window.innerWidth <= 640) {
    const b = $(".mobile-top-brand");
    if (b) b.style.display = "block";
  }
}
function renderAuth() {
  app.innerHTML = `<div class="login-page"><section class="login-editorial"><div class="brand"><div class="brand-sign">tm<span class="brand-dot">.</span></div><div class="brand-word">thismatters<span class="brand-dot">.</span></div></div><div class="login-copy"><div class="eyebrow">ONE LIFE. LITTLE MOMENTS.</div><h1>More of <em>what matters.</em></h1><p>Grow your skills. Make time for joy. Build a rhythm that actually works for you.</p></div><div class="hero-orbit login-orbit"><div class="orbit-center">✳</div><div class="orbit-spark"></div></div><div class="login-foot">A better you, one day at a time. &nbsp; © ThisMatters</div></section>
 <section class="login-auth"><div class="auth-box"><div class="auth-kicker">YOUR PERSONAL GROWTH SPACE</div><h2>${authSignUp ? "Start your journey." : "Welcome back."}</h2><p>${authSignUp ? "Create an account to securely save your journey in the cloud." : "Sign in to keep your habits, skills and daily plans in sync."}</p>
 <button class="auth-google" data-action="google-login"><span class="google-g">G</span> Continue with Google</button><div class="divider-text">or with your email</div>
 <form class="auth-form" data-form="authenticate">${authSignUp ? `<div class="form-group"><label for="auth-name">Your name</label><input class="field" name="name" id="auth-name" placeholder="What should we call you?" maxlength="50" required></div>` : ""}
 <div class="form-group"><label for="auth-email">Email</label><input class="field" type="email" name="email" id="auth-email" placeholder="you@example.com" required autocomplete="email"></div>
 <div class="form-group"><label for="auth-password">Password</label><input class="field" type="password" name="password" id="auth-password" placeholder="At least 6 characters" minlength="6" required autocomplete="${authSignUp ? "new-password" : "current-password"}"></div>
 ${authError ? `<p class="auth-error" role="alert">${esc(authError)}</p>` : ""}<button class="btn btn-primary" type="submit">${authSignUp ? "Create account" : "Sign in"} ${icon("arrow")}</button></form>
 <p class="auth-swap">${authSignUp ? "Already have an account?" : "New around here?"} <button data-action="toggle-auth">${authSignUp ? "Sign in" : "Create one"}</button></p>
 <button class="auth-demo" data-action="demo">Just looking? Explore the interactive demo</button></div></section></div>`;
}
function stopTimer(save = true) {
  if (!activeTimer) return;
  tickTimer();
  activeTimer = null;
  if (save) persist();
}
function tickTimer() {
  if (!activeTimer) return;
  const now = performance.now(),
    delta = Math.min(Math.max(0, (now - activeTimer.lastTick) / 1000), 3);
  activeTimer.lastTick = now;
  const skill = data.activeSkills.find((s) => s.id === activeTimer.skillId);
  if (!skill || !getLatest(skill) || getLatest(skill).completedAt) {
    activeTimer = null;
    return;
  }
  if (document.visibilityState !== "visible") {
    activeTimer = null;
    persist();
    return;
  }
  const task = getLatest(skill),
    wasEnough = task.elapsedSeconds >= task.minMinutes * 60;
  task.elapsedSeconds = (task.elapsedSeconds || 0) + delta;
  data.focusByDate[todayKey()] =
    (Number(data.focusByDate[todayKey()]) || 0) + delta;
  document
    .querySelectorAll(`[data-timer-for="${skill.id}"]`)
    .forEach((e) => (e.textContent = fmtTime(task.elapsedSeconds)));
  document
    .querySelectorAll(`[data-progress-for="${skill.id}"]`)
    .forEach(
      (e) =>
        (e.style.width = `${Math.min(100, (task.elapsedSeconds / task.minMinutes / 60) * 100)}%`),
    );
  document
    .querySelectorAll(`[data-complete-for="${skill.id}"]`)
    .forEach((e) => (e.disabled = task.elapsedSeconds < task.minMinutes * 60));
  if (!wasEnough && task.elapsedSeconds >= task.minMinutes * 60) {
    toast(
      "Your minimum focus time is complete! Mark the task as done whenever you’re ready.",
    );
  }
  if (now - timerSaveAt > 12000) {
    timerSaveAt = now;
    persist();
  }
}
function getHobby(id) {
  return (
    hobbyById(id) ||
    (data.settings.customHobbies || []).find((h) => h.id === id)
  );
}
function resetTodayIfChanged() {
  const today = todayKey();
  if (lastShownDay !== today) {
    lastShownDay = today;
    if (activeTimer) stopTimer();
    rollDaily();
    render();
  }
}
function navigate(id) {
  if (
    ![
      "overview",
      "skills",
      "hobbies",
      "schedule",
      "insights",
      "settings",
    ].includes(id)
  )
    return;
  screen = id;
  menuOpen = false;
  filter = id === "skills" ? filter : "All";
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
}
function downloadJSON() {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    }),
    url = URL.createObjectURL(blob),
    link = document.createElement("a");
  link.href = url;
  link.download = `thismatters-backup-${todayKey()}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function firebaseError(e) {
  const errors = {
    "auth/invalid-credential": "Incorrect email or password. Try again.",
    "auth/email-already-in-use":
      "This email already has an account. Please sign in.",
    "auth/weak-password": "Use a password with at least six characters.",
    "auth/popup-closed-by-user": "Google sign-in was closed. You can retry.",
    "auth/unauthorized-domain":
      "Add this domain in Firebase Authentication → Authorized domains.",
    "permission-denied":
      "Firestore blocked access. Check your published Firestore security rules.",
  };
  return (
    errors[e?.code] || e?.message || "Something went wrong. Please try again."
  );
}

app.addEventListener("click", async (event) => {
  const btn = event.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action,
    id = btn.dataset.id;
  if (action === "navigate") {
    navigate(btn.dataset.page);
    return;
  }
  if (action === "menu") {
    menuOpen = !menuOpen;
    render();
    return;
  }
  if (action === "close-menu") {
    menuOpen = false;
    render();
    return;
  }
  if (action === "settings") {
    navigate("settings");
    return;
  }
  if (action === "filter") {
    filter = btn.dataset.category;
    render();
    return;
  }
  if (action === "quote") {
    quoteOffset++;
    render();
    return;
  }
  if (action === "toggle-theme") {
    data.settings.theme = data.settings.theme === "dark" ? "light" : "dark";
    applyTheme();
    persist();
    render();
    return;
  }
  if (action === "add-skill") {
    if (!skillById(id) || data.activeSkills.some((s) => s.id === id)) return;
    data.activeSkills.push(newSkill(id));
    persist();
    toast(`${skillById(id).title} added! Your first task is ready.`);
    render();
    return;
  }
  if (action === "remove-skill") {
    if (!confirm("Remove this skill and its task history?")) return;
    if (activeTimer?.skillId === id) stopTimer();
    data.activeSkills = data.activeSkills.filter((s) => s.id !== id);
    persist();
    toast("Skill removed from your studio.");
    render();
    return;
  }
  if (action === "timer") {
    const s = data.activeSkills.find((s) => s.id === id);
    if (!s || getLatest(s).completedAt) return;
    if (activeTimer?.skillId === id) {
      stopTimer();
      render();
      return;
    }
    if (activeTimer) stopTimer();
    activeTimer = { skillId: id, lastTick: performance.now() };
    timerSaveAt = performance.now();
    render();
    toast("Focus timer running. Stay on this tab while practicing.");
    return;
  }
  if (action === "complete-task") {
    const s = data.activeSkills.find((s) => s.id === id);
    if (!s) return;
    const t = getLatest(s);
    if (t.completedAt || t.elapsedSeconds < t.minMinutes * 60) return;
    if (activeTimer?.skillId === id) stopTimer(false);
    t.completedAt = Date.now();
    persist();
    toast("Beautifully done. Your next task unlocks tomorrow!");
    render();
    return;
  }
  if (action === "add-hobby") {
    if (!getHobby(id) || data.hobbies.includes(id)) return;
    data.hobbies.push(id);
    persist();
    render();
    toast("A little more joy, coming right up.");
    return;
  }
  if (action === "remove-hobby") {
    data.hobbies = data.hobbies.filter((h) => h !== id);
    persist();
    render();
    toast("Removed from your active hobbies. Your logged minutes are kept.");
    return;
  }
  if (action === "log-hobby") {
    if (!data.hobbies.includes(id)) return;
    const n = Number(btn.dataset.min);
    if (![10, 20, 30].includes(n)) return;
    data.hobbyLogs[id] ??= {};
    data.hobbyLogs[id][todayKey()] =
      (Number(data.hobbyLogs[id][todayKey()]) || 0) + n;
    persist();
    render();
    toast(`Logged ${n} minutes of ${getHobby(id)?.title || "hobby"} time.`);
    return;
  }
  if (action === "delete-event") {
    data.schedule[activeDate] = (data.schedule[activeDate] || []).filter(
      (e) => e.id !== id,
    );
    persist();
    render();
    toast("Activity removed.");
    return;
  }
  if (action === "copy-yesterday") {
    const original = data.schedule[shiftDay(activeDate, -1)] || [];
    if (!original.length) {
      toast("No activities found on the previous day.", "warning");
      return;
    }
    if (
      (data.schedule[activeDate] || []).length &&
      !confirm(
        "Replace the selected date’s current activities with the previous day’s schedule?",
      )
    )
      return;
    data.schedule[activeDate] = original.map((e) => ({ ...e, id: uid() }));
    persist();
    render();
    toast("Copied the previous day’s schedule.");
    return;
  }
  if (action === "export") {
    downloadJSON();
    toast("Your data backup was downloaded.");
    return;
  }
  if (action === "reset") {
    if (
      !confirm(
        "Permanently reset your skills, hobbies, focus time and schedule? This cannot be undone.",
      )
    )
      return;
    if (activeTimer) stopTimer(false);
    const name = data.profile.name,
      theme = data.settings.theme;
    data = createData();
    data.profile.name = name;
    data.settings.theme = theme;
    persist();
    render();
    toast("Your workspace has been reset.");
    return;
  }
  if (action === "toggle-auth") {
    authSignUp = !authSignUp;
    authError = "";
    renderAuth();
    return;
  }
  if (action === "google-login") {
    if (!fb) return;
    try {
      authError = "";
      await fb.signInWithPopup(fb.auth, new fb.GoogleAuthProvider());
    } catch (e) {
      authError = firebaseError(e);
      renderAuth();
    }
    return;
  }
  if (action === "demo") {
    loadDemo();
    return;
  }
  if (action === "cloud-login") {
    mode = "signin";
    authSignUp = false;
    renderAuth();
    return;
  }
  if (action === "logout") {
    if (!fb) return;
    stopTimer();
    await fb.signOut(fb.auth);
    authUser = null;
    mode = "signin";
    renderAuth();
    return;
  }
});
app.addEventListener("change", (e) => {
  if (
    e.target.id === "schedule-date" &&
    /^\d{4}-\d{2}-\d{2}$/.test(e.target.value)
  ) {
    activeDate = e.target.value;
    render();
  }
});
app.addEventListener("submit", async (event) => {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  const f = new FormData(form),
    kind = form.dataset.form;
  if (kind === "add-event") {
    const title = String(f.get("title") || "")
        .trim()
        .slice(0, 75),
      start = String(f.get("start") || ""),
      end = String(f.get("end") || ""),
      type = String(f.get("type") || "Personal"),
      intensity = String(f.get("intensity") || "medium");
    if (
      !title ||
      !/^\d{2}:\d{2}$/.test(start) ||
      !/^\d{2}:\d{2}$/.test(end) ||
      minutesOf(end) <= minutesOf(start)
    ) {
      toast("Choose valid times with an end later than the start.", "warning");
      return;
    }
    if (
      !["Study", "Work", "Creative", "Personal", "Rest", "Exercise"].includes(
        type,
      ) ||
      !["low", "medium", "high"].includes(intensity)
    )
      return;
    data.schedule[activeDate] ??= [];
    data.schedule[activeDate].push({
      id: uid(),
      title,
      start,
      end,
      type,
      intensity,
    });
    persist();
    render();
    toast("Your activity has been added.");
    return;
  }
  if (kind === "custom-hobby") {
    const name = String(f.get("name") || "")
      .trim()
      .slice(0, 36);
    if (!name) return;
    const hobby = {
      id: "custom_" + uid(),
      title: name,
      icon: "♡",
      color: "#e7eee5",
      descriptor: "A personal little passion",
    };
    data.settings.customHobbies ??= [];
    data.settings.customHobbies.push(hobby);
    data.hobbies.push(hobby.id);
    persist();
    render();
    toast(`${name} added to your hobby corner.`);
    return;
  }
  if (kind === "profile") {
    const name = String(f.get("name") || "")
      .trim()
      .slice(0, 50);
    if (!name) {
      toast("Please enter a name.", "warning");
      return;
    }
    data.profile.name = name;
    persist();
    render();
    toast("Your name was updated.");
    return;
  }
  if (kind === "authenticate" && fb) {
    const email = String(f.get("email") || "").trim(),
      password = String(f.get("password") || ""),
      name = String(f.get("name") || "").trim();
    authError = "";
    try {
      if (authSignUp) {
        pendingSignUpName = name;
        const result = await fb.createUserWithEmailAndPassword(
          fb.auth,
          email,
          password,
        );
        if (name) {
          await fb.updateProfile(result.user, { displayName: name });
        }
      } else await fb.signInWithEmailAndPassword(fb.auth, email, password);
    } catch (e) {
      authError = firebaseError(e);
      renderAuth();
    }
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible" && activeTimer) {
    stopTimer();
    render();
  }
});
window.addEventListener("pagehide", () => {
  if (activeTimer) stopTimer();
});
setInterval(() => {
  resetTodayIfChanged();
  tickTimer();
}, 1000);

async function initialize() {
  if (!firebaseConfigured) {
    loadDemo();
    return;
  }
  mode = "loading";
  render();
  try {
    const ver = "13.1.0";
    const [
      { initializeApp },
      {
        getAuth,
        onAuthStateChanged,
        GoogleAuthProvider,
        signInWithPopup,
        signOut,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        updateProfile,
      },
      { getFirestore, doc, getDoc, setDoc },
    ] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${ver}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${ver}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${ver}/firebase-firestore.js`),
    ]);
    const firebaseApp = initializeApp(firebaseConfig);
    fb = {
      auth: getAuth(firebaseApp),
      db: getFirestore(firebaseApp),
      GoogleAuthProvider,
      signInWithPopup,
      signOut,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      updateProfile,
      doc,
      getDoc,
      setDoc,
    };
    onAuthStateChanged(
      fb.auth,
      async (user) => {
        authReady = true;
        if (!user) {
          authUser = null;
          if (mode === "demo") return;
          mode = "signin";
          renderAuth();
          return;
        }
        stopTimer(false);
        authUser = user;
        mode = "loading";
        render();
        try {
          const snap = await getDoc(doc(fb.db, "users", user.uid));
          data = snap.exists() ? hydrate(snap.data()) : createData();
          if (!snap.exists()) {
            data.profile.name =
              pendingSignUpName ||
              user.displayName ||
              user.email?.split("@")[0] ||
              "You";
            await setDoc(doc(fb.db, "users", user.uid), data);
            pendingSignUpName = "";
          } else if (
            (!data.profile.name || data.profile.name === "You") &&
            user.displayName
          ) {
            data.profile.name = user.displayName;
          }
          mode = "cloud";
          rollDaily();
          applyTheme();
          render();
        } catch (e) {
          console.error(e);
          mode = "signin";
          authError = firebaseError(e);
          renderAuth();
        }
      },
      (e) => {
        mode = "signin";
        authError = firebaseError(e);
        renderAuth();
      },
    );
  } catch (e) {
    console.error(e);
    loadDemo();
    toast(
      "Firebase could not initialize. Running in local demo mode.",
      "warning",
    );
  }
}
initialize();
