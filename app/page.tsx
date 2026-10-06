import Link from "next/link";
import ChannelCard from "@/components/ChannelCard";
import { mockChannels } from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";

async function getChannels() {
  if (!supabase) {
    return mockChannels;
  }

  const { data, error } = await supabase.from("channels").select("*").limit(20);

  if (error || !data || data.length === 0) {
    return mockChannels;
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category || "General",
    stream_url: item.stream_url,
    logo_url: item.logo_url || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=200&auto=format&fit=crop",
    is_live: item.is_live ?? true,
    views: Number(item.views ?? 0)
  }));
}

export default async function HomePage() {
  const channels = await getChannels();

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">Banglar Darpan</p>
            <h1 className="mt-2 text-4xl font-black text-white">LIVE TV Portal</h1>
          </div>

          <nav className="flex items-center gap-3">
            <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">
              Home
            </Link>
            <Link href="/admin" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500">
              Admin
            </Link>
          </nav>
        </header>

        <section className="mb-10 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-red-600/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-300">
                Now Streaming
              </p>
              <h2 className="text-3xl font-black text-white">Bangla News, Entertainment & Sports</h2>
              <p className="mt-4 max-w-xl text-slate-300">
                Live channels, Bangla content and a clean IPTV-style experience for modern viewers.
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Live Channel Feed</span>
                <span className="rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold uppercase">LIVE</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-red-600/20 flex items-center justify-center text-lg">📺</div>
                <div>
                  <p className="font-semibold text-white">{channels[0]?.name ?? "Banglar Darpan TV"}</p>
                  <p className="text-sm text-slate-400">{channels[0]?.category ?? "General"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Featured Channels</h3>
            <span className="text-sm text-slate-400">{channels.length} channels</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {channels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
