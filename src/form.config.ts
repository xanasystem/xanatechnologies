// Contact form delivery config. Values come from env vars (.env locally,
// Vercel → Settings → Environment Variables in production); see .env.example.
// Same pattern as the Magna Cerámica project (docs/forms in that repo).
const parseList = (v: string | undefined) =>
  v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [];

// `||` (not `??`): an env var that exists but is empty must still fall back to
// the default — Brevo rejects an empty sender with "valid sender email required".
export const formConfig = {
  to: parseList(import.meta.env.FORM_TO || 'sales@xanasystem.com'),
  cc: parseList(import.meta.env.FORM_CC),
  bcc: parseList(import.meta.env.FORM_BCC),
  fromName: import.meta.env.FORM_FROM_NAME || 'Xana Technologies Web',
  // Sender registered in Brevo on the authenticated xanatechnologies.com domain.
  fromEmail: import.meta.env.FORM_FROM_EMAIL || 'no-reply@xanatechnologies.com',
  subject: import.meta.env.FORM_SUBJECT || 'New contact from xanatechnologies.com',
  sendConfirmation: false,
  confirmationSubject: 'We have received your message',
};
