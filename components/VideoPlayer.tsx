type Props = {
  channelName: string;
  streamUrl: string;
};

export default function VideoPlayer({ channelName, streamUrl }: Props) {
  const isIframe = streamUrl.includes("youtube.com") || streamUrl.includes("youtu.be");

  if (isIframe) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
        <iframe
          src={streamUrl}
          title={channelName}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
      <video
        controls
        autoPlay
        playsInline
        muted={false}
        className="h-full w-full object-cover"
        src={streamUrl}
      />
    </div>
  );
}
