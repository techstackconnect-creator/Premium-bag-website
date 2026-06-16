import { useEffect, useRef, useState } from "react";
import jacket1 from "@/assets/product-jacket-1.jpg";
import jacket2 from "@/assets/product-jacket-2.jpg";
import jacket3 from "@/assets/product-jacket-3.jpg";

type Jacket = {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string | null;
  description: string;
  color: string;
  image: string;
};

const jackets: Jacket[] = [
  {
    id: 1,
    name: "The Milano Rider",
    subtitle: "Full-grain calfskin · Italian tanning",
    price: "€1,290",
    originalPrice: "€1,590",
    description:
      "A structured silhouette born in the ateliers of northern Italy. Asymmetric zip, quilted shoulder panels, and a fit that moulds to your body over years of wear.",
    color: "Midnight Black",
    image: jacket1,
  },
  {
    id: 2,
    name: "The Bordeaux Moto",
    subtitle: "Vegetable-tanned lambskin · Hand-dyed",
    price: "€1,490",
    originalPrice: null,
    description:
      "Deep burgundy aged with a hand-rubbed finish that deepens with every season. Inspired by vintage French motorcycle culture — supple, rebellious, timeless.",
    color: "Bordeaux Red",
    image: jacket2,
  },
  {
    id: 3,
    name: "The Cognac Aviator",
    subtitle: "Full-grain cowhide · Shearling lining",
    price: "€1,850",
    originalPrice: null,
    description:
      "Warm cognac leather meets genuine shearling lining. A nod to 1940s flight jackets, reengineered for the modern wardrobe. Built to outlast a lifetime.",
    color: "Cognac Brown",
    image: jacket3,
  },
];

export const JacketScrollShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const totalScroll = section.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const overall = Math.min(Math.max(scrolled / totalScroll, 0), 1);
        const zoneSize = 1 / jackets.length;
        const index = Math.min(
          Math.floor(overall / zoneSize),
          jackets.length - 1
        );
        setActiveIndex(index);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">— Leather Jackets —</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jackets.map((j) => (
              <div key={j.id} className="space-y-4">
                <img src={j.image} alt={j.name} className="w-full aspect-[2/3] object-cover rounded-[4px]" />
                <h3 className="font-display text-2xl" style={{ color: "#F5EFE6" }}>{j.name}</h3>
                <p className="text-sm" style={{ color: "#9E8E7E" }}>{j.description}</p>
                <p className="font-display text-xl" style={{ color: "#C9A96E" }}>{j.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const wrapperHeight = isMobile ? jackets.length * 150 : jackets.length * 100;

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${wrapperHeight}vh`, background: "#0D0B09" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden grain">
        {/* Eyebrow */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
          <p className="eyebrow">— Leather Jackets —</p>
        </div>

        {/* Progress dots */}
        <div className={`absolute z-20 flex gap-3 ${isMobile ? "bottom-24 left-1/2 -translate-x-1/2 flex-row" : "right-10 top-1/2 -translate-y-1/2 flex-col"}`}>
          {jackets.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === activeIndex ? (isMobile ? 24 : 8) : 8,
                height: i === activeIndex ? 8 : (isMobile ? 8 : 24),
                background: i === activeIndex ? "#C9A96E" : "rgba(201,169,110,0.3)",
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-8 right-10 z-20 hidden md:flex items-baseline gap-2 font-display">
          <span className="text-3xl" style={{ color: "#C9A96E" }}>
            0{activeIndex + 1}
          </span>
          <span className="text-sm" style={{ color: "#9E8E7E" }}>
            / 0{jackets.length}
          </span>
        </div>

        {/* Slides */}
        {jackets.map((jacket, i) => {
          const offset = i - activeIndex;
          const translate = offset === 0 ? "0%" : offset > 0 ? "100%" : "-100%";
          const isActive = i === activeIndex;

          return (
            <div
              key={jacket.id}
              className="absolute inset-0 flex flex-col md:flex-row"
              style={{
                transform: isMobile
                  ? `translateY(${translate})`
                  : `translateX(${translate})`,
                transition: "transform 900ms cubic-bezier(0.7, 0, 0.2, 1)",
                willChange: "transform",
              }}
            >
              {/* Image side */}
              <div className="relative w-full md:w-[60%] h-1/2 md:h-full overflow-hidden">
                <img
                  src={jacket.image}
                  alt={jacket.name}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover"
                  style={{
                    transform: isActive ? "scale(1)" : "scale(1.08)",
                    transition: "transform 1.4s ease-out",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(13,11,9,0.2), rgba(13,11,9,0.5))",
                  }}
                />
              </div>

              {/* Content side */}
              <div
                className="relative w-full md:w-[40%] h-1/2 md:h-full flex flex-col justify-center px-6 md:px-16 py-8"
                style={{ background: "#1A1410" }}
              >
                <div
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(30px)",
                    transition: "opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms",
                  }}
                >
                  {jacket.originalPrice && (
                    <span
                      className="inline-block text-[10px] tracking-[0.3em] uppercase px-3 py-1 mb-6 rounded-sm"
                      style={{ background: "#C9A96E", color: "#0D0B09" }}
                    >
                      Sale
                    </span>
                  )}
                  <p className="eyebrow mb-4">{jacket.subtitle}</p>
                  <h2
                    className="font-display leading-[1.05] mb-6"
                    style={{
                      color: "#F5EFE6",
                      fontSize: "clamp(28px, 5vw, 56px)",
                    }}
                  >
                    {jacket.name}
                  </h2>
                  <p
                    className="text-sm md:text-base leading-relaxed mb-8"
                    style={{ color: "#9E8E7E" }}
                  >
                    {jacket.description}
                  </p>
                  <div className="flex items-baseline gap-4 mb-8">
                    <span
                      className="font-display text-3xl"
                      style={{ color: "#C9A96E" }}
                    >
                      {jacket.price}
                    </span>
                    {jacket.originalPrice && (
                      <span
                        className="text-base line-through"
                        style={{ color: "#9E8E7E" }}
                      >
                        {jacket.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button className="btn-gold-filled">Shop Now</button>
                    <button
                      className="px-6 py-3 text-xs tracking-[0.25em] uppercase border rounded-[4px] transition-colors"
                      style={{
                        color: "#F5EFE6",
                        borderColor: "rgba(201,169,110,0.4)",
                      }}
                    >
                      Quick View
                    </button>
                  </div>
                  <p
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ color: "#9E8E7E" }}
                  >
                    Color: <span style={{ color: "#C9A96E" }}>{jacket.color}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{
            opacity: activeIndex === 0 ? 1 : 0,
            transition: "opacity 500ms ease",
          }}
        >
          <span className="block w-px h-10 bg-[rgba(201,169,110,0.5)]" />
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "#9E8E7E" }}
          >
            Scroll to explore
          </span>
        </div>
      </div>
    </div>
  );
};
