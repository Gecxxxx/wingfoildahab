# Telegram lead worker

The worker stores every Telegram user who sends `/start` in Cloudflare KV and sends each website lead to all stored subscribers. `/stop` removes a subscriber.

## One-time setup

1. Use the production `wrangler.jsonc` in the repository root.
2. Confirm that its `SUBSCRIBERS` binding points to the production KV namespace.
3. Run `npx wrangler secret put BOT_TOKEN` and paste the BotFather token.
4. Generate a random webhook secret and save it with `npx wrangler secret put TELEGRAM_WEBHOOK_SECRET`.
5. From the repository root, run `npx wrangler deploy`.
6. Register the webhook:

```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  --data-urlencode "url=https://<WORKER_URL>/api/telegram" \
  --data-urlencode "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
```

After deployment, send `/start` to the bot and submit a test lead. Never commit the bot token or webhook secret.
