"use client";

import { useMemo, useState } from "react";
import { mockChannels } from "@/lib/mock-data";

type NewChannel = {
  name: string;
  slug: string;
  category: string;
  stream_url: string;
  logo_url: string;
  is_live: boolean;
};

const initialChannels = mockChannels;

export default function AdminPage() {
  const [channels, setChannels] = useState(initialChannels);
  const [form, setForm] = useState<NewChannel>({
    name: "",
    slug: "",
    category: "General",
    stream_url: "",
    logo_url: "",
    is_live: true
  });

  const totalViews = useMemo(
    () => channels.reduce((sum, channel) => sum + channel.views, 0),
    [channels]
  );

  const handleChange = (field: keyof NewChannel, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.stream_url) {
      return;
    }

    setChannels((prev) => [
      {
        id: `admin-${Date.now()}`,
        name: form.name,
        slug: form.slug,
        category: form.category,
        stream_url: form.stream_url,
        logo_url:
          form.logo_url ||
          "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=200&auto=format&fit=crop",
        is_live: form.is_live,
        views: 0
      },
      ...prev
    ]);

    setForm({
      name: "",
      slug: "",
      category: "General",
      stream_url: "",
      logo_url: "",
      is_live: true
    });
  };

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">Admin Panel</p>
            <h1 className="text-3xl font-black text-white">Channel Manager</h1>
          </div>
          <a
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
          >
            Back to Home
          </a>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Total Channels</p>
            <p className="mt-2 text-3xl font-black text-white">{channels.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Live Feed</p>
            <p className="mt-2 text-3xl font-black text-white">{channels.filter((c) => c.is_live).length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Total Views</p>
            <p className="mt-2 text-3xl font-black text-white">{totalViews.toLocaleString()}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <h2 className="mb-4 text-xl font-bold text-white">Add New Channel</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-300">Channel Name</label>
                <input
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white outline-none"
                  placeholder="Somoy TV"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white outline-none"
                  placeholder="somoy-tv"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white outline-none"
                >
                  <option value="General">General</option>
                  <option value="News">News</option>
                  <option value="Sports">Sports</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Stream URL</label>
                <input
                  value={form.stream_url}
                  onChange={(e) => handleChange("stream_url", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white outline-none"
                  placeholder="https://example.com/live.m3u8"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Logo URL</label>
                <input
                  value={form.logo_url}
                  onChange={(e) => handleChange("logo_url", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.is_live}
                  onChange={(e) => handleChange("is_live", e.target.checked)}
                  className="h-4 w-4"
                />
                <label className="text-sm text-slate-300">Channel is live</label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500"
              >
                Save Channel
              </button>
            </div>
          </form>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <h2 className="mb-4 text-xl font-bold text-white">Current Channels</h2>
            <div className="space-y-4">
              {channels.map((channel) => (
                <div key={channel.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950 p-3">
                  <div className="flex items-center gap-3">
                    <img src={channel.logo_url} alt={channel.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-white">{channel.name}</p>
                      <p className="text-xs text-slate-400">{channel.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400">Views</p>
                    <p className="text-sm font-semibold text-white">{channel.views.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
