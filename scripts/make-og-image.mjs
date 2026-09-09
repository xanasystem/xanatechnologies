// Builds public/og-image.jpg (1200x630): space photo, dark veil, white lockup.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const root = 'C:/Proyectos/xanatechnologies';
const W = 1200, H = 630;

const bg = await sharp(`${root}/public/img/bg/space.jpg`)
  .resize(W, H, { fit: 'cover', position: 'top' })
  .modulate({ brightness: 0.9, saturation: 1.05 })
  .toBuffer();

const veil = Buffer.from(
  `<svg width="${W}" height="${H}"><defs>
     <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0" stop-color="#05050f" stop-opacity="0.25"/>
       <stop offset="1" stop-color="#05050f" stop-opacity="0.7"/>
     </linearGradient></defs>
   <rect width="${W}" height="${H}" fill="url(#g)"/></svg>`
);

const logoW = 520;
const logo = await sharp(`${root}/public/logo/xana-lockup-white.png`)
  .resize({ width: logoW })
  .toBuffer();
const meta = await sharp(logo).metadata();

const tagline = Buffer.from(
  `<svg width="${W}" height="${H}">
     <text x="${W / 2}" y="${H / 2 + meta.height / 2 + 64}" text-anchor="middle"
       font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="30" font-weight="500"
       fill="#edeef6" letter-spacing="1">Product technology and digital strategy, connected.</text>
   </svg>`
);

await sharp(bg)
  .composite([
    { input: veil },
    { input: logo, left: Math.round((W - meta.width) / 2), top: Math.round((H - meta.height) / 2 - 24) },
    { input: tagline },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(`${root}/public/og-image.jpg`);
console.log('ok', meta.width, meta.height);
