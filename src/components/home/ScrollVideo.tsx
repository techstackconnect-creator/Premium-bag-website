import { useEffect, useRef, useState } from "react";
import scrollVideo from "@/assets/scroll.mp4";

const MILESTONES = [
  { from: 0, to: 0.28, text: "Every stitch tells a story." },
  { from: 0.36, to: 0.64, text: "Crafted for those who move with intention." },
  { from: 0.72, to: 1, text: "Discover your signature piece." },
];

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.play().catch(() => {});
      return;
    }

    video.pause();

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollHeight = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = Math.min(Math.max(scrolled / scrollHeight, 0), 1);
      setProgress(p);
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = video.duration * p;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "300vh" }} className="relative bg-[#0D0B09]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={scrollVideo}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(13,11,9,0.45)" }} />

        {MILESTONES.map((m, i) => {
          const mid = (m.from + m.to) / 2;
          const dist = Math.abs(progress - mid);
          const range = (m.to - m.from) / 2;
          const opacity = progress >= m.from && progress <= m.to
            ? Math.max(0, 1 - dist / range) : 0;
          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
              style={{ opacity, transition: "opacity 0.25s ease" }}
            >
              <h2
                className="font-display italic text-center max-w-3xl text-4xl md:text-6xl lg:text-7xl leading-tight"
                style={{ color: "#F5EFE6" }}
              >
                {m.text}
              </h2>
            </div>
          );
        })}

        {/* progress indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-px bg-[rgba(245,239,230,0.2)]">
          <div className="h-full bg-[#C9A96E]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
