const $ = (id) => document.getElementById(id);

const state = {
  city: 'orlando',
  open: 9,
  close: 22,
  unit: loadPref('unit', 'C'),
  date: null,
  pick: { f: 0, m: 0 }, // which look each card shows in today's band (换一个 cycles it)
  band: null,
  stats: null, // today's park-hours weather, reused when switching looks
  umbrella: false, // on rainy days: dress for the temperature instead of the rain look
  data: null,
  error: null,
};

function loadPref(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}
function savePref(key, value) {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
}

const fmtTemp = (c) =>
  state.unit === 'F' ? `${Math.round((c * 9) / 5 + 32)}°F` : `${Math.round(c)}°C`;
const fmtDeg = (c) => `${Math.round(state.unit === 'F' ? (c * 9) / 5 + 32 : c)}°`;
const fmtWind = (kmh) => (state.unit === 'F' ? `${Math.round(kmh / 1.609)} mph` : `${Math.round(kmh)} km/h`);
const fmtTempDelta = (c) =>
  state.unit === 'F' ? `${Math.round((c * 9) / 5)}°F` : `${Math.round(c)}°C`;
const fmtRain = (mm) =>
  state.unit === 'F' ? `${(mm / 25.4).toFixed(2)} in` : `${mm.toFixed(1)} mm`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------- language ----------

function applyStaticText() {
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
}

function renderLangSelect() {
  $('lang').innerHTML = Object.entries(LANGS)
    .map(([code, name]) => `<option value="${code}" ${code === currentLang ? 'selected' : ''}>🌐 ${name}</option>`)
    .join('');
}

// ---------- controls ----------

function renderCitySeg() {
  $('city-seg').innerHTML = Object.keys(PLACES)
    .map((key) => `<button data-city="${key}" class="${key === state.city ? 'on' : ''}">${t(`cityShort.${key}`)}</button>`)
    .join('');
}

function renderHourSelects() {
  const opts = (from, to, sel) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i)
      .map((h) => `<option value="${h}" ${h === sel ? 'selected' : ''}>${h}:00</option>`)
      .join('');
  $('open').innerHTML = opts(6, 14, state.open);
  $('close').innerHTML = opts(15, 23, state.close);
}

function renderUnitSeg() {
  $('unit-seg').innerHTML = ['C', 'F']
    .map((u) => `<button data-unit="${u}" class="${u === state.unit ? 'on' : ''}">°${u}</button>`)
    .join('');
}

function renderDays() {
  const d = state.data.daily;
  const weekdays = t('ui.weekdays');
  $('days').innerHTML = d.time
    .map((date, i) => {
      const dt = new Date(`${date}T12:00:00`);
      const label = i === 0 ? t('ui.today') : i === 1 ? t('ui.tomorrow') : weekdays[dt.getDay()];
      const [emo] = describeWeather(d.weather_code[i]);
      const pop = d.precipitation_probability_max[i] ?? 0;
      return `<button class="day ${date === state.date ? 'on' : ''}" data-date="${date}">
        ${label}<br><span class="date">${dt.getMonth() + 1}/${dt.getDate()}</span>
        <span class="emo">${emo}</span>
        <span class="pop">${pop >= 20 ? `${pop}%` : ''}</span>
        <span class="t">${fmtDeg(d.temperature_2m_max[i])}</span>
      </button>`;
    })
    .join('');
}

// ---------- result ----------

function renderHero(s) {
  const [emo, cond] = describeWeather(s.mainCode);
  document.body.dataset.sky = skyFor(s.mainCode);
  $('hero-temp').textContent = fmtDeg(s.feelsMax);
  $('hero-cond').textContent = `${emo} ${cond} · ${t('ui.feelsMaxShort')}`;
  $('hero-hl').textContent = `${t('ui.hi')} ${fmtDeg(s.tempMax)}   ${t('ui.lo')} ${fmtDeg(s.tempMin)}`;
}

function renderStats(s) {
  const uvLevel = t('ui.uvLevels')[s.uvMax >= 11 ? 4 : s.uvMax >= 8 ? 3 : s.uvMax >= 6 ? 2 : s.uvMax >= 3 ? 1 : 0];
  const range = ([lo, hi]) => `${fmtDeg(lo)}–${fmtDeg(hi)}`;
  const tiles = [
    [t('ui.feelsLabel'), fmtDeg(s.feelsMax), t('ui.feelsNote', { t: fmtDeg(s.feelsMin) })],
    [t('ui.rainLabel'), `${s.popMax}%`, t('ui.rainNote', { r: fmtRain(s.rainSum) })],
    [t('ui.rainTimeLabel'), s.rainWindows[0] || t('ui.rainTimeNone'), s.rainWindows.slice(1).join(t('listSep')), 'tile-sm'],
    [t('ui.uvLabel'), s.uvMax.toFixed(0), uvLevel],
    [t('ui.humLabel'), `${Math.round(s.humAvg)}%`, t(s.humAvg >= 70 && s.feelsMax >= 26 ? 'ui.humSticky' : 'ui.humDry')],
    [t('ui.windLabel'), fmtWind(s.windMax), t('ui.windNote')],
    [t('ui.disneyLabel'), range(INDOOR_C.disney), t('ui.estNote'), 'tile-est'],
    [t('ui.universalLabel'), range(INDOOR_C.universal), t('ui.estColderNote'), 'tile-est'],
  ];
  $('stats').innerHTML = tiles
    .map(([label, value, note, cls = '']) => `<div class="glass ${cls}">
      <div class="tile-label">${label}</div>
      <div class="tile-value">${value}</div>
      <div class="tile-note">${esc(note)}</div>
    </div>`)
    .join('');
}

function renderChart(rows) {
  // Draw in real pixels so labels aren't stretched
  const W = Math.max(280, Math.round($('chart').clientWidth || 640));
  const H = 180, padL = 8, padR = 8, padT = 22, padB = 22;
  const n = rows.length;
  const step = (W - padL - padR) / n;
  const temps = rows.map((r) => r.feels);
  const tMin = Math.min(...temps) - 2;
  const tMax = Math.max(...temps) + 2;
  const plotH = H - padT - padB;
  const y = (v) => padT + plotH - ((v - tMin) / (tMax - tMin)) * plotH;

  const bars = rows
    .map((r, i) => {
      const h = (r.pop / 100) * plotH;
      return `<rect x="${padL + i * step + step * 0.15}" y="${padT + plotH - h}" width="${step * 0.7}" height="${h}"
        rx="2" fill="var(--rain)" opacity="0.55"><title>${t('ui.chartTip', { h: r.hour, p: r.pop })}</title></rect>`;
    })
    .join('');
  const pts = rows.map((r, i) => `${padL + i * step + step / 2},${y(r.feels)}`).join(' ');
  const labels = rows
    .map((r, i) => {
      const x = padL + i * step + step / 2;
      const hourLabel = i % (W < 480 ? 3 : 2) === 0 ? `<text x="${x}" y="${H - 6}" text-anchor="middle">${r.hour}</text>` : '';
      const tempLabel = i % 3 === 0 ? `<text x="${x}" y="${y(r.feels) - 7}" text-anchor="middle">${fmtTemp(r.feels)}</text>` : '';
      return hourLabel + tempLabel;
    })
    .join('');

  $('chart').setAttribute('viewBox', `0 0 ${W} ${H}`);
  $('chart').setAttribute('aria-label', `${t('ui.legendRain')} / ${t('ui.legendTemp')}`);
  $('chart').innerHTML = `${bars}
    <polyline points="${pts}" fill="none" stroke="var(--temp)" stroke-width="2.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    ${labels}`;
}

function renderOutfit(g, o) {
  const key = g === 'f' ? 'female' : 'male';
  $(`${key}-name`).textContent = o.name;
  $(key).innerHTML = ['top', 'bottom', 'shoes', 'layer', 'acc']
    .map((k) => `<dt>${t(`ui.${k}`)}</dt><dd>${esc(o[k])}</dd>`)
    .join('');
  $(`${key}-why`).innerHTML = o.why.map((w) => `<li>${esc(w)}</li>`).join('');
}

function renderRainChoice(o) {
  $('rain-choice').hidden = !o.rainDay;
  if (!o.rainDay) return;
  $('rain-choice-label').textContent = t('ui.rainChoice');
  $('rain-choice-seg').innerHTML = [[false, t('ui.rainOutfit')], [true, t('ui.umbrellaOutfit')]]
    .map(([v, label]) => `<button data-umbrella="${v}" class="${v === state.umbrella ? 'on' : ''}">${label}</button>`)
    .join('');
}

function renderSwap(o) {
  for (const g of ['f', 'm']) {
    const btn = $(`swap-${g}`);
    btn.hidden = o.count[g] < 2;
    btn.innerHTML = `<span class="spin">🔄</span>${t('ui.swap')}`;
  }
}

function renderResult() {
  if (!state.data) return;
  const s = parkDayStats(state.data, state.date, state.open, state.close);
  if (!s) {
    $('result').hidden = true;
    $('headline').textContent = '';
    setStatus(t('ui.noData'));
    return;
  }
  setStatus('');
  $('result').hidden = false; // before drawing, so the chart can measure its width
  state.stats = s;
  let o = buildOutfit(s, state.city, state.pick, fmtTemp, fmtTempDelta, state.umbrella);
  // New band (other day, city or hours): start from its first look
  if (o.band !== state.band) {
    state.band = o.band;
    state.pick = { f: 0, m: 0 };
    o = buildOutfit(s, state.city, state.pick, fmtTemp, fmtTempDelta, state.umbrella);
  }
  $('headline').textContent = o.headline;
  renderHero(s);
  renderStats(s);
  renderChart(s.rows);
  renderAvatar($('avatar-f'), 'f', o.look, t('ui.female'), o.female.photo);
  renderAvatar($('avatar-m'), 'm', o.look, t('ui.male'), o.male.photo);
  renderSwap(o);
  renderRainChoice(o);
  preloadAvatars(o.photos);
  renderOutfit('f', o.female);
  renderOutfit('m', o.male);
  $('bag').innerHTML = o.bag.map((b) => `<li>${esc(b)}</li>`).join('');
  $('tips').innerHTML = o.tips.map((x) => `<li>${esc(x)}</li>`).join('');
}

function setStatus(msg, isError = false) {
  $('status').textContent = msg;
  $('status').className = `status${isError ? ' err' : ''}`;
}

function showError() {
  const err = state.error;
  setStatus(err.status ? t('ui.fetchFail', { s: err.status }) : t('ui.networkFail'), true);
}

function renderCityName() {
  $('hero-city').textContent = t(`cityShort.${state.city}`);
}

async function loadCity() {
  renderCityName();
  setStatus(t('ui.loading'));
  $('result').hidden = true;
  state.error = null;
  try {
    state.data = await fetchForecast(state.city);
  } catch (err) {
    state.data = null;
    state.error = err;
    showError();
    return;
  }
  if (!state.data.daily.time.includes(state.date)) state.date = state.data.daily.time[0];
  renderDays();
  renderResult();
}

function renderAll() {
  applyStaticText();
  renderLangSelect();
  renderCitySeg();
  renderCityName();
  if (state.error) showError();
  if (state.data) { renderDays(); renderResult(); }
}

// ---------- events ----------

$('lang').addEventListener('change', (e) => {
  setLang(e.target.value);
  renderAll();
});

$('city-seg').addEventListener('click', (e) => {
  const city = e.target.closest('button')?.dataset.city;
  if (!city || city === state.city) return;
  state.city = city;
  renderCitySeg();
  loadCity();
});

$('open').addEventListener('change', (e) => { state.open = Number(e.target.value); renderResult(); });
$('close').addEventListener('change', (e) => { state.close = Number(e.target.value); renderResult(); });

$('unit-seg').addEventListener('click', (e) => {
  const unit = e.target.closest('button')?.dataset.unit;
  if (!unit) return;
  state.unit = unit;
  savePref('unit', unit);
  renderUnitSeg();
  if (state.data) { renderDays(); renderResult(); }
});

$('rain-choice-seg').addEventListener('click', (e) => {
  const v = e.target.closest('button')?.dataset.umbrella;
  if (v === undefined) return;
  state.umbrella = v === 'true';
  renderResult();
});

// 换一个 only redraws its own card (text + picture); the rest of the page stays put
function swapLook(g) {
  if (!state.stats) return;
  state.pick[g] += 1;
  const o = buildOutfit(state.stats, state.city, state.pick, fmtTemp, fmtTempDelta, state.umbrella);
  const look = g === 'f' ? o.female : o.male;
  renderAvatar($(`avatar-${g}`), g, o.look, t(g === 'f' ? 'ui.female' : 'ui.male'), look.photo);
  renderOutfit(g, look);
}

for (const g of ['f', 'm']) {
  $(`swap-${g}`).addEventListener('click', () => swapLook(g));
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderResult, 150);
});

$('days').addEventListener('click', (e) => {
  const date = e.target.closest('.day')?.dataset.date;
  if (!date) return;
  state.date = date;
  renderDays();
  renderResult();
});

applyStaticText();
renderLangSelect();
renderCitySeg();
renderHourSelects();
renderUnitSeg();
loadCity();
