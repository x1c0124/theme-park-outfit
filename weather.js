// Weather data via Open-Meteo (free, no API key): https://open-meteo.com/en/docs

// One forecast point per city, between the Disney and Universal resorts.
const PLACES = {
  orlando: { lat: 28.43, lon: -81.52 },
  la: { lat: 33.98, lon: -118.14 },
};

// Estimated indoor AC range in °C. Parks don't publish this; Universal typically runs colder than Disney.
const INDOOR_C = {
  disney: [21, 23],
  universal: [19, 21],
};

// WMO weather codes -> emoji; text labels live in i18n.js under `wmo`.
const WMO_EMOJI = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️', 56: '🌧️', 57: '🌧️',
  61: '🌦️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️', 77: '🌨️',
  80: '🌦️', 81: '🌧️', 82: '⛈️', 85: '🌨️', 86: '❄️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
};

function describeWeather(code) {
  return [WMO_EMOJI[code] || '🌡️', t(`wmo.${code}`)];
}

// Background sky for the iOS-style theme
function skyFor(code) {
  if (code >= 95) return 'storm';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if (code >= 51) return 'rain';
  if (code >= 2) return 'cloudy';
  return 'clear';
}

const HOURLY_VARS = [
  'temperature_2m', 'apparent_temperature', 'precipitation_probability', 'precipitation',
  'weather_code', 'uv_index', 'wind_speed_10m', 'relative_humidity_2m',
];
const DAILY_VARS = [
  'weather_code', 'temperature_2m_max', 'temperature_2m_min', 'precipitation_sum',
  'precipitation_probability_max', 'uv_index_max',
];

const forecastCache = new Map();

async function fetchForecast(cityKey) {
  if (forecastCache.has(cityKey)) return forecastCache.get(cityKey);
  const place = PLACES[cityKey];
  const params = new URLSearchParams({
    latitude: place.lat,
    longitude: place.lon,
    hourly: HOURLY_VARS.join(','),
    daily: DAILY_VARS.join(','),
    timezone: 'auto',
    forecast_days: '16',
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  forecastCache.set(cityKey, data);
  return data;
}

// Group consecutive hours into readable windows, e.g. [14,15,16,20] -> ["14:00–17:00", "20:00–21:00"]
function hourWindows(hours) {
  const out = [];
  let start = null;
  let prev = null;
  for (const h of hours) {
    if (start === null) start = h;
    else if (h !== prev + 1) {
      out.push(`${start}:00–${prev + 1}:00`);
      start = h;
    }
    prev = h;
  }
  if (start !== null) out.push(`${start}:00–${prev + 1}:00`);
  return out;
}

// Most frequent code, except a thunderstorm always wins because it shuts rides down.
function mainWeatherCode(codes) {
  const storm = codes.find((c) => c >= 95);
  if (storm !== undefined) return storm;
  const counts = new Map();
  for (const c of codes) counts.set(c, (counts.get(c) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0];
}

// Summarise the weather for the hours you're actually inside the park.
function parkDayStats(data, date, openHour, closeHour) {
  const h = data.hourly;
  const rows = [];
  h.time.forEach((t, i) => {
    if (!t.startsWith(date)) return;
    const hour = Number(t.slice(11, 13));
    if (hour < openHour || hour > closeHour) return;
    rows.push({
      hour,
      temp: h.temperature_2m[i],
      feels: h.apparent_temperature[i],
      pop: h.precipitation_probability[i] ?? 0,
      rain: h.precipitation[i] ?? 0,
      code: h.weather_code[i],
      uv: h.uv_index[i] ?? 0,
      wind: h.wind_speed_10m[i] ?? 0,
      hum: h.relative_humidity_2m[i] ?? 0,
    });
  });
  if (!rows.length) return null;

  const pick = (k) => rows.map((r) => r[k]).filter((v) => v !== null);
  const max = (k) => Math.max(...pick(k));
  const min = (k) => Math.min(...pick(k));
  const rainyHours = rows.filter((r) => r.pop >= 50 || r.rain >= 0.5).map((r) => r.hour);

  return {
    rows,
    feelsMax: max('feels'),
    feelsMin: min('feels'),
    tempMax: max('temp'),
    tempMin: min('temp'),
    popMax: max('pop'),
    rainSum: pick('rain').reduce((a, b) => a + b, 0),
    uvMax: max('uv'),
    windMax: max('wind'),
    humAvg: pick('hum').reduce((a, b) => a + b, 0) / rows.length,
    stormy: rows.some((r) => r.code >= 95),
    rainWindows: hourWindows(rainyHours),
    // Most severe hour (headline icon) and the most common condition (hero + sky)
    worstCode: Math.max(...pick('code')),
    mainCode: mainWeatherCode(pick('code')),
  };
}
