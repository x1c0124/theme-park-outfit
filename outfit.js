// Outfit engine. All thresholds are in °C / mm / km/h (Open-Meteo metric defaults).
// Each temperature band has outfits from i18n.js `looks` (women: several, cycled with 换一个), plus reasons:
// the look's own `why` lines and extra lines built from today's weather.
// Copy comes from t(), so call buildOutfit again after switching language.

function heatLevel(feelsMax) {
  if (feelsMax >= 32) return 'scorch';
  if (feelsMax >= 27) return 'hot';
  if (feelsMax >= 22) return 'warm';
  if (feelsMax >= 16) return 'mild';
  if (feelsMax >= 10) return 'cool';
  return 'cold';
}

// The four outfit bands shown to users
const BAND_OF_HEAT = { scorch: 'hot', hot: 'hot', warm: 'warm', mild: 'cool', cool: 'cool', cold: 'cold' };

function rainLevel(s) {
  if (s.stormy || s.popMax >= 70 || s.rainSum >= 5) return 'heavy';
  if (s.popMax >= 40 || s.rainSum >= 1) return 'likely';
  return 'low';
}

// Looks that include jeans, so humid days can suggest a lighter fabric
const DENIM_LOOKS = new Set(['f-0565', 'f-0555', 'f-0559', 'f-0550', 'm-0573', 'm-0567', 'm-0570', 'm-0575']);

const HEAT_EMOJI = { scorch: '🥵', hot: '☀️', warm: '😎', mild: '🙂', cool: '🧥', cold: '🥶' };

function uvLevelName(uv) {
  return t('ui.uvLevels')[uv >= 11 ? 4 : uv >= 8 ? 3 : uv >= 6 ? 2 : uv >= 3 ? 1 : 0];
}

// pick: { f, m } = which look to show in today's band for each card; wraps around the band's list.
// umbrella: on warm rainy days, dress for the temperature instead of switching to the rain look.
function buildOutfit(s, cityKey, pick, fmtTemp, fmtTempDelta, umbrella = false) {
  const heat = heatLevel(s.feelsMax);
  const band = BAND_OF_HEAT[heat];
  const rain = rainLevel(s);
  const warmish = ['scorch', 'hot', 'warm'].includes(heat);
  const cold = ['cool', 'cold'].includes(heat);
  const humid = s.humAvg >= 70 && s.feelsMax >= 26;
  const eveningChill = !cold && (s.feelsMin < 18 || (s.feelsMin < 24 && s.feelsMax - s.feelsMin >= 8));
  const windy = s.windMax >= 30;
  // Use the colder (Universal) estimate so the advice holds for either resort
  const indoorGap = s.feelsMax - INDOOR_C.universal[1];
  const indoorRange = `${fmtTemp(INDOOR_C.universal[0])}–${fmtTemp(INDOOR_C.disney[1])}`;
  // The rain look is for warm storms; on cool rainy days keep the temperature look
  const rainDay = rain === 'heavy' && warmish; // the day that offers the rain-look / umbrella choice
  const rainLook = rainDay && !umbrella;
  const rainKey = rain === 'heavy' && s.stormy ? 'storm' : rain;

  const lists = {};
  const index = {};
  for (const g of ['f', 'm']) {
    lists[g] = rainLook ? [t(`looks.${g}.rain`)] : t(`looks.${g}.${band}`);
    index[g] = pick[g] % lists[g].length;
  }

  const build = (g) => {
    const look = lists[g][index[g]];
    const id = `${g}-${look.id}`;

    // Reasons: why this band, the look's own reasons, then today's conditions
    const why = [t('why.band', { max: fmtTemp(s.feelsMax), min: fmtTemp(s.feelsMin), band: t(`heat.${heat}`).toLowerCase() })];
    if (rainLook) why.push(t('why.rainLook', { rain: t(`rain.${rainKey}`).toLowerCase() }));
    else if (rainDay) why.push(t('why.umbrella', { rain: t(`rain.${rainKey}`).toLowerCase() }));
    // Warm days: the sun is gentler, but Universal's indoor AC is cold enough to want a layer
    else if (band === 'warm') {
      const range = ([lo, hi]) => `${fmtTemp(lo)}–${fmtTemp(hi)}`;
      why.push(t('why.warmFabric'));
      why.push(t('why.warmAc', { u: range(INDOOR_C.universal), d: range(INDOOR_C.disney) }));
    }
    why.push(...look.why);
    if (rain === 'heavy' && !warmish) why.push(t('why.rainCool'));
    else if (rain === 'likely') why.push(t('why.rainLikely', { p: s.popMax }));
    if (s.uvMax >= 6) why.push(t('why.uv', { uv: Math.round(s.uvMax), level: uvLevelName(s.uvMax) }));
    if (humid) why.push(t(DENIM_LOOKS.has(id) ? 'why.humidDenim' : 'why.humid', { h: Math.round(s.humAvg) }));
    if (eveningChill) why.push(t('why.evening', { t: fmtTemp(s.feelsMin) }));
    if (indoorGap >= 8) why.push(t('why.indoor', { r: indoorRange, gap: fmtTempDelta(indoorGap) }));

    return { ...look, why, photo: id.replace(/^f-/, 'female-').replace(/^m-/, 'male-') };
  };

  // Shared bag checklist
  const bag = [t('bag.powerBank'), t('bag.bottle')];
  if (rain !== 'low') bag.unshift(t('bag.poncho'));
  if (rain !== 'low') bag.push(t('bag.dryBag'));
  if (rain === 'heavy') bag.push(t('bag.socks'));
  if (rainDay && umbrella) bag.unshift(t('bag.umbrella'));
  if (s.uvMax >= 3) bag.push(t('bag.sunscreen'));
  if (['scorch', 'hot'].includes(heat)) bag.push(t('bag.fan'));
  if (humid) bag.push(t('bag.antiChafe'));

  // Park-level tips (outfit reasons live with each outfit)
  const tips = [];
  if (s.rainWindows.length) tips.push(t('tip.rainWindows', { w: s.rainWindows.join(t('listSep')) }));
  if (s.stormy) tips.push(t('tip.storm'));
  if (cityKey === 'orlando' && warmish) tips.push(t('tip.orlando'));
  if (cityKey === 'la') tips.push(t('tip.la'));
  tips.push(t(warmish ? 'tip.waterWarm' : 'tip.waterCool'));
  if (windy) tips.push(t('tip.windy', { w: Math.round(s.windMax) }));

  const [wEmoji] = describeWeather(s.worstCode);
  const keyItem = rain !== 'low' ? 'poncho' : s.uvMax >= 6 ? 'sun' : eveningChill || cold ? 'layer' : 'light';

  return {
    headline: [
      `${HEAT_EMOJI[heat]} ${t(`heat.${heat}`)}`,
      `${wEmoji} ${t(`rain.${rainKey}`)}`,
      t(`key.${keyItem}`),
    ].join(t('dot')),
    female: build('f'),
    male: build('m'),
    band: rainLook ? 'rain' : band,
    rainDay,
    count: { f: lists.f.length, m: lists.m.length },
    photos: [
      ...lists.f.map((l) => `female-${l.id}`),
      ...lists.m.map((l) => `male-${l.id}`),
    ],
    index,
    bag,
    tips,
    // Inputs for the SVG fallback avatars in avatar.js
    look: {
      heat,
      rain,
      uv: s.uvMax,
      jacket: cold ? 'worn' : eveningChill || indoorGap >= 8 ? 'tied' : 'none',
    },
  };
}
