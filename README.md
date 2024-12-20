# React Router + Better Auth

This project shows how to use [Better Auth](https://www.better-auth.com/) in [React Router v7](https://reactrouter.com/) project.

Whats implemented:

- Email Password Login | [Docs](https://www.better-auth.com/docs/authentication/email-password)
- Social/OAuth Login with Github | [Docs](https://www.better-auth.com/docs/authentication/github)
- Simple UI with [shadcn ui](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/)

Libraries used:

- [Drizzle ORM](https://orm.drizzle.team/)
- [Sonner Toasts](https://sonner.emilkowal.ski/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Remix Flat Routes](https://github.com/kiliman/remix-flat-routes)

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm build
```

## Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```
License [MIT](./LICENSE)
