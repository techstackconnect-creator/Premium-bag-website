export interface Product {
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  sale?: boolean;
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group relative overflow-hidden rounded-[4px] border border-[rgba(201,169,110,0.15)] bg-[#1A1410] transition-all duration-500 hover:border-[rgba(201,169,110,0.4)] hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-[#0D0B09]">
        {p.sale && (
          <span
            className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.25em] uppercase px-3 py-1 font-serif"
            style={{ background: "#C9A96E", color: "#0D0B09" }}
          >
            Sale
          </span>
        )}
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <button
          className="absolute left-4 right-4 bottom-4 py-3 text-[11px] tracking-[0.25em] uppercase translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-[4px]"
          style={{ background: "#C9A96E", color: "#0D0B09" }}
        >
          Add to Cart
        </button>
      </div>
      <div className="p-5 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "#9E8E7E" }}>
          {p.category}
        </p>
        <h3 className="font-serif text-lg mb-2" style={{ color: "#F5EFE6" }}>
          {p.name}
        </h3>
        <div className="flex items-center justify-center gap-3 text-sm">
          <span style={{ color: "#C9A96E" }} className="font-medium">{p.price}</span>
          {p.originalPrice && (
            <span className="line-through" style={{ color: "#9E8E7E" }}>{p.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
