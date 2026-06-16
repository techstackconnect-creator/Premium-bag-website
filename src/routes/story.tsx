import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Maison du Cuir" },
      { name: "description", content: "Born from a love of leather. Discover the story behind Maison du Cuir." },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0B09" }}>
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="eyebrow mb-6">— Notre Histoire —</p>
          <h1 className="font-display italic text-5xl md:text-7xl mb-10" style={{ color: "#F5EFE6" }}>
            Born From a Love of Leather
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#9E8E7E" }}>
            Since 2012, every piece from our Parisian atelier has been hand-cut, saddle-stitched and burnished by a single artisan from start to finish. The full story is being prepared.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
