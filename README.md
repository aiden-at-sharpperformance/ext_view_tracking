# Hex Dashboard Viewer

A lightweight Next.js wrapper that embeds Hex dashboards in iframes and tracks anonymous visitor analytics via Plausible.

## Setup

```bash
npm install
cp .env.local.example .env.local   # edit with your values
npm run dev
```

## Adding / Removing Dashboards

Edit `config/dashboards.ts`. Each dashboard needs a `slug` (URL path), `name`, and `hexUrl`:

```ts
{
  slug: "my-dashboard",
  name: "My Dashboard",
  hexUrl: "https://app.hex.tech/ORG_ID/app/APP_ID/latest",
}
```

Visitors access dashboards at `yourdomain.com/my-dashboard`.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Yes | The domain registered in Plausible (e.g. `yourdomain.com`) |
| `NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN` | No | Your self-hosted Plausible instance domain (e.g. `plausible.yourdomain.com`) |
| `ADMIN_PASSWORD` | Yes | Password for the `/admin` page |

In Vercel: go to **Settings > Environment Variables** and add each one.

## Connecting Plausible

1. Add your deployment domain as a site in Plausible.
2. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to that domain.
3. If self-hosting Plausible, also set `NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN` to your Plausible instance URL.
4. Dashboard-specific pageviews are tracked as custom `Dashboard View` events with a `dashboard` property containing the slug.

## Admin Page

Visit `/admin` and enter the `ADMIN_PASSWORD` to see all configured dashboards and a link to Plausible analytics.

## Deploy to Vercel

Push to GitHub and import the repo in Vercel. No special config needed — Next.js defaults work out of the box.
