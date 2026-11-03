# StudioSpace — Find your creative space

A peer-to-peer creative studio booking platform for photographers, filmmakers, podcasters, musicians and makers.

## Features
- Responsive home page with a three-slide hero, featured studios and category browsing.
- Explore studios with live text search and category filters.
- Studio detail page with amenities, host details and booking request modal.
- Register and log in with email/password or Google using Better Auth.
- Host dashboard: create, edit and delete studio listings.
- Creator dashboard: view bookings and cancel pending requests.
- ImgBB image upload support, Sonner toast notifications and custom confirmation modal.
- Site-wide light/dark theme and responsive mobile navigation.
- HTTP-only API JWT cookie and protected server mutations are handled by the server repository.

## Tech stack
Next.js App Router, React, JavaScript, Tailwind CSS v4, Better Auth, Express API, MongoDB, Sonner, Lucide icons and ImgBB.

## Local setup
1. Install Node.js 20 or newer.
2. Clone this repository and run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Set `NEXT_PUBLIC_API_URL=http://localhost:5000`.
5. Add an ImgBB API key to enable image uploads (optional; image URLs can also be pasted).
6. Start the server repository first, then run `npm run dev`.
7. Open [http://localhost:3000](http://localhost:3000).

## Examiner test credentials
Register a fresh account through the website. No shared password is committed to this repository. Add a studio listing, then use a second account to test booking requests.

## Deployment
Deploy this client on Vercel. Set `NEXT_PUBLIC_API_URL` to the deployed Express API URL and configure the server's allowed client origin. Add the live Vercel URL here after deployment.
