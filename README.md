# NamkeenAi

NamkeenAI is a small chat application with a React + Vite frontend and an Express + MongoDB backend.

This README covers quick setup, how to run the app locally, the main API routes, and how to use the included NamkeenAI image asset.

## Repository structure
- `backend/` — Express server, routes, controllers, sockets
- `frontend/` — React (Vite) frontend; `public/` contains static assets

## Quick start (local)
1. Backend
   - cd backend
   - npm install
   - create a `.env` file with at least:
     ```
     MONGO_URL=<your_mongo_uri>
     JWT_SECRET=<your_jwt_secret>
     PINECONE_API_KEY=<optional>
     GEMINI_API_KEY=<optional>
     ```
   - Start server (dev): `npm run server` (uses nodemon)

2. Frontend
   - cd frontend
   - npm install
   - Start dev server: `npm run dev` (Vite defaults to http://localhost:5173)

Note: During development the frontend may call the production API URL. If you want the frontend to call your local backend, add a Vite proxy in `vite.config.js` or change axios base URLs in `AuthContext.jsx`.

## Important backend API routes
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login
- `GET /api/auth/profile` — get current user (protected)
- `POST /api/auth/logout` — logout
- `POST /api/chat` — create chat (protected)
- `GET /api/chat` — list chats (protected)
- `GET /api/chat/messages/:id` — messages for chat (protected)

## Using the NamkeenAI image asset
I added a logo/emoji to `frontend/public/images`:
- `/images/namkeenai-logo.svg` — a small SVG logo you can use anywhere.
- `/images/namkeenai.png` — a tiny placeholder PNG (replaceable).

How to use in the frontend JSX (Vite serves `public` at root):

```jsx
// In any component
<img src="/images/namkeenai-logo.svg" alt="NamkeenAI" width={40} height={40} />
```

## Troubleshooting notes
- If you open a frontend route like `/register` directly and the backend returns a 404, ensure the backend is configured to serve the built frontend `index.html` for non-API routes (the codebase contains a production-only catch-all). For local dev use Vite's dev server.
- If you see `path-to-regexp` / `Missing parameter name` errors during deployment, check that you are not passing a full URL or malformed string into `app.use(...)` or router methods.

## Next steps I can help with
- Replace the placeholder PNG with a real logo file (you can upload it here or tell me which existing file to use).
- Add the logo into a header component (e.g., `ChatHeader.jsx` or `Sidebar.jsx`).
- Add Vite proxy config for easier local development.

