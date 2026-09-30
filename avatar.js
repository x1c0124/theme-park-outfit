// Flat SVG avatars that dress according to the outfit engine's `look` (see buildOutfit in outfit.js).

const AV = {
  skin: '#f1c7a5',
  hair: { f: '#5a3a28', m: '#2e2520' },
  top: { f: '#f28b82', m: '#5b9bd5' },
  bottom: { f: '#3d5a80', m: '#8c7b5a' },
  quickDry: '#4b5563',
  jacket: { f: '#c9b27c', m: '#6b7f5e' },
  cap: { f: '#f6c85f', m: '#2f4858' },
  shoe: '#fafafa',
  sole: '#9aa0a6',
  scarf: '#c0504d',
  bag: { f: '#e0a458', m: '#3a3a3a' },
  ink: '#2b2b2b',
};

function avatarLook(g, look) {
  const warmish = ['scorch', 'hot', 'warm'].includes(look.heat);
  return {
    sleeve: g === 'f' && look.heat === 'scorch' ? 'tank' : warmish ? 'short' : 'long',
    bottom: !warmish ? 'pants' : g === 'f' && look.heat !== 'warm' ? 'skort' : 'shorts',
    jacket: look.jacket,
    cap: look.uv >= 6,
    shades: look.uv >= 3,
    poncho: look.rain !== 'low',
    sandals: look.rain === 'heavy' && warmish,
    scarf: look.heat === 'cold',
    quickDry: look.rain === 'heavy',
  };
}

// One arm; mirror=true draws the right arm. Shoulder -> elbow -> hand.
function avatarArm(mirror, sleeve, color) {
  const x = (v) => (mirror ? 120 - v : v);
  const pts = [[42, 58], [37, 79], [35, 98]];
  const line = (p, stroke) =>
    `<polyline points="${p.map(([a, b]) => `${x(a)},${b}`).join(' ')}" fill="none" stroke="${stroke}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`;
  let s = line(pts, AV.skin);
  if (sleeve === 'short') s += line([pts[0], [39.5, 68]], color);
  if (sleeve === 'long') s += line([pts[0], pts[1], [35.3, 95]], color);
  return s + `<circle cx="${x(35)}" cy="101" r="4.8" fill="${AV.skin}"/>`;
}

function avatarSVG(g, look, label) {
  const L = avatarLook(g, look);
  const topColor = AV.top[g];
  const armColor = L.jacket === 'worn' ? AV.jacket[g] : topColor;
  const bottomColor = L.quickDry ? AV.quickDry : AV.bottom[g];
  const parts = [];

    // Ponytail sits behind everything else on the head
  if (g === 'f') parts.push(`<ellipse cx="77" cy="36" rx="6" ry="13" transform="rotate(-22 77 36)" fill="${AV.hair.f}"/>`);

  // Legs + shoes
  if (L.bottom !== 'pants') {
    parts.push(`<rect x="47" y="104" width="11" height="47" rx="5" fill="${AV.skin}"/>`);
    parts.push(`<rect x="62" y="104" width="11" height="47" rx="5" fill="${AV.skin}"/>`);
  }
  for (const cx of [52, 68]) {
    if (L.sandals) {
      parts.push(`<ellipse cx="${cx}" cy="153" rx="7.5" ry="4" fill="${AV.skin}"/>`);
      parts.push(`<rect x="${cx - 7}" y="150" width="14" height="2.6" rx="1.3" fill="${AV.ink}"/>`);
      parts.push(`<rect x="${cx - 7}" y="155" width="14" height="2.4" rx="1.2" fill="${AV.ink}"/>`);
    } else {
      parts.push(`<ellipse cx="${cx}" cy="153" rx="8.5" ry="4.8" fill="${AV.shoe}" stroke="${AV.sole}" stroke-width="1.5"/>`);
    }
  }

  // Bottoms
  const bottoms = {
    shorts: 'M44 94 H76 L77 118 H61.5 L60 104 L58.5 118 H43 Z',
    skort: 'M44 94 H76 L81 120 H39 Z',
    pants: 'M44 94 H76 L75 151 H62 L60 106 L58 151 H45 Z',
  };
  parts.push(`<path d="${bottoms[L.bottom]}" fill="${bottomColor}"/>`);

  // Arms, neck, torso
  parts.push(avatarArm(false, L.jacket === 'worn' ? 'long' : L.sleeve, armColor));
  parts.push(avatarArm(true, L.jacket === 'worn' ? 'long' : L.sleeve, armColor));
  parts.push(`<rect x="55" y="42" width="10" height="12" fill="${AV.skin}"/>`);
  parts.push(
    L.sleeve === 'tank' && L.jacket !== 'worn'
      ? `<path d="M47 56 Q60 52 73 56 L77 98 H43 Z" fill="${topColor}"/>`
      : `<path d="M41 56 Q60 49 79 56 L77 98 H43 Z" fill="${topColor}"/>`,
  );
  parts.push(`<path d="M54 52.5 Q60 60 66 52.5 Z" fill="${AV.skin}"/>`);

  if (L.jacket === 'worn') {
    parts.push(`<path d="M41 56 Q49 52 56 53 L55 99 H42 Z" fill="${AV.jacket[g]}"/>`);
    parts.push(`<path d="M79 56 Q71 52 64 53 L65 99 H78 Z" fill="${AV.jacket[g]}"/>`);
  } else if (L.jacket === 'tied') {
    // Jacket tied around the waist for the evening
    parts.push(`<path d="M57 95 L50 113 L55 114.5 L61 97 Z" fill="${AV.jacket[g]}"/>`);
    parts.push(`<path d="M63 95 L70 113 L65 114.5 L59 97 Z" fill="${AV.jacket[g]}"/>`);
    parts.push(`<rect x="42" y="90" width="36" height="7" rx="3.5" fill="${AV.jacket[g]}"/>`);
    parts.push(`<circle cx="60" cy="94" r="4" fill="${AV.jacket[g]}" stroke="rgba(0,0,0,.18)"/>`);
  }

  if (L.scarf) {
    parts.push(`<rect x="49" y="47" width="22" height="8" rx="4" fill="${AV.scarf}"/>`);
    parts.push(`<rect x="61" y="51" width="6" height="18" rx="2" fill="${AV.scarf}"/>`);
  }

  // Bags: crossbody for her, belt bag for him
  if (g === 'f') {
    parts.push(`<line x1="44" y1="57" x2="71" y2="88" stroke="${AV.bag.f}" stroke-width="2.5"/>`);
    parts.push(`<rect x="66" y="85" width="14" height="11" rx="3" fill="${AV.bag.f}"/>`);
  } else {
    parts.push(`<rect x="48" y="${L.jacket === 'tied' ? 83 : 89}" width="24" height="8" rx="4" fill="${AV.bag.m}"/>`);
  }

  if (L.poncho) {
    parts.push('<path d="M60 44 L93 109 Q60 118 27 109 Z" fill="var(--rain)" fill-opacity=".2" stroke="var(--rain)" stroke-opacity=".55" stroke-width="1.5"/>');
  }

  // Head
  parts.push(`<circle cx="46" cy="33" r="3" fill="${AV.skin}"/><circle cx="74" cy="33" r="3" fill="${AV.skin}"/>`);
  parts.push(`<circle cx="60" cy="32" r="14" fill="${AV.skin}"/>`);
  parts.push(
    g === 'f'
      ? `<path d="M45 31 Q44 15 60 15 Q76 15 75 31 Q70 21 60 22.5 Q50 21 45 31 Z" fill="${AV.hair.f}"/>`
      : `<path d="M46 28 Q45 15 60 15 Q75 15 74 28 Q69 20.5 60 21.5 Q51 20.5 46 28 Z" fill="${AV.hair.m}"/>`,
  );

  // Face
  if (L.shades) {
    parts.push(`<rect x="49" y="30" width="9.5" height="6" rx="2.5" fill="${AV.ink}"/>`);
    parts.push(`<rect x="61.5" y="30" width="9.5" height="6" rx="2.5" fill="${AV.ink}"/>`);
    parts.push(`<line x1="58.5" y1="32" x2="61.5" y2="32" stroke="${AV.ink}" stroke-width="1.4"/>`);
  } else {
    parts.push(`<circle cx="54.5" cy="33" r="1.7" fill="${AV.ink}"/><circle cx="65.5" cy="33" r="1.7" fill="${AV.ink}"/>`);
  }
  if (g === 'f') parts.push('<circle cx="51" cy="39" r="2.4" fill="#f08a8a" opacity=".45"/><circle cx="69" cy="39" r="2.4" fill="#f08a8a" opacity=".45"/>');
  parts.push(`<path d="M55.5 40.5 Q60 44.5 64.5 40.5" fill="none" stroke="${AV.ink}" stroke-width="1.4" stroke-linecap="round"/>`);

  if (L.cap) {
    parts.push(`<path d="M45 27 Q45 13.5 60 13.5 Q75 13.5 75 27 Z" fill="${AV.cap[g]}"/>`);
    parts.push(`<ellipse cx="60" cy="27" rx="18" ry="3.2" fill="${AV.cap[g]}" stroke="rgba(0,0,0,.15)"/>`);
  }

  return `<svg viewBox="0 0 120 162" role="img" aria-label="${label}">${parts.join('')}</svg>`;
}

// Illustrations in avatars/, named after the outfit id, e.g. female-0546.png or male-sporty.png.
// Images are downloaded and decoded once, then reused, so switching looks is instant. While a new
// image is still loading, the previous one stays on screen; the SVG only appears if a file is missing.
const avatarCache = new Map(); // src -> Promise<HTMLImageElement | null>

function loadAvatar(src) {
  if (!avatarCache.has(src)) {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    avatarCache.set(src, img.decode().then(() => img, () => null));
  }
  return avatarCache.get(src);
}

function preloadAvatars(photos) {
  for (const photo of photos) loadAvatar(`avatars/${photo}.png`);
}

function renderAvatar(el, g, look, label, photo) {
  const src = `avatars/${photo}.png`;
  if (el.dataset.src === src && el.querySelector('img')) return; // already showing it
  el.dataset.src = src;
  loadAvatar(src).then((img) => {
    if (el.dataset.src !== src) return; // the user has already moved on to another look
    if (!img) {
      el.innerHTML = avatarSVG(g, look, label);
      return;
    }
    const node = img.cloneNode();
    node.alt = label;
    el.replaceChildren(node);
  });
}
