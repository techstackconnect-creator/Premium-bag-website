import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "#080604" }} className="border-t border-[rgba(201,169,110,0.3)] pt-20 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-serif text-[18px] tracking-[0.3em] uppercase mb-4" style={{ color: "#F5EFE6" }}>
            Maison du Cuir
          </div>
          <p className="text-sm text-stone leading-relaxed mb-6" style={{ color: "#9E8E7E" }}>
            Handcrafted leather goods, designed in France since 2012.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="text-gold/80 hover:text-gold transition" style={{ color: "#C9A96E" }}>
                <Icon size={18} />
              </a>
            ))}
            <a href="#" style={{ color: "#C9A96E" }} className="text-sm">Pinterest</a>
          </div>
        </div>

        {[
          { title: "Shop", items: ["Bags", "Wallets", "Belts", "Jackets", "New Arrivals"] },
          { title: "Maison", items: ["About Us", "Sustainability", "Care Guide", "Careers"] },
          { title: "Service", items: ["Contact", "Returns", "Shipping", "FAQ"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-serif text-xs tracking-[0.25em] uppercase mb-5" style={{ color: "#C9A96E" }}>
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.items.map((it) => (
                <li key={it}>
                  <a href="#" className="text-sm text-cream/70 hover:text-gold transition" style={{ color: "#F5EFE6" }}>
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-16 pt-6 border-t border-[rgba(201,169,110,0.15)] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs" style={{ color: "#9E8E7E" }}>
          © 2025 Maison du Cuir. All rights reserved.
        </p>
        <div className="flex gap-3 text-xs tracking-[0.2em] uppercase" style={{ color: "#9E8E7E" }}>
          <span>Visa</span>·<span>Mastercard</span>·<span>PayPal</span>·<span>Amex</span>
        </div>
      </div>
    </footer>
  );
}
