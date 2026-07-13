import { useEffect, useRef, useState } from "react";
import { Play, Clock3, GraduationCap, Youtube } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * STUDENT VIDEO REVIEWS — content config
 *
 * To add/replace a video, only `youtubeUrl` needs to change — the
 * thumbnail and embed are derived automatically from it. Update the
 * other fields (college, course, duration) to match the new video.
 * ─────────────────────────────────────────────────────────────────────────
 */
type VideoReview = {
  id: string;
  youtubeUrl: string;
  collegeName: string;
  course: string;
  duration: string;
};

const videoReviews: VideoReview[] = [
  {
    id: "video-1",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    collegeName: "Hindu College",
    course: "BSc (H) Physics",
    duration: "6:42",
  },
  {
    id: "video-2",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    collegeName: "Miranda House",
    course: "BA (H) Economics",
    duration: "5:18",
  },
  {
    id: "video-3",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    collegeName: "SRCC",
    course: "BCom (H)",
    duration: "8:05",
  },
  {
    id: "video-4",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    collegeName: "St. Stephen's College",
    course: "BSc (H) Mathematics",
    duration: "7:23",
  },
];

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

function VideoCard({
  video,
  onPlay,
}: {
  video: VideoReview;
  onPlay: (video: VideoReview) => void;
}) {
  const videoId = getYouTubeId(video.youtubeUrl);
  const thumb = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      className="ring-gradient shine group/card glass hover-lift relative w-[260px] shrink-0 overflow-hidden rounded-2xl text-left shadow-token-sm transition-[transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-[300px]"
      aria-label={`Play video review: ${video.collegeName}, ${video.course}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* Skeleton shimmer shown until the thumbnail has actually loaded */}
        {!loaded && thumb && (
          <div className="skeleton-shimmer absolute inset-0" aria-hidden="true" />
        )}
        {thumb ? (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            onLoad={() => setLoaded(true)}
            className={`h-full w-full select-none object-cover transition-[opacity,transform] duration-700 ease-out group-hover/card:scale-110 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-primary/60">
            <Youtube className="h-8 w-8 text-white/80" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        {/* Play button */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 shadow-glow backdrop-blur-md ring-1 ring-white/25 transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-primary/90">
            <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
          </span>
        </span>
        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
          <Clock3 className="h-3 w-3" /> {video.duration}
        </span>
        {/* Verified badge — icon gently pulses to draw the eye */}
        <span className="badge-premium absolute left-2 top-2 !border-white/20 !bg-black/50 !text-white backdrop-blur-sm">
          <Youtube className="h-3 w-3 animate-glow text-red-500" /> Video review
        </span>
      </div>
      <div className="p-3.5">
        <p className="truncate text-sm font-extrabold">{video.collegeName}</p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
          <GraduationCap className="h-3.5 w-3.5 shrink-0" /> {video.course}
        </p>
      </div>
    </button>
  );
}

export function StudentVideoReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [activeVideo, setActiveVideo] = useState<VideoReview | null>(null);

  // Loop the list so the marquee has enough width to scroll seamlessly.
  const loopedReviews = [...videoReviews, ...videoReviews];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    const speed = 0.55; // px / frame — smooth, GPU-cheap (scrollLeft only)

    const step = () => {
      if (!pausedRef.current) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += speed;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };
  const resume = (delay = 0) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  };

  const videoId = activeVideo ? getYouTubeId(activeVideo.youtubeUrl) : null;

  return (
    <section id="video-reviews" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="badge-premium">
          <Youtube className="h-3 w-3 text-red-500" /> Hear it from them
        </span>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-[2.75rem]">
          Student video reviews
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          Real DU students, on camera, talking about campus life, academics and admissions.
        </p>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={() => resume(0)}
        onTouchStart={pause}
        onTouchEnd={() => resume(1500)}
        onFocus={pause}
        onBlur={() => resume(0)}
        className="no-scrollbar mt-14 flex touch-pan-x gap-5 overflow-x-auto scroll-smooth px-1 py-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {loopedReviews.map((video, i) => (
          <VideoCard key={`${video.id}-${i}`} video={video} onPlay={setActiveVideo} />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground/70">
        Swipe to browse · hover to pause
      </p>

      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-3xl overflow-hidden border-white/10 bg-black p-0 sm:rounded-2xl">
          <DialogTitle className="sr-only">
            {activeVideo
              ? `${activeVideo.collegeName} — ${activeVideo.course} video review`
              : "Video review"}
          </DialogTitle>
          <div className="relative aspect-video w-full bg-black">
            {videoId && activeVideo && (
              <iframe
                key={videoId}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={`${activeVideo.collegeName} video review`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
          {activeVideo && (
            <div className="border-t border-white/10 bg-black/95 px-4 py-3 text-white">
              <p className="truncate text-sm font-bold">{activeVideo.collegeName}</p>
              <p className="truncate text-xs text-white/60">{activeVideo.course}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
