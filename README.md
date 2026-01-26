# Continuum - Production-Ready Game Discovery App

A modern, production-ready Next.js application for discovering games using RAWG and IGDB APIs, built with TypeScript, TanStack Query, and Axios.

## 🚀 Features

- **Modern Tech Stack**: Next.js 16, React 19, TypeScript 5
- **Data Fetching**: TanStack Query (React Query) for efficient caching and state management
- **API Integration**: Axios with interceptors for RAWG and IGDB APIs
- **Type Safety**: Full TypeScript support with proper type definitions
- **Error Handling**: Comprehensive error boundaries and user-friendly error displays
- **Loading States**: Professional loading indicators and skeletons
- **Styling**: Tailwind CSS with dark mode support
- **Production Ready**: Environment variables, proper error logging, and best practices

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- RAWG API key (get it from [https://rawg.io/apidocs](https://rawg.io/apidocs))
- Twitch Developer account for IGDB API access

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd continuum
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API credentials:

```env
# RAWG API Configuration
RAWG_API_KEY=your_rawg_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000

# Twitch/IGDB API Configuration
CLIENT_ID=your_twitch_client_id_here
CLIENT_SECRET=your_twitch_client_secret_here
ACCESS_TOKEN=your_twitch_access_token_here

# Environment
NODE_ENV=development
```

### 3. Get API Keys

#### RAWG API Key
1. Go to [https://rawg.io/apidocs](https://rawg.io/apidocs)
2. Sign up for a free account
3. Copy your API key
4. Add it to `.env.local` as `RAWG_API_KEY`

#### Twitch/IGDB Credentials
1. Go to [https://dev.twitch.tv/console](https://dev.twitch.tv/console)
2. Register your application
3. Copy the Client ID and Client Secret
4. To get an access token, run:
   ```bash
   npm run dev
   # Then make a POST request to http://localhost:3000/api/twitch-auth
   # Or use the twitchService in your code
   ```
5. Add credentials to `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
continuum/
├── app/
│   ├── api/              # API routes (Next.js server functions)
│   │   ├── igdb/         # IGDB API proxy
│   │   ├── rawg/         # RAWG API proxy
│   │   └── twitch-auth/  # Twitch authentication
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   ├── error-boundary.tsx
│   ├── error-display.tsx
│   └── loading.tsx
├── hooks/
│   └── use-games.ts      # Custom React Query hooks
├── lib/
│   ├── axios.ts          # Axios clients configuration
│   ├── api-service.ts    # API service layer
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── providers/
│   ├── query-provider.tsx
│   └── theme-provider.tsx
└── public/
```

## 🎯 Key Architecture Decisions

### 1. **Axios Client Configuration** (`lib/axios.ts`)
- Separate clients for different APIs (RAWG, IGDB, internal API)
- Request/response interceptors for logging and error handling
- Automatic API key injection
- Timeout configuration (30s)

### 2. **API Service Layer** (`lib/api-service.ts`)
- Centralized API calls
- Type-safe responses
- Easy to mock for testing
- Clean separation of concerns

### 3. **Custom Hooks** (`hooks/use-games.ts`)
- React Query integration
- Automatic caching and refetching
- Loading and error states
- Type-safe data fetching

### 4. **API Routes** (`app/api/`)
- Server-side API key management (never exposed to client)
- Proper error handling and logging
- CORS and security headers

## 🔌 API Endpoints

### Internal API Routes

#### GET `/api/rawg`
Fetch games from RAWG API
```typescript
// Query params: endpoint (required)
fetch('/api/rawg?endpoint=games?page=1&page_size=20')
```

#### POST `/api/igdb`
Fetch games from IGDB API
```typescript
fetch('/api/igdb', {
  method: 'POST',
  body: JSON.stringify({
    fields: 'name,rating,summary',
    search: 'Zelda',
    limit: 10
  })
})
```

#### POST `/api/twitch-auth`
Get Twitch OAuth token
```typescript
fetch('/api/twitch-auth', { method: 'POST' })
```

## 🎨 Using the API Services

### Example: Fetch Games with React Query

```typescript
import { useRAWGGames } from '@/hooks/use-games';

function MyComponent() {
  const { data, isLoading, error } = useRAWGGames({
    page_size: 20,
    ordering: '-rating',
  });

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      {data?.results.map(game => (
        <div key={game.id}>{game.name}</div>
      ))}
    </div>
  );
}
```

### Example: Direct API Service Call

```typescript
import { rawgService } from '@/lib/api-service';

async function fetchTopGames() {
  const data = await rawgService.getGames({
    page_size: 10,
    ordering: '-rating'
  });
  return data.results;
}
```

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔒 Security Best Practices

- ✅ API keys stored in environment variables (never committed)
- ✅ Server-side API routes to hide credentials from client
- ✅ Request/response validation
- ✅ Error messages don't expose sensitive data
- ✅ CORS configuration for API routes

## 📦 Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

Ensure environment variables are set in your production environment.

## 🐛 Troubleshooting

### API Key Not Working
- Check `.env.local` file exists and has correct values
- Restart dev server after changing environment variables
- Verify API keys are valid

### CORS Errors
- Ensure you're calling `/api/*` routes, not external APIs directly
- Check API route middleware configuration

### TypeScript Errors
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [RAWG API Docs](https://rawg.io/apidocs)
- [IGDB API Docs](https://api-docs.igdb.com/)

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js, React, TypeScript, and TanStack Query**
