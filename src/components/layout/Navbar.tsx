import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";

const NAV = [
  { label: "Bags", to: "/shop" },
  { label: "Wallets", to: "/shop" },
  { label: "Belts", to: "/shop" },
  { label: "Jackets", to: "/shop" },
  { label: "Our Story", to: "/story" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D0B09]/95 backdrop-blur-md border-b border-[rgba(201,169,110,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="font-serif text-[18px] tracking-[0.3em] text-cream uppercase"
            style={{ color: "#F5EFE6" }}
          >
            Maison du Cuir
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="text-[12px] tracking-[0.18em] uppercase text-cream/85 hover:text-gold transition-colors"
                style={{ color: "#F5EFE6" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button aria-label="Search" className="text-cream/80 hover:text-gold transition-colors hidden sm:block">
              <Search size={18} />
            </button>
            <button aria-label="Wishlist" className="text-cream/80 hover:text-gold transition-colors hidden sm:block">
              <Heart size={18} />
            </button>
            <button aria-label="Cart" className="relative text-cream/80 hover:text-gold transition-colors">
              <ShoppingBag size={18} />
              <span
                className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium"
                style={{ background: "#C9A96E", color: "#0D0B09" }}
              >
                2
              </span>
            </button>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="lg:hidden text-cream/90 ml-2"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0D0B09] transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6">
          <span className="font-serif text-[18px] tracking-[0.3em] uppercase" style={{ color: "#F5EFE6" }}>
            Maison du Cuir
          </span>
          <button onClick={() => setOpen(false)} className="text-cream/90">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 mt-20">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              onClick={() => setOpen(false)}
              className="font-display text-3xl"
              style={{ color: "#F5EFE6" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
