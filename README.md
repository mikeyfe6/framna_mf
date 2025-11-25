# Michael Fransman - Framna Assessment

A Next.js portfolio website with server-side rendering, static generation, and client-side CRUD functionality.

## Tech Stack

-   **Next.js 16** (App Router)
-   **TypeScript**
-   **Styled Components** (with createGlobalStyle)
-   **React Testing Library & Jest**
-   **MockAPI** (for backend API)

## Architecture & Rendering Strategy

This project leverages different Next.js rendering techniques for optimal performance:

### Server Components with ISR (Incremental Static Regeneration)

-   **Home Page** (`/`) - Server Component with ISR (revalidates every 10 seconds)
    -   Projects are fetched server-side and cached
    -   Automatically refreshes in the background
    -   Better SEO and initial load performance

### Static Site Generation (SSG)

-   **About Page** (`/about`) - Pure Server Component, statically generated at build time
    -   No client-side JavaScript for rendering
    -   Fastest possible page loads

### Client-Side Rendering (CSR)

-   **Admin Page** (`/admin`) - Client Component with full CRUD operations
    -   Interactive forms and state management
    -   Real-time updates without page reloads

**Why this approach?**

-   Public pages (Home, About) benefit from server rendering for SEO and performance
-   Admin functionality requires client-side interactivity for CRUD operations
-   ISR on home page ensures fresh content without rebuilding

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mikeyfe6/framna_mf.git
cd framna_mf
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://691c52ba3aaeed735c9065fc.mockapi.io
```

**Note:** The app is already connected to a working MockAPI endpoint. You can use it as-is for testing, or replace the URL with your own MockAPI endpoint if you want to manage your own data.

### 4. MockAPI Setup (Optional)

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

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add environment variable:
    - `NEXT_PUBLIC_API_URL` = your MockAPI endpoint
5. Click "Deploy"

Vercel automatically detects Next.js and optimizes the build.

### Manual Deployment

For other platforms (Netlify, Railway, etc.):

```bash
npm run build
```

Deploy the `.next` folder with the start command: `npm start`

Ensure Node.js 18+ is available on the server.

## Pages

-   `/` - Home page with portfolio showcase (Server Component + ISR)
-   `/about` - About page (Static Site Generation)
-   `/admin` - Admin panel for managing projects (Client-side CRUD)

## Project Structure

```
framna_mf/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # SSG About page
│   │   ├── admin/
│   │   │   └── page.tsx          # CSR Admin panel
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # ISR Home page
│   ├── components/
│   │   ├── admin/
│   │   │   ├── ProjectItem.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   └── ProjectList.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectsGrid.tsx
│   │   └── Layout.tsx
│   ├── hooks/
│   │   └── useAdmin.ts   # Admin CRUD logic
│   ├── lib/
│   │   └── api.ts                # Centralized API functions
│   ├── styles/
│   │   └── GlobalStyles.tsx      # Styled Components global styles
│   └── types/
│       └── project.ts            # TypeScript interfaces
├── __tests__/
│   ├── components/
│   │   ├── admin/
│   │   │   └── ProjectForm.test.tsx
│   │   ├── Header.test.tsx
│   │   ├── ProjectCard.test.tsx
│   │   └── ProjectsGrid.test.tsx
│   ├── lib/
│   │   └── api.test.ts
│   └── api.test.ts
└── ...
```

## Code Architecture

### Component Composition

-   **Atomic Design**: Small, reusable components (`Hero`, `ProjectCard`, `ProjectItem`)
-   **Container/Presentational**: Business logic in hooks (`useAdmin`), UI in components
-   **Server/Client Separation**: Server components for data fetching, client for interactivity

### API Layer

All HTTP operations centralized in `src/lib/api.ts`:

-   `fetchProjects()` - GET with ISR caching
-   `createProject()` - POST
-   `updateProject()` - PUT
-   `deleteProject()` - DELETE

Consistent error handling across all endpoints.

### Styling Strategy

**Styled Components** for all styling:

-   Component-scoped styles prevent conflicts
-   TypeScript support for props
-   Global styles via `createGlobalStyle`
-   No CSS-in-JS runtime overhead with Next.js compiler

---

© Built by **Michael Fransman** ✨
