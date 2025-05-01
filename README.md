# CRM Ticket System

A modern CRM ticket management system built with React, TypeScript, and Supabase.

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Application Configuration
VITE_APP_NAME=CRM Ticket System
VITE_API_URL=http://localhost:3000
```

2. Replace `your-supabase-project-url` and `your-supabase-anon-key` with your actual Supabase project credentials.

## Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
```

## License

MIT
