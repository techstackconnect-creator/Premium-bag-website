import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function Shop() {
  usePageMeta(
    "Shop — Maison du Cuir",
    "Browse all handcrafted leather goods from Maison du Cuir.",
  );

  return (
    <div className="min-h-screen" style={{ background: "#0D0B09" }}>
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="eyebrow mb-4">— Catalogue —</p>
          <h1 className="font-display text-5xl md:text-7xl mb-6" style={{ color: "#F5EFE6" }}>
            All Collections
          </h1>
          <p style={{ color: "#9E8E7E" }} className="max-w-xl mx-auto">
            The full atelier is being prepared. Please return shortly to view the complete collection.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
