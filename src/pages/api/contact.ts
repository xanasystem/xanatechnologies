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
}

// Internal lead-notification email. Table layout + inline styles for mail clients.
function renderNotificationEmail(d: Lead) {
  const row = (label: string, value: string) => `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eaeaea;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b6b6b;text-transform:uppercase;letter-spacing:0.05em;width:110px;vertical-align:top;">${label}</td>
                <td style="padding:12px 0;border-bottom:1px solid #eaeaea;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1c1c1c;vertical-align:top;">${value}</td>
              </tr>`;
  const email = escapeHtml(d.email);
  const message = escapeHtml(d.message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>New website enquiry</title></head>
<body style="margin:0;padding:0;background:#f2f2f2;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="background:#0b0f1a;padding:28px 32px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;letter-spacing:0.08em;color:#ffffff;">XANA TECHNOLOGIES</td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1c1c1c;margin:0 0 24px;">New enquiry from the xanatechnologies.com contact form:</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${row('Name', d.name ? escapeHtml(d.name) : '—')}
              ${row('Email', `<a href="mailto:${email}" style="color:#1c1c1c;">${email}</a>`)}
              ${d.phone ? row('Phone', escapeHtml(d.phone)) : ''}
              ${d.region ? row('Region', escapeHtml(d.region)) : ''}
              ${d.country ? row('Country', escapeHtml(d.country)) : ''}
              ${row('Language', d.locale.toUpperCase())}
            </table>
            <div style="margin-top:24px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b6b6b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Message</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1c1c1c;background:#f2f2f2;border-radius:6px;padding:16px;">${message}</div>
            </div>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b6b6b;margin:24px 0 0;">Reply directly to this email to respond to the sender.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#eaeaea;padding:20px 32px;text-align:center;border-top:1px solid #dcdcdc;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#6b6b6b;">Xana Technologies &middot; Sent automatically from the website contact form.</td>
        </tr>
      </table>
    </td></tr>
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
    htmlContent: renderNotificationEmail({ name, email, phone, region, country, message, locale }),
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
