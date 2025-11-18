# Michael Fransman - Framna Assessment

A Next.js portfolio website with server-side rendering, static generation, and client-side CRUD functionality.

## Tech Stack

-   **Next.js 16** (App Router)
-   **TypeScript**
-   **Styled Components**
-   **SASS/SCSS**
-   **React Testing Library & Jest**
-   **MockAPI** (for backend API)

## Architecture

-   **Home Page** (`/`) - Client Component displaying portfolio projects
-   **About Page** (`/about`) - Static Generation (SSG)
-   **Admin Page** (`/admin`) - Client Component with full CRUD operations

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://691c52ba3aaeed735c9065fc.mockapi.io
```

**Note:** The app is already connected to a working MockAPI endpoint. You can use it as-is for testing, or replace the URL with your own MockAPI endpoint if you want to manage your own data.

### 3. MockAPI Setup (Optional)

If you want to use your own MockAPI endpoint:

1. Go to [mockapi.io](https://mockapi.io)
2. Create a `projects` resource with the following schema:
    - `id` (auto-generated)
    - `title` (string)
    - `description` (string)
    - `image` (string, optional)
    - `link` (string, optional)
3. Update `NEXT_PUBLIC_API_URL` in `.env.local` with your endpoint

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Testing

Run tests with Jest:

```bash
npm test
```

## Production Build

```bash
npm run build
npm start
```

## Pages

-   `/` - Home page with portfolio showcase (client-side)
-   `/about` - About page (static)
-   `/admin` - Admin panel for managing projects (client-side CRUD)

## Project Structure

```
framna_mf/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   └── ProjectCard.tsx
│   ├── lib/
│   │   └── api.ts
│   └── types/
│       └── project.ts
├── styles/
│   └── globals.scss
├── __tests__/
│   ├── Header.test.tsx
│   ├── ProjectCard.test.tsx
│   └── api.test.ts
└── ...
```

---

© Built by **Michael Fransman** ✨
