import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function Contact() {
  usePageMeta(
    "Contact — Maison du Cuir",
    "Get in touch with the Maison du Cuir atelier.",
  );

  return (
    <div className="min-h-screen" style={{ background: "#0D0B09" }}>
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="eyebrow mb-6">— Nous Contacter —</p>
          <h1 className="font-display text-5xl md:text-7xl mb-10" style={{ color: "#F5EFE6" }}>
            Contact
          </h1>
          <p className="mb-2" style={{ color: "#F5EFE6" }}>atelier@maisonducuir.fr</p>
          <p style={{ color: "#9E8E7E" }}>14 Rue du Cuir, 75003 Paris, France</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
