# Personal Productivity Hub

A full-stack, production-ready personal productivity web application with portfolio, real-time clipboard sync, notes, file storage, and more.

## Tech Stack

## Features

## Setup

1. **Clone the repo & install dependencies:**
	```sh
	npm install
	```
2. **Configure environment variables:**
	- Copy `.env.example` to `.env` and fill in your secrets.
3. **Set up PostgreSQL & Prisma:**
	```sh
	npx prisma migrate dev --name init
	npx prisma generate
	```
4. **Run the development server:**
	```sh
	npm run dev
	```
5. **Deploy:**
   - Deploy to Netlify (see instructions below) or your preferred platform.

## Folder Structure
1. Push your project to GitHub.
2. In Netlify, create a new site from Git and select your repo.
3. Build command: `npm run build`
4. Publish directory: leave empty (Next.js plugin handles this)
5. Add environment variables in Netlify dashboard (from your `.env` file):
   - `DATABASE_URL`, `JWT_SECRET`, Firebase keys, Google OAuth keys, email vars, etc.
6. Deploy!
7. Edit code locally, push to GitHub, Netlify auto-redeploys.
8. For env var changes, update them in Netlify dashboard and redeploy.
- `/src/app/api` — API routes (auth, clipboard, notes, files, dashboard)
- `/src/components` — UI components
- **Login Modal for Guests:**
  - Unauthenticated users see a dismissible login popup on landing page.
  - Modal can be closed for guest viewing, reappears next session until login.
- **Clipboard Sync Across Devices:**
  - Real-time clipboard sync using Socket.io.
  - Sign in with the same account on multiple devices to instantly sync clipboard history.
- `/src/hooks` — Custom hooks
- `/src/store` — Zustand stores

## License
- `/src/lib` — Prisma, Firebase, Socket.io, etc.
