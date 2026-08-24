/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · ENQUIRY EMAIL — Vercel serverless function.
   Sends form enquiries via Resend's REST API.

   Required environment variable (set in Vercel → Project →
   Settings → Environment Variables):
     RESEND_API_KEY   — API key from resend.com
   Optional:
     ENQUIRY_FROM     — verified sender, e.g. "Education Hub
                        <enquiries@edu-hub.org.uk>". Until the
                        domain is verified in Resend, the
                        default onboarding sender is used.

   Until RESEND_API_KEY is set this returns 503 and the site
   falls back to its mailto: behaviour — nothing breaks.
   Recipients are allow-listed server-side so the endpoint
   cannot be abused to send mail to arbitrary addresses.
   ═══════════════════════════════════════════════════════════ */

const RECIPIENTS = new Set([
  "pbhatia@edu-hub.org.uk",
  "partnerships@edu-hub.org.uk",
  "info@edu-hub.org.uk",
]);

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method-not-allowed" });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return res.status(503).json({ ok: false, error: "email-not-configured" });
  }

  const { recipient, subject, body, replyTo } = req.body || {};
  if (!subject || !body) {
    return res.status(400).json({ ok: false, error: "missing-fields" });
  }

  const to = RECIPIENTS.has(recipient) ? recipient : "pbhatia@edu-hub.org.uk";
  const from = process.env.ENQUIRY_FROM || "Education Hub Website <onboarding@resend.dev>";

  const payload = {
    from,
    to: [to],
    subject: String(subject).slice(0, 200),
    text: String(body).slice(0, 10000),
  };
  if (replyTo && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(replyTo)) {
    payload.reply_to = replyTo;
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("resend-error", r.status, detail.slice(0, 500));
      return res.status(502).json({ ok: false, error: "send-failed" });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("send-enquiry-error", err);
    return res.status(502).json({ ok: false, error: "send-failed" });
  }
};
