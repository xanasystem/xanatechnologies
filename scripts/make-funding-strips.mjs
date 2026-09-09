// Builds the white (negative) funding logo strips for the dark footer from the
// official institutional assets staged in scripts/funding-src/:
//   ivace-feder-white.png  = Generalitat Valenciana · IVACE+i │ Financiado por la UE
//   xpande-feder-white.png = Cofinanciado por la UE · Gobierno de España/Ministerio
//                            de Hacienda │ Fondos Europeos · Cámara de Comercio de España
// Sources: EU emblem (Commission logo download center, WHITE version), Generalitat
// (labora.gva.es generalitat_blanco), IVACE+i (ivace.es header, recoloured),
// Gobierno de España/Hacienda (hacienda.gob.es SVG, recoloured), Fondos Europeos
// (Wikimedia Commons SVG, CC BY 4.0, recoloured), Cámara (camara.es SVG, recoloured).
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(dir, 'funding-src');
const OUT = path.join(dir, '..', 'public', 'img', 'funding');
const H = 150; // strip height at 2x (rendered at 60px CSS in the footer)
const GAP = 56; // between logos
const SEP = 44; // around the separator line

/** SVG with every fill/stroke colour forced to white (and hairline rects dropped). */
function whiteSvg(file, { drop = [] } = {}) {
  let svg = readFileSync(path.join(SRC, file), 'utf8');
  for (const re of drop) svg = svg.replace(re, '');
  svg = svg.replace(/(fill|stroke)\s*:\s*#[0-9a-fA-F]{3,6}/g, '$1:#ffffff');
  svg = svg.replace(/(fill|stroke)="#[0-9a-fA-F]{3,6}"/g, '$1="#ffffff"');
  return Buffer.from(svg);
}

/** Transparent PNG whose alpha is kept and colour forced to white. */
async function whitePng(file) {
  const src = sharp(path.join(SRC, file)).ensureAlpha();
  const { width, height } = await src.metadata();
  const alpha = await src.clone().extractChannel('alpha').toBuffer();
  return sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .joinChannel(alpha).png().toBuffer();
}

async function fit(input, h = H, pad = 0) {
  // trim() drops the transparent margins some PNGs ship with, so the gaps
  // between marks are the real GAP and not padding baked into the file.
  const trimmed = await sharp(input, { density: 400 }).trim().png().toBuffer();
  const buf = await sharp(trimmed).resize({ height: h - pad * 2, fit: 'inside' }).png().toBuffer();
  const m = await sharp(buf).metadata();
  return { buf, w: m.width, h: m.height };
}

async function strip(items, out) {
  // items: {img} | {sep:true}
  let x = 0;
  const comps = [];
  for (const it of items) {
    if (it.sep) {
      comps.push({ input: Buffer.from(`<svg width="2" height="${H}"><rect width="2" height="${H}" fill="#ffffff" opacity="0.55"/></svg>`), left: x + SEP, top: 0 });
      x += SEP * 2 + 2;
      continue;
    }
    comps.push({ input: it.buf, left: x, top: Math.round((H - it.h) / 2) });
    x += it.w + GAP;
  }
  const width = x - GAP;
  await sharp({ create: { width, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(comps).png({ compressionLevel: 9 }).toFile(path.join(OUT, out));
  console.log('wrote', out, `${width}x${H}`);
  return { width };
}

// ivace-white / hacienda-white / camara-white are the white PNGs supplied by
// Xana (official negatives); the rest come from the public sources above.
// Padding sets each mark's visual weight inside the strip: the EU emblem,
// Generalitat and IVACE keep their size; Hacienda, Fondos Europeos and Cámara run bigger.
const gva = await fit(path.join(SRC, 'gva-blanco.png'), H, 15);
const ivace = await fit(path.join(SRC, 'ivace-white.png'), H, 19);
const euFunded = await fit(path.join(SRC, 'eu-funded-white.png'), H, 19);
const euCofunded = await fit(path.join(SRC, 'eu-cofunded-white.png'), H, 19);
const hacienda = await fit(path.join(SRC, 'hacienda-white.png'), H, 0);
const fondos = await fit(whiteSvg('fondos-europeos.svg'), H, 22);
const camara = await fit(path.join(SRC, 'camara-white.png'), H, 28);

await strip([gva, ivace, { sep: true }, euFunded], 'ivace-feder-white.png');
await strip([euCofunded, hacienda, { sep: true }, fondos, camara], 'xpande-feder-white.png');

// Preview on the footer background
const a = await sharp(path.join(OUT, 'ivace-feder-white.png')).resize({ width: 900 }).toBuffer();
const b = await sharp(path.join(OUT, 'xpande-feder-white.png')).resize({ width: 900 }).toBuffer();
const ma = await sharp(a).metadata(), mb = await sharp(b).metadata();
await sharp({ create: { width: 980, height: ma.height + mb.height + 120, channels: 3, background: '#0a0b16' } })
  .composite([{ input: a, left: 40, top: 40 }, { input: b, left: 40, top: ma.height + 80 }])
  .png().toFile(path.join(dir, '..', 'scratch-funding-white-preview.png'));
console.log('preview ok');
