# @Since24 Frontend

Marketing website for **@Since24** — a Rwandan provider of premium electronic
appliances and professional installation services (solar water heaters,
automatic gate openers, gate barriers, air conditioners, and more).

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- Framer Motion, Embla Carousel, Recharts
- Forms submitted via [Formspree](https://formspree.io/)

## Getting started

```bash
pnpm install
pnpm dev
```

The site runs at http://localhost:3000.

### Scripts

| Command      | Description                          |
| ------------ | ------------------------------------ |
| `pnpm dev`   | Start the dev server                 |
| `pnpm build` | Production build                     |
| `pnpm start` | Serve the production build           |
| `pnpm lint`  | Run Next.js / ESLint checks          |

## Environment variables

Create a `.env.local` file (git-ignored) with the following:

| Variable                       | Used by              | Purpose                                |
| ------------------------------ | -------------------- | -------------------------------------- |
| `NEXT_PUBLIC_FORMSPREE_CONTACT`| Contact page         | Formspree endpoint for the contact form |
| `NEXT_PUBLIC_FORMSPREE_QUOTE`  | Quote modal          | Formspree endpoint for quote requests   |

> **Security note:** `app/staff-login` currently authenticates against
> `NEXT_PUBLIC_ADMIN_USERNAME` / `NEXT_PUBLIC_ADMIN_PASSWORD`. Any
> `NEXT_PUBLIC_*` value is inlined into the client bundle and visible to every
> visitor, and the auth gate relies on a client-set `isAuthenticated` cookie
> that anyone can forge. This is **not** secure and should be replaced with
> server-side authentication before relying on the admin area.

## Project structure

```
app/
  (main)/        Public marketing pages (home, products, about, contact, our-work)
  admin/         Admin dashboard (products, quotes, testimonials, etc.)
  staff-login/   Admin login screen
  sitemap.ts     Dynamic sitemap
  robots.ts      robots.txt
  manifest.ts    PWA manifest
components/       Shared components; components/ui holds shadcn/ui primitives
hooks/            Reusable React hooks
lib/             Utilities
public/          Static assets
```

## Deployment

Deployed on [Vercel](https://vercel.com/). Pushes to `main` trigger a
production deployment; remember to configure the environment variables above in
the Vercel project settings.
