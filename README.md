# Banglar Darpan LIVE

Bangla IPTV / live streaming portal built with Next.js + Supabase.

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Copy `.env.example` to `.env.local` and add your Supabase credentials:
```bash
cp .env.example .env.local
```

Then edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Locally
```bash
npm run dev
```

Visit: http://localhost:3000

## 🗄️ Database Setup

1. Go to your Supabase Dashboard
2. Open SQL Editor
3. Copy & paste content from `schema.sql`
4. Run the query

This creates:
- `channels` table (for TV channels)
- `categories` table (for channel types)
- Row Level Security policies

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel Dashboard
4. Deploy

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Home page with channel grid
│   ├── watch/[slug]/page.tsx # Channel player page
│   ├── admin/page.tsx        # Admin panel (demo)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ChannelCard.tsx       # Channel card component
│   └── VideoPlayer.tsx       # Video player component
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── mock-data.ts          # Fallback mock data
├── schema.sql                # Database schema
├── .env.example              # Environment template
└── README.md                 # This file
```

## 🎮 Features

✅ Live TV channel listing
✅ HLS/M3U8 stream support
✅ YouTube embed support
✅ Admin panel (demo mode)
✅ Responsive design
✅ Mock data fallback (works without Supabase)
✅ Free hosting on Vercel + free DB on Supabase
✅ Zero cost startup

## 💰 Monetization Ideas

- Ad slots between channels
- Premium channel tiers
- Subscription model
- Sponsored content
- Affiliate links

## 📝 License

MIT
