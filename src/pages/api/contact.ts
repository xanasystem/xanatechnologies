import type { APIRoute } from 'astro';
import { formConfig } from '../../form.config';

// Only this route runs on the server (Vercel function); the rest stays static.
export const prerender = false;

const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
const TURNSTILE_SECRET = import.meta.env.TURNSTILE_SECRET_KEY;

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isPhone(v: string) {
  const digits = v.replace(/\D/g, '');
  return /^[+]?[\d\s()\-.]{6,}$/.test(v) && digits.length >= 7 && digits.length <= 15;
}

interface Lead {
  name: string;
  email: string;
  phone: string;
  region: string;
  country: string;
  message: string;
  locale: string;
  /** Absolute origin of the deployed site, used to load the email logo. */
  siteOrigin: string;
  /** When the lead was received (server time). */
  receivedAt: Date;
}

// Brand palette mirrored from src/styles/tokens.css (emails can't load CSS).
const BRAND = {
  navy: '#0c182b',
  cyan: '#4dd4ec',
  magenta: '#e6007e',
  ink: '#1c1c1c',
  muted: '#6b6b6b',
  line: '#e6e8ee',
  paper: '#f4f5f8',
};
const FONT = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/**
 * Internal lead-notification email. Table layout + inline styles + web-safe
 * fonts so it renders the same in Gmail, Outlook and Apple Mail. Logo is loaded
 * from the deployed site (override with FORM_LOGO_URL if hosted elsewhere).
 */
export function renderNotificationEmail(d: Lead) {
  const logoUrl = import.meta.env.FORM_LOGO_URL ?? `${d.siteOrigin}/logo/xana-horizontal-white.png`;
  const name = d.name ? escapeHtml(d.name) : '';
  const email = escapeHtml(d.email);
  const message = escapeHtml(d.message).replace(/\n/g, '<br>');
  const langLabel = d.locale === 'es' ? 'Español (ES)' : 'English (EN)';
  const when = d.receivedAt.toLocaleString('en-GB', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Madrid',
  });
  const location = [d.region, d.country].filter(Boolean).map(escapeHtml).join(', ');

  const row = (label: string, value: string) => `
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid ${BRAND.line};font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.muted};width:120px;vertical-align:top;">${label}</td>
                  <td style="padding:11px 0;border-bottom:1px solid ${BRAND.line};font-family:${FONT};font-size:15px;line-height:1.5;color:${BRAND.ink};vertical-align:top;">${value}</td>
                </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>New enquiry — xanatechnologies.com</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.paper};">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${BRAND.paper};">${name || email} &middot; ${escapeHtml(d.message.slice(0, 90))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${BRAND.line};">

          <!-- Header: navy band with the white lockup, centred -->
          <tr>
            <td align="center" style="background:${BRAND.navy};padding:32px 36px;text-align:center;">
              <img src="${logoUrl}" alt="Xana Technologies" width="188" height="62" style="display:block;margin:0 auto;width:188px;height:auto;border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:32px 36px 8px;">
              <h1 style="margin:0;font-family:${FONT};font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-0.01em;color:${BRAND.ink};">New contact from ${name || email}</h1>
              <p style="margin:10px 0 0;font-family:${FONT};font-size:14px;line-height:1.5;color:${BRAND.muted};">Received ${when} via the contact form on xanatechnologies.com.</p>
            </td>
          </tr>

          <!-- Contact details -->
          <tr>
            <td style="padding:16px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row('Name', name || `<span style="color:${BRAND.muted};">Not provided</span>`)}
                ${row('Email', `<a href="mailto:${email}" style="color:${BRAND.ink};text-decoration:underline;text-underline-offset:2px;">${email}</a>`)}
                ${d.phone ? row('Phone', `<a href="tel:${escapeHtml(d.phone.replace(/[^\d+]/g, ''))}" style="color:${BRAND.ink};text-decoration:none;">${escapeHtml(d.phone)}</a>`) : ''}
                ${location ? row('Location', location) : ''}
                ${row('Language', langLabel)}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:28px 36px 0;">
              <p style="margin:0 0 10px;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.muted};">Message</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:${BRAND.paper};border-radius:8px;padding:18px 20px;font-family:${FONT};font-size:15px;line-height:1.65;color:${BRAND.ink};">${message}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA: same recipe as the site's .cta--grad (cyan→magenta, 115deg).
               Solid magenta bgcolor is the fallback where gradients don't render. -->
          <tr>
            <td style="padding:28px 36px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="${BRAND.magenta}" style="background:${BRAND.magenta};background-image:linear-gradient(115deg,${BRAND.cyan} -10%,${BRAND.magenta} 110%);border-radius:999px;">
                    <a href="mailto:${email}?subject=${encodeURIComponent('Re: your enquiry to Xana Technologies')}" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">Reply to ${name || 'sender'} &nearr;</a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font-family:${FONT};font-size:13px;line-height:1.5;color:${BRAND.muted};">Or simply hit reply: this email's reply-to is set to the sender's address.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${BRAND.paper};border-top:1px solid ${BRAND.line};padding:20px 36px;font-family:${FONT};font-size:12px;line-height:1.6;color:${BRAND.muted};">
              <strong style="color:${BRAND.ink};">Xana Technologies SL</strong> &middot; Castellón, Spain &middot; <a href="https://xanatechnologies.com" style="color:${BRAND.muted};">xanatechnologies.com</a><br />
              Sent automatically from the website contact form. The sender accepted the Privacy Policy.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (data: object, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

  let form: FormData;
  try { form = await request.formData(); }
  catch { return json({ ok: false, error: 'Invalid request' }, 400); }

  const str = (k: string) => ((form.get(k) as string) ?? '').trim();

  // 1) Honeypot — bots fill it; pretend success and send nothing.
  if (str('company')) return json({ ok: true });

  // 2) Turnstile
  const token = str('cf-turnstile-response');
  if (!token) return json({ ok: false, error: 'Verification required' }, 400);

  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token, remoteip: clientAddress ?? '' }),
  }).then((r) => r.json());
  if (!verify.success) return json({ ok: false, error: 'Verification failed' }, 400);

  // 3) Validation (server is the source of truth; mirrors the client rules).
  //    Required: email, message, privacy. Optional: name, phone, region, country.
  const name = str('name');
  const email = str('email');
  const phone = str('phone');
  const region = str('region');
  const country = str('country');
  const message = str('message');
  const locale = str('locale') === 'es' ? 'es' : 'en';
  const privacy = form.get('privacy');

  if (name.length > 100) return json({ ok: false, error: 'Invalid name' }, 400);
  if (!isEmail(email)) return json({ ok: false, error: 'Invalid email' }, 400);
  if (phone && !isPhone(phone)) return json({ ok: false, error: 'Invalid phone' }, 400);
  if (region.length > 100 || country.length > 100) return json({ ok: false, error: 'Invalid location' }, 400);
  if (message.length < 5 || message.length > 5000) return json({ ok: false, error: 'Invalid message' }, 400);
  if (!privacy) return json({ ok: false, error: 'Privacy consent required' }, 400);

  // 4) Notification email via Brevo
  const sendEmail = (payload: object) =>
    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

  const notify = await sendEmail({
    sender: { name: formConfig.fromName, email: formConfig.fromEmail },
    to: formConfig.to.map((e) => ({ email: e })),
    ...(formConfig.cc.length ? { cc: formConfig.cc.map((e) => ({ email: e })) } : {}),
    ...(formConfig.bcc.length ? { bcc: formConfig.bcc.map((e) => ({ email: e })) } : {}),
    replyTo: name ? { email, name } : { email },
    subject: formConfig.subject,
    htmlContent: renderNotificationEmail({
      name, email, phone, region, country, message, locale,
      siteOrigin: new URL(request.url).origin,
      receivedAt: new Date(),
    }),
  });

  if (!notify.ok) {
    console.error('Brevo error', notify.status, await notify.text());
    return json({ ok: false, error: 'Could not send message' }, 502);
  }
  // Log the Brevo messageId so a "no me llega" report can be traced in Brevo's logs.
  const { messageId } = await notify.json().catch(() => ({ messageId: undefined }));
  console.log('[contact] sent', notify.status, messageId);

  // 5) Optional confirmation to the user (disabled by default; needs a verified client domain).
  if (formConfig.sendConfirmation) {
    await sendEmail({
      sender: { name: formConfig.fromName, email: formConfig.fromEmail },
      to: [name ? { email, name } : { email }],
      subject: formConfig.confirmationSubject,
      htmlContent: `<p>Hi${name ? ' ' + escapeHtml(name) : ''},</p><p>We have received your message and will get back to you as soon as possible.</p><p>Kind regards.</p>`,
    }).catch((e) => console.error('Confirmation failed', e));
  }

  return json({ ok: true });
};
