import Link from "next/link";
import type { Channel } from "@/lib/mock-data";

type Props = {
  channel: Channel;
};

export default function ChannelCard({ channel }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/70 shadow-lg hover:scale-[1.01] transition">
      <div className="relative">
        <img
          src={channel.logo_url}
          alt={channel.name}
          className="h-44 w-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">
            {channel.is_live ? "Live" : "Offline"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-white">{channel.name}</h3>
          <span className="text-xs text-slate-400">{channel.views.toLocaleString()} views</span>
        </div>

        <p className="mt-2 text-sm text-slate-400">{channel.category}</p>

        <Link
          href={`/watch/${channel.slug}`}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition"
        >
          Watch Now
        </Link>
      </div>
    </div>
  );
}
