import { useCallback, useEffect, useRef, useState } from "react";

const FRAME_COUNT = 240;

const frameUrl = (index: number) =>
  `/scroll-frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.png`;

const MILESTONES = [
  { from: 0, to: 0.28, text: "Every stitch tells a story." },
  { from: 0.36, to: 0.64, text: "Crafted for those who move with intention." },
  { from: 0.72, to: 1, text: "Discover your signature piece." },
];

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = width / height;
  let drawW: number;
  let drawH: number;
  let offsetX: number;
  let offsetY: number;

  if (imgRatio > canvasRatio) {
    drawH = height;
    drawW = height * imgRatio;
    offsetX = (width - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = width;
    drawH = width / imgRatio;
    offsetX = 0;
    offsetY = (height - drawH) / 2;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

export function ScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [framesReady, setFramesReady] = useState(false);

  const drawFrame = useCallback((p: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const images = imagesRef.current;
    if (!canvas || !container || images.length === 0) return;

    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.round(p * (FRAME_COUNT - 1)),
    );
    const img = images[frameIndex];
    if (!img?.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = container.getBoundingClientRect();
    drawCover(ctx, img, width, height);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    const onLoad = () => {
      loaded += 1;
      if (!cancelled && loaded === FRAME_COUNT) {
        imagesRef.current = images;
        setFramesReady(true);
        drawFrame(progressRef.current);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = onLoad;
      img.onerror = onLoad;
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!section || !container || !canvas || !framesReady) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = container.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      drawFrame(progressRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [framesReady, drawFrame]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      progressRef.current = 0;
      setProgress(0);
      drawFrame(0);
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollHeight = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = scrollHeight > 0 ? Math.min(Math.max(scrolled / scrollHeight, 0), 1) : 0;
      progressRef.current = p;
      setProgress(p);
      drawFrame(p);
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
  }, [framesReady, drawFrame]);

  return (
    <section ref={sectionRef} style={{ height: "300vh" }} className="relative bg-[#0D0B09]">
      <div ref={containerRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden
        />
        {!framesReady && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "#0D0B09" }}
          >
            <span className="text-[11px] tracking-[0.25em] uppercase" style={{ color: "#9E8E7E" }}>
              Loading…
            </span>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: "rgba(13,11,9,0.45)" }} />

        {MILESTONES.map((m, i) => {
          const mid = (m.from + m.to) / 2;
          const dist = Math.abs(progress - mid);
          const range = (m.to - m.from) / 2;
          const opacity =
            progress >= m.from && progress <= m.to ? Math.max(0, 1 - dist / range) : 0;
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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-px bg-[rgba(245,239,230,0.2)]">
          <div className="h-full bg-[#C9A96E]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
