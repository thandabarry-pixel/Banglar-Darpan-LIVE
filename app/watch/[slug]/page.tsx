import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import { mockChannels } from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";

type ChannelRecord = {
  id: string;
  name: string;
  slug: string;
  category: string;
  stream_url: string;
  logo_url?: string;
  is_live?: boolean;
  views?: number;
};

async function getChannelBySlug(slug: string): Promise<ChannelRecord | null> {
  if (!supabase) {
    return mockChannels.find((item) => item.slug === slug) ?? null;
  }

  const { data, error } = await supabase.from("channels").select("*").eq("slug", slug).single();

  if (error || !data) {
    return mockChannels.find((item) => item.slug === slug) ?? null;
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    category: data.category || "General",
    stream_url: data.stream_url,
    logo_url: data.logo_url || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=200&auto=format&fit=crop",
    is_live: data.is_live ?? true,
    views: Number(data.views ?? 0)
  };
}

export default async function WatchPage({ params }: { params: { slug: string } }) {
  const channel = await getChannelBySlug(params.slug);

  if (!channel) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">Now Watching</p>
            <h1 className="text-3xl font-black text-white">{channel.name}</h1>
          </div>
          <a
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
          >
            Back to Home
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr]">
          <div className="space-y-4">
            <VideoPlayer channelName={channel.name} streamUrl={channel.stream_url} />

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex items-center gap-4">
                {channel.logo_url && (
                  <img
                    src={channel.logo_url}
                    alt={channel.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-red-400">Live</p>
                  <h2 className="text-xl font-bold text-white">{channel.name}</h2>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <h3 className="text-lg font-bold text-white">Channel Info</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p><span className="font-semibold text-white">Category:</span> {channel.category}</p>
              <p><span className="font-semibold text-white">Status:</span> {channel.is_live ? "Live" : "Offline"}</p>
              <p><span className="font-semibold text-white">Views:</span> {Number(channel.views ?? 0).toLocaleString()}</p>
            </div>

            <div className="mt-5 rounded-xl bg-red-600/10 border border-red-600/30 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-red-300">Stream Source</p>
              <p className="mt-2 text-sm text-slate-200 break-all">{channel.stream_url}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
