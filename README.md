# Interview Coach AI — Frontend

React + TypeScript + Tailwind frontend for the FastAPI backend in `../backend`.

## Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **Zustand** (with `persist`) for auth + search state
- **React Router** v6 for routing
- **Axios** for HTTP, **react-hot-toast** for notifications

## Setup

```bash
cd frontend
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if backend isn't on :8000
npm run dev            # http://localhost:5173
```

The backend should be running at the URL set in `VITE_API_BASE_URL`
(default `http://localhost:8000`). Make sure CORS allows the dev origin.

## Pages

| Route               | Auth     | File                          |
| ------------------- | -------- | ----------------------------- |
| `/`                 | Public   | `pages/Landing.tsx`           |
| `/login`            | Public   | `pages/Login.tsx`             |
| `/signup`           | Public   | `pages/Signup.tsx`            |
| `/forgot-password`  | Public   | `pages/ForgotPassword.tsx`    |
| `/reset-password`   | Public   | `pages/ResetPassword.tsx`     |
| `/app/search`       | Required | `pages/AISearch.tsx`          |
| `/app/history`      | Required | `pages/SearchHistory.tsx`     |
| `/app/profile`      | Required | `pages/Profile.tsx`           |
| `*`                 | —        | `pages/NotFound.tsx`          |

## Structure

```
src/
├── components/   # Shared UI (Button, Input, Layout, Navbar, ...)
├── pages/        # One file per route
├── store/        # Zustand stores: authStore, searchStore
├── lib/          # api client, utils
├── types/        # Shared TS types
├── App.tsx       # Router
└── main.tsx      # Entry
```

Every file is kept well under 500 lines.

## Backend endpoints used

- `POST /signup`
- `POST /login`
- `POST /forgot-password`
- `POST /reset-password`
- `POST /instructions` (Bearer auth)
- `GET  /search_history` (Bearer auth)
