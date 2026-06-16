import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollVideo } from "@/components/home/ScrollVideo";
import { ProductCard, type Product } from "@/components/home/ProductCard";
import { JacketScrollShowcase } from "@/components/home/JacketScrollShowcase";

import heroVideo from "@/assets/hero.mp4.asset.json";
import preFooterVideo from "@/assets/prefooter.mp4.asset.json";
import bag1 from "@/assets/product-bag-1.jpg";
import bag2 from "@/assets/product-bag-2.jpg";
import bag3 from "@/assets/product-bag-3.jpg";
import wallet from "@/assets/product-wallet.jpg";
import belt from "@/assets/product-belt.jpg";
import jacket1 from "@/assets/product-jacket-1.jpg";
import jacket2 from "@/assets/product-jacket-2.jpg";
import jacket3 from "@/assets/product-jacket-3.jpg";
import mosaic1 from "@/assets/mosaic-1.jpg";
import mosaic2 from "@/assets/mosaic-2.jpg";
import mosaic3 from "@/assets/mosaic-3.jpg";
import mosaic4 from "@/assets/mosaic-4.jpg";
import storyPortrait from "@/assets/story-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison du Cuir — Cuir, Style, Présence" },
      {
        name: "description",
        content:
          "Handcrafted leather bags, wallets, belts and jackets. A contemporary vision of premium leather since 2012.",
      },
      { property: "og:title", content: "Maison du Cuir — Cuir, Style, Présence" },
      {
        property: "og:description",
        content: "Handcrafted leather goods. Designed in France since 2012.",
      },
    ],
  }),
  component: Home,
});

const BESTSELLERS: Product[] = [
  { name: "Astride Tote", category: "Bags", price: "€485", originalPrice: "€590", image: bag1, sale: true },
  { name: "Léon Crossbody", category: "Bags", price: "€345", image: bag2 },
  { name: "Margaux Satchel", category: "Bags", price: "€420", image: bag3 },
  { name: "Bertrand Bifold", category: "Wallets", price: "€145", image: wallet },
  { name: "Sangle No. 4", category: "Belts", price: "€185", originalPrice: "€220", image: belt, sale: true },
  { name: "Noir Biker", category: "Jackets", price: "€1,290", image: jacket1 },
];


const TESTIMONIALS = [
  {
    quote: "The craftsmanship is extraordinary. My Astride tote ages more beautifully every season.",
    name: "Claire D.",
    location: "Paris, France",
  },
  {
    quote: "There is a quiet confidence to these pieces. Built for the long road, never the trend.",
    name: "Mateo R.",
    location: "Milan, Italy",
  },
  {
    quote: "From the weight to the smell to the stitching — every detail feels considered.",
    name: "Yuki S.",
    location: "Tokyo, Japan",
  },
];

const MARQUEE_ITEMS = [
  "LIVRAISON GRATUITE",
  "PRODUIT ORIGINAL",
  "PAIEMENT SÉCURISÉ",
  "RETOUR FACILE",
  "MADE IN FRANCE",
];

function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0B09" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden grain">
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,11,9,0.35) 0%, rgba(13,11,9,0.55) 50%, rgba(13,11,9,0.85) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 animate-fade-up">
          <p className="eyebrow mb-8">— Handcrafted Since 2012 —</p>
          <h1
            className="font-display font-medium leading-[1.05] mb-6 text-[42px] md:text-[72px] lg:text-[88px]"
            style={{ color: "#F5EFE6" }}
          >
            Cuir, Style, <em className="italic" style={{ color: "#D4A96A" }}>Présence</em>.
          </h1>
          <p className="max-w-xl text-base md:text-lg mb-10" style={{ color: "#9E8E7E" }}>
            Le cuir réinterprété pour une allure moderne et affirmée.
          </p>
          <a href="#bestsellers" className="btn-gold">Découvrir la Collection</a>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="block w-px h-12 bg-[rgba(201,169,110,0.5)]" />
            <ChevronDown size={16} className="animate-scroll-bounce" style={{ color: "#C9A96E" }} />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: "#1A1410" }} className="border-y border-[rgba(201,169,110,0.4)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(201,169,110,0.2)]">
          {[
            { num: "11+", label: "Years of Expertise" },
            { num: "830+", label: "Pieces Crafted" },
            { num: "4", label: "Awards Won" },
            { num: "98%", label: "Customer Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <div className="font-display text-4xl md:text-5xl mb-2" style={{ color: "#C9A96E" }}>
                {s.num}
              </div>
              <div className="text-[11px] tracking-[0.25em] uppercase" style={{ color: "#9E8E7E" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section id="bestsellers" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">— Meilleures Ventes —</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "#F5EFE6" }}>
              Our Most Loved Pieces
            </h2>
            <p className="max-w-md mx-auto" style={{ color: "#9E8E7E" }}>
              Timeless designs, uncompromising quality.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {BESTSELLERS.map((p) => <ProductCard key={p.name} p={p} />)}
          </div>
        </div>
      </section>

      {/* EDITORIAL MOSAIC */}
      <section style={{ background: "#1A1410" }} className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 min-h-[600px]">
            <div className="overflow-hidden rounded-[4px] md:row-span-2">
              <img src={mosaic1} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-[4px] md:row-span-2">
              <img src={mosaic2} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="col-span-2 md:col-span-1 md:row-span-2 flex flex-col items-center justify-center text-center p-8 border border-[rgba(201,169,110,0.25)] rounded-[4px]" style={{ background: "#0D0B09" }}>
              <p className="eyebrow mb-5">— Essence du Cuir —</p>
              <p className="font-display text-2xl md:text-[28px] italic leading-snug mb-8" style={{ color: "#F5EFE6" }}>
                Une vision contemporaine du cuir premium, pour un style affirmé et intemporel.
              </p>
              <a href="#" className="text-sm tracking-[0.25em] uppercase border-b pb-1 transition-all hover:opacity-70" style={{ color: "#C9A96E", borderColor: "#C9A96E" }}>
                Catalogue →
              </a>
            </div>
            <div className="overflow-hidden rounded-[4px] md:row-span-2">
              <img src={mosaic3} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-[4px] md:row-span-2">
              <img src={mosaic4} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y border-[rgba(13,11,9,0.4)] py-5" style={{ background: "#C9A96E" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((m, j) => (
                <span
                  key={`${i}-${j}`}
                  className="text-sm tracking-[0.3em] uppercase font-medium mx-10 flex items-center gap-10"
                  style={{ color: "#0D0B09" }}
                >
                  {m}
                  <span className="inline-block w-1 h-1 rounded-full" style={{ background: "#0D0B09" }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* JACKETS — Scroll-Animated Showcase */}
      <JacketScrollShowcase />


      {/* SCROLL VIDEO */}
      <ScrollVideo />

      {/* TESTIMONIALS */}
      <section style={{ background: "#1A1410" }} className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">— Témoignages —</p>
            <h2 className="font-display italic text-4xl md:text-5xl" style={{ color: "#F5EFE6" }}>
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="border border-[rgba(201,169,110,0.3)] rounded-[4px] p-10 text-center"
                style={{ background: "#231C16" }}
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C9A96E" stroke="#C9A96E" />
                  ))}
                </div>
                <p className="font-serif italic text-xl md:text-[22px] leading-relaxed mb-8" style={{ color: "#F5EFE6" }}>
                  "{t.quote}"
                </p>
                <p className="font-serif text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#C9A96E" }}>
                  {t.name}
                </p>
                <p className="text-xs" style={{ color: "#9E8E7E" }}>{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOLD DIVIDER */}
      <div className="relative h-[120px] overflow-hidden" style={{ background: "#0D0B09" }}>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
          {[...Array(5)].map((_, i) => (
            <path
              key={i}
              d={`M0,60 Q300,${30 + i * 6} 600,60 T1200,60`}
              fill="none"
              stroke="#C9A96E"
              strokeWidth={i === 0 ? 1.4 : 0.6}
              opacity={0.7 - i * 0.12}
            />
          ))}
        </svg>
      </div>

      {/* BRAND STORY BANNER */}
      <section className="py-24 md:py-32" style={{ background: "#0D0B09" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <p className="eyebrow mb-6">— Notre Histoire —</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-8" style={{ color: "#F5EFE6" }}>
              Leather That <em className="italic" style={{ color: "#D4A96A" }}>Outlasts</em><br/>Trends.
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-4 max-w-xl" style={{ color: "#9E8E7E" }}>
              Every piece begins at a single workbench in our Parisian atelier — hand-cut from full-grain hides, saddle-stitched with waxed linen thread, and finished by the same artisan who began it.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "#9E8E7E" }}>
              The result is leather that softens, deepens, and remembers — built for a lifetime of use, not a season.
            </p>
            <a href="#" className="text-sm tracking-[0.25em] uppercase border-b pb-1" style={{ color: "#C9A96E", borderColor: "#C9A96E" }}>
              Our Story →
            </a>
          </div>
          <div className="md:col-span-2 aspect-[3/4] overflow-hidden rounded-[4px]">
            <img src={storyPortrait} alt="Leather close-up" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* PRE-FOOTER VIDEO */}
      <section className="py-20" style={{ background: "#1A1410" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="aspect-video overflow-hidden rounded-[4px] border border-[rgba(201,169,110,0.25)]">
            <video src={preFooterVideo.url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </div>
          <div className="text-center mt-12">
            <h3 className="font-display italic text-3xl md:text-5xl mb-6" style={{ color: "#F5EFE6" }}>
              Burgundy. Bold. Yours.
            </h3>
            <a href="#" className="btn-gold">Shop the Look</a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 md:py-32 grain" style={{ background: "#0D0B09" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="eyebrow mb-5">— Join the Inner Circle —</p>
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6" style={{ color: "#F5EFE6" }}>
            Exclusive Access. <em className="italic" style={{ color: "#D4A96A" }}>First Looks.</em> Members-Only Offers.
          </h2>
          <form className="flex flex-col sm:flex-row gap-3 mt-10 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 text-sm bg-transparent border rounded-[4px] outline-none focus:border-[#C9A96E]"
              style={{ borderColor: "rgba(201,169,110,0.4)", color: "#F5EFE6" }}
            />
            <button type="submit" className="btn-gold-filled">Subscribe</button>
          </form>
          <p className="text-xs mt-5" style={{ color: "#9E8E7E" }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
