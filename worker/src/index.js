const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8" },
});

const isAllowedOrigin = (origin, env) => {
  const allowed = String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (allowed.includes(origin)) return true;
  try {
    const url = new URL(origin);
    return url.protocol === "https:"
      && url.hostname.endsWith(".wingfoildahab.pages.dev");
  } catch {
    return false;
  }
};

const corsHeaders = (request, env) => {
  const origin = request.headers.get("origin");
  if (!origin || !isAllowedOrigin(origin, env)) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
};

const withHeaders = (response, extraHeaders) => {
  const headers = new Headers(response.headers);
  Object.entries(extraHeaders).forEach(([name, value]) => headers.set(name, value));
  return new Response(response.body, { status: response.status, headers });
};

const telegram = (env, method, body) => fetch(
  `https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`,
  {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  },
);

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

async function handleTelegramUpdate(request, env) {
  if (env.TELEGRAM_WEBHOOK_SECRET) {
    const secret = request.headers.get("x-telegram-bot-api-secret-token");
    if (secret !== env.TELEGRAM_WEBHOOK_SECRET) return json({ ok: false }, 403);
  }

  const update = await request.json();
  const message = update.message;
  if (!message?.chat?.id || !message.text) return json({ ok: true });

  const chatId = String(message.chat.id);
  const command = message.text.trim().split(/\s+/)[0].split("@")[0].toLowerCase();

  if (command === "/start") {
    await env.SUBSCRIBERS.put(`subscriber:${chatId}`, JSON.stringify({
      chatId,
      username: message.from?.username || "",
      name: [message.from?.first_name, message.from?.last_name].filter(Boolean).join(" "),
      subscribedAt: new Date().toISOString(),
    }));
    await telegram(env, "sendMessage", {
      chat_id: chatId,
      text: "✅ Вы подписаны на новые заявки с wingfoildahab.com.\n\nЧтобы отписаться, отправьте /stop.",
    });
  } else if (command === "/stop") {
    await env.SUBSCRIBERS.delete(`subscriber:${chatId}`);
    await telegram(env, "sendMessage", {
      chat_id: chatId,
      text: "Вы отписались от заявок. Чтобы подписаться снова, отправьте /start.",
    });
  }

  return json({ ok: true });
}

async function listSubscribers(env) {
  const ids = [];
  let cursor;
  do {
    const page = await env.SUBSCRIBERS.list({ prefix: "subscriber:", cursor });
    ids.push(...page.keys.map((key) => key.name.slice("subscriber:".length)));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return ids;
}

async function handleLead(request, env) {
  const origin = request.headers.get("origin");
  if (origin && !isAllowedOrigin(origin, env)) {
    return json({ ok: false, error: "origin_not_allowed" }, 403);
  }

  const body = await request.json();
  const name = String(body.name || "").trim().slice(0, 300);
  const email = String(body.email || "").trim().slice(0, 200);
  const method = String(body.method || "").trim().slice(0, 50);
  const contact = String(body.contact || "").trim().slice(0, 200);
  const page = String(body.page || "").trim().slice(0, 500);

  if (!name || !contact || (email && !/^\S+@\S+\.\S+$/.test(email))) {
    return json({ ok: false, error: "invalid_form" }, 400);
  }

  const subscribers = await listSubscribers(env);
  if (!subscribers.length) return json({ ok: false, error: "no_subscribers" }, 503);

  const leadId = `${Date.now()}-${crypto.randomUUID()}`;
  const lead = { leadId, name, email, method, contact, page, createdAt: new Date().toISOString(), status: "pending" };
  await env.SUBSCRIBERS.put(`lead:${leadId}`, JSON.stringify(lead), { expirationTtl: 60 * 60 * 24 * 90 });

  const text = [
    "🚀 <b>Новая заявка с wingfoildahab.com</b>",
    "",
    `<b>Имя / комментарий:</b> ${escapeHtml(name || "не указано")}`,
    `<b>Email:</b> ${escapeHtml(email || "не указан")}`,
    `<b>Способ связи:</b> ${escapeHtml(method || "не указан")}`,
    `<b>Контакт:</b> ${escapeHtml(contact)}`,
    `<b>Страница:</b> ${escapeHtml(page || "не определена")}`,
  ].join("\n");

  const results = await Promise.allSettled(subscribers.map((chatId) => telegram(env, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  })));

  const delivered = results.filter((result) => result.status === "fulfilled" && result.value.ok).length;
  await env.SUBSCRIBERS.put(`lead:${leadId}`, JSON.stringify({
    ...lead,
    status: delivered ? "delivered" : "delivery_failed",
    delivered,
    deliveryAttemptedAt: new Date().toISOString(),
  }), { expirationTtl: 60 * 60 * 24 * 90 });
  if (!delivered) return json({ ok: false, error: "delivery_failed", leadId }, 502);
  return json({ ok: true, delivered, leadId });
}

export default {
  async fetch(request, env) {
    if (!env.BOT_TOKEN || !env.SUBSCRIBERS || !env.ALLOWED_ORIGINS) {
      return json({ ok: false, error: "worker_not_configured" }, 503);
    }

    const url = new URL(request.url);
    const cors = corsHeaders(request, env);
    if (request.method === "OPTIONS" && ["/api/lead", "/api/telegram"].includes(url.pathname)) {
      return new Response(null, { status: 204, headers: cors });
    }
    let response;
    if (request.method === "GET" && url.pathname === "/api/health") {
      response = json({ ok: true });
    } else if (request.method === "POST" && url.pathname === "/api/telegram") {
      response = await handleTelegramUpdate(request, env);
    } else if (request.method === "POST" && url.pathname === "/api/lead") {
      response = await handleLead(request, env);
    } else {
      response = json({ ok: false, error: "not_found" }, 404);
    }
    return withHeaders(response, cors);
  },
};
